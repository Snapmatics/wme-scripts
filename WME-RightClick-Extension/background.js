(() => {
  "use strict";

  const activeRequests = new Map();
  const ALLOWED_HOSTS = new Set([
    "w-tools.org",
    "update.greasyfork.org",
    "deployable-assets.editorx.dev",
    "accounts.google.com",
    "identitytoolkit.googleapis.com",
    "securetoken.googleapis.com",
    "firestore.googleapis.com",
    "www.googleapis.com"
  ]);

  function requestKey(sender, requestId) {
    const tabId = sender?.tab?.id ?? "extension";
    const frameId = sender?.frameId ?? 0;
    return `${tabId}:${frameId}:${String(requestId || "")}`;
  }

  function isAllowedUrl(rawUrl) {
    try {
      const url = new URL(String(rawUrl || ""));
      if (url.protocol !== "https:") return false;
      return ALLOWED_HOSTS.has(url.hostname) || url.hostname.endsWith(".googleapis.com");
    } catch {
      return false;
    }
  }

  function normalizeHeaders(rawHeaders) {
    const headers = new Headers();
    if (Array.isArray(rawHeaders)) {
      for (const pair of rawHeaders) {
        if (Array.isArray(pair) && pair.length >= 2) headers.set(String(pair[0]), String(pair[1]));
      }
      return headers;
    }
    if (rawHeaders && typeof rawHeaders === "object") {
      for (const [name, value] of Object.entries(rawHeaders)) {
        if (value != null) headers.set(String(name), String(value));
      }
    }
    return headers;
  }

  function responseHeadersToString(headers) {
    try {
      return Array.from(headers.entries()).map(([name, value]) => `${name}: ${value}`).join("\r\n");
    } catch {
      return "";
    }
  }

  function errorPayload(error, code = "network_error") {
    return {
      event: "error",
      error: {
        name: String(error?.name || "Error"),
        message: String(error?.message || error || "Network request failed."),
        code
      }
    };
  }

  async function performRequest(message, sender) {
    const requestId = String(message?.requestId || "");
    const options = message?.options && typeof message.options === "object" ? message.options : {};
    const url = String(options.url || "");

    if (!requestId) return errorPayload(new Error("Missing request ID."), "missing_request_id");
    if (!isAllowedUrl(url)) return errorPayload(new Error(`Blocked extension request: ${url}`), "host_not_allowed");

    const key = requestKey(sender, requestId);
    const controller = new AbortController();
    const state = { controller, abortReason: "" };
    activeRequests.set(key, state);

    const timeoutMs = Math.max(0, Number(options.timeout || 0));
    let timeoutHandle = null;
    if (timeoutMs > 0) {
      timeoutHandle = setTimeout(() => {
        state.abortReason = "timeout";
        try { controller.abort(); } catch {}
      }, timeoutMs);
    }

    try {
      const method = String(options.method || "GET").toUpperCase();
      const headers = normalizeHeaders(options.headers);
      const init = {
        method,
        headers,
        signal: controller.signal,
        redirect: "follow",
        credentials: options.anonymous === true ? "omit" : "include"
      };

      if (options.data != null && method !== "GET" && method !== "HEAD") {
        init.body = typeof options.data === "string" ? options.data : JSON.stringify(options.data);
      }

      const response = await fetch(url, init);
      const responseText = await response.text();
      let responseValue = responseText;
      if (String(options.responseType || "").toLowerCase() === "json") {
        try { responseValue = responseText ? JSON.parse(responseText) : null; } catch { responseValue = null; }
      }

      return {
        event: "load",
        response: {
          readyState: 4,
          status: response.status,
          statusText: response.statusText,
          responseHeaders: responseHeadersToString(response.headers),
          finalUrl: response.url || url,
          responseText,
          response: responseValue
        }
      };
    } catch (error) {
      if (controller.signal.aborted) {
        if (state.abortReason === "timeout") return { event: "timeout", response: null };
        return { event: "abort", response: null };
      }
      return errorPayload(error);
    } finally {
      if (timeoutHandle) clearTimeout(timeoutHandle);
      activeRequests.delete(key);
    }
  }

  function abortRequest(message, sender) {
    const key = requestKey(sender, message?.requestId);
    const state = activeRequests.get(key);
    if (!state) return false;
    state.abortReason = "abort";
    try { state.controller.abort(); } catch {}
    return true;
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.channel !== "wme-rightclick-extension") return undefined;

    if (message.kind === "gm-xhr-abort") {
      sendResponse({ ok: abortRequest(message, sender) });
      return undefined;
    }

    if (message.kind === "gm-xhr") {
      performRequest(message, sender)
        .then((result) => sendResponse({ ok: true, result }))
        .catch((error) => sendResponse({ ok: false, result: errorPayload(error) }));
      return true;
    }

    return undefined;
  });
})();
