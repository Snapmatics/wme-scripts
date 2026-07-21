(() => {
  'use strict';

  const ACTIVE_CLASS = 'wif-select--open';
  let active = null;
  let cleanupQueued = false;

  const $all = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function labelFor(select) {
    const option = select.options[select.selectedIndex];
    return option ? option.textContent.trim() : '';
  }

  function closeActive() {
    if (!active) return;
    active.wrapper.classList.remove(ACTIVE_CLASS);
    active.trigger.setAttribute('aria-expanded', 'false');
    active.menu.hidden = true;
    active = null;
  }

  function positionMenu(wrapper, trigger, menu) {
    const rect = trigger.getBoundingClientRect();
    const gap = 6;
    const viewportGap = 10;
    const width = Math.max(rect.width, 150);

    menu.style.width = `${width}px`;
    menu.style.left = `${Math.max(viewportGap, Math.min(rect.left, window.innerWidth - width - viewportGap))}px`;
    menu.style.top = `${rect.bottom + gap}px`;

    const estimatedHeight = Math.min(menu.scrollHeight || 260, 300);
    if (rect.bottom + gap + estimatedHeight > window.innerHeight - viewportGap) {
      menu.style.top = `${Math.max(viewportGap, rect.top - estimatedHeight - gap)}px`;
    }
  }

  function removeLegacyArtifacts(select) {
    const legacyWrapper = select.closest('.custom-select, .select-shell');
    if (legacyWrapper && !legacyWrapper.classList.contains('wif-select')) {
      const parent = legacyWrapper.parentNode;
      if (parent) {
        parent.insertBefore(select, legacyWrapper);
        legacyWrapper.remove();
      }
    }

    const parent = select.parentElement;
    if (!parent) return;
    $all(':scope > .select-options, :scope > .custom-select-options, :scope > [role="listbox"], :scope > .custom-select, :scope > .select-shell', parent)
      .filter((node) => !node.classList.contains('wif-select'))
      .forEach((node) => node.remove());
  }

  function refreshOptions(select, menu, trigger) {
    trigger.textContent = labelFor(select);
    menu.replaceChildren();

    Array.from(select.options).forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'wif-select__option';
      button.textContent = option.textContent;
      button.disabled = option.disabled;
      button.dataset.value = option.value;
      button.setAttribute('role', 'option');
      button.setAttribute('aria-selected', String(index === select.selectedIndex));

      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (option.disabled) return;
        select.value = option.value;
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
        refreshOptions(select, menu, trigger);
        closeActive();
        trigger.focus();
      });

      menu.append(button);
    });
  }

  function enhance(select) {
    if (!(select instanceof HTMLSelectElement)) return;
    if (select.dataset.wifSelectReady === 'true') return;

    removeLegacyArtifacts(select);

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

    const originalParent = select.parentNode;
    if (!originalParent) return;
    originalParent.insertBefore(wrapper, select);
    wrapper.append(select, trigger);
    document.body.append(menu);

    select.classList.add('wif-native-select');
    select.dataset.wifSelectReady = 'true';
    refreshOptions(select, menu, trigger);

    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (active?.trigger === trigger) {
        closeActive();
        return;
      }

      closeActive();
      refreshOptions(select, menu, trigger);
      wrapper.classList.add(ACTIVE_CLASS);
      trigger.setAttribute('aria-expanded', 'true');
      menu.hidden = false;
      positionMenu(wrapper, trigger, menu);
      active = { wrapper, trigger, menu };
    });

    select.addEventListener('change', () => refreshOptions(select, menu, trigger));

    const optionObserver = new MutationObserver(() => refreshOptions(select, menu, trigger));
    optionObserver.observe(select, { childList: true, subtree: true, attributes: true });
  }

  function repairAll() {
    cleanupQueued = false;

    $all('.select-options, .custom-select-options').forEach((node) => {
      if (!node.classList.contains('wif-select__menu')) node.remove();
    });

    $all('select[data-custom-select]').forEach(enhance);
  }

  function queueRepair() {
    if (cleanupQueued) return;
    cleanupQueued = true;
    requestAnimationFrame(repairAll);
  }

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.wif-select__trigger') && !event.target.closest('.wif-select__menu')) closeActive();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeActive();
  });

  window.addEventListener('resize', closeActive, { passive: true });
  window.addEventListener('scroll', closeActive, { passive: true, capture: true });

  const observer = new MutationObserver(queueRepair);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', repairAll, { once: true });
  } else {
    repairAll();
  }

  window.setTimeout(repairAll, 150);
  window.setTimeout(repairAll, 700);

  // Connection guard -------------------------------------------------------
  // Extension updates invalidate the content-script context in already-open
  // WME tabs. Check the receiver before an action reaches the core dashboard,
  // attempt a safe reinjection, and otherwise offer an explicit reload button.

  const protectedActionIds = new Set(['scan-current', 'start-city', 'pan-scan-toggle']);
  const bypassOnce = new WeakSet();
  let connectionCheckBusy = false;
  let pendingAction = null;
  let targetTabId = null;

  const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  function isWmeUrl(url) {
    try {
      const parsed = new URL(url || '');
      return (parsed.hostname === 'www.waze.com' || parsed.hostname === 'beta.waze.com') && /\/editor(?:\/|\?|$)|\/user\/editor(?:\/|\?|$)/i.test(parsed.pathname + parsed.search);
    } catch (_) {
      return false;
    }
  }

  function isMissingReceiver(error) {
    return /receiving end does not exist|could not establish connection|message port closed|extension context invalidated/i.test(String(error?.message || error || ''));
  }

  function needsConnection(element) {
    if (!(element instanceof Element)) return false;
    const button = element.closest('button, a');
    if (!button) return false;
    if (protectedActionIds.has(button.id)) return true;
    if (!button.closest('#results-body, #issue-drawer, #bulk-bar')) return false;
    const text = String(button.textContent || button.getAttribute('aria-label') || button.title || '').trim().toLowerCase();
    return /^(fix|apply|increase|extend|merge|split|set|clear lanes|assign|connect|remove junction|normalise|normalize)/i.test(text);
  }

  async function findWmeTab() {
    if (!globalThis.chrome?.tabs?.query) return null;
    const tabs = await chrome.tabs.query({});
    const matches = tabs.filter((tab) => isWmeUrl(tab.url));
    matches.sort((a, b) => Number(Boolean(b.active)) - Number(Boolean(a.active)) || (b.lastAccessed || 0) - (a.lastAccessed || 0));
    return matches[0] || null;
  }

  async function pingTab(tabId) {
    try {
      await chrome.tabs.sendMessage(tabId, {
        type: 'WIF_CONNECTION_CHECK',
        source: 'dashboard',
        timestamp: Date.now()
      });
      return true;
    } catch (error) {
      if (isMissingReceiver(error)) return false;
      throw error;
    }
  }

  async function tryReinject(tabId) {
    if (!globalThis.chrome?.scripting?.executeScript) return false;
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ['page-bridge.js']
      });
      await sleep(350);
      return await pingTab(tabId);
    } catch (error) {
      console.info('[WIF] Automatic WME bridge reinjection was unavailable.', error);
      return false;
    }
  }

  function installBannerStyles() {
    if (document.getElementById('wif-connection-style')) return;
    const style = document.createElement('style');
    style.id = 'wif-connection-style';
    style.textContent = `
      .wif-connection-banner{position:fixed;left:50%;top:92px;z-index:1000;width:min(620px,calc(100vw - 28px));transform:translate(-50%,-12px);display:flex;align-items:center;gap:14px;padding:13px 14px;border:1px solid var(--border-strong,#3b4655);border-radius:14px;background:color-mix(in srgb,var(--panel,#161b22) 96%,transparent);box-shadow:0 18px 55px rgba(0,0,0,.34);opacity:0;visibility:hidden;transition:opacity .18s ease,transform .18s ease;backdrop-filter:blur(18px)}
      .wif-connection-banner.show{opacity:1;visibility:visible;transform:translate(-50%,0)}
      .wif-connection-banner__icon{width:34px;height:34px;flex:0 0 auto;display:grid;place-items:center;border-radius:10px;background:var(--warning-soft,#392e18);color:var(--warning,#ffc14e);font-weight:800}
      .wif-connection-banner__copy{min-width:0;flex:1}.wif-connection-banner__copy strong{display:block;font-size:12.5px}.wif-connection-banner__copy span{display:block;margin-top:3px;color:var(--text-2,#b6c1cf);font-size:11.5px}
      .wif-connection-banner__actions{display:flex;gap:7px}.wif-connection-banner__actions button{min-height:34px;padding:6px 10px;border:1px solid var(--border,#2a3441);border-radius:9px;background:var(--panel-2,#1b212a);color:var(--text,#edf3fb);font:inherit;font-size:11px;font-weight:700;cursor:pointer}.wif-connection-banner__actions button.primary{border-color:transparent;background:var(--accent,#2a98ff);color:#fff}.wif-connection-banner__actions button:disabled{opacity:.55;cursor:wait}
      @media(max-width:640px){.wif-connection-banner{top:76px;align-items:flex-start;flex-wrap:wrap}.wif-connection-banner__copy{flex:1 1 calc(100% - 52px)}.wif-connection-banner__actions{width:100%;justify-content:flex-end}}
    `;
    document.head.append(style);
  }

  function getConnectionBanner() {
    let banner = document.getElementById('wif-connection-banner');
    if (banner) return banner;
    installBannerStyles();
    banner = document.createElement('div');
    banner.id = 'wif-connection-banner';
    banner.className = 'wif-connection-banner';
    banner.innerHTML = `
      <div class="wif-connection-banner__icon">!</div>
      <div class="wif-connection-banner__copy"><strong>WME is not connected</strong><span>The editor tab needs to reconnect after the extension update.</span></div>
      <div class="wif-connection-banner__actions">
        <button type="button" data-wif-focus>Open WME</button>
        <button type="button" class="primary" data-wif-reload>Reload WME</button>
        <button type="button" data-wif-dismiss>Dismiss</button>
      </div>`;
    document.body.append(banner);

    banner.querySelector('[data-wif-focus]').addEventListener('click', async () => {
      if (targetTabId == null) {
        const tab = await chrome.tabs.create({ url: 'https://www.waze.com/editor' });
        targetTabId = tab.id;
      } else {
        await chrome.tabs.update(targetTabId, { active: true });
      }
    });

    banner.querySelector('[data-wif-dismiss]').addEventListener('click', () => banner.classList.remove('show'));

    banner.querySelector('[data-wif-reload]').addEventListener('click', async (event) => {
      const button = event.currentTarget;
      if (targetTabId == null) return;
      button.disabled = true;
      button.textContent = 'Reconnecting…';
      try {
        await chrome.tabs.reload(targetTabId);
        const connected = await waitForConnection(targetTabId, 60000);
        if (!connected) throw new Error('WME did not reconnect in time.');
        banner.classList.remove('show');
        const action = pendingAction;
        pendingAction = null;
        if (action?.isConnected) {
          bypassOnce.add(action);
          action.click();
        }
      } catch (error) {
        const copy = banner.querySelector('.wif-connection-banner__copy span');
        if (copy) copy.textContent = error.message || 'Reload WME manually, wait for the map to finish loading, then try again.';
      } finally {
        button.disabled = false;
        button.textContent = 'Reload WME';
      }
    });
    return banner;
  }

  function showConnectionBanner(message, tabId) {
    targetTabId = tabId ?? null;
    const banner = getConnectionBanner();
    const copy = banner.querySelector('.wif-connection-banner__copy span');
    const reload = banner.querySelector('[data-wif-reload]');
    if (copy) copy.textContent = message;
    if (reload) reload.disabled = targetTabId == null;
    banner.classList.add('show');
  }

  async function waitForConnection(tabId, timeoutMs) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      try {
        const tab = await chrome.tabs.get(tabId);
        if (tab?.status === 'complete') {
          if (await pingTab(tabId)) return true;
          if (await tryReinject(tabId)) return true;
        }
      } catch (_) {
        return false;
      }
      await sleep(600);
    }
    return false;
  }

  async function ensureWmeConnection() {
    const tab = await findWmeTab();
    if (!tab?.id) {
      showConnectionBanner('No WME editor tab is open. Open WME, let it finish loading, and run the action again.', null);
      return false;
    }

    targetTabId = tab.id;
    if (await pingTab(tab.id)) return true;
    if (await tryReinject(tab.id)) return true;

    showConnectionBanner('The WME tab is using the old extension context. Reload it once to reconnect. Your dashboard data will remain stored.', tab.id);
    return false;
  }

  document.addEventListener('click', async (event) => {
    const action = event.target.closest('button, a');
    if (!action || !needsConnection(action)) return;
    if (bypassOnce.has(action)) {
      bypassOnce.delete(action);
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    pendingAction = action;

    if (connectionCheckBusy) return;
    connectionCheckBusy = true;
    const wasDisabled = action.disabled;
    if ('disabled' in action) action.disabled = true;

    try {
      if (await ensureWmeConnection()) {
        pendingAction = null;
        bypassOnce.add(action);
        action.click();
      }
    } catch (error) {
      console.warn('[WIF] WME connection check failed.', error);
      showConnectionBanner('Could not verify the WME connection. Reload the editor tab and try again.', targetTabId);
    } finally {
      connectionCheckBusy = false;
      if ('disabled' in action) action.disabled = wasDisabled;
    }
  }, true);
})();