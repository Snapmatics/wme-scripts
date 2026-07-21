(() => {
  'use strict';

  const VERSION = '0.1.11';
  const ACTIVE_CLASS = 'wif-select--open';
  const WME_URLS = [
    'https://www.waze.com/*/editor*',
    'https://www.waze.com/editor*',
    'https://beta.waze.com/*/editor*',
    'https://beta.waze.com/editor*'
  ];
  const BRIDGE_BUTTON_IDS = new Set([
    'scan-current', 'start-city', 'stop-scan', 'pan-scan-toggle',
    'bulk-fix', 'bulk-open', 'open-first-visible'
  ]);
  const bypassOnce = new WeakSet();
  let activeSelect = null;
  let repairQueued = false;
  let bridgePromise = null;
  let toastTimer = 0;

  const all = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const normalize = (value) => String(value || '').replace(/\s+/g, ' ').trim();
  const lower = (value) => normalize(value).toLowerCase();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function showToast(message, tone = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.dataset.tone = tone;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  function extensionContextInvalid(error) {
    return /extension context invalidated|context invalidated/i.test(String(error?.message || error || ''));
  }

  function receivingEndMissing(error) {
    return /receiving end does not exist|could not establish connection|message port closed/i.test(String(error?.message || error || ''));
  }

  function reloadDashboardForNewContext() {
    showToast('Extension updated. Reloading the dashboard…', 'warning');
    setTimeout(() => location.reload(), 180);
  }

  /* ---------- Reliable custom dropdowns ---------- */

  function selectedLabel(select) {
    return normalize(select.options[select.selectedIndex]?.textContent);
  }

  function closeSelect() {
    if (!activeSelect) return;
    activeSelect.wrapper.classList.remove(ACTIVE_CLASS);
    activeSelect.trigger.setAttribute('aria-expanded', 'false');
    activeSelect.menu.hidden = true;
    activeSelect = null;
  }

  function positionSelectMenu(trigger, menu) {
    const rect = trigger.getBoundingClientRect();
    const viewportGap = 10;
    const gap = 6;
    const width = Math.max(rect.width, 160);
    menu.style.width = `${width}px`;
    menu.style.left = `${Math.max(viewportGap, Math.min(rect.left, innerWidth - width - viewportGap))}px`;
    menu.style.top = `${rect.bottom + gap}px`;
    const height = Math.min(menu.scrollHeight || 260, 300);
    if (rect.bottom + gap + height > innerHeight - viewportGap) {
      menu.style.top = `${Math.max(viewportGap, rect.top - height - gap)}px`;
    }
  }

  function removeLegacySelectArtifacts(select) {
    const legacy = select.closest('.custom-select, .select-shell');
    if (legacy && !legacy.classList.contains('wif-select')) {
      const parent = legacy.parentNode;
      if (parent) {
        parent.insertBefore(select, legacy);
        legacy.remove();
      }
    }
    const parent = select.parentElement;
    if (!parent) return;
    all(':scope > .select-options, :scope > .custom-select-options, :scope > [role="listbox"], :scope > .custom-select, :scope > .select-shell', parent)
      .filter((node) => !node.classList.contains('wif-select') && !node.classList.contains('wif-select__menu'))
      .forEach((node) => node.remove());
  }

  function renderSelectOptions(select, trigger, menu) {
    trigger.textContent = selectedLabel(select);
    const fragment = document.createDocumentFragment();
    Array.from(select.options).forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'wif-select__option';
      button.textContent = option.textContent;
      button.disabled = option.disabled;
      button.setAttribute('role', 'option');
      button.setAttribute('aria-selected', String(index === select.selectedIndex));
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (option.disabled) return;
        select.value = option.value;
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
        renderSelectOptions(select, trigger, menu);
        closeSelect();
        trigger.focus();
      });
      fragment.append(button);
    });
    menu.replaceChildren(fragment);
  }

  function enhanceSelect(select) {
    if (!(select instanceof HTMLSelectElement) || select.dataset.wifSelectReady === 'true') return;
    removeLegacySelectArtifacts(select);
    const parent = select.parentNode;
    if (!parent) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'wif-select';
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'wif-select__trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    const menu = document.createElement('div');
    menu.className = 'wif-select__menu';
    menu.setAttribute('role', 'listbox');
    menu.hidden = true;

    parent.insertBefore(wrapper, select);
    wrapper.append(select, trigger);
    document.body.append(menu);
    select.classList.add('wif-native-select');
    select.dataset.wifSelectReady = 'true';
    renderSelectOptions(select, trigger, menu);

    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (activeSelect?.trigger === trigger) {
        closeSelect();
        return;
      }
      closeSelect();
      renderSelectOptions(select, trigger, menu);
      wrapper.classList.add(ACTIVE_CLASS);
      trigger.setAttribute('aria-expanded', 'true');
      menu.hidden = false;
      positionSelectMenu(trigger, menu);
      activeSelect = { wrapper, trigger, menu };
    });

    select.addEventListener('change', () => renderSelectOptions(select, trigger, menu));
    new MutationObserver(() => renderSelectOptions(select, trigger, menu))
      .observe(select, { childList: true, subtree: true, attributes: true });
  }

  function repairSelects() {
    repairQueued = false;
    all('.select-options, .custom-select-options').forEach((node) => {
      if (!node.classList.contains('wif-select__menu')) node.remove();
    });
    all('select[data-custom-select]').forEach(enhanceSelect);
  }

  function queueSelectRepair() {
    if (repairQueued) return;
    repairQueued = true;
    requestAnimationFrame(repairSelects);
  }

  /* ---------- WME bridge recovery ---------- */

  function chromeApiAvailable() {
    try {
      return Boolean(globalThis.chrome?.runtime?.id && chrome.tabs?.query);
    } catch (error) {
      if (extensionContextInvalid(error)) reloadDashboardForNewContext();
      return false;
    }
  }

  async function queryWmeTabs() {
    if (!chromeApiAvailable()) return [];
    try {
      const groups = await Promise.all(WME_URLS.map((url) => chrome.tabs.query({ url })));
      const unique = new Map();
      groups.flat().forEach((tab) => unique.set(tab.id, tab));
      return Array.from(unique.values()).sort((a, b) => Number(b.active) - Number(a.active));
    } catch (error) {
      if (extensionContextInvalid(error)) reloadDashboardForNewContext();
      return [];
    }
  }

  async function pingBridge(tabId) {
    try {
      await chrome.tabs.sendMessage(tabId, { type: 'WIF_BRIDGE_PING', source: 'dashboard', version: VERSION });
      return true;
    } catch (error) {
      if (extensionContextInvalid(error)) {
        reloadDashboardForNewContext();
        throw error;
      }
      if (receivingEndMissing(error)) return false;
      // A listener may intentionally ignore the ping; any other response means a receiver exists.
      return true;
    }
  }

  function waitForTabComplete(tabId, timeout = 20000) {
    return new Promise((resolve) => {
      let settled = false;
      const finish = (value) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        chrome.tabs.onUpdated.removeListener(listener);
        resolve(value);
      };
      const listener = (updatedId, changeInfo) => {
        if (updatedId === tabId && changeInfo.status === 'complete') finish(true);
      };
      const timer = setTimeout(() => finish(false), timeout);
      chrome.tabs.onUpdated.addListener(listener);
      chrome.tabs.get(tabId).then((tab) => {
        if (tab.status === 'complete') finish(true);
      }).catch(() => finish(false));
    });
  }

  async function reloadWmeTab(tab) {
    showToast('Reconnecting the WME tab…', 'warning');
    try {
      await chrome.tabs.reload(tab.id);
      await waitForTabComplete(tab.id);
      await sleep(1400);
      return await pingBridge(tab.id);
    } catch (error) {
      if (extensionContextInvalid(error)) reloadDashboardForNewContext();
      return false;
    }
  }

  async function ensureWmeBridge() {
    if (bridgePromise) return bridgePromise;
    bridgePromise = (async () => {
      if (!chromeApiAvailable()) return true;
      let tabs = await queryWmeTabs();
      let tab = tabs[0];
      if (!tab) {
        showToast('Opening WME and connecting the scanner…');
        try {
          tab = await chrome.tabs.create({ url: 'https://www.waze.com/editor', active: true });
          await waitForTabComplete(tab.id);
          await sleep(1600);
        } catch (error) {
          if (extensionContextInvalid(error)) reloadDashboardForNewContext();
          return false;
        }
      }
      if (await pingBridge(tab.id)) return true;
      if (await reloadWmeTab(tab)) return true;
      showToast('WME could not reconnect. Reload the WME tab once and try again.', 'error');
      return false;
    })().finally(() => {
      bridgePromise = null;
    });
    return bridgePromise;
  }

  function needsBridge(button) {
    if (!(button instanceof HTMLElement)) return false;
    if (button.closest('.wif-select, .wif-select__menu')) return false;
    if (button.id && BRIDGE_BUTTON_IDS.has(button.id)) return true;
    if (button.closest('#open-wme, #open-beta, #export-json, #export-csv, #clear-results, #theme-toggle, #density-toggle')) return false;
    if (!button.closest('#results-body, #drawer-actions, #bulk-bar, .queue-toolbar')) return false;
    const text = lower(button.textContent || button.title || button.getAttribute('aria-label'));
    return /(^|\b)(fix|apply|increase|extend|merge|split|set|clear lanes|assign|connect|remove|normalize|normalise|go|open next)(\b|$)/i.test(text);
  }

  async function guardAction(event) {
    const button = event.target.closest('button, a');
    if (!button || !needsBridge(button)) return;
    if (bypassOnce.has(button)) {
      bypassOnce.delete(button);
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();

    const wasDisabled = 'disabled' in button ? button.disabled : false;
    if ('disabled' in button) button.disabled = true;
    const connected = await ensureWmeBridge();
    if ('disabled' in button) button.disabled = wasDisabled;
    if (!connected || !button.isConnected) return;
    bypassOnce.add(button);
    button.click();
  }

  document.addEventListener('click', guardAction, true);
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.wif-select__trigger, .wif-select__menu')) closeSelect();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSelect();
  });
  addEventListener('resize', closeSelect, { passive: true });
  addEventListener('scroll', closeSelect, { passive: true, capture: true });

  new MutationObserver(queueSelectRepair)
    .observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', repairSelects, { once: true });
  } else {
    repairSelects();
  }
  setTimeout(repairSelects, 150);
  setTimeout(repairSelects, 700);
  console.info(`[WME Issue Fixer] Stable dashboard layer ${VERSION} ready.`);
})();