(() => {
  "use strict";

  const ROOT_SELECTOR = ".wmeRcFriendsTab.wmeRcFriendsHub";
  const ENHANCED_ATTR = "data-wme-rc-clean-directory";
  let pinsCollapsed = false;
  let observer = null;
  let scheduled = false;
  const observedRoots = new WeakSet();

  const profileIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="7" r="3"></circle>
      <path d="M4.5 16c.55-3.15 2.4-4.7 5.5-4.7s4.95 1.55 5.5 4.7"></path>
    </svg>`;

  const copyIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="7" y="7" width="9" height="9" rx="1.8"></rect>
      <path d="M13 7V5.5A1.5 1.5 0 0 0 11.5 4h-7A1.5 1.5 0 0 0 3 5.5v7A1.5 1.5 0 0 0 4.5 14H7"></path>
    </svg>`;

  const moreIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="4" cy="10" r="1.25"></circle>
      <circle cx="10" cy="10" r="1.25"></circle>
      <circle cx="16" cy="10" r="1.25"></circle>
    </svg>`;

  const pinIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 18s5-4.4 5-9.2a5 5 0 1 0-10 0C5 13.6 10 18 10 18Z"></path>
      <circle cx="10" cy="8.7" r="1.7"></circle>
    </svg>`;

  const chevronIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m6.3 7.5 3.7 3.7 3.7-3.7"></path>
    </svg>`;

  function makeSearchIcon() {
    const icon = document.createElement("span");
    icon.className = "wmeRcFriendsSearchIcon";
    icon.innerHTML = `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="8.7" cy="8.7" r="5.2"></circle>
        <path d="m12.6 12.6 4 4"></path>
      </svg>`;
    return icon;
  }

  function getRowUsername(row) {
    return String(row?.querySelector(".wmeRcFriendsRowTitle")?.textContent || "")
      .replace(/^\s+|\s+$/g, "");
  }

  async function copyText(text) {
    const value = String(text || "");
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {}
    try {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      return true;
    } catch {}
    return false;
  }

  function showCopiedFeedback(button) {
    if (!button) return;
    const label = button.querySelector("span:last-child");
    if (!label) return;
    const previous = label.textContent;
    label.textContent = "Copied";
    setTimeout(() => {
      if (label.isConnected) label.textContent = previous;
    }, 700);
  }

  function closeMenus(except = null) {
    document.querySelectorAll(`${ROOT_SELECTOR} .wmeRcFriendsRowMenu.is-open`).forEach((menu) => {
      if (menu === except) return;
      menu.classList.remove("is-open");
      menu.previousElementSibling?.classList.remove("is-open");
      menu.previousElementSibling?.setAttribute("aria-expanded", "false");
    });
  }

  function makeMenuItem(label, icon, onClick, danger = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "wmeRcFriendsRowMenuItem" + (danger ? " is-danger" : "");
    button.innerHTML = `<span class="wmeRcFriendsRowMenuIcon">${icon}</span><span>${label}</span>`;
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      try { await onClick(button); } finally { closeMenus(); }
    });
    return button;
  }

  function enhanceProfile(root) {
    const profile = root.querySelector(".wmeRcFriendsHubProfile");
    if (!profile) return;
    const copy = profile.querySelector(".wmeRcFriendsRowCopy");
    if (!copy || copy.querySelector(".wmeRcFriendsRowSub")) return;
    if (!profile.querySelector(".wmeRcFriendsProfileDot")) return;
    const subtitle = document.createElement("div");
    subtitle.className = "wmeRcFriendsRowSub";
    subtitle.textContent = "Connected WME editor";
    copy.appendChild(subtitle);
  }

  function enhanceSearch(root) {
    const search = root.querySelector(".wmeRcFriendsQuickSearch .wmeRcFriendsSearch");
    if (!search) return;
    const input = search.querySelector(".wmeRcFriendsInput");
    if (input) input.placeholder = "Search exact WME username";
    if (!search.querySelector(".wmeRcFriendsSearchIcon")) {
      search.insertBefore(makeSearchIcon(), search.firstChild);
    }
  }

  function enhanceFriendRows(root) {
    const list = root.querySelector(".wmeRcFriendsHubList");
    const heading = String(list?.querySelector(".wmeRcFriendsHubListHead span")?.textContent || "").trim();
    if (!list || heading !== "Your friends") return;

    list.querySelectorAll(".wmeRcFriendsCardBody > .wmeRcFriendsRow").forEach((row) => {
      if (row.hasAttribute(ENHANCED_ATTR)) return;
      const actions = row.querySelector(":scope > .wmeRcFriendsActions");
      const unfriendButton = actions?.querySelector(".wmeRcFriendsIconBtn.unfriend");
      if (!actions || !unfriendButton) return;

      row.setAttribute(ENHANCED_ATTR, "friend-row");
      row.classList.add("wmeRcFriendsDirectoryRow");

      const personCopy = row.querySelector(".wmeRcFriendsRowCopy");
      if (personCopy && !personCopy.querySelector(".wmeRcFriendsRowSub")) {
        const subtitle = document.createElement("div");
        subtitle.className = "wmeRcFriendsRowSub";
        subtitle.textContent = "WME editor";
        personCopy.appendChild(subtitle);
      }

      const username = getRowUsername(row);
      const menuWrap = document.createElement("div");
      menuWrap.className = "wmeRcFriendsRowMenuWrap";

      const moreButton = document.createElement("button");
      moreButton.type = "button";
      moreButton.className = "wmeRcFriendsMoreBtn";
      moreButton.setAttribute("aria-label", `Manage ${username || "friend"}`);
      moreButton.setAttribute("aria-expanded", "false");
      moreButton.innerHTML = moreIcon;

      const menu = document.createElement("div");
      menu.className = "wmeRcFriendsRowMenu";

      menu.appendChild(makeMenuItem("View WME profile", profileIcon, () => {
        if (!username) return;
        const url = `https://www.waze.com/user/editor/${encodeURIComponent(username)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }));

      menu.appendChild(makeMenuItem("Copy username", copyIcon, async (button) => {
        await copyText(username);
        showCopiedFeedback(button);
      }));

      const originalIcon = unfriendButton.innerHTML;
      unfriendButton.className = "wmeRcFriendsRowMenuItem is-danger";
      unfriendButton.removeAttribute("title");
      unfriendButton.setAttribute("aria-label", `Remove ${username || "friend"}`);
      unfriendButton.innerHTML = `<span class="wmeRcFriendsRowMenuIcon">${originalIcon}</span><span>Remove friend</span>`;
      unfriendButton.addEventListener("click", () => closeMenus(), { capture: true });
      menu.appendChild(unfriendButton);

      moreButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const opening = !menu.classList.contains("is-open");
        closeMenus(menu);
        menu.classList.toggle("is-open", opening);
        moreButton.classList.toggle("is-open", opening);
        moreButton.setAttribute("aria-expanded", opening ? "true" : "false");
      });

      menuWrap.appendChild(moreButton);
      menuWrap.appendChild(menu);
      actions.replaceWith(menuWrap);
    });
  }

  function countPinSenders(body) {
    const senders = new Set();
    body?.querySelectorAll(".wmeRcFriendsRowSub").forEach((subtitle) => {
      const text = String(subtitle.textContent || "").trim();
      const match = text.match(/^From\s+(.+)$/i);
      if (match?.[1]) senders.add(match[1].trim().toLowerCase());
    });
    return Math.max(1, senders.size || 0);
  }

  function enhanceReceivedPins(root) {
    const card = root.querySelector(".wmeRcFriendsReceivedPinsCard");
    if (!card || card.hasAttribute(ENHANCED_ATTR)) return;

    const oldHead = card.querySelector(":scope > .wmeRcFriendsReceivedPinsHead");
    const body = card.querySelector(":scope > .wmeRcFriendsReceivedPinsBody");
    if (!oldHead || !body) return;

    card.setAttribute(ENHANCED_ATTR, "received-pins");
    card.classList.toggle("is-collapsed", pinsCollapsed);

    const count = Number(oldHead.querySelector(".wmeRcFriendsCount")?.textContent || body.querySelectorAll(":scope > .wmeRcFriendsRow").length || 0);
    const senderCount = countPinSenders(body);
    const filterWrap = oldHead.querySelector(".wmeRcFriendsSenderFilterWrap");

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "wmeRcFriendsReceivedPinsToggle";
    toggle.setAttribute("aria-expanded", pinsCollapsed ? "false" : "true");
    toggle.innerHTML = `
      <span class="wmeRcFriendsReceivedPinsIcon">${pinIcon}</span>
      <span class="wmeRcFriendsReceivedPinsCopy">
        <strong>Received pins</strong>
        <small>${count} waiting from ${senderCount} friend${senderCount === 1 ? "" : "s"}</small>
      </span>
      <span class="wmeRcFriendsCount">${count}</span>
      <span class="wmeRcFriendsReceivedPinsChevron">${chevronIcon}</span>`;
    toggle.addEventListener("click", () => {
      pinsCollapsed = !pinsCollapsed;
      card.classList.toggle("is-collapsed", pinsCollapsed);
      toggle.setAttribute("aria-expanded", pinsCollapsed ? "false" : "true");
    });

    oldHead.insertAdjacentElement("afterend", toggle);

    if (filterWrap) {
      const toolbar = document.createElement("div");
      toolbar.className = "wmeRcFriendsReceivedPinsToolbar";
      toolbar.appendChild(filterWrap);
      body.insertBefore(toolbar, body.firstChild);
    }

    body.querySelectorAll(":scope > .wmeRcFriendsRow").forEach((row) => {
      row.classList.add("wmeRcFriendsPinDirectoryRow");
    });
  }

  function enhanceRoot(root) {
    if (!(root instanceof Element)) return;
    enhanceProfile(root);
    enhanceSearch(root);
    enhanceFriendRows(root);
    enhanceReceivedPins(root);
  }

  function watchRoot(root) {
    if (!root || observedRoots.has(root)) return;
    observedRoots.add(root);
    const rootObserver = new MutationObserver(scheduleEnhance);
    rootObserver.observe(root, { childList: true, subtree: true });
  }

  function enhanceAll() {
    scheduled = false;
    document.querySelectorAll(ROOT_SELECTOR).forEach((root) => {
      watchRoot(root);
      enhanceRoot(root);
    });
  }

  function scheduleEnhance() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(enhanceAll);
  }

  function start() {
    scheduleEnhance();
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes || []) {
          if (!(node instanceof Element)) continue;
          if (node.matches?.(ROOT_SELECTOR) || node.querySelector?.(ROOT_SELECTOR)) {
            scheduleEnhance();
            return;
          }
        }
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    document.addEventListener("pointerdown", (event) => {
      if (event.target?.closest?.(".wmeRcFriendsRowMenuWrap")) return;
      closeMenus();
    }, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
