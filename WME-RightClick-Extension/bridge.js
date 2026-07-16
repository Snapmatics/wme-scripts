(() => {
  "use strict";

  const GLOBAL_GUARD = "__WME_RIGHTCLICK_EXTENSION_BRIDGE_V1__";
  if (globalThis[GLOBAL_GUARD]) return;
  globalThis[GLOBAL_GUARD] = true;

  const CHANNEL = "wme-rightclick-extension";
  const REQUEST_EVENT = "wme-rightclick-extension:request";
  const RESPONSE_EVENT = "wme-rightclick-extension:response";
  let storageSnapshot = Object.create(null);
  let storageReady = false;
  let storageReadyResolve = null;
  const storageReadyPromise = new Promise((resolve) => { storageReadyResolve = resolve; });

  let contextInvalidated = false;

  function safeClone(value) {
    try { return structuredClone(value); } catch {}
    try { return JSON.parse(JSON.stringify(value)); } catch {}
    return value;
  }

  function isContextInvalidatedError(error) {
    const message = String(error?.message || error || "").toLowerCase();
    return (
      message.includes("extension context invalidated") ||
      message.includes("receiving end does not exist") ||
      message.includes("message port closed before a response was received")
    );
  }

  function extensionVersion() {
    try {
      if (!chrome?.runtime?.id) return "";
      return String(
        chrome.runtime.getManifest().version_name ||
        chrome.runtime.getManifest().version ||
        ""
      );
    } catch {
      return "";
    }
  }

  function emitContextInvalidated(error = null) {
    if (contextInvalidated) return;
    contextInvalidated = true;
    emit({
      kind: "bridge-disconnected",
      error: {
        name: "ExtensionContextInvalidatedError",
        code: "extension_context_invalidated",
        message:
          "The extension was reloaded while WME was open. Reload the WME tab to reconnect extension services.",
        originalMessage: String(error?.message || error || "")
      }
    });
  }

  function emit(payload) {
    const message = { channel: CHANNEL, ...payload };
    try {
      document.dispatchEvent(new CustomEvent(RESPONSE_EVENT, { detail: JSON.stringify(message) }));
    } catch {}
  }

  function parseEventDetail(event) {
    try {
      const detail = event?.detail;
      const payload = typeof detail === "string" ? JSON.parse(detail) : detail;
      if (!payload || payload.channel !== CHANNEL) return null;
      return payload;
    } catch {
      return null;
    }
  }

  async function initializeStorage() {
    try {
      storageSnapshot = await chrome.storage.local.get(null);
    } catch {
      storageSnapshot = Object.create(null);
    }
    storageReady = true;
    storageReadyResolve?.();
  }

  async function handleRequest(payload) {
    const kind = String(payload?.kind || "");
    const requestId = String(payload?.requestId || "");

    if (kind === "bootstrap") {
      if (!storageReady) await storageReadyPromise;
      emit({
        kind: "bootstrap",
        requestId,
        version: extensionVersion(),
        storage: safeClone(storageSnapshot)
      });
      return;
    }

    if (kind === "storage-set") {
      const key = String(payload.key || "");
      if (!key) return;
      const value = safeClone(payload.value);
      storageSnapshot[key] = value;
      try { await chrome.storage.local.set({ [key]: value }); } catch {}
      return;
    }

    if (kind === "storage-remove") {
      const key = String(payload.key || "");
      if (!key) return;
      delete storageSnapshot[key];
      try { await chrome.storage.local.remove(key); } catch {}
      return;
    }

    if (kind === "clipboard") {
      const text = String(payload.text ?? "");
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        try {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.left = "-10000px";
          textarea.style.top = "-10000px";
          (document.body || document.documentElement).appendChild(textarea);
          textarea.focus();
          textarea.select();
          ok = document.execCommand("copy");
          textarea.remove();
        } catch {}
      }
      emit({ kind: "clipboard-result", requestId, ok });
      return;
    }

    if (kind === "gm-xhr") {
      if (contextInvalidated) {
        emit({
          kind: "gm-xhr-result",
          requestId,
          result: {
            event: "error",
            error: {
              name: "ExtensionContextInvalidatedError",
              code: "extension_context_invalidated",
              message:
                "The extension was reloaded while WME was open. Reload the WME tab to reconnect extension services."
            }
          }
        });
        return;
      }

      try {
        const reply = await chrome.runtime.sendMessage({
          channel: CHANNEL,
          kind: "gm-xhr",
          requestId,
          options: payload.options || {}
        });
        emit({
          kind: "gm-xhr-result",
          requestId,
          result: reply?.result || {
            event: "error",
            error: { message: "No response from extension service worker." }
          }
        });
      } catch (error) {
        if (isContextInvalidatedError(error)) emitContextInvalidated(error);
        emit({
          kind: "gm-xhr-result",
          requestId,
          result: {
            event: "error",
            error: {
              name: String(error?.name || "Error"),
              code: isContextInvalidatedError(error)
                ? "extension_context_invalidated"
                : "extension_request_failed",
              message: isContextInvalidatedError(error)
                ? "The extension was reloaded while WME was open. Reload the WME tab to reconnect extension services."
                : String(error?.message || error || "Extension request failed.")
            }
          }
        });
      }
      return;
    }

    if (kind === "gm-xhr-abort") {
      try {
        await chrome.runtime.sendMessage({ channel: CHANNEL, kind: "gm-xhr-abort", requestId });
      } catch {}
    }
  }

  document.addEventListener(REQUEST_EVENT, (event) => {
    const payload = parseEventDetail(event);
    if (!payload) return;
    handleRequest(payload).catch(() => {});
  }, false);

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local") return;
    for (const [key, change] of Object.entries(changes || {})) {
      const hadOldValue = Object.prototype.hasOwnProperty.call(storageSnapshot, key);
      const oldValue = hadOldValue ? safeClone(storageSnapshot[key]) : undefined;
      if (Object.prototype.hasOwnProperty.call(change, "newValue")) {
        storageSnapshot[key] = safeClone(change.newValue);
      } else {
        delete storageSnapshot[key];
      }
      emit({
        kind: "storage-change",
        key,
        oldValue,
        newValue: Object.prototype.hasOwnProperty.call(change, "newValue") ? safeClone(change.newValue) : undefined
      });
    }
  });

  initializeStorage().then(() => {
    emit({ kind: "bridge-ready", version: extensionVersion() });
  });
})();
