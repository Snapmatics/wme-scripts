(() => {
  "use strict";

  const STYLE_ID = "wmeRcSubfolderGapFixCss";
  const PANEL_SELECTOR = ".wmeRcPins";
  const GROUP_SELECTOR = ".wmeRcPinsGroup";
  const HEADER_SELECTOR = ".wmeRcPinsGroupHdr";
  const HANDLE_SELECTOR = ".wmeRcPinsGroupDrag, .wmeRcPinsGroupTwisty, [class*='GroupDrag'], [class*='groupDrag']";

  const EXPLICIT_SUBFOLDER_SELECTOR = [
    ".wmeRcPinsSubfolder",
    ".wmeRcPinsGroupSubfolder",
    ".wmeRcPinsGroup--subfolder",
    ".is-subfolder",
    ".isSubfolder",
    "[data-subfolder='1']",
    "[data-subfolder='true']",
    "[data-is-subfolder='1']",
    "[data-is-subfolder='true']"
  ].join(",");

  function installCss() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .wmeRcPinsSubfolders,
      .wmeRcPinsSubfolderList,
      .wmeRcPinsSubfolderWrap,
      .wmeRcPinsGroupChildren,
      .wmeRcPinsChildren,
      [data-subfolder-list],
      [data-subfolders-wrap]{
        margin-bottom:0!important;
        padding-bottom:0!important;
      }

      .wmeRcPinsGroup.wmeRcSubfolderRunEnd{
        margin-bottom:0!important;
        padding-bottom:0!important;
      }

      .wmeRcPinsGroup.wmeRcAfterSubfolderRun{
        margin-top:0!important;
        padding-top:0!important;
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  function getParentMarker(group) {
    if (!group) return "";
    const attrs = [
      "data-parent-id",
      "data-parent-group-id",
      "data-folder-parent-id",
      "data-parent-folder-id"
    ];
    for (const attr of attrs) {
      const value = String(group.getAttribute(attr) || "").trim();
      if (value) return value;
    }
    for (const [key, value] of Object.entries(group.dataset || {})) {
      if (!/parent/i.test(key)) continue;
      const normalized = String(value || "").trim();
      if (normalized) return normalized;
    }
    return "";
  }

  function explicitSubfolder(group) {
    if (!group) return false;
    try {
      if (group.matches(EXPLICIT_SUBFOLDER_SELECTOR)) return true;
    } catch {}

    const marker = getParentMarker(group).toLowerCase();
    return !!marker && marker !== "default" && marker !== "root" && marker !== "none";
  }

  function anchorLeft(group) {
    const header = group?.querySelector?.(HEADER_SELECTOR) || group;
    const anchor = header?.querySelector?.(HANDLE_SELECTOR) || header?.firstElementChild || header;
    const rect = anchor?.getBoundingClientRect?.();
    return rect && Number.isFinite(rect.left) ? rect.left : NaN;
  }

  function classifyGroups(groups) {
    const explicit = groups.map(explicitSubfolder);
    const positions = groups.map(anchorLeft);
    const valid = positions.filter(Number.isFinite);
    const baseline = valid.length ? Math.min(...valid) : NaN;

    return groups.map((group, index) => {
      if (explicit[index]) return true;
      const left = positions[index];
      return Number.isFinite(left) && Number.isFinite(baseline) && left >= baseline + 8;
    });
  }

  function setZero(element, property) {
    if (!element?.style) return;
    if (element.style.getPropertyValue(property) === "0px" && element.style.getPropertyPriority(property) === "important") return;
    element.style.setProperty(property, "0px", "important");
  }

  function commonAncestor(a, b) {
    if (!a || !b) return null;
    const ancestors = new Set();
    for (let node = a; node; node = node.parentElement) ancestors.add(node);
    for (let node = b; node; node = node.parentElement) {
      if (ancestors.has(node)) return node;
    }
    return null;
  }

  function clearTrailingWrapperSpacing(lastSubfolder, nextGroup, panel) {
    const common = commonAncestor(lastSubfolder, nextGroup) || panel;
    for (let node = lastSubfolder.parentElement; node && node !== common && node !== panel; node = node.parentElement) {
      const classText = String(node.className || "");
      const looksLikeSubfolderWrapper = /subfolder|children|child|nested/i.test(classText);
      const endsWithSubfolder = node.lastElementChild === lastSubfolder || node.lastElementChild?.contains?.(lastSubfolder);
      if (looksLikeSubfolderWrapper || endsWithSubfolder) {
        setZero(node, "margin-bottom");
        setZero(node, "padding-bottom");
      }
    }
  }

  function applyGapFix(panel) {
    if (!panel?.isConnected) return;
    const groups = Array.from(panel.querySelectorAll(GROUP_SELECTOR));
    if (groups.length < 2) return;

    const subfolderFlags = classifyGroups(groups);
    groups.forEach((group) => group.classList.remove("wmeRcSubfolderRunEnd", "wmeRcAfterSubfolderRun"));

    for (let index = 0; index < groups.length - 1; index += 1) {
      if (!subfolderFlags[index] || subfolderFlags[index + 1]) continue;

      const lastSubfolder = groups[index];
      const nextGroup = groups[index + 1];
      lastSubfolder.classList.add("wmeRcSubfolderRunEnd");
      nextGroup.classList.add("wmeRcAfterSubfolderRun");

      setZero(lastSubfolder, "margin-bottom");
      setZero(lastSubfolder, "padding-bottom");
      setZero(nextGroup, "margin-top");
      setZero(nextGroup, "padding-top");
      clearTrailingWrapperSpacing(lastSubfolder, nextGroup, panel);
    }
  }

  let frame = 0;
  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      document.querySelectorAll(PANEL_SELECTOR).forEach(applyGapFix);
    });
  }

  installCss();
  schedule();

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [
      "class",
      "data-parent-id",
      "data-parent-group-id",
      "data-folder-parent-id",
      "data-parent-folder-id",
      "data-subfolder",
      "data-is-subfolder"
    ]
  });

  document.addEventListener("dragend", schedule, true);
  document.addEventListener("drop", schedule, true);
  window.addEventListener("resize", schedule, { passive: true });

  setTimeout(schedule, 250);
  setTimeout(schedule, 900);
})();
