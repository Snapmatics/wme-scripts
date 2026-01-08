/* global W */
/**
 * WME_EXTERNAL_MAIN
 * External script that is loaded by the Tampermonkey loader.
 * Host this file remotely (GitHub raw) and edit it whenever you want.
 */

(() => {
  'use strict';

  const SCRIPT_ID = 'wme-external-main';
  const VERSION = '1.0.0';

  if (window.__WME_EXTERNAL_MAIN_LOADED__) return;
  window.__WME_EXTERNAL_MAIN_LOADED__ = true;

  const log = (...a) => console.log('[WME External Main]', ...a);

  // -------- utils --------
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function waitFor(predicate, { timeoutMs = 60000, intervalMs = 250, name = 'condition' } = {}) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      try {
        if (predicate()) return true;
      } catch (_) {}
      await sleep(intervalMs);
    }
    throw new Error(`Timed out waiting for ${name}`);
  }

  async function copyToClipboard(text) {
    // Best-effort clipboard copy
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    }
  }

  function injectStyles() {
    if (document.getElementById(`${SCRIPT_ID}-style`)) return;

    const css = `
#${SCRIPT_ID} {
  position: fixed;
  top: 88px;
  right: 18px;
  width: 320px;
  z-index: 999999;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
#${SCRIPT_ID} .card {
  background: rgba(20, 20, 24, 0.78);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow: 0 18px 60px rgba(0,0,0,0.35);
  border-radius: 16px;
  overflow: hidden;
}
#${SCRIPT_ID} .hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.10);
}
#${SCRIPT_ID} .title {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
#${SCRIPT_ID} .title b { color: rgba(255,255,255,0.92); font-size: 13px; letter-spacing: 0.2px; }
#${SCRIPT_ID} .title span { color: rgba(255,255,255,0.55); font-size: 11px; }

#${SCRIPT_ID} .btnRow {
  display: flex;
  gap: 8px;
}
#${SCRIPT_ID} button {
  appearance: none;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.92);
  border-radius: 12px;
  padding: 8px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: transform .12s ease, background .12s ease, border-color .12s ease;
}
#${SCRIPT_ID} button:hover {
  transform: translateY(-1px);
  background: rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.22);
}
#${SCRIPT_ID} button:active { transform: translateY(0px) scale(0.98); }

#${SCRIPT_ID} .body {
  padding: 12px;
  display: grid;
  gap: 10px;
}
#${SCRIPT_ID} .mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  color: rgba(255,255,255,0.82);
  font-size: 12px;
  line-height: 1.35;
  padding: 10px 10px;
  border-radius: 12px;
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.10);
  white-space: pre-wrap;
}
#${SCRIPT_ID}.min .body { display: none; }
#${SCRIPT_ID} .pill {
  font-size: 11px;
  color: rgba(255,255,255,0.65);
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
}
    `.trim();

    const style = document.createElement('style');
    style.id = `${SCRIPT_ID}-style`;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildUI() {
    if (document.getElementById(SCRIPT_ID)) return;

    const root = document.createElement('div');
    root.id = SCRIPT_ID;

    root.innerHTML = `
      <div class="card">
        <div class="hdr">
          <div class="title">
            <b>WME External Panel</b>
            <span>v${VERSION}</span>
          </div>
          <div class="btnRow">
            <button id="${SCRIPT_ID}-min">—</button>
            <span class="pill" id="${SCRIPT_ID}-status">Ready</span>
          </div>
        </div>

        <div class="body">
          <div class="btnRow">
            <button id="${SCRIPT_ID}-coords">Copy center coords</button>
            <button id="${SCRIPT_ID}-plink">Copy permalink</button>
          </div>
          <div class="mono" id="${SCRIPT_ID}-out">Waiting for map…</div>
        </div>
      </div>
    `;

    document.body.appendChild(root);

    // drag handle (simple)
    let dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
    const hdr = root.querySelector('.hdr');
    hdr.style.cursor = 'grab';

    hdr.addEventListener('mousedown', (e) => {
      dragging = true;
      hdr.style.cursor = 'grabbing';
      sx = e.clientX; sy = e.clientY;
      const rect = root.getBoundingClientRect();
      ox = rect.left; oy = rect.top;
      e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      root.style.left = `${ox + dx}px`;
      root.style.top = `${oy + dy}px`;
      root.style.right = 'auto';
    });
    window.addEventListener('mouseup', () => {
      dragging = false;
      hdr.style.cursor = 'grab';
    });

    root.querySelector(`#${SCRIPT_ID}-min`).addEventListener('click', () => {
      root.classList.toggle('min');
    });
  }

  function setStatus(text) {
    const el = document.getElementById(`${SCRIPT_ID}-status`);
    if (el) el.textContent = text;
  }

  function setOut(text) {
    const el = document.getElementById(`${SCRIPT_ID}-out`);
    if (el) el.textContent = text;
  }

  function tryGetMap() {
    // WME internal map object is usually W.map (OpenLayers)
    if (window.W && W.map && typeof W.map.getCenter === 'function') return W.map;
    return null;
  }

  function getCenterAndZoom(map) {
    const c = map.getCenter();
    const z = map.getZoom?.() ?? null;

    // OpenLayers LonLat -> lon/lat
    const lon = c?.lon;
    const lat = c?.lat;

    return { lat, lon, zoom: z };
  }

  function makePermalink({ lat, lon, zoom }) {
    // This permalink pattern is common; WME sometimes uses different params, but this works as a baseline.
    // If WME changes, adjust here.
    const z = zoom ?? 5;
    return `${location.origin}${location.pathname}?zoomLevel=${encodeURIComponent(z)}&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
  }

  async function wireButtons() {
    const coordsBtn = document.getElementById(`${SCRIPT_ID}-coords`);
    const plinkBtn = document.getElementById(`${SCRIPT_ID}-plink`);

    coordsBtn?.addEventListener('click', async () => {
      const map = tryGetMap();
      if (!map) return setOut('Map not available yet.');

      const { lat, lon, zoom } = getCenterAndZoom(map);
      const text = `Center:\nlat: ${lat}\nlon: ${lon}\nzoom: ${zoom}`;
      const ok = await copyToClipboard(text);
      setStatus(ok ? 'Copied' : 'Copy failed');
      setOut(text);
    });

    plinkBtn?.addEventListener('click', async () => {
      const map = tryGetMap();
      if (!map) return setOut('Map not available yet.');

      const data = getCenterAndZoom(map);
      const link = makePermalink(data);
      const ok = await copyToClipboard(link);
      setStatus(ok ? 'Copied' : 'Copy failed');
      setOut(link);
    });
  }

  async function init() {
    injectStyles();
    buildUI();
    await wireButtons();

    setStatus('Loading…');
    setOut('Waiting for WME map object (W.map)…');

    await waitFor(() => !!tryGetMap(), { name: 'W.map' });

    const map = tryGetMap();
    const data = getCenterAndZoom(map);
    setStatus('Ready');
    setOut(`Map ready.\nlat: ${data.lat}\nlon: ${data.lon}\nzoom: ${data.zoom}`);

    log('Initialized OK');
  }

  init().catch((e) => {
    log('Init failed:', e);
    injectStyles();
    buildUI();
    setStatus('Error');
    setOut(`Init failed:\n${e?.message || e}`);
  });
})();
