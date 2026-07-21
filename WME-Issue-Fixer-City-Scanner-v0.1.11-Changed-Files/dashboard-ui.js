(() => {
  'use strict';

  const UI_VERSION = '0.1.9';
  const PREFS_KEY = 'wifDashboardUiPrefs';
  const HISTORY_KEY = 'wifDashboardScanHistory';
  const MAX_HISTORY = 10;
  const MAX_BULK_FIX = 25;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const normalize = (value) => String(value || '').replace(/\s+/g, ' ').trim();
  const lower = (value) => normalize(value).toLowerCase();

  const elements = {
    body: document.body,
    resultsBody: $('#results-body'),
    summary: $('#summary'),
    statusText: $('#status-text'),
    statusMeta: $('#status-meta'),
    statTotal: $('#stat-total'),
    city: $('#city'),
    scanCurrent: $('#scan-current'),
    startCity: $('#start-city'),
    stopScan: $('#stop-scan'),
    panLastScan: $('#pan-last-scan'),
    themeToggle: $('#theme-toggle'),
    densityToggle: $('#density-toggle'),
    selectAll: $('#select-all-visible'),
    queueSummary: $('#queue-summary'),
    openFirst: $('#open-first-visible'),
    bulkBar: $('#bulk-bar'),
    bulkCount: $('#bulk-count'),
    bulkFixableCount: $('#bulk-fixable-count'),
    bulkFix: $('#bulk-fix'),
    bulkOpen: $('#bulk-open'),
    bulkClear: $('#bulk-clear'),
    drawer: $('#issue-drawer'),
    drawerTitle: $('#drawer-title'),
    drawerSeverity: $('#drawer-severity'),
    drawerDescription: $('#drawer-description'),
    drawerLocation: $('#drawer-location'),
    drawerState: $('#drawer-state'),
    drawerSource: $('#drawer-source'),
    drawerSafetyTitle: $('#drawer-safety-title'),
    drawerSafetyCopy: $('#drawer-safety-copy'),
    drawerActions: $('#drawer-actions'),
    historyList: $('#scan-history-list'),
    clearHistory: $('#clear-scan-history'),
    toast: $('#toast')
  };

  if (!elements.resultsBody || !elements.summary) return;

  let prefs = readJson(PREFS_KEY, {
    theme: 'system',
    density: 'comfortable',
    workflow: 'open',
    collapsedGroups: []
  });
  let scanHistory = readJson(HISTORY_KEY, []);
  let selectedKeys = new Set();
  let drawerRow = null;
  let openMenu = null;
  let refreshScheduled = false;
  let pendingScan = null;
  let scanWasBusy = false;
  let lastPanStamp = normalize(elements.panLastScan?.textContent);
  let toastTimer = 0;

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && typeof value === 'object' ? value : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      // Dashboard enhancement state is optional. Core extension storage is untouched.
    }
  }

  function savePrefs() {
    writeJson(PREFS_KEY, prefs);
  }

  function showToast(message) {
    if (!elements.toast) return;
    window.clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    toastTimer = window.setTimeout(() => elements.toast.classList.remove('show'), 2800);
  }

  function getRows() {
    return $$(':scope > tr', elements.resultsBody);
  }

  function issueCells(row) {
    const cells = Array.from(row.cells || []);
    const hasSelect = cells[0]?.classList.contains('wif-select-cell');
    return {
      select: hasSelect ? cells[0] : null,
      issue: cells[hasSelect ? 1 : 0] || null,
      location: cells[hasSelect ? 2 : 1] || null,
      state: cells[hasSelect ? 3 : 2] || null,
      actions: cells[hasSelect ? 4 : 3] || cells.at(-1) || null
    };
  }

  function getRowKey(row) {
    if (row.dataset.wifKey) return row.dataset.wifKey;
    const cells = issueCells(row);
    const explicit = row.dataset.issueId || row.dataset.id || row.id;
    const key = explicit || `${normalize(cells.issue?.textContent)}|${normalize(cells.location?.textContent)}`;
    row.dataset.wifKey = key;
    return key;
  }

  function originalActionElements(row) {
    const { actions } = issueCells(row);
    if (!actions) return [];
    return $$('button, a', actions).filter((element) => !element.dataset.wifUiAction);
  }

  function actionRole(element) {
    const text = lower(element.textContent || element.getAttribute('aria-label') || element.title);
    if (text === 'go' || text.includes('go to location') || text.includes('pan to')) return 'go';
    if (text.includes('beta')) return 'beta';
    if (text === 'wme' || text.includes('open wme') || text.includes('waze map editor')) return 'wme';
    if (text.includes('copy permalink')) return 'copy';
    if (text.includes('copy coordinates')) return 'coordinates';
    return 'other';
  }

  function isFixAction(element) {
    if (!element || element.disabled) return false;
    if (['go', 'wme', 'beta', 'copy', 'coordinates'].includes(actionRole(element))) return false;
    const text = lower(element.textContent || element.getAttribute('aria-label') || element.title);
    return /(^|\b)(fix|apply|increase|extend|merge|split|set|clear|assign|connect|remove|normalise|normalize|copy speed|copy name)(\b|$)/i.test(text);
  }

  function getFixButton(row) {
    return originalActionElements(row).find(isFixAction) || null;
  }

  function getOpenAction(row, role) {
    return originalActionElements(row).find((element) => actionRole(element) === role) || null;
  }

  function severityOf(row) {
    const value = lower(row.dataset.severity || row.className);
    if (value.includes('error')) return 'error';
    if (value.includes('warning')) return 'warning';
    if (value.includes('saved') || value.includes('success')) return 'saved';
    return 'info';
  }

  function classifyRow(row) {
    const cells = issueCells(row);
    const stateText = lower(cells.state?.textContent);
    const allText = lower(row.textContent);
    let state = 'review';

    if (/fixed\s*(?:&|and)\s*saved|verified fixed|resolved/.test(stateText)) state = 'saved';
    else if (/reopened/.test(stateText)) state = 'reopened';
    else if (/still detected|unresolved/.test(stateText)) state = 'unresolved';
    else if (/pending|unsaved|waiting for save/.test(stateText)) state = 'pending';
    else if (getFixButton(row) || /fix available/.test(stateText)) state = 'fixable';
    else if (/not editable|permission/.test(allText)) state = 'not-editable';

    row.dataset.wifState = state;
    row.dataset.severity = severityOf(row);
    return state;
  }

  function titleOf(row) {
    const { issue } = issueCells(row);
    const titleElement = issue?.querySelector('strong, b, a, [data-title]');
    if (titleElement) return normalize(titleElement.textContent);
    return normalize(issue?.textContent).split(/\n|\s{2,}/)[0] || 'Issue';
  }

  function descriptionOf(row) {
    const { issue } = issueCells(row);
    const title = titleOf(row);
    const full = normalize(issue?.textContent);
    const remainder = normalize(full.replace(title, ''));
    return remainder || 'Open the issue in WME to inspect the affected map object and nearby connections.';
  }

  function sourceOf(row) {
    const { location } = issueCells(row);
    const text = lower(location?.textContent);
    if (text.includes('pan scan')) return 'Pan scan';
    if (text.includes('city')) return 'City scan';
    if (text.includes('current') || text.includes('view')) return 'Current view';
    return normalize(location?.textContent).split(/\d{1,3}\.\d+/)[0].trim() || 'Stored scan';
  }

  function triggerOriginal(element) {
    if (!element || element.disabled) return false;
    try {
      element.click();
      return true;
    } catch (_) {
      return false;
    }
  }

  function createMenuItem(label, hint, original) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.wifUiAction = 'open-item';
    const labelSpan = document.createElement('span');
    labelSpan.textContent = label;
    const hintSpan = document.createElement('small');
    hintSpan.textContent = hint;
    button.append(labelSpan, hintSpan);
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      closeOpenMenu();
      if (!triggerOriginal(original)) showToast(`${label} is not available for this issue.`);
    });
    return button;
  }

  function positionOpenMenu(trigger, menu) {
    const rect = trigger.getBoundingClientRect();
    const menuWidth = Math.max(180, menu.offsetWidth || 180);
    const viewportPadding = 10;
    let left = Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - viewportPadding);
    left = Math.max(viewportPadding, left);
    let top = rect.bottom + 6;
    const estimatedHeight = menu.offsetHeight || 180;
    if (top + estimatedHeight > window.innerHeight - viewportPadding) top = Math.max(viewportPadding, rect.top - estimatedHeight - 6);
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  }

  function closeOpenMenu() {
    if (!openMenu) return;
    openMenu.menu.hidden = true;
    openMenu.trigger.setAttribute('aria-expanded', 'false');
    openMenu = null;
  }

  function buildOpenMenu(row, shell) {
    const actions = {
      go: getOpenAction(row, 'go'),
      wme: getOpenAction(row, 'wme'),
      beta: getOpenAction(row, 'beta'),
      copy: getOpenAction(row, 'copy'),
      coordinates: getOpenAction(row, 'coordinates')
    };
    if (!Object.values(actions).some(Boolean)) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'open-menu';
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'open-menu-trigger';
    trigger.textContent = 'Open';
    trigger.dataset.wifUiAction = 'open-menu';
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');

    const menu = document.createElement('div');
    menu.className = 'open-menu-list';
    menu.hidden = true;
    menu.setAttribute('role', 'menu');
    if (actions.go) menu.append(createMenuItem('Go to location', 'WME tab', actions.go));
    if (actions.wme) menu.append(createMenuItem('Open in WME', 'New tab', actions.wme));
    if (actions.beta) menu.append(createMenuItem('Open in WME Beta', 'New tab', actions.beta));
    if (actions.copy) menu.append(createMenuItem('Copy permalink', 'Clipboard', actions.copy));
    if (actions.coordinates) menu.append(createMenuItem('Copy coordinates', 'Clipboard', actions.coordinates));

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      if (openMenu?.menu === menu) {
        closeOpenMenu();
        return;
      }
      closeOpenMenu();
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      positionOpenMenu(trigger, menu);
      openMenu = { trigger, menu };
    });

    wrapper.append(trigger, menu);
    shell.append(wrapper);
  }

  function enhanceRow(row) {
    if (!(row instanceof HTMLTableRowElement)) return;

    if (!row.querySelector(':scope > .wif-select-cell')) {
      const selectCell = document.createElement('td');
      selectCell.className = 'wif-select-cell';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'row-select';
      checkbox.dataset.wifUiAction = 'select';
      checkbox.setAttribute('aria-label', `Select ${titleOf(row)}`);
      checkbox.checked = selectedKeys.has(getRowKey(row));
      checkbox.addEventListener('click', (event) => event.stopPropagation());
      checkbox.addEventListener('change', () => {
        const key = getRowKey(row);
        if (checkbox.checked) selectedKeys.add(key);
        else selectedKeys.delete(key);
        row.setAttribute('aria-selected', String(checkbox.checked));
        updateBulkBar();
      });
      selectCell.append(checkbox);
      row.prepend(selectCell);
    }

    const cells = issueCells(row);
    if (!cells.actions) return;

    if (!cells.actions.querySelector(':scope > .row-actions-shell')) {
      const existingNodes = Array.from(cells.actions.childNodes);
      const shell = document.createElement('div');
      shell.className = 'row-actions-shell';
      const coreControls = document.createElement('div');
      coreControls.className = 'row-core-controls';
      existingNodes.forEach((node) => coreControls.append(node));
      shell.append(coreControls);

      const openElements = originalActionElements(row).filter((element) => ['go', 'wme', 'beta', 'copy', 'coordinates'].includes(actionRole(element)));
      if (openElements.length) {
        const hiddenOpenActions = document.createElement('span');
        hiddenOpenActions.className = 'wif-original-open-actions';
        openElements.forEach((element) => hiddenOpenActions.append(element));
        coreControls.append(hiddenOpenActions);
      }

      const details = document.createElement('button');
      details.type = 'button';
      details.className = 'row-details-button';
      details.textContent = 'Details';
      details.dataset.wifUiAction = 'details';
      details.addEventListener('click', (event) => {
        event.stopPropagation();
        openDrawer(row);
      });
      shell.append(details);
      buildOpenMenu(row, shell);
      cells.actions.replaceChildren(shell);
    }

    row.addEventListener('click', (event) => {
      if (event.target.closest('button,a,input,select,label,[role="button"],[role="option"]')) return;
      openDrawer(row);
    });

    const state = classifyRow(row);
    const checkbox = row.querySelector('.row-select');
    if (checkbox) {
      checkbox.checked = selectedKeys.has(getRowKey(row));
      row.setAttribute('aria-selected', String(checkbox.checked));
    }
    row.dataset.wifEnhanced = 'true';
    row.title = state === 'fixable' ? 'Click for details — a guarded fix is available' : 'Click for issue details';
  }

  function matchesWorkflow(state, workflow) {
    if (workflow === 'open') return state !== 'saved';
    if (workflow === 'fixable') return state === 'fixable';
    if (workflow === 'review') return ['review', 'not-editable', 'unresolved', 'reopened'].includes(state);
    if (workflow === 'pending') return state === 'pending';
    if (workflow === 'saved') return state === 'saved';
    return true;
  }

  function isCoreVisible(row) {
    if (row.hidden) return false;
    if (row.style.display === 'none') return false;
    return true;
  }

  function visibleRows() {
    return getRows().filter((row) => isCoreVisible(row) && !row.classList.contains('wif-workflow-hidden'));
  }

  function updateWorkflow() {
    const rows = getRows();
    const counts = { open: 0, fixable: 0, review: 0, pending: 0, saved: 0 };

    rows.forEach((row) => {
      const state = classifyRow(row);
      if (state !== 'saved') counts.open += 1;
      if (state === 'fixable') counts.fixable += 1;
      if (['review', 'not-editable', 'unresolved', 'reopened'].includes(state)) counts.review += 1;
      if (state === 'pending') counts.pending += 1;
      if (state === 'saved') counts.saved += 1;
      row.classList.toggle('wif-workflow-hidden', !matchesWorkflow(state, prefs.workflow));
    });

    $$('[data-workflow-count]').forEach((element) => {
      element.textContent = String(counts[element.dataset.workflowCount] || 0);
    });
    $$('.workflow-tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.workflowTab === prefs.workflow));

    const visible = visibleRows();
    if (elements.queueSummary) elements.queueSummary.textContent = `${visible.length} shown`;
    if (elements.selectAll) {
      const selectable = visible.filter((row) => row.querySelector('.row-select'));
      const selectedVisible = selectable.filter((row) => row.querySelector('.row-select').checked);
      elements.selectAll.checked = selectable.length > 0 && selectedVisible.length === selectable.length;
      elements.selectAll.indeterminate = selectedVisible.length > 0 && selectedVisible.length < selectable.length;
    }
  }

  function updateBulkBar() {
    const selectedRows = getRows().filter((row) => selectedKeys.has(getRowKey(row)));
    const fixable = selectedRows.filter((row) => Boolean(getFixButton(row)));
    if (elements.bulkCount) elements.bulkCount.textContent = `${selectedRows.length} selected`;
    if (elements.bulkFixableCount) elements.bulkFixableCount.textContent = `${fixable.length} fixable`;
    if (elements.bulkFix) elements.bulkFix.disabled = fixable.length === 0;
    if (elements.bulkOpen) elements.bulkOpen.disabled = selectedRows.length === 0;
    if (elements.bulkBar) elements.bulkBar.hidden = selectedRows.length === 0;
    updateWorkflow();
  }

  function clearSelection() {
    selectedKeys.clear();
    getRows().forEach((row) => {
      const checkbox = row.querySelector('.row-select');
      if (checkbox) checkbox.checked = false;
      row.setAttribute('aria-selected', 'false');
    });
    updateBulkBar();
  }

  async function runBulkFix() {
    const rows = getRows().filter((row) => selectedKeys.has(getRowKey(row)) && getFixButton(row));
    if (!rows.length) return;
    if (rows.length > MAX_BULK_FIX) {
      showToast(`Select no more than ${MAX_BULK_FIX} fixable issues per batch.`);
      return;
    }
    const confirmed = window.confirm(`Apply ${rows.length} guarded fixes? Every edit will remain unsaved in WME for review.`);
    if (!confirmed) return;

    elements.bulkFix.disabled = true;
    let applied = 0;
    for (const row of rows) {
      const button = getFixButton(row);
      if (triggerOriginal(button)) applied += 1;
      await new Promise((resolve) => window.setTimeout(resolve, 260));
    }
    showToast(`${applied} fix${applied === 1 ? '' : 'es'} sent to WME's unsaved edit queue.`);
    elements.bulkFix.disabled = false;
  }

  function openBestAction(row) {
    const action = getOpenAction(row, 'go') || getOpenAction(row, 'wme') || getOpenAction(row, 'beta');
    if (!triggerOriginal(action)) showToast('No WME location action is available for this issue.');
  }

  function createDrawerButton(label, className, handler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `button ${className}`;
    button.textContent = label;
    button.dataset.wifUiAction = 'drawer';
    button.addEventListener('click', handler);
    return button;
  }

  function openDrawer(row) {
    if (!elements.drawer) return;
    drawerRow = row;
    const cells = issueCells(row);
    const state = classifyRow(row);
    const severity = severityOf(row);
    const fixButton = getFixButton(row);

    elements.drawerTitle.textContent = titleOf(row);
    elements.drawerDescription.textContent = descriptionOf(row);
    elements.drawerLocation.textContent = normalize(cells.location?.textContent) || '—';
    elements.drawerState.textContent = normalize(cells.state?.textContent) || state.replace('-', ' ');
    elements.drawerSource.textContent = sourceOf(row);
    elements.drawerSeverity.textContent = severity === 'saved' ? 'Saved' : severity;
    elements.drawerSeverity.className = `drawer-severity ${severity}`;

    if (fixButton) {
      elements.drawerSafetyTitle.textContent = 'Guarded fix available';
      elements.drawerSafetyCopy.textContent = 'Run the fix, inspect the changed geometry or attributes in WME, and save only when it is correct.';
    } else {
      elements.drawerSafetyTitle.textContent = 'Manual review required';
      elements.drawerSafetyCopy.textContent = 'The extension cannot determine the real-world answer safely. Open the object and verify it before editing.';
    }

    elements.drawerActions.replaceChildren();
    if (fixButton) {
      const label = normalize(fixButton.textContent) || 'Run fix';
      elements.drawerActions.append(createDrawerButton(label, 'primary', () => {
        if (triggerOriginal(fixButton)) showToast('Fix added to WME. Review it before saving.');
      }));
    }
    const go = getOpenAction(row, 'go');
    const wme = getOpenAction(row, 'wme');
    const beta = getOpenAction(row, 'beta');
    if (go) elements.drawerActions.append(createDrawerButton('Go to location', 'secondary', () => triggerOriginal(go)));
    if (wme) elements.drawerActions.append(createDrawerButton('Open WME', 'secondary', () => triggerOriginal(wme)));
    if (beta) elements.drawerActions.append(createDrawerButton('Open Beta', 'secondary', () => triggerOriginal(beta)));

    elements.drawer.classList.add('open');
    elements.drawer.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    window.setTimeout(() => $('[data-drawer-close]', elements.drawer)?.focus(), 20);
  }

  function closeDrawer() {
    if (!elements.drawer) return;
    elements.drawer.classList.remove('open');
    elements.drawer.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    drawerRow = null;
  }

  const GROUPS = [
    { name: 'Geometry', match: /short|long|geometry|loop|floating|intersect|disconnect|angle|sharp|junction can be removed|distortion/ },
    { name: 'Routing', match: /no entr|no exit|problematic exit|ramp|private area|forbidden turn|turn guidance|restriction/ },
    { name: 'Lanes', match: /lane/ },
    { name: 'Roundabouts', match: /roundabout/ },
    { name: 'Speed & attributes', match: /speed|unpaved|paved|lock|name|railroad/ },
    { name: 'Places & hazards', match: /place|school|hazard|camera/ }
  ];

  function groupForItem(item) {
    const text = lower(item.textContent);
    return GROUPS.find((group) => group.match.test(text))?.name || 'Other';
  }

  function groupSummary() {
    const summary = elements.summary;
    const directItems = Array.from(summary.children).filter((child) => !child.classList.contains('summary-group'));
    if (!directItems.length) return;

    $$('.summary-group', summary).forEach((group) => group.remove());
    const buckets = new Map();
    [...GROUPS.map((group) => group.name), 'Other'].forEach((name) => buckets.set(name, []));
    directItems.forEach((item) => buckets.get(groupForItem(item)).push(item));

    const fragment = document.createDocumentFragment();
    buckets.forEach((items, name) => {
      if (!items.length) return;
      const group = document.createElement('section');
      group.className = 'summary-group';
      group.dataset.group = name;
      if (prefs.collapsedGroups.includes(name)) group.classList.add('collapsed');

      const header = document.createElement('button');
      header.type = 'button';
      header.className = 'summary-group-header';
      header.innerHTML = `<span>${name}</span><b>${items.length}</b>`;
      header.addEventListener('click', () => {
        group.classList.toggle('collapsed');
        const collapsed = new Set(prefs.collapsedGroups);
        if (group.classList.contains('collapsed')) collapsed.add(name);
        else collapsed.delete(name);
        prefs.collapsedGroups = Array.from(collapsed);
        savePrefs();
      });

      const list = document.createElement('div');
      list.className = 'summary-group-list';
      items.forEach((item) => list.append(item));
      group.append(header, list);
      fragment.append(group);
    });
    summary.append(fragment);
  }

  function applyTheme() {
    const allowed = ['system', 'dark', 'light'];
    if (!allowed.includes(prefs.theme)) prefs.theme = 'system';
    elements.body.dataset.theme = prefs.theme;
    if (elements.themeToggle) {
      const label = prefs.theme === 'system' ? 'System theme' : `${prefs.theme[0].toUpperCase()}${prefs.theme.slice(1)} theme`;
      elements.themeToggle.title = `${label} — click to change`;
      elements.themeToggle.setAttribute('aria-label', label);
    }
  }

  function applyDensity() {
    prefs.density = prefs.density === 'compact' ? 'compact' : 'comfortable';
    elements.body.dataset.density = prefs.density;
    if (elements.densityToggle) {
      elements.densityToggle.title = prefs.density === 'compact' ? 'Use comfortable rows' : 'Use compact rows';
    }
  }

  function addHistory(entry) {
    const clean = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type: normalize(entry.type) || 'Scan',
      detail: normalize(entry.detail) || 'Completed',
      issues: Math.max(0, Number(entry.issues) || 0),
      time: Date.now()
    };
    scanHistory = [clean, ...scanHistory].slice(0, MAX_HISTORY);
    writeJson(HISTORY_KEY, scanHistory);
    renderHistory();
  }

  function renderHistory() {
    if (!elements.historyList) return;
    if (!scanHistory.length) {
      elements.historyList.innerHTML = '<p class="scan-history-empty">No completed scans yet.</p>';
      return;
    }
    const fragment = document.createDocumentFragment();
    scanHistory.forEach((entry) => {
      const item = document.createElement('div');
      item.className = 'scan-history-item';
      const title = document.createElement('strong');
      title.textContent = entry.type;
      const meta = document.createElement('span');
      const date = new Date(entry.time);
      meta.textContent = `${entry.detail} · ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      const count = document.createElement('b');
      count.textContent = String(entry.issues);
      item.append(title, meta, count);
      fragment.append(item);
    });
    elements.historyList.replaceChildren(fragment);
  }

  function numericText(element) {
    const match = normalize(element?.textContent).replace(/,/g, '').match(/-?\d+/);
    return match ? Number(match[0]) : 0;
  }

  function beginScan(type, detail) {
    pendingScan = {
      type,
      detail,
      startCount: numericText(elements.statTotal),
      startedAt: Date.now()
    };
  }

  function statusLooksBusy(text) {
    return /scanning|planning|loading|moving|tile|searching|resolving|starting/.test(lower(text));
  }

  function statusLooksFinished(text) {
    return /ready|complete|completed|finished|stopped|idle/.test(lower(text));
  }

  function reconcileScanStatus() {
    const status = normalize(elements.statusText?.textContent);
    const busy = statusLooksBusy(status);
    if (busy) scanWasBusy = true;
    if (pendingScan && scanWasBusy && statusLooksFinished(status)) {
      const endCount = numericText(elements.statTotal);
      addHistory({
        type: pendingScan.type,
        detail: pendingScan.detail || status,
        issues: Math.max(0, endCount - pendingScan.startCount)
      });
      pendingScan = null;
      scanWasBusy = false;
    }
  }

  function reconcilePanHistory() {
    const stamp = normalize(elements.panLastScan?.textContent);
    if (!stamp || stamp === 'Never' || stamp === lastPanStamp) return;
    lastPanStamp = stamp;
    addHistory({ type: 'Pan scan', detail: stamp, issues: 0 });
  }

  function refreshAll() {
    refreshScheduled = false;
    getRows().forEach(enhanceRow);
    groupSummary();
    updateWorkflow();
    updateBulkBar();
    reconcileScanStatus();
    reconcilePanHistory();
    if (drawerRow && !drawerRow.isConnected) closeDrawer();
  }

  function scheduleRefresh() {
    if (refreshScheduled) return;
    refreshScheduled = true;
    window.requestAnimationFrame(refreshAll);
  }

  $$('.workflow-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      prefs.workflow = tab.dataset.workflowTab || 'open';
      savePrefs();
      updateWorkflow();
    });
  });

  elements.themeToggle?.addEventListener('click', () => {
    const cycle = ['system', 'dark', 'light'];
    prefs.theme = cycle[(cycle.indexOf(prefs.theme) + 1) % cycle.length];
    applyTheme();
    savePrefs();
  });

  elements.densityToggle?.addEventListener('click', () => {
    prefs.density = prefs.density === 'compact' ? 'comfortable' : 'compact';
    applyDensity();
    savePrefs();
  });

  elements.selectAll?.addEventListener('change', () => {
    visibleRows().forEach((row) => {
      const checkbox = row.querySelector('.row-select');
      if (!checkbox) return;
      checkbox.checked = elements.selectAll.checked;
      const key = getRowKey(row);
      if (checkbox.checked) selectedKeys.add(key);
      else selectedKeys.delete(key);
      row.setAttribute('aria-selected', String(checkbox.checked));
    });
    updateBulkBar();
  });

  elements.bulkFix?.addEventListener('click', runBulkFix);
  elements.bulkClear?.addEventListener('click', clearSelection);
  elements.bulkOpen?.addEventListener('click', () => {
    const row = getRows().find((item) => selectedKeys.has(getRowKey(item)));
    if (row) openBestAction(row);
  });
  elements.openFirst?.addEventListener('click', () => {
    const row = visibleRows()[0];
    if (row) openBestAction(row);
    else showToast('There are no visible issues in this workflow.');
  });

  $$('[data-drawer-close]').forEach((element) => element.addEventListener('click', closeDrawer));
  elements.clearHistory?.addEventListener('click', () => {
    scanHistory = [];
    writeJson(HISTORY_KEY, scanHistory);
    renderHistory();
  });

  elements.scanCurrent?.addEventListener('click', () => beginScan('Current view', 'Manual scan'));
  elements.startCity?.addEventListener('click', () => beginScan(`City · ${normalize(elements.city?.value) || 'Selected area'}`, 'City grid'));
  elements.stopScan?.addEventListener('click', () => {
    if (pendingScan) pendingScan.detail = 'Stopped';
  });

  document.addEventListener('click', (event) => {
    if (openMenu && !event.target.closest('.open-menu')) closeOpenMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeOpenMenu();
      closeDrawer();
    }
  });
  window.addEventListener('resize', closeOpenMenu, { passive: true });
  window.addEventListener('scroll', closeOpenMenu, { passive: true, capture: true });

  ['search', 'severity', 'status-filter', 'sort', 'clear-code-filter'].forEach((id) => {
    const element = document.getElementById(id);
    element?.addEventListener('input', () => window.setTimeout(scheduleRefresh, 0));
    element?.addEventListener('change', () => window.setTimeout(scheduleRefresh, 0));
    element?.addEventListener('click', () => window.setTimeout(scheduleRefresh, 0));
  });

  const resultsObserver = new MutationObserver(scheduleRefresh);
  resultsObserver.observe(elements.resultsBody, { childList: true, subtree: true, characterData: true });

  const summaryObserver = new MutationObserver(() => {
    if (Array.from(elements.summary.children).some((child) => !child.classList.contains('summary-group'))) scheduleRefresh();
  });
  summaryObserver.observe(elements.summary, { childList: true });

  if (elements.statusText) {
    new MutationObserver(scheduleRefresh).observe(elements.statusText, { childList: true, subtree: true, characterData: true });
  }
  if (elements.statTotal) {
    new MutationObserver(scheduleRefresh).observe(elements.statTotal, { childList: true, subtree: true, characterData: true });
  }
  if (elements.panLastScan) {
    new MutationObserver(scheduleRefresh).observe(elements.panLastScan, { childList: true, subtree: true, characterData: true });
  }

  applyTheme();
  applyDensity();
  renderHistory();
  refreshAll();
  console.info(`[WME Issue Fixer] Dashboard UI ${UI_VERSION} ready.`);
})();
