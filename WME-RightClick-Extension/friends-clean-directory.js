(() => {
  "use strict";

  const ROOT_SELECTOR = ".wmeRcFriendsTab.wmeRcFriendsHub";
  const ENHANCED_ATTR = "data-wme-rc-clean-directory";
  let observer = null;
  let scheduled = false;
  const observedRoots = new WeakSet();

  const profileIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="10" cy="7" r="3"></circle>
      <path d="M4.5 16c.55-3.15 2.4-4.7 5.5-4.7s4.95 1.55 5.5 4.7"></path>
    </svg>`;

  const copyIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <rect x="7" y="7" width="9" height="9" rx="1.8"></rect>
      <path d="M13 7V5.5A1.5 1.5 0 0 0 11.5 4h-7A1.5 1.5 0 0 0 3 5.5v7A1.5 1.5 0 0 0 4.5 14H7"></path>
    </svg>`;

  const moreIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="currentColor" stroke="none">
      <circle cx="4" cy="10" r="1.25"></circle>
      <circle cx="10" cy="10" r="1.25"></circle>
      <circle cx="16" cy="10" r="1.25"></circle>
    </svg>`;

  const pinIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 18s5-4.4 5-9.2a5 5 0 1 0-10 0C5 13.6 10 18 10 18Z"></path>
      <circle cx="10" cy="8.7" r="1.7"></circle>
    </svg>`;

  const chevronIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="m6.3 7.5 3.7 3.7 3.7-3.7"></path>
    </svg>`;


  const linkIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8.2 11.8 11.8 8.2"></path>
      <path d="M6.6 13.4 5.2 14.8a3 3 0 0 1-4.2-4.2l3-3a3 3 0 0 1 4.2 0"></path>
      <path d="m13.4 6.6 1.4-1.4a3 3 0 0 1 4.2 4.2l-3 3a3 3 0 0 1-4.2 0"></path>
    </svg>`;

  const addFriendIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="6.2" r="3"></circle>
      <path d="M2.7 16c.45-3.15 2.2-4.7 5.3-4.7 1.35 0 2.45.3 3.3.9"></path>
      <path d="M15 10.8v5.4M12.3 13.5h5.4"></path>
    </svg>`;

  const friendsTabIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="7" cy="7" r="2.8"></circle>
      <circle cx="14.3" cy="8" r="2.2"></circle>
      <path d="M1.8 16c.35-3.2 2.15-4.8 5.2-4.8s4.85 1.6 5.2 4.8"></path>
      <path d="M12 12.2c2.8-.3 4.55 1 5.1 3.8"></path>
    </svg>`;

  const requestsTabIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="7.2" cy="6.5" r="2.7"></circle>
      <path d="M2.2 15.8c.4-3 2.05-4.5 5-4.5 1.2 0 2.2.25 3 .75"></path>
      <path d="m12 13.4 1.7 1.7 3.6-4"></path>
    </svg>`;

  const pinsTabIcon = `
    <span class="wmeRcFriendsPinsTabGlyph" aria-hidden="true"></span>`;


  function makeSearchIcon() {
    const icon = document.createElement("span");
    icon.className = "wmeRcFriendsSearchIcon";
    icon.innerHTML = `
      <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
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
    document.querySelectorAll(`${ROOT_SELECTOR} :is(.wmeRcFriendsRowMenu,.wmeRcFriendsAccountMenu).is-open`).forEach((menu) => {
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
    profile.classList.add("wmeRcFriendsPremiumProfile");

    const person = profile.querySelector(".wmeRcFriendsPerson");
    const copy = profile.querySelector(".wmeRcFriendsRowCopy");
    const avatar = profile.querySelector(".wmeRcFriendsAvatar");
    const title = profile.querySelector(".wmeRcFriendsRowTitle");
    const connectedDot = profile.querySelector(".wmeRcFriendsProfileDot");

    if (connectedDot && avatar && !avatar.contains(connectedDot)) {
      connectedDot.remove();
      connectedDot.classList.add("wmeRcFriendsProfileAvatarDot");
      avatar.appendChild(connectedDot);
    }

    if (copy && !copy.querySelector(".wmeRcFriendsProfileSubtitle")) {
      const existingSub = copy.querySelector(".wmeRcFriendsRowSub");
      if (existingSub) existingSub.remove();
      if (profile.querySelector(".wmeRcFriendsProfileAvatarDot")) {
        const subtitle = document.createElement("div");
        subtitle.className = "wmeRcFriendsRowSub wmeRcFriendsProfileSubtitle";
        const icon = document.createElement("span");
        icon.className = "wmeRcFriendsProfileLinkIcon";
        icon.innerHTML = linkIcon;
        const label = document.createElement("span");
        label.textContent = "Connected WME editor";
        subtitle.appendChild(icon);
        subtitle.appendChild(label);
        copy.appendChild(subtitle);
      }
    }

    if (!person || profile.querySelector(".wmeRcFriendsAccountMenuWrap")) return;
    const username = String(title?.textContent || "").trim();
    const menuWrap = document.createElement("div");
    menuWrap.className = "wmeRcFriendsAccountMenuWrap";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "wmeRcFriendsAccountButton";
    button.setAttribute("aria-label", "Account actions");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = moreIcon;

    const menu = document.createElement("div");
    menu.className = "wmeRcFriendsAccountMenu";
    menu.appendChild(makeMenuItem("View WME profile", profileIcon, () => {
      if (!username) return;
      window.open(`https://www.waze.com/user/editor/${encodeURIComponent(username)}`, "_blank", "noopener,noreferrer");
    }));
    menu.appendChild(makeMenuItem("Copy username", copyIcon, async (item) => {
      await copyText(username);
      showCopiedFeedback(item);
    }));

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const opening = !menu.classList.contains("is-open");
      closeMenus(menu);
      menu.classList.toggle("is-open", opening);
      button.classList.toggle("is-open", opening);
      button.setAttribute("aria-expanded", opening ? "true" : "false");
    });

    menuWrap.appendChild(button);
    menuWrap.appendChild(menu);
    profile.appendChild(menuWrap);
  }

  function enhanceSearch(root) {
    const search = root.querySelector(
      ".wmeRcFriendsQuickSearch .wmeRcFriendsSearch"
    );
    if (!search) return;

    const searchCard = search.closest(".wmeRcFriendsQuickSearch");
    const input = search.querySelector(".wmeRcFriendsInput");
    if (input) {
      input.placeholder = "Search WME editor";
      input.setAttribute("aria-label", "Search WME editor");
      input.setAttribute("enterkeyhint", "search");
    }

    let icon = search.querySelector(".wmeRcFriendsSearchIcon");
    if (!icon) icon = makeSearchIcon();

    let field = search.querySelector(".wmeRcFriendsSearchField");
    if (!field) {
      field = document.createElement("div");
      field.className = "wmeRcFriendsSearchField";

      const button = search.querySelector(".wmeRcFriendsBtn");
      search.insertBefore(field, button || null);
      field.appendChild(icon);
      if (input) field.appendChild(input);
    } else {
      if (!field.contains(icon)) field.prepend(icon);
      if (input && !field.contains(input)) field.appendChild(input);
    }

    // Make the complete field reliably focus the input without tying focus to hover.
    if (field && input && field.dataset.wmeRcFocusProxyBound !== "true") {
      field.dataset.wmeRcFocusProxyBound = "true";
      field.addEventListener("pointerdown", (event) => {
        if (event.target === input) return;
        requestAnimationFrame(() => {
          if (!input.isConnected) return;
          try { input.focus({ preventScroll: true }); } catch { input.focus(); }
        });
      });
    }

    const button = search.querySelector(".wmeRcFriendsBtn");
    if (!button) return;

    button.classList.add("wmeRcFriendsAddFriendButton");
    const currentLabel = String(button.textContent || "").trim();
    const isSearching = /searching/i.test(currentLabel);
    const label =
      currentLabel === "Search" || currentLabel === "Add Friend"
        ? "Add Friend"
        : currentLabel;

    button.classList.toggle("is-searching", isSearching);
    button.setAttribute("aria-busy", isSearching ? "true" : "false");
    button.setAttribute(
      "title",
      isSearching ? "Searching for this editor…" : "Search for this WME editor"
    );

    let iconWrap = button.querySelector(".wmeRcFriendsAddFriendIcon");
    let copy = button.querySelector(".wmeRcFriendsAddFriendLabel");

    // Do not rebuild the button on every MutationObserver pass. Replacing its
    // children repeatedly could interrupt typing/focus in the adjacent input.
    if (!iconWrap || !copy) {
      iconWrap = document.createElement("span");
      iconWrap.className = "wmeRcFriendsAddFriendIcon";
      iconWrap.innerHTML = addFriendIcon;

      copy = document.createElement("span");
      copy.className = "wmeRcFriendsAddFriendLabel";
      copy.textContent = label;

      button.replaceChildren(iconWrap, copy);
    } else if (copy.textContent !== label) {
      copy.textContent = label;
    }

    const errorResult = searchCard?.querySelector(".wmeRcFriendsSearchResult.is-error");
    const anyResult = searchCard?.querySelector(".wmeRcFriendsSearchResult");
    field?.classList.toggle("is-error", !!errorResult);
    field?.classList.toggle("has-result", !!anyResult && !errorResult);
    input?.setAttribute("aria-invalid", errorResult ? "true" : "false");

    // Make a failed exact-name lookup explicit instead of leaving a vague state.
    if (errorResult) {
      const subtitle = errorResult.querySelector(".wmeRcFriendsRowSub");
      const title = String(errorResult.querySelector(".wmeRcFriendsRowTitle")?.textContent || "");
      if (
        subtitle &&
        /editor not available/i.test(title) &&
        !/exact WME username/i.test(String(subtitle.textContent || ""))
      ) {
        subtitle.textContent = "No editor was found with that exact WME username. Check the spelling and try again.";
      }
    }
  }

  function placeSearchInFriendsTab(root) {
    const searchCard = root.querySelector(".wmeRcFriendsQuickSearch");
    const segmented = root.querySelector(".wmeRcFriendsSegmented");
    const list = root.querySelector(".wmeRcFriendsHubList");
    if (!searchCard || !segmented || !list) return;

    const isFriendsTab = String(list.dataset.activeTab || "").toLowerCase() === "friends";
    const input = searchCard.querySelector(".wmeRcFriendsInput");
    const hadFocus = document.activeElement === input;
    const selectionStart = hadFocus ? input.selectionStart : null;
    const selectionEnd = hadFocus ? input.selectionEnd : null;
    const selectionDirection = hadFocus ? input.selectionDirection : null;

    // Keep Search + Add Friend directly below the Friends/Pins/Requests navbar,
    // but expose it only while the Friends tab is active.
    if (searchCard.previousElementSibling !== segmented) {
      segmented.insertAdjacentElement("afterend", searchCard);
    }

    searchCard.hidden = !isFriendsTab;
    searchCard.setAttribute("aria-hidden", isFriendsTab ? "false" : "true");
    searchCard.classList.toggle("is-friends-tab-visible", isFriendsTab);

    // Moving a focused input within the DOM should preserve focus, but browsers
    // and WME re-renders are not always consistent. Restore it explicitly.
    if (hadFocus && isFriendsTab && input?.isConnected) {
      requestAnimationFrame(() => {
        try {
          input.focus({ preventScroll: true });
          if (selectionStart != null && selectionEnd != null) {
            input.setSelectionRange(selectionStart, selectionEnd, selectionDirection || "none");
          }
        } catch {}
      });
    }
  }

  function enhanceSegments(root) {
    root.querySelectorAll(".wmeRcFriendsSegment").forEach((button) => {
      if (button.querySelector(".wmeRcFriendsSegmentIcon")) return;
      const label = String(button.querySelector(":scope > span:first-child")?.textContent || "").trim();
      const icon = document.createElement("span");
      icon.className = "wmeRcFriendsSegmentIcon";
      icon.innerHTML =
        label === "Requests"
          ? requestsTabIcon
          : (label === "Pins" ? pinsTabIcon : friendsTabIcon);
      button.insertBefore(icon, button.firstChild);
    });
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

  function enhanceFindMoreFriends(root) {
    // The search field already provides the add-friend flow, so keep the hub
    // compact and remove the redundant discovery card (including older renders).
    root.querySelectorAll(".wmeRcFriendsDiscoverCard").forEach((item) => item.remove());
  }

  function enhanceRoot(root) {
    if (!(root instanceof Element)) return;
    enhanceProfile(root);
    enhanceSearch(root);
    enhanceSegments(root);
    placeSearchInFriendsTab(root);
    enhanceFriendRows(root);
    enhanceFindMoreFriends(root);
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
      if (event.target?.closest?.(":is(.wmeRcFriendsRowMenuWrap,.wmeRcFriendsAccountMenuWrap)")) return;
      closeMenus();
    }, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
