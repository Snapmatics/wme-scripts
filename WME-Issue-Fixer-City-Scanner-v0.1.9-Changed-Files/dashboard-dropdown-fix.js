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
})();
