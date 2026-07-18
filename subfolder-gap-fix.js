(() => {
  "use strict";

  const STYLE_ID = "wme-rc-subfolder-gap-fix-v1453";
  const SUBFOLDER_HINT = /sub.?folder/i;
  const CONTAINER_HINT = /(list|children|container|wrapper|wrap|group|items)/i;
  const ROW_HINT = /(row|header|item|entry)/i;

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      [class*="wmeRc"][class*="Subfolder"]:is([class*="List"],[class*="Children"],[class*="Container"],[class*="Wrapper"],[class*="Group"]),
      [class*="wmeRc"][class*="subfolder"]:is([class*="list"],[class*="children"],[class*="container"],[class*="wrapper"],[class*="group"]),
      [data-subfolder-container="true"],
      [data-subfolders="true"] {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
        min-height: 0 !important;
      }

      [class*="wmeRc"][class*="Subfolder"]:last-child,
      [class*="wmeRc"][class*="subfolder"]:last-child,
      [data-is-subfolder="true"]:last-child,
      [data-subfolder="true"]:last-child {
        margin-bottom: 0 !important;
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  function textOf(element) {
    return String(element?.textContent || "").replace(/\s+/g, "").trim();
  }

  function isVisible(element) {
    if (!(element instanceof HTMLElement)) return false;
    const style = getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden";
  }

  function looksLikeSubfolder(element) {
    if (!(element instanceof HTMLElement)) return false;
    const descriptor = [
      element.className,
      element.id,
      element.getAttribute("data-role"),
      element.getAttribute("data-type"),
      element.getAttribute("data-is-subfolder"),
      element.getAttribute("data-subfolder")
    ].filter(Boolean).join(" ");

    return SUBFOLDER_HINT.test(descriptor) ||
      element.getAttribute("data-is-subfolder") === "true" ||
      element.getAttribute("data-subfolder") === "true";
  }

  function removeEmptyTrailingSpacer(lastSubfolder) {
    let next = lastSubfolder.nextElementSibling;

    while (next instanceof HTMLElement) {
      if (!isVisible(next)) {
        next = next.nextElementSibling;
        continue;
      }

      if (looksLikeSubfolder(next)) return;

      const rect = next.getBoundingClientRect();
      const empty = textOf(next) === "";
      const spacerLike = empty && rect.height > 0 && rect.height <= 40;

      if (spacerLike) {
        next.style.setProperty("display", "none", "important");
        next.style.setProperty("height", "0", "important");
        next.style.setProperty("min-height", "0", "important");
        next.style.setProperty("margin", "0", "important");
        next.style.setProperty("padding", "0", "important");
      }
      return;
    }
  }

  function normalizeContainer(element) {
    const descriptor = [element.className, element.id].filter(Boolean).join(" ");
    const isContainer = CONTAINER_HINT.test(descriptor) && !ROW_HINT.test(descriptor);

    if (!isContainer) return;

    element.style.setProperty("margin-bottom", "0", "important");
    element.style.setProperty("padding-bottom", "0", "important");
    element.style.setProperty("min-height", "0", "important");
  }

  function applyFix() {
    injectStyles();

    const candidates = document.querySelectorAll(`
      [class*="Subfolder"],
      [class*="subfolder"],
      [data-is-subfolder="true"],
      [data-subfolder="true"],
      [data-subfolder-container="true"],
      [data-subfolders="true"]
    `);

    const visibleSubfolders = [];

    for (const element of candidates) {
      if (!(element instanceof HTMLElement)) continue;
      normalizeContainer(element);

      if (looksLikeSubfolder(element) && isVisible(element)) {
        visibleSubfolders.push(element);
      }
    }

    for (const subfolder of visibleSubfolders) {
      const parent = subfolder.parentElement;
      if (!(parent instanceof HTMLElement)) continue;

      const visibleChildren = [...parent.children].filter(isVisible);
      const subfolderChildren = visibleChildren.filter(looksLikeSubfolder);
      if (!subfolderChildren.length) continue;

      const lastSubfolder = subfolderChildren[subfolderChildren.length - 1];
      if (lastSubfolder !== subfolder) continue;

      lastSubfolder.style.setProperty("margin-bottom", "0", "important");
      parent.style.setProperty("padding-bottom", "0", "important");
      parent.style.setProperty("margin-bottom", "0", "important");
      parent.style.setProperty("min-height", "0", "important");
      removeEmptyTrailingSpacer(lastSubfolder);
    }
  }

  let queued = false;
  function queueFix() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      applyFix();
    });
  }

  const observer = new MutationObserver(queueFix);

  function start() {
    applyFix();
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style", "data-is-subfolder", "data-subfolder"]
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
