// ==UserScript==
// @name         WME - JB Geometry
// @author       Fo_tis (4) / GreekCaptain (5)
// @version      0.1.1
// @description  Editable geometry builder for WME Junction Boxes
// @match        https://www.waze.com/editor*
// @match        https://www.waze.com/*/editor*
// @match        https://beta.waze.com/editor*
// @match        https://beta.waze.com/*/editor*
// @exclude      https://www.waze.com/user/editor/*
// @exclude      https://www.waze.com/user/editor*
// @exclude      *://*.waze.com/editor/sdk/*
// @exclude      *://*.waze.com/discuss*
// @exclude      https://www.waze.com/discuss/*
// @exclude      https://beta.waze.com/discuss/*
// @grant        GM_setClipboard
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @license      MIT
// @connect      w-tools.org
// @downloadURL https://update.greasyfork.org/scripts/579540/WME%20-%20JB%20Geometry.user.js
// @updateURL https://update.greasyfork.org/scripts/579540/WME%20-%20JB%20Geometry.user.js
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAOu0lEQVR42uWbe3Dc1XXHP+fe329XWtmSX2MGg3FIIAbbPFLz0BSDMMFDZ5h0SFMZMmloHQqEYkgAO7Wwp2uBbUQcsNO0BUMDmdCk1CqlydAUQmtb4IKnWE1JbVPApjFvHFvYenhfv3tP/9jfrnZlyZKFGAi5M6tZzdzfved7Ht9z7v2dhY9ipNWQVsNvxagE+okG3ay2DPAOPYtVejYAqsJGtZ8si1ZacrXexN2qtKmyWm+pmtf84QOXDxXobISF4gC4Sy8CViAsIKIAQEiIshVYxTJ5qsrNW8X/ZgAeCHSVnoNlOcIVCBAByXhuDrCxFJ6f41nFcnkWgI1q2YmONfCxA6wqrMTSKlHsunMwfAv4ChZDHqgBCr6biO+hmiGUbxKaKWSBEFDA8xieNlbI9g8DuIw50Dv1M4TcivKnWBLkgFog7zNYs4F6vsMN8hYAG3QKh7iFiBtJ0EAWSAAODzxCgbX8heyMPSdgJQ4R/YgAq5CuALpKT8DwDeDrhIwnG7tu5D2h2YCwfvMSeW3NcST/73OLUgBTX3g4u/oAmfl36nRS/Bk5fxOhSZKNvSEii/B9lHtpkdfKwFtxMDrgMiqgGzHlGE3rJGq5Cc9iEgxwT/ePiG27cL10HZpx4UORrT0b7xQUiacggbE+9/K4t5+75vnFeYePliHBH1WHAd0oG/CsY4W880GAHxvgjWrLQG/TOiZzA8LNhEwnCwRlAvpXhDUsk60CnN644MUwDM+M8llEBFVFARN/t2GSKIre3Lnt6ZMElFV6DoZlGL6EAIUy8H0of4Pwl7TI+/0y4UcKXEYUo+1VFk1Qw58gLCXgFHKAidnW8wyOVSyXp0uM/dktX5gUZA/vERhXXE4lDAMEIV8oICKqqoDxhUTNzFePf2Iv7fFebToPzwosl6GAi8OkwBvAOvbzAPdIXxl4M364GJdjsu6rXImhhYA5FOKnAyBiO7CGFnm8nJq2bDF0zI/OmDdvos8ndouRScYY3X+gS26/dTENDfUsW7mGyZMmqXNOgJw3OvOl5zfvpSkdcPFKX2bmNr0MWIFhHg7wZeC7gbtJ8QjfkNxIYJij17wqpPVE7tIfspv/JuRHEINNAMIOClxNlvNpkcdRFZrV0iqejvmu7CQVio2iiBNPmManZkwnivzgyu9oLYItlaPL5CmWyYU4/hDYTgLIA8opBDxIHy9yl/6QtJ4YyzwkrmBIwLMREE+o91DPQg7FsVTU7B5yrONd/pbvxZrdqBYRFzveENGh1KVSPPnvm0nV1pKqraHozkOMkms3q2UjHpHHSOvj1HA1whJCZpMDhJnUM5OIJMiVzB4N4Ao5yRDhUSz7KbCOLu5nrfRUEVkpxgeEjIsiKboDeO+pq0vx9KZn8KrU1aXwvt/K3nsZNMzaxSFVpPkD0voocA3CEpQTOIzETDJKl94Zb6zsQAlIElJgAy2ylm/TS1oDUBkCaFlZzpjCQCunUinG1dUdYV0vtlDKVoOO0l7F01WeFvlrPHeTIAQClLerZD8mwP32DSuiTEhrwAMExYLj6Ix43nm/V5+0dspAq3nvqyxbGkll8ty5lzYMS6YLxfEOtqj0KgzB6C3cD7IaVKtEvI0Ox/wzmpqSfZp73hUS/yXC+NiaUrJyhXVL4EKFZ7LW/fK0cz8/YdgscjxarvKGknVUgI/5tJQWSJuaPjNDrJklMKEytlSVMAxJJMKBLi0IDSYITgI+C2nT3Nw85vKN5YICaTOrfVcArd4abjDG4lXLMWyt5eChbq69+svctvh6DnV3Y62tiG8KgqgVvRFa/WuvvWZobrZjeaoLxhCwQqvu2kV+9vmfv1JEFjsXeanYQyry8OTJEwfmYQQC5wpqbPCVOY2XbO3ctul+OjvH1MLBMeFRLaaNdzoHpI+0nHnmc7XUcbLz7msicouq14Fx6IfPwwKC984bY++b3XjJ5wxscEn3yq6LLz5Ma2v/5JIM6qToqDJGgH1UDEEjYMUByoPnV6WaMxc8nnLdk/9T1Jxug0BcVOQSKRbKKBQEwqPlYVUiEWzpGe+d2iC4zjl3nWSDvbN+tqVxF7xb3rQkQ2gjTFxuajQGgGsCELDZbkxPX91p8y6fmBk3NajtfTVyUSQ2CFQzTFTkUwISFaJIpExSOVXWgi4SY09Q9aqqkkqlyukJUBERRXtVWS+wRKBOgXitAGSGiDnujHnzcoVczoTJpM+MOzWo7X01evngW+Pd+PG4ZD0kgg8CeAsAE17v8JPffJLw17+MBL3JRblrE117cSSABC5f5FdRTSpoUcBSvlULukhEpqn6snsPyMGiqhTZXK9T1RARKXpIaS31KnS4fMIbKe5ZkuEzHdckVWwUTZ4ZHJh2mb4PsGXlqE5L0tTUZA/0uWetoTFS68QYi5gh6+RBFxFDDHZ4mj/K3FgHg2zsUe+9xRnv9eUk2d/p7OzM9BPPyCwsgHY5N15NcnZkDag3xpjyAs65QZVnrS3fZjjniMlrRIxSmjtwjVihVcL3pzODEy8RIRg9tZdgKvCrOOXqKFhaC6LFUnD/+wfFe4+IMKGhHmPMEVbef6CLAXOOJYfKEGtUeeMgczSeU6g0yqhIS0GIq6PlS26iob6eTDbLAw//iN6+vjJoHcGc4S38wfaxI1Du8BaWol8IMKGhgYkTGjicySCmeB9VuqOKSWbYOcPH8Sj2kREU0cOQlgBaeT3jvdeDh7qltOlQLn3wUDdHmzMSKw+3xiBzNA6d/msiytl55BYuHt6TISKIGKZMnlRmvsFIS0RKcyqJbcSkVcrJg6xRxbgD9hHnPTH20Hsno3VpqS0UenJk9xjs2Q6rznkpOtRRlDRAEaXKaWTuXJw7iDKP8MaqOaoa4MS7aC/jwv1DpaSjnZa0Kb3ZdnZ2Ft4569afZqeciYJXrAPyWrzdypc+8f86iHs6r3pwpO7s1R+K1zpyqcH3zCvGKeJzk2by7hk3P7mro6OXpnQwFOAhLdzBxQAcmPkH2nXaFwkPvxuYnoPfPfm5G9cVaqYGYXZf5L0XY4waxwSQrWKkznt1pdLSGFvw3q9X9Dpj7LRSni3FZGVp6dUfAu4xyFJEA1VQxYkUjSLi53uRN52LjLWBL8mwt3HtV6OGqXcWaqeiGihcBRevhI7WUbJ0NkJTAfn64yF5/P4iIVTzQWNj474en+oSY8YFRgLnoli7WiOiLcWDli/H+eHDGbx66lIpVDUuLaUWpQVDrSqKqtogDFCPd75LMLtf2rbpvWrn9HDF2fsIY3EOD394GJ5CTayTSKHgQ8DQ/GgiftZA2kyfPj1vrT0XjZq8d48YY6W/OpIkIkniVyuHMxkuaDyXBfMv4nAmg+mnhAQitXFFpSYIjfrosQguda4wZ3KNOwBpU963JEPehURFd0A+0OFhkARZfI3hmdXs+03cSns7APvizzNzGi95zhh7n/fOVxKOMYbevsNccfllTJk8kZ/+7OeMq6uDMgGpatGyxvto+c5tm9aUtv/fONDKoySDWD2W+5CxveJpbrZz514X7ti26X7no+9bGxjV6ot5awz7u7p479f7B8mvOBuE4l30k53bNq1pamoKmj/WVzzt7a6zuRk608a7Leu9+K9VHhcj55jQUM+DP/gxYoSG+vFV6aU4V/Fe7y0Zo7293X1EVzwjHO3tHtAJQeOeHm/ewJjjUbUlAEW37kNVCaytzB2KELnI9RaShZcA39HRoWMt3kgu4qXqInWjWt45qospwLZt23KBkd+VQM9R1Z74PKulo10QBCWwGv+JwM8XXzhr99at7x+teKh6oykVsowgmkdyEV8o046jwEJxXIofQTOZvrht01vJzKHdUN2QIiJHHOgFVJO6Z+f2Z98YrAY+AmjpDYSSq4AZjd6lZ8faFeYAETmUBIto07fYySO0SnTEy/JBFNpnTK0ZAHZAHu6XNuNrj2qEZrXMQsv7rdarMHyTPAVCBGFaleyjjGEhRUAe8HyaJA9Ry42s0bWI/APgSKthF1J+vVlRLYbJpHf5CrCZDPMaz6OmJsm/bXmWVG1tGbS1QSndmSPfVQOt5Sa3LwB/TsAFFOInUkAWN3oL70RBhQK30U0OwwWEfDpucZhLyKO06WIi2lgh/zJAsEFdcqg8PMRh4cgmt9U6H0MLlgX4uKpOAnnepJvNRNwOKkXZjxVwSehW3gSuJq3jgEUYlhIyPe6im0fIE9ylT+NZzXLpKMdYezu0L3QVdwhVedh5NzAP9wvZlDbcuLKym++8uJvv95EYaA0A7xGxHmFDucmlKLOO5tayVA1Ux+kynUhD3L0TcFxVm5LyzzhWV3bRnbbhixNMT/ceI4zX+KX3uLoUYgw9Pb1F0KqqiC8kame+evMTeyssOgehBeGqchtTEnC8D9yH5bsslX1lJY9pU8vARrTVehyGW4DrCZlQ1UUn/BjH3SyXHXHb0itBEJzqCjkVEXHOoVDMw6rYICRyfv/sbU+f0A551ugpCEuBP8aSLAMt0IfwMFnW0iqvx25/TB16o2tMS1e1Gs7AshRhEQEpcmXgecE/pJH5zgUPJGp6pl3w95EkTheNvFT4sEpgrEa/qnn3F1e/cG3X64i/FTHXE1JXXiuigPB3KG3cLq+MBugHAFzh6pU9lnfo6YQsBb6KJSBHqZm0j6S5N/n2yw9/6Z7TDv7PGWfUZabMSgIke/bkz9q+vfefbugYlz31oi+T88sIzcRymBRZ5FHg27TIL47Fdcce8FAxfofOJeRbCAvLXXS1QJ59hKzjJP6KhdILwA5N8BRfp8BthJxEhspuvifwtLFc/qMMdAy6aseufXhgCmnTecAyhMvLXXQ1QN6/TcHdi5oMoSwhaU4mG2feYpPbZjx3lbv5Pnbtw4MBryxCVusCLCswXISLAzcRz40LEkIg4gVgNS3yk5Hk9I8P4IFlYEng1XoFhuVYziEf17wJAhw7EO4iw6O0ikdVWIgZpGr7DRnNauPOgSLDr9EltJV/5HE7aU0ccSj4RIxKMKv07PLPeD5xQAeL8arvKnzix0f4U7z/B1d3yh+rew1RAAAAAElFTkSuQmCC
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    if (/^\/(?:discuss|user\/editor)(?:\/|$)/.test(window.location.pathname || '')) return;

    const SCRIPT_ID = 'gr.wme.jb-pretty';
    const SCRIPT_NAME = 'WME - JB Geometry';
    const VERSION = '0.1.1';

    const GLOBAL_KEY = '__JB_PRETTY__';

    const prev = window[GLOBAL_KEY];
    if (prev?.cleanup) {
        try { prev.cleanup(); } catch (e) { }
    }

    const state = {
        version: VERSION,
        timers: new Set(),
        disposers: [],
        sdk: null,
        isReady: false,
    };

    function log(...args) {
        console.log(`[${SCRIPT_ID}]`, ...args);
    }

    function addDisposer(fn) {
        state.disposers.push(fn);
    }

    function setIntervalSafe(fn, ms) {
        const id = window.setInterval(fn, ms);
        state.timers.add(id);
        return id;
    }

    function clearTimers() {
        for (const id of state.timers) window.clearInterval(id);
        state.timers.clear();
    }
    function runCreateJbFlow() {
        refreshJbToolCache();

        const beforeIds = snapshotBigJunctionFeatureIds();

        createJbFromOverlay();
        refreshUiStatus();

        waitForCommittedBigJunction({ beforeIds }).then((newFt) => {
            try {
                const fixedGeom = DEBUG.byRole?.get('fixed')?.geometry;
                const committedGeom = newFt?.geometry;

                const sFixed = olGeomBoundsSig(fixedGeom);
                const sComm = olGeomBoundsSig(committedGeom);

                const okMatch = sigCloseEnough(sFixed, sComm);

                setUiStatus([
                    UI.statusEl?.textContent,
                    '',
                    `Committed: OK ✅ (${newFt?.id || 'n/a'})`,
                    `Match fixed→committed: ${okMatch ? '✅' : '⚠️'}`,
                ]);
            } catch (e) {}

            if (newFt?.geometry) {
                try { dbgRenderRole('committed', newFt.geometry); } catch (e) {}
                dbgRenderBBoxFor('committed', newFt.geometry);
                setUiStatus([ UI.statusEl?.textContent, '', `Committed: OK ✅ (${newFt.id})` ]);
            } else {
                setUiStatus([ UI.statusEl?.textContent, '', 'Committed: not detected (timeout) ⚠️' ]);
            }
        });
    }
    function getMapViewportCenterPx() {
        const div = getMapDiv();
        if (!div) return null;

        const rect = div.getBoundingClientRect();
        if (!rect || !Number.isFinite(rect.left) || !Number.isFinite(rect.top)) return null;

        return {
            div,
            rect,
            clientX: rect.left + rect.width / 2,
            clientY: rect.top + rect.height / 2,
        };
    }

    function dispatchMouseAtMapCenter(type = 'mousemove') {
        const info = getMapViewportCenterPx();
        if (!info) return false;

        const { div, clientX, clientY } = info;

        const evt = new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX,
            clientY,
            screenX: clientX,
            screenY: clientY,
            buttons: 0,
        });

        try { div.focus?.(); } catch (e) {}
        div.dispatchEvent(evt);
        return true;
    }

    function nudgeMouseToMapCenter() {
        const ok1 = dispatchMouseAtMapCenter('mouseenter');
        const ok2 = dispatchMouseAtMapCenter('mouseover');
        const ok3 = dispatchMouseAtMapCenter('mousemove');
        return !!(ok1 || ok2 || ok3);
    }
    let OL_MAP_CACHE = null;

    function getOlMap() {
        if (OL_MAP_CACHE) return OL_MAP_CACHE;

        let map = null;
        try { map = W?.map?.map || null; } catch (e) {}
        if (!map) { try { map = W?.map?.getOLMap?.() || null; } catch (e) {} }
        if (!map) { try { map = W?.map?.olMap || null; } catch (e) {} }
        if (!map) { try { map = W?.map || null; } catch (e) {} }

        if (map && (map.events || map.layers || map.controls || map.viewPortDiv || map.div)) {
            OL_MAP_CACHE = map;
        }
        return map;
    }

    function getMapDiv() {
        const olMap = getOlMap();
        return olMap?.viewPortDiv || olMap?.div || null;
    }

    const MAPEV = {
        moveOff: null,
        clickOff: null,
        dblclickOff: null,
        active: false,
    };

    function getMercFromMapEvent(evt) {
        const olMap = getOlMap();
        if (!olMap || !evt) return null;

        let px = null;

        if (evt.xy) {
            px = evt.xy;
        } else if (evt.clientX != null && evt.clientY != null) {
            const olMap = getOlMap();
            const div = olMap?.viewPortDiv || getMapDiv();
            if (!div) return null;

            const xy = OpenLayers?.Event?.xy?.(evt);
            if (xy) {
                const off = OpenLayers?.Element?.pagePosition?.(div);
                if (off) {
                    px = new OpenLayers.Pixel(xy.x - off[0], xy.y - off[1]);
                } else {
                    const rect = div.getBoundingClientRect();
                    px = new OpenLayers.Pixel(evt.clientX - rect.left, evt.clientY - rect.top);
                }
            } else {
                const rect = div.getBoundingClientRect();
                px = new OpenLayers.Pixel(evt.clientX - rect.left, evt.clientY - rect.top);
            }
        }

        if (!px) return null;

        let ll = null;
        try {
            if (typeof olMap.getLonLatFromViewPortPx === 'function') ll = olMap.getLonLatFromViewPortPx(px);
            else if (typeof olMap.getLonLatFromPixel === 'function') ll = olMap.getLonLatFromPixel(px);
        } catch (e) {}

        if (!ll) return null;
        return [ll.lon, ll.lat];
    }

    function mapEventsOff() {
        try { MAPEV.moveOff?.(); } catch (e) {}
        try { MAPEV.clickOff?.(); } catch (e) {}
        try { MAPEV.dblclickOff?.(); } catch (e) {}

        MAPEV.moveOff = null;
        MAPEV.clickOff = null;
        MAPEV.dblclickOff = null;
        MAPEV.active = false;
        try { MANUAL.pointerDown = null; } catch (e) {}
    }

    function manualGetPoint(rawPoint) {
        if (!Array.isArray(rawPoint) || rawPoint.length < 2) return null;

        let p = [rawPoint[0], rawPoint[1]];

        if (MANUAL.snapEnabled || readSettings().snapToGrid) {
            p = snapPointToGrid(p, MANUAL.snapStep);
        }

        return p;
    }

    function manualAddPoint(point) {
        const p = manualGetPoint(point);
        if (!p) return false;

        const pts = MANUAL.points;

        if (pts.length > 0) {
            const prev = pts[pts.length - 1];
            if (pointsTooClose(prev, p, MANUAL.minVertexDist)) {
                return false;
            }
        }

        pts.push(p);
        manualUpdatePreview();
        return true;
    }

    function manualFinish() {
        if (!MANUAL.active) return false;

        const pts = (MANUAL.points || []).slice();

        if (pts.length < 3) {
            uiSetStep('Manual finish failed: need at least 3 points');
            refreshUiStatus();
            return false;
        }

        const closed = ringClose(pts);
        const sani = ringSanitizeClosed(closed, {
            minDist: MANUAL.minVertexDist,
            maxPoints: SMOOTH.defaults.maxPoints,
        });

        if (!sani.ok || !sani.ring) {
            uiSetStep(`Manual finish failed: ${sani.reason}`);
            refreshUiStatus();
            return false;
        }

        const ok = overlaySetPolygonFromMercRing(sani.ring);

        if (!ok) {
            uiSetStep('Manual finish failed: apply-failed');
            refreshUiStatus();
            return false;
        }

        mapEventsOff();
        manualDomOff();
        manualCursorMarkerRemove();
        manualClearPreview();
        restoreNavigation();
        manualResetState();

        try { editorSetMapCursor(''); } catch (e) {}
        try { restoreNavigation(); } catch (e) {}
        try { safeReleaseAfterManualFinish('manual-finish'); } catch (e) {}

        uiSetStep('Manual overlay created ✔');
        refreshUiStatus();
        return true;
    }

    function manualCursorMarkerRemove() {
        try {
            if (EDITOR.manualCursorMarker) {
                EDITOR.manualCursorMarker.remove();
                EDITOR.manualCursorMarker = null;
            }
        } catch (e) {}
    }

    function manualCursorMarkerEnsure() {
        if (EDITOR.manualCursorMarker) return EDITOR.manualCursorMarker;
        const el = createEl('div', 'jbg-manual-cursor-marker');
        document.body.appendChild(el);
        EDITOR.manualCursorMarker = el;
        return el;
    }

    function manualCursorMarkerMove(evt) {
        if (!MANUAL.active || !evt || !Number.isFinite(evt.clientX) || !Number.isFinite(evt.clientY)) return;
        const el = manualCursorMarkerEnsure();
        el.style.left = `${evt.clientX}px`;
        el.style.top = `${evt.clientY}px`;
    }

    function manualCancel(reason = 'manual-cancel') {
        try { mapEventsOff(); } catch (e) {}
        try { manualDomOff(); } catch (e) {}
        try { manualCursorMarkerRemove(); } catch (e) {}
        try { manualClearPreview(); } catch (e) {}
        try { restoreNavigation(); } catch (e) {}
        manualResetState();

        try { editorSetMapCursor(''); } catch (e) {}
        try { restoreNavigation(); } catch (e) {}
        try { safeReleaseAfterManualFinish('manual-cancel'); } catch (e) {}

        log('Manual: cancelled', reason);
        return true;
    }


    function manualDomOff() {
        try { MANUAL.domOff?.(); } catch (e) {}
        MANUAL.domOff = null;
    }

    function manualEventPixel(evt) {
        if (!evt) return null;
        try {
            if (evt.xy && Number.isFinite(evt.xy.x) && Number.isFinite(evt.xy.y)) return { x: evt.xy.x, y: evt.xy.y };
        } catch (e) {}
        if (Number.isFinite(evt.clientX) && Number.isFinite(evt.clientY)) return { x: evt.clientX, y: evt.clientY };
        return null;
    }

    function manualMaybeFinishFromSecondClick(p, evt) {
        if (!MANUAL.active || !Array.isArray(MANUAL.points) || MANUAL.points.length < 3) return false;

        const now = Date.now();
        const px = manualEventPixel(evt);
        const last = MANUAL.lastClick;
        MANUAL.lastClick = { t: now, px, p };

        if (!last || !last.p) return false;

        const dt = now - last.t;
        let closePx = true;
        if (px && last.px) closePx = Math.hypot(px.x - last.px.x, px.y - last.px.y) <= 10;
        const closeMerc = dist2(p, last.p) <= Math.max(4, MANUAL.minVertexDist * MANUAL.minVertexDist * 16);

        if (dt <= 450 && (closePx || closeMerc)) {
            MANUAL.suppressNextClick = true;
            try { evt?.preventDefault?.(); } catch (e) {}
            try { evt?.stopPropagation?.(); } catch (e) {}
            return manualFinish();
        }

        return false;
    }

    function manualAddPointFromInput(p, evt, source = 'click') {
        if (!MANUAL.active) return false;

        if (MANUAL.suppressNextClick) {
            MANUAL.suppressNextClick = false;
            return false;
        }

        if (manualMaybeFinishFromSecondClick(p, evt)) return true;

        const added = manualAddPoint(p);
        if (!added) return false;

        MANUAL.lastManualAddAt = Date.now();
        uiSetStep(`Manual: ${MANUAL.points.length} point(s). Double-click or Enter to finish.`);
        refreshUiStatus();

        return true;
    }

    function manualDomOn() {
        manualDomOff();
        const div = getMapDiv();
        if (!div) return false;

        const onDbl = (evt) => {
            if (!MANUAL.active) return;
            const p = getMercFromMapEvent(evt);
            if (!p) return;
            MANUAL.suppressNextClick = true;
            try { evt.preventDefault(); } catch (e) {}
            try { evt.stopPropagation(); } catch (e) {}
            try { evt.stopImmediatePropagation?.(); } catch (e) {}
            manualFinish();
            try { safeReleaseAfterManualFinish('dom-dblclick'); } catch (e) {}
        };

        const onKey = (evt) => {
            if (!MANUAL.active) return;
            const tag = String(document.activeElement?.tagName || '').toLowerCase();
            if (tag === 'input' || tag === 'textarea' || document.activeElement?.isContentEditable) return;

            if (evt.key === 'Enter') {
                try { evt.preventDefault(); } catch (e) {}
                manualFinish();
            } else if (evt.key === 'Escape') {
                try { evt.preventDefault(); } catch (e) {}
                manualCancel('esc');
                uiSetStep('Manual drawing cancelled.');
                refreshUiStatus();
            } else if ((evt.key === 'Backspace' || evt.key === 'Delete') && MANUAL.points.length) {
                try { evt.preventDefault(); } catch (e) {}
                MANUAL.points.pop();
                manualUpdatePreview();
                uiSetStep(`Manual: ${MANUAL.points.length} point(s). Enter or double-click to finish.`);
                refreshUiStatus();
            }
        };

        const onPointerDown = (evt) => {
            if (!MANUAL.active) return;
            if (evt.button != null && evt.button !== 0) return;
            MANUAL.pointerDown = {
                t: Date.now(),
                x: Number(evt.clientX),
                y: Number(evt.clientY),
            };
        };

        const onPointerUp = (evt) => {
            if (!MANUAL.active) return;
            if (evt.button != null && evt.button !== 0) return;

            const down = MANUAL.pointerDown;
            MANUAL.pointerDown = null;

            if (!down || !Number.isFinite(down.x) || !Number.isFinite(down.y)) return;

            const dx = Number(evt.clientX) - down.x;
            const dy = Number(evt.clientY) - down.y;
            const dist = Math.hypot(dx, dy);
            const dt = Date.now() - down.t;

            if (dist > 16 || dt > 1000) return;
            if (Date.now() - Number(MANUAL.lastManualAddAt || 0) < 120) return;

            const p = getMercFromMapEvent(evt);
            if (!p) return;

            manualAddPointFromInput(p, evt, 'mouseup-fallback');
        };

        div.addEventListener('mousedown', onPointerDown, true);
        div.addEventListener('mouseup', onPointerUp, true);
        document.addEventListener('mousedown', onPointerDown, true);
        document.addEventListener('mouseup', onPointerUp, true);
        div.addEventListener('dblclick', onDbl, true);
        window.addEventListener('keydown', onKey, true);

        MANUAL.domOff = () => {
            try { div.removeEventListener('mousedown', onPointerDown, true); } catch (e) {}
            try { div.removeEventListener('mouseup', onPointerUp, true); } catch (e) {}
            try { document.removeEventListener('mousedown', onPointerDown, true); } catch (e) {}
            try { document.removeEventListener('mouseup', onPointerUp, true); } catch (e) {}
            try { div.removeEventListener('dblclick', onDbl, true); } catch (e) {}
            try { window.removeEventListener('keydown', onKey, true); } catch (e) {}
        };

        return true;
    }


    function manualStart() {
        try { transformStop('manual-start'); } catch (e) {}
        try { cancelInput('manual-start'); } catch (e) {}
        try { overlayDisableTools(); } catch (e) {}

        manualResetState();
        MANUAL.active = true;
        manualCursorMarkerEnsure();

        MANUAL.prevNavActive = null;
        CTRL.prevNavActive = true;

        if (!manualEnsurePreviewFeatures()) {
            uiSetStep('Manual draw: preview init failed');
            refreshUiStatus();
            manualCancel('preview-init-failed');
            return false;
        }

        manualDomOn();

        mapOnClick((p, evt) => {
            if (!MANUAL.active) return;
            if (Date.now() - Number(MANUAL.lastManualAddAt || 0) < 120) return;
            manualAddPointFromInput(p, evt, 'ol-click');
        });

        mapOnMove((p, evt) => {
            if (!MANUAL.active) return;
            manualCursorMarkerMove(evt);
            if (!MANUAL.points.length) return;

            const live = manualGetPoint(p);
            if (!live) return;

            manualUpdatePreview(live);
        });

        mapOnDblClick((p, evt) => {
            if (!MANUAL.active) return;

            MANUAL.suppressNextClick = true;

            try { evt?.preventDefault?.(); } catch (e) {}
            try { evt?.stopPropagation?.(); } catch (e) {}
            try { evt?.stopImmediatePropagation?.(); } catch (e) {}

            manualFinish();
            try { safeReleaseAfterManualFinish('ol-dblclick'); } catch (e) {}
        });

        uiSetStep('Manual: Click to add points. Pan/zoom normally. Double-click or Enter to finish.');
        refreshUiStatus();
        return true;
    }

    function mapOnDblClick(fn) {
        const olMap = getOlMap();
        if (!olMap?.events?.register) return false;

        const handler = (evt) => {
            const p = getMercFromMapEvent(evt);
            if (p) fn(p, evt);
        };

        olMap.events.register('dblclick', olMap, handler);
        MAPEV.dblclickOff = () => {
            try { olMap.events.unregister('dblclick', olMap, handler); } catch (e) {}
        };
        MAPEV.active = true;
        return true;
    }

    function mapOnMove(fn) {
        const olMap = getOlMap();
        if (!olMap?.events?.register) return false;

        const handler = (evt) => {
            const p = getMercFromMapEvent(evt);
            if (p) fn(p, evt);
        };

        olMap.events.register('mousemove', olMap, handler);
        MAPEV.moveOff = () => {
            try { olMap.events.unregister('mousemove', olMap, handler); } catch (e) {}
        };
        MAPEV.active = true;
        return true;
    }

    function mapOnClick(fn) {
        const olMap = getOlMap();
        if (!olMap?.events?.register) return false;

        const handler = (evt) => {
            const p = getMercFromMapEvent(evt);
            if (p) fn(p, evt);
        };

        olMap.events.register('click', olMap, handler);
        MAPEV.clickOff = () => {
            try { olMap.events.unregister('click', olMap, handler); } catch (e) {}
        };
        MAPEV.active = true;
        return true;
    }

    function snapPointToGrid(point, step = 1) {
        if (!Array.isArray(point) || point.length < 2) return point;
        if (!Number.isFinite(step) || step <= 0) return point;

        return [
            Math.round(point[0] / step) * step,
            Math.round(point[1] / step) * step,
        ];
    }

    function pointsTooClose(a, b, minDist = 0.5) {
        if (!a || !b) return false;
        return dist2(a, b) <= (minDist * minDist);
    }

    function manualResetState() {
        MANUAL.active = false;
        MANUAL.points = [];
        MANUAL.prevNavActive = null;
        MANUAL.suppressNextClick = false;
        MANUAL.lastClick = null;
        MANUAL.pointerDown = null;
        MANUAL.lastManualAddAt = 0;
    }

    function manualClearPreview() {
        const layer = INPUT.layer;
        const toRemove = [];

        if (MANUAL.previewLine) toRemove.push(MANUAL.previewLine);
        if (MANUAL.previewPoly) toRemove.push(MANUAL.previewPoly);

        if (layer && toRemove.length) {
            try { layer.removeFeatures(toRemove); } catch (e) {}
        }

        MANUAL.previewLine = null;
        MANUAL.previewPoly = null;

        try { layer?.redraw?.(true); } catch (e) {}
    }

    function manualEnsurePreviewFeatures() {
        const layer = ensureInputLayer();
        if (!layer || !window.OpenLayers) return false;

        if (!MANUAL.previewLine) {
            const ls = new OpenLayers.Geometry.LineString([
                new OpenLayers.Geometry.Point(0, 0),
                new OpenLayers.Geometry.Point(0, 0),
            ]);

            MANUAL.previewLine = new OpenLayers.Feature.Vector(
                ls,
                { role: 'manual-preview-line' },
                {
                    strokeColor: '#00E5FF',
                    strokeWidth: 3,
                    strokeOpacity: 1,
                    strokeDashstyle: 'dash',
                    strokeLinecap: 'round',
                }
            );

            try { layer.addFeatures([MANUAL.previewLine]); } catch (e) {}
        }

        if (!MANUAL.previewPoly) {
            const ring = new OpenLayers.Geometry.LinearRing([
                new OpenLayers.Geometry.Point(0, 0),
                new OpenLayers.Geometry.Point(0, 0),
                new OpenLayers.Geometry.Point(0, 0),
                new OpenLayers.Geometry.Point(0, 0),
            ]);

            const poly = new OpenLayers.Geometry.Polygon([ring]);

            MANUAL.previewPoly = new OpenLayers.Feature.Vector(
                poly,
                { role: 'manual-preview-poly' },
                {
                    strokeColor: '#E6E6E6',
                    strokeWidth: 3,
                    strokeOpacity: 0.95,
                    fillOpacity: 0.18,
                }
            );

            try { layer.addFeatures([MANUAL.previewPoly]); } catch (e) {}
        }

        return true;
    }


    function manualUpdatePreview(cursorPoint = null) {
        const layer = ensureInputLayer();
        if (!layer) return false;
        if (!manualEnsurePreviewFeatures()) return false;

        const pts = MANUAL.points || [];
        const lineFt = MANUAL.previewLine;
        const polyFt = MANUAL.previewPoly;

        if (pts.length === 0) {
            manualClearPreview();
            manualEnsurePreviewFeatures();
            return true;
        }

        const livePts = cursorPoint ? pts.concat([cursorPoint]) : pts.slice();

        if (livePts.length >= 2) {
            lineFt.geometry.components = livePts.map(
                ([x, y]) => new OpenLayers.Geometry.Point(x, y)
            );
            lineFt.geometry.calculateBounds?.();
            try { layer.drawFeature(lineFt); } catch (e) {}
        } else if (livePts.length === 1) {
            const [x, y] = livePts[0];
            lineFt.geometry.components = [
                new OpenLayers.Geometry.Point(x, y),
                new OpenLayers.Geometry.Point(x, y),
            ];
            lineFt.geometry.calculateBounds?.();
            try { layer.drawFeature(lineFt); } catch (e) {}
        }

        if (livePts.length >= 3) {
            const ringPts = livePts.map(
                ([x, y]) => new OpenLayers.Geometry.Point(x, y)
            );

            const first = livePts[0];
            ringPts.push(new OpenLayers.Geometry.Point(first[0], first[1]));

            polyFt.geometry.components = [
                new OpenLayers.Geometry.LinearRing(ringPts)
            ];
            polyFt.geometry.calculateBounds?.();
            try { layer.drawFeature(polyFt); } catch (e) {}
        } else {
            const p = livePts[0] || [0, 0];
            polyFt.geometry.components = [
                new OpenLayers.Geometry.LinearRing([
                    new OpenLayers.Geometry.Point(p[0], p[1]),
                    new OpenLayers.Geometry.Point(p[0], p[1]),
                    new OpenLayers.Geometry.Point(p[0], p[1]),
                    new OpenLayers.Geometry.Point(p[0], p[1]),
                ])
            ];
            polyFt.geometry.calculateBounds?.();
            try { layer.drawFeature(polyFt); } catch (e) {}
        }

        try { layer.redraw?.(); } catch (e) {}
        return true;
    }



    const INPUT = {
        layer: null,
        ctrlPath: null,
        ctrlPoint: null,
        current: null,
    };

    const CTRL = {
        active: null,
        prevNavActive: null,
    };


    const MANUAL = {
        active: false,
        points: [],
        snapEnabled: false,
        snapStep: 1,
        minVertexDist: 0.5,
        previewLine: null,
        previewPoly: null,
        prevNavActive: null,
        suppressNextClick: false,
        domOff: null,
        lastClick: null,
        pointerDown: null,
        lastManualAddAt: 0,
    };

    const RUBBER = {
        ft: null,
        a: null,
        enabled: false,
    };

    function ensureInputLayer() {
        if (INPUT.layer) return INPUT.layer;
        if (!window.OpenLayers) { log('INPUT: OpenLayers missing'); return null; }

        const olMap = getOlMap();
        if (!olMap) { log('INPUT: OL map missing'); return null; }

        const layer = new OpenLayers.Layer.Vector('JB Input', {
            displayInLayerSwitcher: false,
        });

        try { olMap.addLayer(layer); } catch (e) {
            try { W?.map?.addLayer?.(layer); } catch (_) {}
            try { layer.setZIndex?.(99999); } catch (e2) {}
        }

        INPUT.layer = layer;
        log('INPUT: layer added');
        return layer;
    }

    function clearInputLayer() {
        try { INPUT.layer?.removeAllFeatures?.(); } catch (e) {}
    }

    function findNavControl() {
        const olMap = getOlMap();
        const ctrls = olMap?.controls || [];
        return ctrls.find(c => c?.CLASS_NAME === 'OpenLayers.Control.Navigation') || null;
    }

    function safeDeactivateAllOurControls() {
        try { INPUT.ctrlPath?.deactivate?.(); } catch (e) {}
        CTRL.active = null;
    }

    function restoreNavigation() {
        const activate = () => {
            const nav = findNavControl();
            if (!nav) return;
            try { if (!nav.active) nav.activate(); } catch (e) {}
        };

        activate();
        CTRL.prevNavActive = null;

        try { setTimeoutSafe(activate, 60); } catch (e) { try { window.setTimeout(activate, 60); } catch (_) {} }
        try { setTimeoutSafe(activate, 220); } catch (e) { try { window.setTimeout(activate, 220); } catch (_) {} }
    }

    function safeReleaseAfterManualFinish(reason = 'manual-finish') {
        const activate = () => {
            try { editorSetMapCursor(''); } catch (e) {}
            try {
                const nav = findNavControl();
                if (nav && !nav.active) nav.activate();
            } catch (e) {}
            try {
                const olMap = getOlMap();
                for (const c of (olMap?.controls || [])) {
                    const h = c?.handler || c?.handlers?.drag || c?.dragPan?.handler;
                    if (!h || typeof h !== 'object') continue;
                    try { h.dragging = false; } catch (e) {}
                    try { h.started = false; } catch (e) {}
                    try { h.evt = null; } catch (e) {}
                }
            } catch (e) {}
        };

        activate();
        try { setTimeoutSafe(activate, 80); } catch (e) { try { window.setTimeout(activate, 80); } catch (_) {} }
        try { setTimeoutSafe(activate, 260); } catch (e) { try { window.setTimeout(activate, 260); } catch (_) {} }
        log('Manual safe release:', reason);
    }

    function rubberEnsureFeature() {
        const layer = ensureInputLayer();
        if (!layer || !window.OpenLayers) return null;

        if (RUBBER.ft) return RUBBER.ft;

        const ls = new OpenLayers.Geometry.LineString([
            new OpenLayers.Geometry.Point(0, 0),
            new OpenLayers.Geometry.Point(0, 0),
        ]);

        const style = {
            strokeColor: '#00E5FF',
            strokeWidth: 4,
            strokeOpacity: 1,
            strokeDashstyle: 'dash',
            strokeLinecap: 'round',
        };

        RUBBER.ft = new OpenLayers.Feature.Vector(ls, { role: 'rubber' }, style);
        layer.addFeatures([RUBBER.ft]);
        return RUBBER.ft;
    }

    function rubberStart(a) {
        RUBBER.a = a;
        RUBBER.enabled = true;
        const ft = rubberEnsureFeature();
        if (!ft) return;

        const g = ft.geometry;
        g.components[0].x = a[0]; g.components[0].y = a[1];
        g.components[1].x = a[0]; g.components[1].y = a[1];
        g.calculateBounds?.();

        try { INPUT.layer.drawFeature(ft); } catch (e) {}
        try { INPUT.layer.redraw?.(true); } catch (e) {}
    }

    function rubberUpdate(b) {
        if (!RUBBER.enabled || !RUBBER.a || !RUBBER.ft) return;

        const ft = RUBBER.ft;
        const g = ft.geometry;

        g.components[0].x = RUBBER.a[0]; g.components[0].y = RUBBER.a[1];
        g.components[1].x = b[0];        g.components[1].y = b[1];
        g.calculateBounds?.();

        try { INPUT.layer.drawFeature(ft); } catch (e) {}
    }

    function rubberStop() {
        RUBBER.enabled = false;
        RUBBER.a = null;
        if (!RUBBER.ft) return;
        try { INPUT.layer.removeFeatures([RUBBER.ft]); } catch (e) {}
        RUBBER.ft = null;
        try { INPUT.layer.redraw?.(true); } catch (e) {}
    }

    function cancelInputBase(reason = 'cancel') {
        safeDeactivateAllOurControls();
        clearInputLayer();
        INPUT.current = null;
        restoreNavigation();
        try { rubberStop(); } catch (e) {}
        log('INPUT: cancelled', reason);
    }

    function cancelInput(reason = 'cancel') {
        try { mapEventsOff(); } catch (e) {}
        try { rubberStop(); } catch (e) {}
        return cancelInputBase(reason);
    }

    addDisposer(() => {
        try { manualCancel('dispose'); } catch (e) {}
    });
    addDisposer(() => {
        try { manualClearPreview(); } catch (e) {}
        try { manualResetState(); } catch (e) {}
    });

    addDisposer(() => {
        try { cancelInput('dispose'); } catch (e) {}
        try {
            const olMap = getOlMap();
            if (olMap && INPUT.ctrlPath) olMap.removeControl?.(INPUT.ctrlPath);
        } catch (e) {}
        try {
            const olMap = getOlMap();
            if (olMap && INPUT.layer) olMap.removeLayer?.(INPUT.layer);
        } catch (e) {}
        try {
            const olMap = getOlMap();
            if (olMap && INPUT.ctrlPoint) olMap.removeControl?.(INPUT.ctrlPoint);
        } catch (e) {}
        try { rubberStop(); } catch (e) {}
        INPUT.ctrlPoint = null;
        INPUT.layer = null;
        INPUT.ctrlPath = null;
        INPUT.current = null;
    });


    const RECT = {
        center: null,
        lenLine: null,
        widthLine: null,
    };

    function vecSub(a, b) { return [a[0] - b[0], a[1] - b[1]]; }
    function vecAdd(a, b) { return [a[0] + b[0], a[1] + b[1]]; }
    function vecScale(v, s) { return [v[0] * s, v[1] * s]; }
    function vecLen(v) { return Math.hypot(v[0], v[1]); }

    function vecNormalize(v) {
        const len = vecLen(v);
        if (!len) return [0, 0];
        return [v[0] / len, v[1] / len];
    }

    function vecPerp(v) {
        return [-v[1], v[0]];
    }

    function buildRectangleCenteredFromLenWidth(center, lenLine, widthLine) {
        const [A, B] = lenLine;
        const [C, D] = widthLine;

        const axis = vecNormalize(vecSub(B, A));
        const halfLength = vecLen(vecSub(B, A)) / 2;
        const halfWidth = vecLen(vecSub(D, C)) / 2;

        const u = axis;
        const v = vecPerp(u);
        const O = center;

        const p1 = vecAdd(O, vecAdd(vecScale(u, halfLength), vecScale(v, halfWidth)));
        const p2 = vecAdd(O, vecAdd(vecScale(u, halfLength), vecScale(v, -halfWidth)));
        const p3 = vecAdd(O, vecAdd(vecScale(u, -halfLength), vecScale(v, -halfWidth)));
        const p4 = vecAdd(O, vecAdd(vecScale(u, -halfLength), vecScale(v, halfWidth)));

        return [p1, p2, p3, p4, p1];
    }

    function buildRectangleFromCenterCorner(center, corner) {
        const halfWidth = Math.abs(corner[0] - center[0]);
        const halfHeight = Math.abs(corner[1] - center[1]);

        const p1 = [center[0] + halfWidth, center[1] + halfHeight];
        const p2 = [center[0] + halfWidth, center[1] - halfHeight];
        const p3 = [center[0] - halfWidth, center[1] - halfHeight];
        const p4 = [center[0] - halfWidth, center[1] + halfHeight];

        return [p1, p2, p3, p4, p1];
    }

    function buildAxisRectangleFromCenterSize(center, width, height) {
        const cx = center[0];
        const cy = center[1];
        const hw = Math.max(1, Number(width || 0)) / 2;
        const hh = Math.max(1, Number(height || 0)) / 2;
        return [
            [cx + hw, cy + hh],
            [cx + hw, cy - hh],
            [cx - hw, cy - hh],
            [cx - hw, cy + hh],
            [cx + hw, cy + hh],
        ];
    }

    function normalizeRectangleSize(width, height) {
        let w = Math.max(40, Number(width || 0));
        let h = Math.max(24, Number(height || 0));
        const ratio = 1.85;
        const horizontal = w >= h;
        const longSide = Math.max(w, h);
        const shortSide = Math.max(24, Math.min(w, h, longSide / ratio));
        if (horizontal) return { width: longSide, height: shortSide };
        return { width: shortSide, height: longSide };
    }


    const OVERLAY = {
        layer: null,
        drawCtrl: null,
        feature: null,
    };

    function ensureOverlayLayer() {
        if (OVERLAY.layer) return OVERLAY.layer;
        if (!window.OpenLayers) { log('Overlay: OpenLayers missing'); return null; }

        const olMap = getOlMap();
        if (!olMap) { log('Overlay: OL map missing'); return null; }

        const layer = new OpenLayers.Layer.Vector('JB Overlay', {
            displayInLayerSwitcher: false,
        });

        olMap.addLayer(layer);
        try { layer.setZIndex?.(90000); } catch (e) {}
        OVERLAY.layer = layer;
        log('Overlay: layer added');
        return layer;
    }

    function lineSegmentIntersectionParam(p, r, a, b) {
        const s = [b[0] - a[0], b[1] - a[1]];
        const den = r[0] * s[1] - r[1] * s[0];
        if (Math.abs(den) < 1e-9) return null;

        const qmp = [a[0] - p[0], a[1] - p[1]];
        const t = (qmp[0] * s[1] - qmp[1] * s[0]) / den;
        const u = (qmp[0] * r[1] - qmp[1] * r[0]) / den;

        if (u < -1e-8 || u > 1 + 1e-8) return null;
        return Number.isFinite(t) ? t : null;
    }

    function hatchSegmentsInsideRing(openRing, spacing, angleRad) {
        const pts = ringIsClosed(openRing) ? openRing.slice(0, -1) : (openRing || []);
        if (!pts || pts.length < 3) return [];

        const dir = [Math.cos(angleRad), Math.sin(angleRad)];
        const normal = [-dir[1], dir[0]];

        let minN = Infinity, maxN = -Infinity;
        let minD = Infinity, maxD = -Infinity;

        for (const p of pts) {
            const n = p[0] * normal[0] + p[1] * normal[1];
            const d = p[0] * dir[0] + p[1] * dir[1];
            minN = Math.min(minN, n);
            maxN = Math.max(maxN, n);
            minD = Math.min(minD, d);
            maxD = Math.max(maxD, d);
        }

        const pad = Math.max(10, spacing * 2);
        const segments = [];

        for (let k = Math.floor((minN - pad) / spacing) * spacing; k <= maxN + pad; k += spacing) {
            const centerD = (minD + maxD) / 2;
            const origin = [
                dir[0] * centerD + normal[0] * k,
                dir[1] * centerD + normal[1] * k,
            ];

            const ts = [];
            for (let i = 0; i < pts.length; i++) {
                const a = pts[i];
                const b = pts[(i + 1) % pts.length];
                const t = lineSegmentIntersectionParam(origin, dir, a, b);
                if (t == null) continue;
                if (!ts.some(v => Math.abs(v - t) < 1e-6)) ts.push(t);
            }

            ts.sort((a, b) => a - b);
            for (let i = 0; i + 1 < ts.length; i += 2) {
                const t1 = ts[i];
                const t2 = ts[i + 1];
                if (!Number.isFinite(t1) || !Number.isFinite(t2) || Math.abs(t2 - t1) < 0.5) continue;

                segments.push([
                    [origin[0] + dir[0] * t1, origin[1] + dir[1] * t1],
                    [origin[0] + dir[0] * t2, origin[1] + dir[1] * t2],
                ]);
            }
        }

        return segments;
    }

    function overlaySetPolygonFromMercRing(mercRingClosed, opts = {}) {
        if (!window.OpenLayers) return false;

        const layer = ensureOverlayLayer();
        if (!layer) return false;

        const color = EDITOR.overlayColor || readSettings().overlayColor || '#E6E6E6';
        let invalid = false;
        try {
            const check = validateJbShapeRing(mercRingClosed, { minAngleDeg: 0 });
            invalid = !!(check && !check.ok && check.reason === 'self-intersection');
        } catch (e) {}

        const style = invalid ? {
            strokeColor: '#ff2f55',
            strokeWidth: 4,
            strokeOpacity: 1,
            strokeDashstyle: 'dash',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            fillColor: '#ff2f55',
            fillOpacity: 0.24,
        } : {
            strokeColor: color,
            strokeWidth: 4,
            strokeOpacity: 1,
            strokeDashstyle: 'solid',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            fillColor: color,
            fillOpacity: 0.4,
        };

        const pts = mercRingClosed.map(([x, y]) => new OpenLayers.Geometry.Point(x, y));
        const ring = new OpenLayers.Geometry.LinearRing(pts);
        const poly = new OpenLayers.Geometry.Polygon([ring]);

        try { layer.removeAllFeatures(); } catch (e) {}

        OVERLAY.feature = new OpenLayers.Feature.Vector(poly, { role: 'overlay' }, style);
        const features = [OVERLAY.feature];

        if (invalid) {
            try {
                const open = ringIsClosed(mercRingClosed) ? mercRingClosed.slice(0, -1) : mercRingClosed;
                const b = poly.getBounds?.();
                const w = b ? Math.max(1, Number(b.right - b.left)) : 80;
                const h = b ? Math.max(1, Number(b.top - b.bottom)) : 80;
                const step = Math.max(10, Math.min(38, Math.max(w, h) / 10));
                const gridStyle = {
                    strokeColor: '#ff2f55',
                    strokeWidth: 2,
                    strokeOpacity: 0.82,
                    strokeDashstyle: 'dot',
                    strokeLinecap: 'round',
                };

                const hatch = [
                    ...hatchSegmentsInsideRing(open, step, Math.PI / 4),
                    ...hatchSegmentsInsideRing(open, step, -Math.PI / 4),
                ];

                for (const seg of hatch) {
                    const line = new OpenLayers.Geometry.LineString([
                        new OpenLayers.Geometry.Point(seg[0][0], seg[0][1]),
                        new OpenLayers.Geometry.Point(seg[1][0], seg[1][1]),
                    ]);
                    features.push(new OpenLayers.Feature.Vector(line, { role: 'invalid-grid' }, gridStyle));
                }
            } catch (e) {}
        }

        try { layer.addFeatures(features); } catch (e) {}

        try { layer.redraw?.(true); } catch (e) {}
        try { getOlMap()?.redraw?.(true); } catch (e) {}
        try { EDITOR.layer?.setZIndex?.(10000000); } catch (e) {}
        try { EDITOR.layer?.redraw?.(true); } catch (e) {}

        try { transformResetBaseline(); } catch (e) {}

        if (!opts.skipEditorSync) {
            try { editorLoadFromRingClosed(mercRingClosed, { preserveRadius: true }); } catch (e) {}
        }

        return true;
    }

    function overlayGetRingMercClosed() {
        const f = OVERLAY.feature;
        const g = f?.geometry;
        const ring = g?.components?.[0]?.components;
        if (!Array.isArray(ring) || ring.length < 3) return null;

        const open = ring.map(p => [p.x, p.y]);

        const first = open[0];
        const last = open[open.length - 1];
        const closed = (last[0] === first[0] && last[1] === first[1])
        ? open
        : open.concat([[first[0], first[1]]]);

        return closed;
    }

    function normalizeOverlayColor(value) {
        const v = String(value || '').trim();
        return /^#[0-9a-f]{6}$/i.test(v) ? v.toUpperCase() : '#E6E6E6';
    }

    function editorHandleTintColor() {
        const c = normalizeOverlayColor(EDITOR.overlayColor || readSettings().overlayColor || '#E6E6E6');
        return c === '#E6E6E6' || c === '#FFFFFF' ? '#0877ff' : c;
    }

    function applyOverlayColor(color) {
        const currentRing = EDITOR.previewRing || overlayGetRingMercClosed() || (EDITOR.rawPoints?.length >= 3 ? editorOpenToClosed(EDITOR.rawPoints) : null);
        if (currentRing) {
            const validation = validateJbShapeRing(currentRing, { minAngleDeg: 0 });
            if (!validation.ok) {
                uiSetStep('Color disabled while the current shape is invalid.');
                refreshUiStatus();
                return;
            }
        }

        const next = normalizeOverlayColor(color);
        EDITOR.overlayColor = next;
        writeSettings({ overlayColor: next });
        try {
            if (OVERLAY.feature) {
                OVERLAY.feature.style = Object.assign({}, OVERLAY.feature.style || {}, {
                    strokeColor: next,
                    fillColor: next,
                });
                OVERLAY.layer?.redraw?.(true);
            }
        } catch (e) {}
        try {
            for (const btn of EDITOR.ui.colorButtons || []) {
                btn.classList.toggle('is-active', String(btn.dataset.color || '').toUpperCase() === next);
            }
        } catch (e) {}
        try { editorRenderHandles(); } catch (e) {}
    }


    const EDITOR = {
        rawPoints: [],
        previewRing: null,
        lastValidation: { ok: true, reason: 'ok', ring: null },
        radius: 0,
        sizePercent: 100,
        sizeValueMode: 'area',
        liveSmooth: true,
        maxAngleStepDeg: 6,
        layer: null,
        handles: [],
        dragIndex: null,
        lastEditedIndex: null,
        domOff: null,
        hoverIndex: null,
        hoverEdge: null,
        insertPreview: null,
        overlayDragMode: null,
        overlayDragStart: null,
        overlayStartPoints: null,
        overlayCenter: null,
        overlayStartAngle: 0,
        scaleStartPoints: null,
        scaleStartCenter: null,
        scaleStartPercent: 100,
        raf: null,
        ui: { radius: null, radiusValue: null, size: null, sizeValue: null, live: null, info: null, undo: null, redo: null, reset: null, colorButtons: [] },
        overlayColor: '#E6E6E6',
        toolbarEl: null,
        toolbarMoveBtn: null,
        toolbarRotateBtn: null,
        toolbarShown: false,
        manualCursorMarker: null,
        lastCreateAbortReminderAt: 0,
        createAbortReminderShownForShape: false,
        history: { undo: [], redo: [], max: 60, restoring: false },
    };


    function editorSnapshot() {
        return {
            rawPoints: (EDITOR.rawPoints || []).map(p => [p[0], p[1]]),
            radius: Number(EDITOR.radius || 0),
            sizePercent: Number(EDITOR.sizePercent || 100),
            liveSmooth: true,
        };
    }

    function editorSameSnapshot(a, b) {
        if (!a || !b) return false;
        if (Number(a.radius || 0) !== Number(b.radius || 0)) return false;
        if (Number(a.sizePercent || 100) !== Number(b.sizePercent || 100)) return false;
                const ap = a.rawPoints || [];
        const bp = b.rawPoints || [];
        if (ap.length !== bp.length) return false;
        for (let i = 0; i < ap.length; i++) {
            if (Math.abs(ap[i][0] - bp[i][0]) > 1e-7 || Math.abs(ap[i][1] - bp[i][1]) > 1e-7) return false;
        }
        return true;
    }

    function editorHasPlacedShape() {
        return !!(OVERLAY?.feature?.geometry || (EDITOR.rawPoints && EDITOR.rawPoints.length >= 3));
    }

    function editorUpdateHistoryButtons() {
        const shapePlaced = editorHasPlacedShape();
        if (EDITOR.ui.undo) EDITOR.ui.undo.disabled = !shapePlaced || !(EDITOR.history.undo && EDITOR.history.undo.length);
        if (EDITOR.ui.redo) EDITOR.ui.redo.disabled = !shapePlaced || !(EDITOR.history.redo && EDITOR.history.redo.length);
        if (EDITOR.ui.reset) EDITOR.ui.reset.disabled = !shapePlaced || !(Number(EDITOR.radius || 0) !== 0 || Number(EDITOR.sizePercent || 100) !== 100);
    }

    function editorPushHistory(label = 'edit') {
        if (EDITOR.history.restoring) return false;
        const snap = editorSnapshot();
        const undo = EDITOR.history.undo;
        if (undo.length && editorSameSnapshot(undo[undo.length - 1], snap)) return false;
        undo.push(snap);
        while (undo.length > EDITOR.history.max) undo.shift();
        EDITOR.history.redo = [];
        editorUpdateHistoryButtons();
        return true;
    }

    function editorRestoreSnapshot(snap) {
        if (!snap) return false;
        EDITOR.history.restoring = true;
        try {
            EDITOR.rawPoints = (snap.rawPoints || []).map(p => [p[0], p[1]]);
            EDITOR.radius = Math.max(0, Math.min(60, Number(snap.radius || 0)));
            EDITOR.sizePercent = Math.max(20, Math.min(250, Number(snap.sizePercent || 100)));
            EDITOR.liveSmooth = true;
            if (EDITOR.ui.radius) EDITOR.ui.radius.value = String(EDITOR.radius);
            if (EDITOR.ui.radiusValue) EDITOR.ui.radiusValue.textContent = `${EDITOR.radius.toFixed(0)}${radiusUnitLabel()}`;
            updateAllRangeProgress();
            if (EDITOR.ui.size) EDITOR.ui.size.value = String(Math.round(EDITOR.sizePercent));
            updateSizeValuePill();
            updateAllRangeProgress();
                        EDITOR.dragIndex = null;
            EDITOR.hoverIndex = null;
            EDITOR.hoverEdge = null;
            EDITOR.insertPreview = null;
            EDITOR.overlayDragMode = null;
            EDITOR.overlayDragStart = null;
            EDITOR.overlayStartPoints = null;
            EDITOR.overlayCenter = null;
            EDITOR.overlayStartAngle = 0;
            EDITOR.scaleStartPoints = null;
            EDITOR.scaleStartCenter = null;
            EDITOR.scaleStartPercent = EDITOR.sizePercent;
            if (EDITOR.rawPoints.length >= 3) {
                editorEnsureLayer();
                editorDomOn();
                editorRenderOverlayFromRaw();
            } else {
                try { OVERLAY.layer?.removeAllFeatures?.(); } catch (e) {}
                OVERLAY.feature = null;
                editorClear();
            }
            editorUpdateInfo();
        } finally {
            EDITOR.history.restoring = false;
            editorUpdateHistoryButtons();
        }
        return true;
    }

    function editorUndo() {
        const undo = EDITOR.history.undo;
        if (!undo.length) return false;
        const current = editorSnapshot();
        const prev = undo.pop();
        EDITOR.history.redo.push(current);
        editorRestoreSnapshot(prev);
        uiSetStep('Undo ✔');
        refreshUiStatus();
        return true;
    }

    function editorRedo() {
        const redo = EDITOR.history.redo;
        if (!redo.length) return false;
        const current = editorSnapshot();
        const next = redo.pop();
        EDITOR.history.undo.push(current);
        editorRestoreSnapshot(next);
        uiSetStep('Redo ✔');
        refreshUiStatus();
        return true;
    }

    function editorRingToOpen(ring) {
        if (!Array.isArray(ring)) return [];
        const out = ring.map(p => [Number(p[0]), Number(p[1])]).filter(p => Number.isFinite(p[0]) && Number.isFinite(p[1]));
        if (out.length > 1) {
            const a = out[0], b = out[out.length - 1];
            if (a[0] === b[0] && a[1] === b[1]) out.pop();
        }
        return out;
    }

    function editorOpenToClosed(open) {
        return ringClose((open || []).map(p => [p[0], p[1]]));
    }

    function editorBuildPreviewRingClosed() {
        const raw = EDITOR.rawPoints || [];
        if (raw.length < 3) return null;
        const closedRaw = editorOpenToClosed(raw);
        const sani = ringSanitizeClosed(closedRaw, { minDist: MANUAL.minVertexDist, maxPoints: SMOOTH.defaults.maxPoints });
        if (!sani.ok || !sani.ring) return closedRaw;
        const radius = Number(EDITOR.radius || 0);
        if (radius <= 0) return sani.ring;
        const fil = filletRingOpen(sani.ring.slice(0, -1), {
            radius,
            maxAngleStepDeg: EDITOR.maxAngleStepDeg,
            minDist: MANUAL.minVertexDist,
            maxPoints: SMOOTH.defaults.maxPoints,
        });
        if (!fil.ok || !fil.ring) return sani.ring;
        return ringClose(fil.ring);
    }

    function editorRenderOverlayFromRaw() {
        const ring = editorBuildPreviewRingClosed();
        if (!ring) return false;
        EDITOR.previewRing = ring;
        EDITOR.lastValidation = validateJbShapeRing(ring, { minAngleDeg: 7 });
        const ok = overlaySetPolygonFromMercRing(ring, { skipEditorSync: true });
        editorRenderHandles();
        updateSizeValuePill();
        editorUpdateInfo();
        return ok;
    }

    function editorLoadFromRingClosed(ringClosed, opts = {}) {
        const open = editorRingToOpen(ringClosed);
        if (open.length < 3) return false;
        EDITOR.rawPoints = open;
        if (!opts.preserveRadius) EDITOR.radius = 0;
        if (!opts.preserveSize) EDITOR.sizePercent = 100;
        if (EDITOR.ui.size) EDITOR.ui.size.value = String(Math.round(EDITOR.sizePercent));
        updateSizeValuePill();
        EDITOR.previewRing = ringClose(open);
        editorEnsureLayer();
        editorDomOn();

        const shouldLiveRender = opts.renderOverlay !== false && Number(EDITOR.radius || 0) > 0;
        if (shouldLiveRender) {
            editorRenderOverlayFromRaw();
        } else {
            editorRenderHandles();
            editorUpdateInfo();
        }
        return true;
    }

    function editorClear() {
        EDITOR.rawPoints = [];
        EDITOR.previewRing = null;
        EDITOR.createAbortReminderShownForShape = false;
        EDITOR.lastValidation = { ok: true, reason: 'ok', ring: null };
        EDITOR.dragIndex = null;
        EDITOR.lastEditedIndex = null;
        EDITOR.hoverIndex = null;
        EDITOR.hoverEdge = null;
        EDITOR.insertPreview = null;
        EDITOR.overlayDragMode = null;
        EDITOR.overlayDragStart = null;
        EDITOR.overlayStartPoints = null;
        EDITOR.overlayCenter = null;
        EDITOR.overlayStartAngle = 0;
        EDITOR.scaleStartPoints = null;
        EDITOR.scaleStartCenter = null;
        EDITOR.scaleStartPercent = 100;
        EDITOR.sizePercent = 100;
        if (EDITOR.ui.size) EDITOR.ui.size.value = '100';
        if (EDITOR.ui.sizeValue) EDITOR.ui.sizeValue.textContent = '100%';
        try { EDITOR.layer?.removeAllFeatures?.(); } catch (e) {}
        try { hardUnlockMap('editor-clear'); } catch (e) { try { releaseExternalJbSketch('editor-clear'); } catch (_) {} }
        editorHideToolbar();
        editorUpdateInfo();
    }

    function editorEnsureLayer() {
        if (EDITOR.layer) return EDITOR.layer;
        if (!window.OpenLayers) return null;
        const olMap = getOlMap();
        if (!olMap) return null;
        const layer = new OpenLayers.Layer.Vector('JB Editor Handles', { displayInLayerSwitcher: false });
        try { olMap.addLayer(layer); } catch (e) { try { W?.map?.addLayer?.(layer); } catch (_) {} }
        try { layer.setZIndex?.(10000000); } catch (e) {}
        EDITOR.layer = layer;
        return layer;
    }

    function editorHandleStyle(i) {
        const active = i === EDITOR.dragIndex || i === EDITOR.hoverIndex;
        const tint = editorHandleTintColor();
        return {
            pointRadius: active ? 7 : 5,
            strokeColor: active ? '#FFFFFF' : 'rgba(255,255,255,0.96)',
            strokeWidth: active ? 3 : 2,
            strokeOpacity: 1,
            fillColor: tint,
            fillOpacity: active ? 1 : 0.86,
            graphicZIndex: 100000 + i,
        };
    }

    function editorInsertHandleStyle(i) {
        return {
            pointRadius: 3,
            strokeColor: '#FFFFFF',
            strokeWidth: 2,
            strokeOpacity: 0.88,
            fillColor: '#1ED760',
            fillOpacity: 0.72,
            graphicName: 'circle',
            graphicZIndex: 99900 + i,
        };
    }

    function editorHoverInsertStyle() {
        return {
            pointRadius: 7,
            strokeColor: '#FFFFFF',
            strokeWidth: 3,
            strokeOpacity: 1,
            fillColor: '#1ED760',
            fillOpacity: 0.98,
            graphicName: 'circle',
            graphicZIndex: 120000,
        };
    }

    function editorOverlayMoveHandleStyle() {
        return {
            pointRadius: 11,
            strokeColor: '#FFFFFF',
            strokeWidth: 3,
            strokeOpacity: 1,
            fillColor: '#FFD166',
            fillOpacity: 0.98,
            graphicName: 'circle',
            label: '✥',
            fontColor: '#111827',
            fontSize: '15px',
            fontWeight: '900',
            labelOutlineColor: '#FFFFFF',
            labelOutlineWidth: 2,
            graphicZIndex: 130000,
        };
    }

    function editorOverlayRotateHandleStyle() {
        return {
            pointRadius: 11,
            strokeColor: '#FFFFFF',
            strokeWidth: 3,
            strokeOpacity: 1,
            fillColor: '#C084FC',
            fillOpacity: 0.98,
            graphicName: 'circle',
            label: '↻',
            fontColor: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '900',
            labelOutlineColor: '#6D28D9',
            labelOutlineWidth: 2,
            graphicZIndex: 130001,
        };
    }


    function editorEnsureToolbar() {
        const div = getMapDiv();
        if (!div) return null;

        if (!EDITOR.toolbarEl) {
            const tb = document.createElement('div');
            tb.className = 'jbg-map-toolbar';
            tb.innerHTML = `
                <button type="button" class="jbg-map-tool" data-tool="move" title="Move whole overlay">
                    <span class="jbg-map-tool-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3"/></svg>
                    </span>
                    <span class="jbg-map-tool-text">Move</span>
                </button>
                <button type="button" class="jbg-map-tool jbg-rotate-tool" data-tool="rotate" title="Rotate whole overlay — hold Ctrl for 15° snap" aria-label="Rotate">
                    <span class="jbg-rotate-glyph" aria-hidden="true">↻</span>
                </button>
            `;

            const onToolDown = (evt) => {
                const btn = evt.target?.closest?.('.jbg-map-tool');
                if (!btn || !EDITOR.rawPoints || EDITOR.rawPoints.length < 3) return;
                const mode = btn.getAttribute('data-tool');
                if (mode !== 'move' && mode !== 'rotate') return;

                const p = getMercFromMapEvent(evt);
                if (!p) return;

                editorPushHistory(mode === 'move' ? 'move-overlay' : 'rotate-overlay');
                EDITOR.overlayDragMode = mode;
                EDITOR.overlayDragStart = p;
                EDITOR.overlayStartPoints = (EDITOR.rawPoints || []).map(pt => [pt[0], pt[1]]);
                EDITOR.overlayCenter = editorGetRawCenter();
                EDITOR.overlayStartAngle = EDITOR.overlayCenter ? Math.atan2(p[1] - EDITOR.overlayCenter[1], p[0] - EDITOR.overlayCenter[0]) : 0;
                EDITOR.dragIndex = null;
                EDITOR.hoverIndex = null;
                EDITOR.hoverEdge = null;
                EDITOR.insertPreview = null;

                tb.classList.toggle('is-moving', mode === 'move');
                tb.classList.toggle('is-rotating', mode === 'rotate');

                editorRenderHandles();
                uiSetStep(mode === 'move' ? 'Moving overlay… drag the Move tool.' : 'Rotating overlay… drag the Rotate tool. Hold Ctrl for 15° snap.');
                try { evt.preventDefault(); } catch (e) {}
                try { evt.stopPropagation(); } catch (e) {}
            };

            tb.addEventListener('mousedown', onToolDown, true);
            tb.addEventListener('click', (evt) => {
                try { evt.preventDefault(); } catch (e) {}
                try { evt.stopPropagation(); } catch (e) {}
            }, true);

            try {
                const cs = window.getComputedStyle(div);
                if (cs.position === 'static') div.style.position = 'relative';
            } catch (e) {}

            div.appendChild(tb);
            EDITOR.toolbarEl = tb;
            EDITOR.toolbarMoveBtn = tb.querySelector('[data-tool="move"]');
            EDITOR.toolbarRotateBtn = tb.querySelector('[data-tool="rotate"]');
            try {
                const rb = EDITOR.toolbarRotateBtn;
                rb?.style?.setProperty('background', 'transparent', 'important');
                rb?.style?.setProperty('border', '0', 'important');
                rb?.style?.setProperty('box-shadow', 'none', 'important');
                rb?.style?.setProperty('border-radius', '0', 'important');
                rb?.style?.setProperty('padding', '0', 'important');
            } catch (e) {}
        }

        editorPositionToolbar();
        return EDITOR.toolbarEl;
    }

    function editorHideToolbar() {
        if (!EDITOR.toolbarEl) return;
        EDITOR.toolbarEl.classList.remove('is-visible', 'is-moving', 'is-rotating');
        EDITOR.toolbarShown = false;
    }

    function editorRemoveToolbar() {
        try { EDITOR.toolbarEl?.remove?.(); } catch (e) {}
        EDITOR.toolbarEl = null;
        EDITOR.toolbarMoveBtn = null;
        EDITOR.toolbarRotateBtn = null;
        EDITOR.toolbarShown = false;
    }

    function editorPositionToolbar() {
        const tb = EDITOR.toolbarEl;
        if (!tb) return false;
        if (!EDITOR.rawPoints || EDITOR.rawPoints.length < 3) {
            editorHideToolbar();
            return false;
        }

        const b = editorGetDisplayBounds();
        if (!b) {
            editorHideToolbar();
            return false;
        }

        const div = getMapDiv();
        const topRightPx = mercToViewportPixel([b.maxX, b.maxY]);
        if (!div || !topRightPx) {
            editorHideToolbar();
            return false;
        }

        const maxLeft = Math.max(8, div.clientWidth - tb.offsetWidth - 8);
        const maxTop = Math.max(8, div.clientHeight - tb.offsetHeight - 8);
        const left = clamp(topRightPx.x + 12, 8, maxLeft);
        const top = clamp(topRightPx.y - 42, 8, maxTop);

        tb.style.transform = `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;
        tb.classList.add('is-visible');
        EDITOR.toolbarShown = true;
        return true;
    }

    function editorMaybeSnapPoint(point, evt) {
        if (!point) return point;
        return (evt?.shiftKey || readSettings().snapToGrid) ? snapPointToGrid(point, MANUAL.snapStep) : point;
    }

    function editorEdgeMidpoint(a, b) {
        return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    }

    function editorRenderHandles() {
        const layer = editorEnsureLayer();
        if (!layer || !window.OpenLayers) return false;
        try { layer.removeAllFeatures(); } catch (e) {}
        EDITOR.handles = [];
        const pts = EDITOR.rawPoints || [];
        const features = [];

        editorHideToolbar();

        if (EDITOR.insertPreview && pts.length >= 3) {
            features.push(new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(EDITOR.insertPreview.point[0], EDITOR.insertPreview.point[1]),
                { role: 'editor-hover-insert', afterIndex: EDITOR.insertPreview.afterIndex },
                editorHoverInsertStyle()
            ));
        }

        for (let i = 0; i < pts.length; i++) {
            const p = editorGetHandleDisplayPoint(i) || pts[i];
            const ft = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(p[0], p[1]), { role: 'editor-handle', index: i }, editorHandleStyle(i));
            EDITOR.handles.push(ft);
            features.push(ft);
        }

        if (features.length) { try { layer.addFeatures(features); } catch (e) {} }
        try { layer.setZIndex?.(10000000); } catch (e) {}
        try { layer.redraw?.(true); } catch (e) {}
        editorPositionToolbar();
        return true;
    }

    function getMapEventPixel(evt) {
        const div = getMapDiv();
        if (!div || evt?.clientX == null || evt?.clientY == null) return null;
        const rect = div.getBoundingClientRect();
        return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    }

    function mercToViewportPixel(point) {
        const olMap = getOlMap();
        if (!olMap || !point || !window.OpenLayers) return null;
        try {
            const ll = new OpenLayers.LonLat(point[0], point[1]);
            const px = olMap.getViewPortPxFromLonLat?.(ll) || olMap.getPixelFromLonLat?.(ll);
            if (px) return { x: px.x, y: px.y };
        } catch (e) {}
        return null;
    }

    function viewportPixelToMerc(px) {
        const olMap = getOlMap();
        if (!olMap || !px || !window.OpenLayers) return null;
        try {
            const p = new OpenLayers.Pixel(px.x, px.y);
            const ll = olMap.getLonLatFromViewPortPx?.(p) || olMap.getLonLatFromPixel?.(p);
            if (ll) return [ll.lon, ll.lat];
        } catch (e) {}
        return null;
    }

    function editorGetDisplayRingOpen() {
        if (!EDITOR.rawPoints || EDITOR.rawPoints.length < 3) return [];
        const radius = Number(EDITOR.radius || 0);
        if (radius <= 0) return EDITOR.rawPoints;
        const ring = EDITOR.previewRing || editorBuildPreviewRingClosed();
        const open = editorRingToOpen(ring || []);
        return open.length >= 3 ? open : EDITOR.rawPoints;
    }

    function editorGetHandleDisplayPoint(index) {
        const raw = EDITOR.rawPoints || [];
        const B = raw[index];
        if (!B) return null;

        const radius = Number(EDITOR.radius || 0);
        if (radius <= 0 || raw.length < 3) return B;

        const A = raw[(index - 1 + raw.length) % raw.length];
        const C = raw[(index + 1) % raw.length];
        if (!A || !C) return B;

        const BA = vec(A, B);
        const BC = vec(C, B);
        const lenBA = vlen(BA);
        const lenBC = vlen(BC);
        if (!lenBA || !lenBC) return B;

        const u = vnorm(BA);
        const v = vnorm(BC);
        const theta = angleBetween(u, v);

        if (!Number.isFinite(theta) || theta > (179 * Math.PI / 180) || theta < (1 * Math.PI / 180)) return B;

        const tanHalf = Math.tan(theta / 2);
        if (!tanHalf) return B;

        const tMax = 0.45 * Math.min(lenBA, lenBC);
        let rLocal = radius;
        let t = rLocal / tanHalf;

        if (t > tMax) {
            rLocal = tMax * tanHalf;
            t = rLocal / tanHalf;
        }

        if (!Number.isFinite(rLocal) || rLocal <= 0 || !Number.isFinite(t) || t <= 0) return B;

        const T1 = vadd(B, vscale(u, t));
        const T2 = vadd(B, vscale(v, t));
        const w = vnorm(vadd(u, v));
        const sinHalf = Math.sin(theta / 2);
        if (!sinHalf) return B;

        const d = rLocal / sinHalf;
        const O1 = vadd(B, vscale(w, d));
        const O2 = vadd(B, vscale(w, -d));

        const err = (O) => {
            const r1 = Math.hypot(T1[0] - O[0], T1[1] - O[1]);
            const r2 = Math.hypot(T2[0] - O[0], T2[1] - O[1]);
            return Math.abs(r1 - rLocal) + Math.abs(r2 - rLocal);
        };

        const O = (err(O1) <= err(O2)) ? O1 : O2;
        const a1 = Math.atan2(T1[1] - O[1], T1[0] - O[0]);
        const delta = chooseFilletDelta(O, B, T1, T2);
        const mid = a1 + delta / 2;

        return [O[0] + Math.cos(mid) * rLocal, O[1] + Math.sin(mid) * rLocal];
    }

    function editorGetDisplayBounds() {
        const pts = editorGetDisplayRingOpen();
        if (!pts || pts.length < 3) return editorGetRawBounds();
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const p of pts) {
            if (!p || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) continue;
            minX = Math.min(minX, p[0]);
            minY = Math.min(minY, p[1]);
            maxX = Math.max(maxX, p[0]);
            maxY = Math.max(maxY, p[1]);
        }
        if (!Number.isFinite(minX) || !Number.isFinite(minY) || !Number.isFinite(maxX) || !Number.isFinite(maxY)) return editorGetRawBounds();
        return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
    }

    function editorGetRawBounds() {
        const pts = EDITOR.rawPoints || [];
        if (pts.length < 3) return null;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const p of pts) {
            if (!p || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) continue;
            minX = Math.min(minX, p[0]);
            minY = Math.min(minY, p[1]);
            maxX = Math.max(maxX, p[0]);
            maxY = Math.max(maxY, p[1]);
        }
        if (!Number.isFinite(minX) || !Number.isFinite(minY) || !Number.isFinite(maxX) || !Number.isFinite(maxY)) return null;
        return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
    }

    function polygonAreaSqmFromRing(ringClosed) {
        const pts = ringIsClosed(ringClosed) ? ringClosed.slice(0, -1) : (ringClosed || []);
        if (!pts || pts.length < 3) return null;
        let area = 0;
        for (let i = 0; i < pts.length; i++) {
            const a = pts[i];
            const b = pts[(i + 1) % pts.length];
            area += (a[0] * b[1]) - (b[0] * a[1]);
        }
        area = Math.abs(area / 2);
        return Number.isFinite(area) ? area : null;
    }

    function editorCurrentAreaSqm() {
        const ring = EDITOR.previewRing || overlayGetRingMercClosed() || (EDITOR.rawPoints?.length >= 3 ? editorOpenToClosed(EDITOR.rawPoints) : null);
        return ring ? polygonAreaSqmFromRing(ring) : null;
    }

    function formatAreaSqm(area) {
        if (!Number.isFinite(area)) return '— m²';
        if (area < 1000) return `${Math.round(area)} m²`;
        if (area < 10000) return `${(area / 1000).toFixed(1)}k m²`;
        return `${Math.round(area / 1000)}k m²`;
    }

    function updateRangeProgress(input) {
        if (!input) return;
        const min = Number(input.min || 0);
        const max = Number(input.max || 100);
        const val = Number(input.value || min);
        const pct = max > min ? ((val - min) / (max - min)) * 100 : 0;
        input.style.setProperty('--jbg-range-pct', `${Math.max(0, Math.min(100, pct)).toFixed(2)}%`);
    }

    function updateAllRangeProgress() {
        updateRangeProgress(EDITOR.ui.radius);
        updateRangeProgress(EDITOR.ui.size);
    }

    function updateSizeValuePill() {
        updateAllRangeProgress();
        if (!EDITOR.ui.sizeValue) return;
        if (EDITOR.sizeValueMode === 'percent') {
            EDITOR.ui.sizeValue.textContent = `${Number(EDITOR.sizePercent || 100).toFixed(0)}%`;
            EDITOR.ui.sizeValue.title = 'Click to show area in square meters';
        } else {
            EDITOR.ui.sizeValue.textContent = formatAreaSqm(editorCurrentAreaSqm());
            EDITOR.ui.sizeValue.title = 'Click to show size percentage';
        }
    }

    function editorGetRawCenter() {
        const b = editorGetRawBounds();
        if (!b) return null;
        return [b.cx, b.cy];
    }

    function editorGetOverlayToolPoints() {
        const b = editorGetDisplayBounds();
        if (!b) return { move: null, rotate: null };

        const topRightPx = mercToViewportPixel([b.maxX, b.maxY]);
        if (topRightPx) {
            const move = viewportPixelToMerc({ x: topRightPx.x + 24, y: topRightPx.y - 24 });
            const rotate = viewportPixelToMerc({ x: topRightPx.x + 54, y: topRightPx.y - 24 });
            if (move && rotate) return { move, rotate };
        }

        const pad = Math.max(12, Math.min(45, Math.max(b.width, b.height) * 0.18));
        return {
            move: [b.maxX + pad, b.maxY + pad],
            rotate: [b.maxX + pad * 1.8, b.maxY + pad],
        };
    }

    function editorGetMoveHandlePoint() {
        return editorGetOverlayToolPoints().move;
    }

    function editorGetRotateHandlePoint() {
        return editorGetOverlayToolPoints().rotate;
    }

    function editorNearestOverlayHandleFromEvent(evt, thresholdPx = 17) {
        if (!EDITOR.rawPoints || EDITOR.rawPoints.length < 3) return null;
        const ep = getMapEventPixel(evt);
        if (!ep) return null;
        const move = editorGetMoveHandlePoint();
        const rotate = editorGetRotateHandlePoint();
        const checks = [];
        if (move) checks.push({ mode: 'move', point: move });
        if (rotate) checks.push({ mode: 'rotate', point: rotate });
        let best = null;
        for (const item of checks) {
            const px = mercToViewportPixel(item.point);
            if (!px) continue;
            const d = Math.hypot(ep.x - px.x, ep.y - px.y);
            if (d <= thresholdPx && (!best || d < best.d)) best = { ...item, d };
        }
        return best;
    }

    function editorTranslateRawPoints(dx, dy) {
        EDITOR.rawPoints = (EDITOR.rawPoints || []).map(p => [p[0] + dx, p[1] + dy]);
    }

    function editorRotateRawPointsFromStart(cursorPoint, evt) {
        const c = EDITOR.overlayCenter;
        const start = EDITOR.overlayStartPoints;
        if (!c || !start || !cursorPoint) return false;
        let delta = Math.atan2(cursorPoint[1] - c[1], cursorPoint[0] - c[0]) - EDITOR.overlayStartAngle;
        if (evt?.ctrlKey || evt?.metaKey) {
            const snap = 15 * Math.PI / 180;
            delta = Math.round(delta / snap) * snap;
        }
        const cos = Math.cos(delta);
        const sin = Math.sin(delta);
        EDITOR.rawPoints = start.map(p => {
            const x = p[0] - c[0];
            const y = p[1] - c[1];
            return [c[0] + x * cos - y * sin, c[1] + x * sin + y * cos];
        });
        return true;
    }

    function editorNearestVertexFromEvent(evt, thresholdPx = 13) {
        const ep = getMapEventPixel(evt);
        if (!ep || !EDITOR.rawPoints?.length) return null;
        let best = null;
        for (let i = 0; i < EDITOR.rawPoints.length; i++) {
            const displayPoint = editorGetHandleDisplayPoint(i) || EDITOR.rawPoints[i];
            const hp = mercToViewportPixel(displayPoint);
            if (!hp) continue;
            const d = Math.hypot(ep.x - hp.x, ep.y - hp.y);
            if (d <= thresholdPx && (!best || d < best.d)) best = { index: i, d };
        }
        return best;
    }

    function editorNearestEdgeFromEvent(evt, thresholdPx = 14) {
        const ep = getMapEventPixel(evt);
        const pts = EDITOR.rawPoints || [];
        if (!ep || pts.length < 3) return null;

        function nearestOnSegmentPx(p, a, b) {
            const vx = b.x - a.x, vy = b.y - a.y;
            const wx = p.x - a.x, wy = p.y - a.y;
            const c2 = vx * vx + vy * vy;
            const t = c2 ? clamp((vx * wx + vy * wy) / c2, 0, 1) : 0;
            const proj = { x: a.x + t * vx, y: a.y + t * vy };
            return { t, proj, d: Math.hypot(p.x - proj.x, p.y - proj.y) };
        }

        let best = null;
        for (let i = 0; i < pts.length; i++) {
            const aPx = mercToViewportPixel(pts[i]);
            const bPx = mercToViewportPixel(pts[(i + 1) % pts.length]);
            if (!aPx || !bPx) continue;

            const hit = nearestOnSegmentPx(ep, aPx, bPx);
            if (hit.d > thresholdPx || (best && hit.d >= best.d)) continue;

            const a = pts[i];
            const b = pts[(i + 1) % pts.length];
            const pMerc = [
                a[0] + (b[0] - a[0]) * hit.t,
                a[1] + (b[1] - a[1]) * hit.t,
            ];
            best = { afterIndex: i, d: hit.d, point: pMerc, t: hit.t };
        }
        return best;
    }


    function editorNearestVisibleEdgeFromEvent(evt, thresholdPx = 16) {
        const ep = getMapEventPixel(evt);
        const pts = editorGetDisplayRingOpen();
        if (!ep || pts.length < 3) return null;

        function nearestOnSegmentPx(p, a, b) {
            const vx = b.x - a.x, vy = b.y - a.y;
            const wx = p.x - a.x, wy = p.y - a.y;
            const c2 = vx * vx + vy * vy;
            const t = c2 ? clamp((vx * wx + vy * wy) / c2, 0, 1) : 0;
            const proj = { x: a.x + t * vx, y: a.y + t * vy };
            return { t, proj, d: Math.hypot(p.x - proj.x, p.y - proj.y) };
        }

        let best = null;
        for (let i = 0; i < pts.length; i++) {
            const aPx = mercToViewportPixel(pts[i]);
            const bPx = mercToViewportPixel(pts[(i + 1) % pts.length]);
            if (!aPx || !bPx) continue;
            const hit = nearestOnSegmentPx(ep, aPx, bPx);
            if (hit.d > thresholdPx || (best && hit.d >= best.d)) continue;
            const a = pts[i];
            const b = pts[(i + 1) % pts.length];
            best = {
                afterIndex: i,
                d: hit.d,
                point: [a[0] + (b[0] - a[0]) * hit.t, a[1] + (b[1] - a[1]) * hit.t],
                t: hit.t,
            };
        }
        return best;
    }

    function editorNearestRotateCornerFromEvent(evt, thresholdPx = 26) {
        const ep = getMapEventPixel(evt);
        if (!ep || !EDITOR.rawPoints || EDITOR.rawPoints.length < 3) return null;

        const visible = editorGetDisplayRingOpen();
        const pts = visible.length >= 3 ? visible : (EDITOR.rawPoints || []);
        let best = null;

        for (let i = 0; i < pts.length; i++) {
            const vp = mercToViewportPixel(pts[i]);
            if (!vp) continue;
            const d = Math.hypot(ep.x - vp.x, ep.y - vp.y);
            if (d <= thresholdPx && (!best || d < best.d)) {
                best = { point: pts[i], d, afterIndex: i, t: 0 };
            }
        }

        return best;
    }

    function editorNearestInsertHandleFromEvent(evt, thresholdPx = 12) {
        const ep = getMapEventPixel(evt);
        const pts = EDITOR.rawPoints || [];
        if (!ep || pts.length < 3) return null;
        let best = null;
        for (let i = 0; i < pts.length; i++) {
            const m = editorEdgeMidpoint(pts[i], pts[(i + 1) % pts.length]);
            const mp = mercToViewportPixel(m);
            if (!mp) continue;
            const d = Math.hypot(ep.x - mp.x, ep.y - mp.y);
            if (d <= thresholdPx && (!best || d < best.d)) best = { afterIndex: i, d, point: m };
        }
        return best;
    }

    function editorInsertVertexAfter(afterIndex, point, opts = {}) {
        const pts = EDITOR.rawPoints || [];
        if (pts.length < 3 || afterIndex == null || !point) return false;
        const insertAt = Math.max(0, Math.min(pts.length, afterIndex + 1));
        const p = editorMaybeSnapPoint(point, opts.evt);
        EDITOR.rawPoints.splice(insertAt, 0, p);
        EDITOR.dragIndex = opts.startDrag ? insertAt : null;
        EDITOR.lastEditedIndex = insertAt;
        EDITOR.hoverIndex = opts.startDrag ? insertAt : null;
        EDITOR.hoverEdge = null;
        EDITOR.insertPreview = null;
        editorRenderOverlayFromRaw();
        uiSetStep(`Vertex added. Total: ${EDITOR.rawPoints.length}`);
        refreshUiStatus();
        return true;
    }

    function editorSetRadius(radius) {
        EDITOR.radius = Math.max(0, Math.min(60, Number(radius) || 0));
        if (EDITOR.ui.radius) EDITOR.ui.radius.value = String(EDITOR.radius);
        if (EDITOR.ui.radiusValue) EDITOR.ui.radiusValue.textContent = `${EDITOR.radius.toFixed(0)}${radiusUnitLabel()}`;
        if (EDITOR.rawPoints.length >= 3) editorRenderOverlayFromRaw();
        editorUpdateInfo();
    }

    function editorSetLiveSmooth(enabled) {
        EDITOR.liveSmooth = !!enabled;
                if (EDITOR.rawPoints.length >= 3) editorRenderOverlayFromRaw();
        editorUpdateInfo();
    }

    function editorUpdateInfo() {
        editorUpdateHistoryButtons();
    }

    function editorScalePoints(points, center, factor) {
        if (!Array.isArray(points) || !center || !Number.isFinite(factor) || factor <= 0) return points || [];
        return points.map(p => [
            center[0] + (p[0] - center[0]) * factor,
            center[1] + (p[1] - center[1]) * factor,
        ]);
    }

    function editorSetSizePercent(percent, opts = {}) {
        const next = Math.max(20, Math.min(250, Number(percent) || 100));
        const current = Math.max(20, Math.min(250, Number(EDITOR.sizePercent || 100)));

        if (EDITOR.rawPoints.length >= 3) {
            if (opts.fromScaleSession && EDITOR.scaleStartPoints && EDITOR.scaleStartCenter) {
                const basePercent = Math.max(20, Math.min(250, Number(EDITOR.scaleStartPercent || current || 100)));
                const factor = next / basePercent;
                EDITOR.rawPoints = editorScalePoints(EDITOR.scaleStartPoints, EDITOR.scaleStartCenter, factor);
            } else {
                const c = editorGetRawCenter();
                const factor = next / current;
                if (c && Number.isFinite(factor) && factor > 0) {
                    EDITOR.rawPoints = editorScalePoints(EDITOR.rawPoints, c, factor);
                }
            }
        }

        EDITOR.sizePercent = next;
        if (EDITOR.ui.size) EDITOR.ui.size.value = String(Math.round(next));
        if (EDITOR.ui.sizeValue) EDITOR.ui.sizeValue.textContent = `${next.toFixed(0)}%`;
        if (EDITOR.rawPoints.length >= 3) editorRenderOverlayFromRaw();
        editorUpdateInfo();
    }

    function editorSetMapCursor(cursor) {
        const div = getMapDiv();
        if (!div) return;
        div.style.cursor = cursor || '';
    }

    const EDITOR_ROTATE_CURSOR = 'url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2732%27%20height%3D%2732%27%20viewBox%3D%270%200%2032%2032%27%3E%0A%3Cdefs%3E%0A%20%20%3Cfilter%20id%3D%27s%27%20x%3D%27-50%25%27%20y%3D%27-50%25%27%20width%3D%27200%25%27%20height%3D%27200%25%27%3E%0A%20%20%20%20%3CfeDropShadow%20dx%3D%270%27%20dy%3D%271.2%27%20stdDeviation%3D%271.1%27%20flood-color%3D%27%23000%27%20flood-opacity%3D%27.42%27%2F%3E%0A%20%20%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3Cpath%20d%3D%27M23.2%2011.2a8.2%208.2%200%201%200%202.2%207.8%27%20fill%3D%27none%27%20stroke%3D%27%23fff%27%20stroke-width%3D%273.2%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20filter%3D%27url%28%23s%29%27%2F%3E%0A%3Cpath%20d%3D%27M24.1%205.6v7.4h-7.4%27%20fill%3D%27none%27%20stroke%3D%27%23fff%27%20stroke-width%3D%273.2%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20filter%3D%27url%28%23s%29%27%2F%3E%0A%3C%2Fsvg%3E") 16 16, alias';

    function editorRotateCursor() {
        return EDITOR_ROTATE_CURSOR;
    }

    function editorPointInsideOverlayFromEvent(evt) {
        if (!overlayHasPolygon()) return false;
        const p = getMercFromMapEvent(evt);
        if (!p || !window.OpenLayers) return false;
        try {
            const pt = new OpenLayers.Geometry.Point(p[0], p[1]);
            return !!OVERLAY.feature.geometry.containsPoint?.(pt);
        } catch (e) { return false; }
    }

    function remindCreateOrAbortShape() {
        if (EDITOR.createAbortReminderShownForShape) return false;
        if (!EDITOR.rawPoints || EDITOR.rawPoints.length < 3) return false;
        if (EDITOR.overlayDragMode || EDITOR.dragIndex != null) return false;

        EDITOR.createAbortReminderShownForShape = true;
        EDITOR.lastCreateAbortReminderAt = Date.now();
        showJbGeometryNotification(getUiText().abandonShapeMessage || 'Create the JB or Abort before leaving this shape.', {
            title: getUiText().abandonShapeTitle || 'Shape still active',
            closeLabel: 'OK',
            timeoutMs: 5200,
        });
        return true;
    }

    function editorStartOverlayDrag(mode, startPoint, evt) {
        if (mode !== 'move' && mode !== 'rotate') return false;
        if (!startPoint || !EDITOR.rawPoints || EDITOR.rawPoints.length < 3) return false;
        editorPushHistory(mode === 'move' ? 'move-overlay' : 'rotate-overlay');
        EDITOR.overlayDragMode = mode;
        EDITOR.overlayDragStart = startPoint;
        EDITOR.overlayStartPoints = (EDITOR.rawPoints || []).map(pt => [pt[0], pt[1]]);
        EDITOR.overlayCenter = editorGetRawCenter();
        EDITOR.overlayStartAngle = EDITOR.overlayCenter ? Math.atan2(startPoint[1] - EDITOR.overlayCenter[1], startPoint[0] - EDITOR.overlayCenter[0]) : 0;
        EDITOR.dragIndex = null;
        EDITOR.hoverIndex = null;
        EDITOR.hoverEdge = null;
        EDITOR.insertPreview = null;
        editorSetMapCursor(mode === 'move' ? 'grabbing' : editorRotateCursor());
        editorRenderHandles();
        uiSetStep(mode === 'move' ? 'Moving overlay… drag inside the shape.' : 'Rotating overlay… drag around the outside of the shape. Hold Ctrl for 15° snap.');
        try { evt?.preventDefault?.(); } catch (e) {}
        try { evt?.stopPropagation?.(); } catch (e) {}
        return true;
    }

    function editorCancelInteraction(reason = 'cancel') {
        const hadInteraction = EDITOR.dragIndex != null || !!EDITOR.overlayDragMode;
        EDITOR.dragIndex = null;
        EDITOR.overlayDragMode = null;
        EDITOR.overlayDragStart = null;
        EDITOR.overlayStartPoints = null;
        EDITOR.overlayCenter = null;
        EDITOR.overlayStartAngle = 0;
        EDITOR.insertPreview = null;
        EDITOR.hoverEdge = null;
        try { EDITOR.toolbarEl?.classList.remove('is-moving', 'is-rotating'); } catch (e) {}
        editorSetMapCursor('');
        if (hadInteraction) {
            try { editorRenderOverlayFromRaw(); } catch (e) { try { editorRenderHandles(); } catch (_) {} }
            log('Editor interaction cancelled:', reason);
        }
        return hadInteraction;
    }

    function editorDomOn() {
        if (EDITOR.domOff) return true;
        const div = getMapDiv();
        if (!div) return false;

        function scheduleEditorRender() {
            if (EDITOR.raf) return;
            EDITOR.raf = window.requestAnimationFrame(() => {
                EDITOR.raf = null;
                editorRenderOverlayFromRaw();
            });
        }

        const onDown = (evt) => {
            if (evt.button != null && evt.button !== 0) {
                editorCancelInteraction('non-left-mouse');
                return;
            }
            if (!EDITOR.rawPoints || EDITOR.rawPoints.length < 3) {
                editorCancelInteraction('no-editable-shape');
                return;
            }

            const hit = editorNearestVertexFromEvent(evt);
            if (hit) {
                editorPushHistory('drag-vertex');
                EDITOR.dragIndex = hit.index;
                EDITOR.lastEditedIndex = hit.index;
                EDITOR.hoverIndex = hit.index;
                EDITOR.hoverEdge = null;
                EDITOR.insertPreview = null;
                editorSetMapCursor('grabbing');
                editorRenderHandles();
                try { evt.preventDefault(); } catch (e) {}
                try { evt.stopPropagation(); } catch (e) {}
                return;
            }

            const p = getMercFromMapEvent(evt);
            if (!p) return;

            const addEdgeHit = editorNearestEdgeFromEvent(evt, 14) || editorNearestVisibleEdgeFromEvent(evt, 14);
            if (addEdgeHit) {
                editorInsertVertexAfter(addEdgeHit.afterIndex, addEdgeHit.point, { startDrag: true, evt });
                try { evt.preventDefault(); } catch (e) {}
                try { evt.stopPropagation(); } catch (e) {}
                return;
            }

            const rotateCorner = editorNearestRotateCornerFromEvent(evt, 26);
            if (rotateCorner) {
                editorStartOverlayDrag('rotate', p, evt);
                return;
            }

            if (editorPointInsideOverlayFromEvent(evt)) {
                editorStartOverlayDrag('move', p, evt);
                return;
            }

            remindCreateOrAbortShape();
        };

        const onMove = (evt) => {
            if (EDITOR.overlayDragMode) {
                if (evt.buttons != null && (evt.buttons & 1) === 0) {
                    editorCancelInteraction('lost-mouseup-overlay');
                    return;
                }
                const p = getMercFromMapEvent(evt);
                if (!p) return;
                editorSetMapCursor(EDITOR.overlayDragMode === 'move' ? 'grabbing' : editorRotateCursor());
                if (EDITOR.overlayDragMode === 'move' && EDITOR.overlayDragStart && EDITOR.overlayStartPoints) {
                    let dx = p[0] - EDITOR.overlayDragStart[0];
                    let dy = p[1] - EDITOR.overlayDragStart[1];
                    if (readSettings().snapToGrid) {
                        dx = Math.round(dx / MANUAL.snapStep) * MANUAL.snapStep;
                        dy = Math.round(dy / MANUAL.snapStep) * MANUAL.snapStep;
                    }
                    EDITOR.rawPoints = EDITOR.overlayStartPoints.map(pt => [pt[0] + dx, pt[1] + dy]);
                } else if (EDITOR.overlayDragMode === 'rotate') {
                    editorRotateRawPointsFromStart(p, evt);
                }
                scheduleEditorRender();
                try { evt.preventDefault(); } catch (e) {}
                try { evt.stopPropagation(); } catch (e) {}
                return;
            }

            if (EDITOR.dragIndex == null) {
                const hit = editorNearestVertexFromEvent(evt);
                const nextHover = hit ? hit.index : null;
                const addEdge = nextHover == null ? (editorNearestEdgeFromEvent(evt, 14) || editorNearestVisibleEdgeFromEvent(evt, 14)) : null;
                const rotateCorner = nextHover == null && !addEdge ? editorNearestRotateCornerFromEvent(evt, 26) : null;
                const showInsert = !!addEdge;
                const edgeKey = showInsert ? `${addEdge.afterIndex}:${addEdge.point[0].toFixed(2)}:${addEdge.point[1].toFixed(2)}` : null;
                const oldKey = EDITOR.insertPreview ? `${EDITOR.insertPreview.afterIndex}:${EDITOR.insertPreview.point[0].toFixed(2)}:${EDITOR.insertPreview.point[1].toFixed(2)}` : null;

                if (hit) editorSetMapCursor('grab');
                else if (showInsert) editorSetMapCursor('');
                else if (rotateCorner) editorSetMapCursor(editorRotateCursor());
                else if (editorPointInsideOverlayFromEvent(evt)) editorSetMapCursor('grab');
                else editorSetMapCursor('');

                if (nextHover !== EDITOR.hoverIndex || edgeKey !== oldKey || (!!EDITOR.insertPreview !== showInsert)) {
                    EDITOR.hoverIndex = nextHover;
                    EDITOR.hoverEdge = addEdge || rotateCorner;
                    EDITOR.insertPreview = showInsert ? { afterIndex: addEdge.afterIndex, point: addEdge.point } : null;
                    editorRenderHandles();
                }
                return;
            }

            if (evt.buttons != null && (evt.buttons & 1) === 0) {
                editorCancelInteraction('lost-mouseup-vertex');
                return;
            }
            const p = getMercFromMapEvent(evt);
            if (!p) return;
            editorSetMapCursor('grabbing');
            EDITOR.insertPreview = null;
            EDITOR.hoverEdge = null;
            EDITOR.rawPoints[EDITOR.dragIndex] = editorMaybeSnapPoint(p, evt);
            EDITOR.lastEditedIndex = EDITOR.dragIndex;
            scheduleEditorRender();
            try { evt.preventDefault(); } catch (e) {}
            try { evt.stopPropagation(); } catch (e) {}
        };

        const onUp = (evt) => {
            if (EDITOR.overlayDragMode) {
                const mode = EDITOR.overlayDragMode;
                EDITOR.overlayDragMode = null;
                EDITOR.overlayDragStart = null;
                EDITOR.overlayStartPoints = null;
                EDITOR.overlayCenter = null;
                EDITOR.overlayStartAngle = 0;
                try { EDITOR.toolbarEl?.classList.remove('is-moving', 'is-rotating'); } catch (e) {}
                editorSetMapCursor('');
                EDITOR.insertPreview = null;
                EDITOR.hoverEdge = null;
                editorRenderOverlayFromRaw();
                uiSetStep(mode === 'move' ? 'Overlay moved ✔' : 'Overlay rotated ✔');
                refreshUiStatus();
                try { evt.preventDefault(); } catch (e) {}
                try { evt.stopPropagation(); } catch (e) {}
                return;
            }
            if (EDITOR.dragIndex == null) return;
            EDITOR.dragIndex = null;
            editorSetMapCursor('');
            EDITOR.insertPreview = null;
            EDITOR.hoverEdge = null;
            editorRenderOverlayFromRaw();
            try { evt.preventDefault(); } catch (e) {}
            try { evt.stopPropagation(); } catch (e) {}
        };

        const onDbl = (evt) => {
            if (!EDITOR.rawPoints || EDITOR.rawPoints.length < 3) return;
            try { evt.preventDefault(); } catch (e) {}
            try { evt.stopPropagation(); } catch (e) {}
            try { evt.stopImmediatePropagation?.(); } catch (e) {}
        };

        const onKey = (evt) => {
            const tag = String(document.activeElement?.tagName || '').toLowerCase();
            if (tag === 'input' || tag === 'textarea' || document.activeElement?.isContentEditable) return;
            if (evt.key === 'Enter' && MANUAL.active) {
                try { evt.preventDefault(); } catch (e) {}
                manualFinish();
                return;
            }
            if (evt.key === 'Escape') {
                editorCancelInteraction('esc');
                manualCancel('esc');
                transformStop('esc');
                uiSetStep('Cancelled.');
                refreshUiStatus();
            }
            if ((evt.ctrlKey || evt.metaKey) && String(evt.key || '').toLowerCase() === 'z') {
                try { evt.preventDefault(); } catch (e) {}
                if (evt.shiftKey) editorRedo(); else editorUndo();
                return;
            }
            if ((evt.ctrlKey || evt.metaKey) && String(evt.key || '').toLowerCase() === 'y') {
                try { evt.preventDefault(); } catch (e) {}
                editorRedo();
                return;
            }
            if ((evt.key === 'Backspace' || evt.key === 'Delete' || String(evt.key || '').toLowerCase() === 'd') && EDITOR.hoverIndex != null && EDITOR.rawPoints.length > 3) {
                editorPushHistory('delete-vertex');
                EDITOR.rawPoints.splice(EDITOR.hoverIndex, 1);
                EDITOR.hoverIndex = null;
                EDITOR.insertPreview = null;
                editorRenderOverlayFromRaw();
                uiSetStep(`Vertex deleted. Total: ${EDITOR.rawPoints.length}`);
                refreshUiStatus();
                try { evt.preventDefault(); } catch (e) {}
            }
        };

        const onContextMenu = () => { editorCancelInteraction('contextmenu'); };
        const onWindowBlur = () => { editorCancelInteraction('window-blur'); };
        const onVisibility = () => { if (document.hidden) editorCancelInteraction('document-hidden'); };

        div.addEventListener('mousedown', onDown, true);
        div.addEventListener('mousemove', onMove, true);
        div.addEventListener('dblclick', onDbl, true);
        div.addEventListener('contextmenu', onContextMenu, true);
        div.addEventListener('mouseleave', () => { if (!EDITOR.dragIndex && !EDITOR.overlayDragMode) editorSetMapCursor(''); }, true);
        window.addEventListener('mouseup', onUp, true);
        window.addEventListener('blur', onWindowBlur, true);
        document.addEventListener('visibilitychange', onVisibility, true);
        window.addEventListener('keydown', onKey, true);
        const toolbarPosTimer = setIntervalSafe(() => { try { editorPositionToolbar(); } catch (e) {} }, 250);
        EDITOR.domOff = () => {
            try { window.clearInterval(toolbarPosTimer); state.timers.delete(toolbarPosTimer); } catch (e) {}
            try { div.removeEventListener('mousedown', onDown, true); } catch (e) {}
            try { div.removeEventListener('mousemove', onMove, true); } catch (e) {}
            try { div.removeEventListener('dblclick', onDbl, true); } catch (e) {}
            try { div.removeEventListener('contextmenu', onContextMenu, true); } catch (e) {}
            try { window.removeEventListener('mouseup', onUp, true); } catch (e) {}
            try { window.removeEventListener('blur', onWindowBlur, true); } catch (e) {}
            try { document.removeEventListener('visibilitychange', onVisibility, true); } catch (e) {}
            try { window.removeEventListener('keydown', onKey, true); } catch (e) {}
            if (EDITOR.raf) { try { window.cancelAnimationFrame(EDITOR.raf); } catch (e) {} }
            EDITOR.raf = null;
        };
        return true;
    }

    function editorDomOff() {
        try { EDITOR.domOff?.(); } catch (e) {}
        EDITOR.domOff = null;
    }

    addDisposer(() => {
        try { editorDomOff(); } catch (e) {}
        try { editorRemoveToolbar(); } catch (e) {}
        try { EDITOR.layer?.removeAllFeatures?.(); } catch (e) {}
        try { getOlMap()?.removeLayer?.(EDITOR.layer); } catch (e) {}
        EDITOR.layer = null;
    });


    const SMOOTH = {
        lastBefore: null,
        defaults: {
            minDist: 0.5,
            maxPoints: 5000,
        },
    };

    function ringIsClosed(ring) {
        if (!Array.isArray(ring) || ring.length < 2) return false;
        const a = ring[0], b = ring[ring.length - 1];
        return a[0] === b[0] && a[1] === b[1];
    }

    function ringClose(ringOpen) {
        if (!Array.isArray(ringOpen) || ringOpen.length === 0) return ringOpen;
        const first = ringOpen[0];
        const last = ringOpen[ringOpen.length - 1];
        if (last[0] === first[0] && last[1] === first[1]) return ringOpen;
        return ringOpen.concat([[first[0], first[1]]]);
    }

    function dist2(a, b) {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        return dx * dx + dy * dy;
    }

    function ringSanitizeClosed(ringClosed, opts = {}) {
        const minDist = Number.isFinite(opts.minDist) ? opts.minDist : SMOOTH.defaults.minDist;
        const maxPoints = Number.isFinite(opts.maxPoints) ? opts.maxPoints : SMOOTH.defaults.maxPoints;

        if (!Array.isArray(ringClosed)) return { ok: false, reason: 'not-array', ring: null };
        if (ringClosed.length < 4) return { ok: false, reason: 'too-few-points', ring: null };

        let ring = ringIsClosed(ringClosed) ? ringClosed.slice() : ringClose(ringClosed.slice());
        if (ring.length > 2) {
            const n = ring.length;
            const a = ring[n - 1], b = ring[n - 2], f = ring[0];
            if (a[0] === f[0] && a[1] === f[1] && b[0] === f[0] && b[1] === f[1]) {
                ring.splice(n - 1, 1);
            }
        }

        let open = ring.slice(0, -1);
        const out = [];
        const minD2 = minDist * minDist;

        for (let i = 0; i < open.length; i++) {
            const p = open[i];
            if (!p || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) continue;

            if (out.length === 0) {
                out.push([p[0], p[1]]);
                continue;
            }

            const prev = out[out.length - 1];
            if (dist2(prev, p) <= minD2) continue;

            out.push([p[0], p[1]]);
            if (out.length > maxPoints) return { ok: false, reason: 'too-many-points', ring: null };
        }

        if (out.length < 3) return { ok: false, reason: 'collapsed-after-sanitize', ring: null };

        const closed = ringClose(out);

        if (closed.length < 4) return { ok: false, reason: 'invalid-closed', ring: null };

        return { ok: true, reason: 'ok', ring: closed };
    }

    function ringSignedArea(openRing) {
        const pts = ringIsClosed(openRing) ? openRing.slice(0, -1) : (openRing || []);
        if (!pts || pts.length < 3) return 0;
        let area = 0;
        for (let i = 0; i < pts.length; i++) {
            const a = pts[i];
            const b = pts[(i + 1) % pts.length];
            area += (a[0] * b[1]) - (b[0] * a[1]);
        }
        return area / 2;
    }

    function pointsAlmostEqual(a, b, eps = 0.001) {
        return !!(a && b && Math.abs(a[0] - b[0]) <= eps && Math.abs(a[1] - b[1]) <= eps);
    }

    function orient2d(a, b, c) {
        return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
    }

    function pointOnSegment(a, b, p, eps = 0.001) {
        if (Math.abs(orient2d(a, b, p)) > eps) return false;
        return p[0] >= Math.min(a[0], b[0]) - eps &&
               p[0] <= Math.max(a[0], b[0]) + eps &&
               p[1] >= Math.min(a[1], b[1]) - eps &&
               p[1] <= Math.max(a[1], b[1]) + eps;
    }

    function segmentsIntersectStrict(a, b, c, d, eps = 0.001) {
        if (pointsAlmostEqual(a, c, eps) || pointsAlmostEqual(a, d, eps) || pointsAlmostEqual(b, c, eps) || pointsAlmostEqual(b, d, eps)) return false;

        const o1 = orient2d(a, b, c);
        const o2 = orient2d(a, b, d);
        const o3 = orient2d(c, d, a);
        const o4 = orient2d(c, d, b);

        if (((o1 > eps && o2 < -eps) || (o1 < -eps && o2 > eps)) &&
            ((o3 > eps && o4 < -eps) || (o3 < -eps && o4 > eps))) {
            return true;
        }

        if (Math.abs(o1) <= eps && pointOnSegment(a, b, c, eps)) return true;
        if (Math.abs(o2) <= eps && pointOnSegment(a, b, d, eps)) return true;
        if (Math.abs(o3) <= eps && pointOnSegment(c, d, a, eps)) return true;
        if (Math.abs(o4) <= eps && pointOnSegment(c, d, b, eps)) return true;

        return false;
    }

    function ringHasSelfIntersections(openRing) {
        const pts = ringIsClosed(openRing) ? openRing.slice(0, -1) : (openRing || []);
        const n = pts.length;
        if (n < 4) return false;

        for (let i = 0; i < n; i++) {
            const a = pts[i];
            const b = pts[(i + 1) % n];

            for (let j = i + 1; j < n; j++) {
                const adjacent = j === i || j === (i + 1) % n || i === (j + 1) % n;
                if (adjacent) continue;

                const c = pts[j];
                const d = pts[(j + 1) % n];

                if (segmentsIntersectStrict(a, b, c, d)) return true;
            }
        }

        return false;
    }


    function lineIntersectionPoint(a, b, c, d) {
        const x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1];
        const x3 = c[0], y3 = c[1], x4 = d[0], y4 = d[1];
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (Math.abs(den) < 1e-9) return null;

        const px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / den;
        const py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / den;
        return Number.isFinite(px) && Number.isFinite(py) ? [px, py] : null;
    }

    function getFirstRingSelfIntersection(openRing) {
        const pts = ringIsClosed(openRing) ? openRing.slice(0, -1) : (openRing || []);
        const n = pts.length;
        if (n < 4) return null;

        for (let i = 0; i < n; i++) {
            const a = pts[i];
            const b = pts[(i + 1) % n];

            for (let j = i + 1; j < n; j++) {
                const adjacent = j === i || j === (i + 1) % n || i === (j + 1) % n;
                if (adjacent) continue;

                const c = pts[j];
                const d = pts[(j + 1) % n];

                if (segmentsIntersectStrict(a, b, c, d)) {
                    return {
                        i,
                        j,
                        point: lineIntersectionPoint(a, b, c, d),
                    };
                }
            }
        }

        return null;
    }


    function ringHasSharpSpikes(openRing, minAngleDeg = 7) {
        const pts = ringIsClosed(openRing) ? openRing.slice(0, -1) : (openRing || []);
        if (pts.length < 3) return false;

        const minAngle = minAngleDeg * Math.PI / 180;
        for (let i = 0; i < pts.length; i++) {
            const A = pts[(i - 1 + pts.length) % pts.length];
            const B = pts[i];
            const C = pts[(i + 1) % pts.length];

            const BA = vec(A, B);
            const BC = vec(C, B);
            const lenBA = vlen(BA);
            const lenBC = vlen(BC);
            if (!lenBA || !lenBC) continue;

            const angle = angleBetween(vnorm(BA), vnorm(BC));
            if (Number.isFinite(angle) && angle < minAngle) return true;
        }

        return false;
    }

    function validateJbShapeRing(ringClosed, opts = {}) {
        const sani = ringSanitizeClosed(ringClosed, {
            minDist: opts.minDist ?? MANUAL.minVertexDist,
            maxPoints: opts.maxPoints ?? SMOOTH.defaults.maxPoints,
        });

        if (!sani.ok || !sani.ring) return { ok: false, reason: sani.reason || 'invalid-shape', ring: null };

        const open = sani.ring.slice(0, -1);
        if (open.length < 3) return { ok: false, reason: 'too-few-points', ring: null };

        const area = Math.abs(ringSignedArea(open));
        if (!Number.isFinite(area) || area < 1) return { ok: false, reason: 'too-small-area', ring: sani.ring };

        if (ringHasSelfIntersections(open)) return { ok: false, reason: 'self-intersection', ring: sani.ring };

        return { ok: true, reason: 'ok', ring: sani.ring };
    }

    function readableShapeValidationReason(reason) {
        switch (reason) {
            case 'self-intersection': return 'the polygon intersects itself. Move the crossing vertex or simplify the outline.';
            case 'sharp-spike': return 'one of the angles is too sharp. Widen that corner before creating the JB.';
            case 'too-few-points': return 'the polygon has too few points. A valid polygon needs at least 3 corners.';
            case 'too-small-area': return 'the polygon is too small or collapsed. Increase its size or separate overlapping points.';
            case 'too-many-points': return 'the polygon has too many points. Simplify the shape before creating the JB.';
            case 'collapsed-after-sanitize': return 'cleanup removed too many duplicate/near-duplicate points and the polygon collapsed.';
            case 'no-overlay-polygon': return 'there is no active polygon to create.';
            case 'no-ring-components': return 'the active shape has no readable polygon ring.';
            default: return reason || 'invalid geometry';
        }
    }

    function validationDetailLines(validation) {
        const reason = validation?.reason || 'invalid geometry';
        const lines = [readableShapeValidationReason(reason)];
        try {
            const ring = validation?.ring || getCurrentEditableRingClosed();
            const pts = ringIsClosed(ring) ? ring.slice(0, -1) : (ring || []);
            if (Array.isArray(pts)) lines.push(`Points: ${pts.length}`);
            const area = polygonAreaSqmFromRing(ring);
            if (Number.isFinite(area)) lines.push(`Area: ${formatAreaSqm(area)}`);
        } catch (e) {}
        if (reason === 'self-intersection') lines.push('Tip: drag the red/crossing area away or use Re-shape once, then adjust manually.');
        if (reason === 'too-few-points') lines.push('Tip: add more vertices by clicking an edge.');
        if (reason === 'too-small-area') lines.push('Tip: use the size slider or drag vertices outward.');
        return lines.filter(Boolean);
    }

    function getCurrentEditableRingClosed() {
        if (EDITOR.rawPoints && EDITOR.rawPoints.length >= 3) return editorOpenToClosed(EDITOR.rawPoints);
        return EDITOR.previewRing || overlayGetRingMercClosed();
    }

    function ringCentroid(openRing) {
        const pts = ringIsClosed(openRing) ? openRing.slice(0, -1) : (openRing || []);
        if (!pts.length) return null;
        let x = 0;
        let y = 0;
        for (const p of pts) {
            x += p[0];
            y += p[1];
        }
        return [x / pts.length, y / pts.length];
    }

    function dedupeOpenRing(openRing) {
        const out = [];
        for (const p of openRing || []) {
            if (!p || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) continue;
            if (out.some(q => pointsAlmostEqual(q, p, 0.001))) continue;
            out.push([p[0], p[1]]);
        }
        return out;
    }

    function untangleRingByAngle(ringClosed) {
        const sani = ringSanitizeClosed(ringClosed, { minDist: MANUAL.minVertexDist, maxPoints: SMOOTH.defaults.maxPoints });
        const open = dedupeOpenRing((sani.ring || ringClosed || []).slice(0, -1));
        if (open.length < 3) return null;

        const c = ringCentroid(open);
        if (!c) return null;

        const sorted = open.slice().sort((a, b) => Math.atan2(a[1] - c[1], a[0] - c[0]) - Math.atan2(b[1] - c[1], b[0] - c[0]));
        return ringClose(sorted);
    }

    function convexHullRing(ringClosed) {
        const pts = dedupeOpenRing((ringIsClosed(ringClosed) ? ringClosed.slice(0, -1) : (ringClosed || [])).slice());
        if (pts.length < 3) return null;

        pts.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

        const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
        const lower = [];
        for (const p of pts) {
            while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
            lower.push(p);
        }

        const upper = [];
        for (let i = pts.length - 1; i >= 0; i--) {
            const p = pts[i];
            while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
            upper.push(p);
        }

        const hull = lower.slice(0, -1).concat(upper.slice(0, -1));
        return hull.length >= 3 ? ringClose(hull) : null;
    }

    function tryMoveOneCrossingVertexToSafePlace(open, preferredIndex = null) {
        const pts = (open || []).map(p => [p[0], p[1]]);
        if (pts.length < 4) return null;

        const hit = getFirstRingSelfIntersection(pts);
        if (!hit) return null;

        const n = pts.length;
        const candidates = Array.from(new Set([
            preferredIndex,
            hit.i,
            (hit.i + 1) % n,
            hit.j,
            (hit.j + 1) % n,
        ].filter(v => Number.isInteger(v) && v >= 0 && v < n)));

        if (hit.point) {
            candidates.sort((a, b) => {
                if (a === preferredIndex) return -1;
                if (b === preferredIndex) return 1;
                return dist2(pts[a], hit.point) - dist2(pts[b], hit.point);
            });
        }

        for (const idx of candidates) {
            const prev = pts[(idx - 1 + n) % n];
            const next = pts[(idx + 1) % n];
            const mid = [(prev[0] + next[0]) / 2, (prev[1] + next[1]) / 2];

            const safeTargets = [
                mid,
                hit.point ? [(hit.point[0] + mid[0]) / 2, (hit.point[1] + mid[1]) / 2] : null,
                [(pts[idx][0] * 0.25) + mid[0] * 0.75, (pts[idx][1] * 0.25) + mid[1] * 0.75],
                [(pts[idx][0] * 0.1) + mid[0] * 0.9, (pts[idx][1] * 0.1) + mid[1] * 0.9],
            ].filter(Boolean);

            for (const target of safeTargets) {
                const copy = pts.map(p => [p[0], p[1]]);
                copy[idx] = target;
                const closed = ringClose(copy);
                const validation = validateJbShapeRing(closed, { minAngleDeg: 0 });
                if (validation.ok) return { index: idx, ring: validation.ring || closed };
            }
        }

        return null;
    }

    function reshapeInvalidShapeForRetry(validation) {
        const base = getCurrentEditableRingClosed() || validation?.ring;
        if (!base || !Array.isArray(base) || base.length < 4) return false;

        try {
            const open = ringIsClosed(base) ? base.slice(0, -1) : base.slice();
            const moved = tryMoveOneCrossingVertexToSafePlace(open, EDITOR.lastEditedIndex);
            if (!moved?.ring) return false;

            editorPushHistory('reshape-crossing-vertex');
            editorLoadFromRingClosed(moved.ring, { preserveRadius: false, preserveSize: true, renderOverlay: false });
            EDITOR.lastEditedIndex = moved.index;
            editorSetRadius(0);
            editorRenderOverlayFromRaw();
            refreshUiStatus();
            return true;
        } catch (e) {
            return false;
        }
    }

    function showInvalidShapeWarning(validation) {
        const reason = readableShapeValidationReason(validation?.reason);

        return new Promise((resolve) => {
            try { document.querySelector('.jbg-warning-toast')?.remove(); } catch (e) {}

            const toast = createEl('div', 'jbg-warning-toast');
            const textWrap = createEl('div', 'jbg-warning-text');
            textWrap.appendChild(createEl('div', 'jbg-warning-title', getUiText().validationDetailsTitle || 'Invalid Junction Box shape'));
            textWrap.appendChild(createEl('div', 'jbg-warning-message', validationDetailLines(validation).join('\n')));

            const actions = createEl('div', 'jbg-warning-actions');
            const closeBtn = createEl('button', 'jbg-warning-btn', 'Close');
            const reshapeBtn = createEl('button', 'jbg-warning-btn jbg-warning-btn-primary', 'Re-shape');
            closeBtn.type = 'button';
            reshapeBtn.type = 'button';

            actions.appendChild(closeBtn);
            actions.appendChild(reshapeBtn);
            toast.appendChild(textWrap);
            toast.appendChild(actions);
            document.body.appendChild(toast);

            const close = (value) => {
                try { toast.remove(); } catch (e) {}
                resolve(value);
            };

            closeBtn.addEventListener('click', () => close(false));
            reshapeBtn.addEventListener('click', () => {
                const ok = reshapeInvalidShapeForRetry(validation);
                if (ok) uiSetStep('Crossing vertex moved. Adjust the shape and try Create JB again.');
                else uiSetStep('Re-shape failed. Move the crossing vertices manually and try again.');
                refreshUiStatus();
                close(ok);
            });

            setTimeout(() => {
                try { toast.classList.add('is-visible'); } catch (e) {}
            }, 20);
        });
    }

    function overlayReadRingMercClosedSafe() {
        if (!overlayHasPolygon()) return { ok: false, reason: 'no-overlay-polygon', ring: null };

        const g = OVERLAY?.feature?.geometry;
        const ringPts = g?.components?.[0]?.components;
        if (!Array.isArray(ringPts) || ringPts.length < 3) return { ok: false, reason: 'no-ring-components', ring: null };

        const raw = ringPts.map(p => [p.x, p.y]);
        const closed = ringIsClosed(raw) ? raw : ringClose(raw);
        return { ok: true, reason: 'ok', ring: closed };
    }

    function smoothPrepValidate(opts = {}) {
        const read = overlayReadRingMercClosedSafe();
        if (!read.ok) return { ok: false, step: 'read', ...read };

        const sani = ringSanitizeClosed(read.ring, opts);
        return {
            ok: sani.ok,
            step: sani.ok ? 'sanitize' : 'sanitize',
            reason: sani.reason,
            beforeN: read.ring.length,
            afterN: sani.ring?.length ?? null,
            closed: sani.ring ? ringIsClosed(sani.ring) : false,
            ring: sani.ring,
        };
    }


    SMOOTH.defaults.radius = 10;
    SMOOTH.defaults.maxAngleStepDeg = 6;

    function ringSignedArea(openRing) {
        let area = 0;
        for (let i = 0; i < openRing.length; i++) {
            const a = openRing[i];
            const b = openRing[(i + 1) % openRing.length];
            area += (a[0] * b[1] - b[0] * a[1]);
        }
        return area / 2;
    }

    function vec(a, b) { return [a[0] - b[0], a[1] - b[1]]; }
    function vlen(v) { return Math.hypot(v[0], v[1]); }
    function vnorm(v) {
        const L = vlen(v);
        return L ? [v[0] / L, v[1] / L] : [0, 0];
    }
    function vdot(a, b) { return a[0] * b[0] + a[1] * b[1]; }
    function vadd(a, b) { return [a[0] + b[0], a[1] + b[1]]; }
    function vscale(v, s) { return [v[0] * s, v[1] * s]; }

    function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

    function angleBetween(u, v) {
        const c = clamp(vdot(u, v), -1, 1);
        return Math.acos(c);
    }

    function normalizeAngleRad(a) {
        while (a > Math.PI) a -= 2 * Math.PI;
        while (a < -Math.PI) a += 2 * Math.PI;
        return a;
    }

    function arcPointsByDelta(O, radius, a1, delta, maxStepDeg) {
        const deltaAbs = Math.abs(delta);
        const step = (maxStepDeg * Math.PI) / 180;
        const n = Math.max(2, Math.ceil(deltaAbs / step) + 1);

        const pts = [];
        for (let i = 0; i < n; i++) {
            const t = i / (n - 1);
            const ang = a1 + delta * t;
            pts.push([O[0] + Math.cos(ang) * radius, O[1] + Math.sin(ang) * radius]);
        }
        return pts;
    }

    function chooseFilletDelta(O, B, T1, T2) {
        const a1 = Math.atan2(T1[1] - O[1], T1[0] - O[0]);
        const a2 = Math.atan2(T2[1] - O[1], T2[0] - O[0]);

        let ccw = a2 - a1;
        while (ccw < 0) ccw += 2 * Math.PI;
        while (ccw >= 2 * Math.PI) ccw -= 2 * Math.PI;

        const cw = ccw - 2 * Math.PI;

        const r = Math.hypot(T1[0] - O[0], T1[1] - O[1]);

        const mid1 = a1 + ccw / 2;
        const Pccw = [O[0] + Math.cos(mid1) * r, O[1] + Math.sin(mid1) * r];

        const mid2 = a1 + cw / 2;
        const Pcw = [O[0] + Math.cos(mid2) * r, O[1] + Math.sin(mid2) * r];

        const d2ccw = dist2(Pccw, B);
        const d2cw = dist2(Pcw, B);

        return (d2ccw <= d2cw) ? ccw : cw;
    }

    function filletRingOpen(openRing, opts = {}) {
        const radius = Number.isFinite(opts.radius) ? opts.radius : SMOOTH.defaults.radius;
        const maxAngleStepDeg = Number.isFinite(opts.maxAngleStepDeg) ? opts.maxAngleStepDeg : SMOOTH.defaults.maxAngleStepDeg;
        const maxPoints = Number.isFinite(opts.maxPoints) ? opts.maxPoints : SMOOTH.defaults.maxPoints;

        if (!Array.isArray(openRing) || openRing.length < 3) return { ok: false, reason: 'ring-too-small', ring: null };

        const area = ringSignedArea(openRing);
        const isCCW = area > 0;

        const out = [];

        for (let i = 0; i < openRing.length; i++) {
            const A = openRing[(i - 1 + openRing.length) % openRing.length];
            const B = openRing[i];
            const C = openRing[(i + 1) % openRing.length];

            const BA = vec(A, B);
            const BC = vec(C, B);
            const lenBA = vlen(BA);
            const lenBC = vlen(BC);

            if (!lenBA || !lenBC) {
                out.push([B[0], B[1]]);
                continue;
            }

            const u = vnorm(BA);
            const v = vnorm(BC);

            const theta = angleBetween(u, v);

            if (!Number.isFinite(theta) || theta > (179 * Math.PI / 180) || theta < (1 * Math.PI / 180)) {
                out.push([B[0], B[1]]);
                continue;
            }

            const tanHalf = Math.tan(theta / 2);
            if (!tanHalf) {
                out.push([B[0], B[1]]);
                continue;
            }

            const tMax = 0.45 * Math.min(lenBA, lenBC);

            let rLocal = radius;
            let t = rLocal / tanHalf;
            if (t > tMax) {
                rLocal = tMax * tanHalf;
                t = rLocal / tanHalf;
            }

            if (!Number.isFinite(rLocal) || rLocal <= 0 || !Number.isFinite(t) || t <= 0) {
                out.push([B[0], B[1]]);
                continue;
            }

            const T1 = vadd(B, vscale(u, t));
            const T2 = vadd(B, vscale(v, t));

            const w = vnorm(vadd(u, v));
            const sinHalf = Math.sin(theta / 2);
            if (!sinHalf) {
                out.push([B[0], B[1]]);
                continue;
            }

            const d = rLocal / sinHalf;

            const O1 = vadd(B, vscale(w, d));
            const O2 = vadd(B, vscale(w, -d));

            const err = (O) => {
                const r1 = Math.hypot(T1[0] - O[0], T1[1] - O[1]);
                const r2 = Math.hypot(T2[0] - O[0], T2[1] - O[1]);
                return Math.abs(r1 - rLocal) + Math.abs(r2 - rLocal);
            };
            const O = (err(O1) <= err(O2)) ? O1 : O2;

            const a1 = Math.atan2(T1[1] - O[1], T1[0] - O[0]);
            const delta = chooseFilletDelta(O, B, T1, T2);

            const arc = arcPointsByDelta(
                O,
                rLocal,
                a1,
                delta,
                maxAngleStepDeg
            );

            for (let k = 0; k < arc.length; k++) {
                const p = arc[k];
                const prev = out[out.length - 1];
                if (prev && dist2(prev, p) <= 1e-6) continue;
                out.push(p);
                if (out.length > maxPoints) return { ok: false, reason: 'too-many-points', ring: null };
            }
        }

        return { ok: true, reason: 'ok', ring: out };
    }

    function overlayReplacePolygonFromRingClosed(mercRingClosed) {
        return overlaySetPolygonFromMercRing(mercRingClosed);
    }

    function smoothApplyFillet(opts = {}) {
        try { transformStop('smooth-apply'); } catch (e) {}

        const prep = smoothPrepValidate(opts);
        if (!prep.ok) return { ok: false, step: prep.step, reason: prep.reason };

        const open = prep.ring.slice(0, -1);

        try { SMOOTH.lastBefore = geomCloneSafe(OVERLAY.feature.geometry); } catch (e) { SMOOTH.lastBefore = null; }

        const fil = filletRingOpen(open, opts);
        if (!fil.ok) return { ok: false, step: 'fillet', reason: fil.reason };

        const closed = ringClose(fil.ring);

        const ok = overlayReplacePolygonFromRingClosed(closed);
        return { ok: !!ok, step: 'apply', reason: ok ? 'ok' : 'apply-failed', beforeN: prep.beforeN, afterN: closed.length };
    }


    function overlayClear() {
        if (!OVERLAY.layer) return;
        try { OVERLAY.layer.removeAllFeatures(); } catch (e) {}
        OVERLAY.feature = null;
        try { editorClear(); } catch (e) {}

        try { dbgRenderRole('source', null); dbgRenderRole('fixed', null); } catch (e) {}
        try { dbgRenderRole('bbox_source', null); dbgRenderRole('bbox_fixed', null); } catch (e) {}

        dbgClearCommitted();

        try { transformStop('overlay-clear'); } catch (e) {}
        try { manualCancel('overlay-clear'); } catch (e) {}
        try { cancelInput('overlay-clear'); } catch (e) {}
        try { editorCancelInteraction('overlay-clear'); } catch (e) {}
        try { releaseExternalJbSketch('overlay-clear'); } catch (e) {}

        log('Overlay: cleared');
    }

    function overlayEnableDraw() {
        const layer = ensureOverlayLayer();
        const olMap = getOlMap();
        if (!layer || !olMap) return false;

        try { transformStop('draw-on'); } catch (e) {}

        if (!OVERLAY.drawCtrl) {
            OVERLAY.drawCtrl = new OpenLayers.Control.DrawFeature(
                layer,
                OpenLayers.Handler.Polygon,
                {}
            );

            try { olMap.addControl(OVERLAY.drawCtrl); } catch (e) {
                try { W?.map?.addControl?.(OVERLAY.drawCtrl); } catch (_) {}
            }

            layer.events.register('featureadded', layer, (e) => {
                try {
                    const ft = e?.feature;
                    if (!ft) return;

                    if (OVERLAY.feature && OVERLAY.feature !== ft) {
                        try { layer.removeFeatures([OVERLAY.feature]); } catch (_) {}
                    }
                    OVERLAY.feature = ft;

                    try { dbgRenderRole('source', ft.geometry); } catch (_) {}
                    try { dbgRenderBBoxFor('source', ft.geometry); } catch (_) {}

                    try { dbgClearCommitted(); } catch (_) {}
                    try { OVERLAY.drawCtrl?.deactivate?.(); } catch (_) {}

                    try { transformResetBaseline(); } catch (_) {}

                    log('Overlay: feature added (draw deactivated)', { id: ft.id });
                } catch (err) {
                    console.error(err);
                }
            });
        }

        try { OVERLAY.drawCtrl.activate(); } catch (e) {}
        log('Overlay: draw ON');
        return true;
    }

    function overlayDisableTools() {
        try { OVERLAY.drawCtrl?.deactivate?.(); } catch (e) {}
        log('Overlay: tools OFF');
    }

    addDisposer(() => {
        try { overlayDisableTools(); } catch (e) {}
        try {
            const olMap = getOlMap();
            if (olMap && OVERLAY.drawCtrl) olMap.removeControl(OVERLAY.drawCtrl);
        } catch (e) {}
        try {
            const olMap = getOlMap();
            if (olMap && OVERLAY.layer) olMap.removeLayer(OVERLAY.layer);
        } catch (e) {}
        OVERLAY.layer = null;
        OVERLAY.drawCtrl = null;
        OVERLAY.feature = null;
    });


    function buildCircleFromCenterRadius(center, radiusPoint, segments = 64) {
        const R = vecLen(vecSub(radiusPoint, center));
        if (!R || R <= 0) return null;

        const pts = [];
        for (let i = 0; i < segments; i++) {
            const theta = (i / segments) * 2 * Math.PI;
            const x = center[0] + R * Math.cos(theta);
            const y = center[1] + R * Math.sin(theta);
            pts.push([x, y]);
        }
        pts.push(pts[0]);
        return pts;
    }


    const TRANSFORM = {
        mode: null,
        baseline: null,
        sessionOrig: null,
        active: false,
        workGeom: null,

        down: false,
        startPt: null,
        startGeom: null,
        center: null,
        startAng: 0,
        prevPt: null,

        off: null,
    };

    function overlayHasPolygon() {
        const g = OVERLAY?.feature?.geometry;
        return !!g && (g.CLASS_NAME === 'OpenLayers.Geometry.Polygon');
    }

    function geomCloneSafe(g) {
        try { return (g && typeof g.clone === 'function') ? g.clone() : null; } catch (e) { return null; }
    }

    function geomApplyAndRedraw(ft) {
        if (!ft || !OVERLAY.layer) return;

        try { ft.geometry.calculateBounds?.(); } catch (e) {}

        try { OVERLAY.layer.removeFeatures?.([ft], { silent: true }); } catch (e) {}

        try { OVERLAY.layer.addFeatures?.([ft]); } catch (e) {}

        try { OVERLAY.layer.redraw?.(); } catch (e) {}
    }

    function geomApplyAndRedrawThrottled(ft) {
        if (!ft || !OVERLAY.layer) return;
        try { OVERLAY.layer.redraw?.(); } catch (e) {}
    }


    function copyGeometryXY(dst, src) {
        if (!dst || !src) return;

        if (dst.CLASS_NAME === 'OpenLayers.Geometry.Point') {
            dst.x = src.x;
            dst.y = src.y;
            return;
        }

        const dc = dst.components;
        const sc = src.components;
        if (Array.isArray(dc) && Array.isArray(sc) && dc.length === sc.length) {
            for (let i = 0; i < dc.length; i++) copyGeometryXY(dc[i], sc[i]);
        }
    }

    function translateGeometry(geom, dx, dy) {
        if (!geom) return;

        const cls = geom.CLASS_NAME;
        if (cls === 'OpenLayers.Geometry.Point') {
            geom.x += dx;
            geom.y += dy;
            return;
        }
        if (Array.isArray(geom.components)) {
            for (const c of geom.components) translateGeometry(c, dx, dy);
            return;
        }

        try {
            const verts = geom.getVertices?.();
            if (Array.isArray(verts)) {
                for (const v of verts) {
                    v.x += dx;
                    v.y += dy;
                }
            }
        } catch (e) {}
    }

    function rotatePointAround(p, cx, cy, angRad) {
        const x = p.x - cx;
        const y = p.y - cy;
        const cos = Math.cos(angRad);
        const sin = Math.sin(angRad);
        const rx = x * cos - y * sin;
        const ry = x * sin + y * cos;
        p.x = rx + cx;
        p.y = ry + cy;
    }

    function rotateGeometry(geom, cx, cy, angRad) {
        if (!geom) return;

        const cls = geom.CLASS_NAME;
        if (cls === 'OpenLayers.Geometry.Point') {
            rotatePointAround(geom, cx, cy, angRad);
            return;
        }
        if (Array.isArray(geom.components)) {
            for (const c of geom.components) rotateGeometry(c, cx, cy, angRad);
            return;
        }

        try {
            const verts = geom.getVertices?.();
            if (Array.isArray(verts)) {
                for (const v of verts) rotatePointAround(v, cx, cy, angRad);
            }
        } catch (e) {}
    }

    function getOverlayCentroidXY() {
        const g = OVERLAY?.feature?.geometry;
        if (!g) return null;

        try {
            const c = g.getCentroid?.();
            if (c) return [c.x, c.y];
        } catch (e) {}

        try {
            const b = g.getBounds?.() || g.bounds;
            if (b) return [(b.left + b.right) / 2, (b.bottom + b.top) / 2];
        } catch (e) {}

        return null;
    }

    function pointInsideOverlay(ptXY) {
        const g = OVERLAY?.feature?.geometry;
        if (!g || !ptXY) return false;
        try {
            const p = new OpenLayers.Geometry.Point(ptXY[0], ptXY[1]);
            return !!g.containsPoint?.(p);
        } catch (e) {
            return false;
        }
    }

    function transformResetBaseline() {
        const g = OVERLAY?.feature?.geometry;
        TRANSFORM.baseline = geomCloneSafe(g);
    }

    function transformDomOff() {
        try { TRANSFORM.off?.(); } catch (e) {}
        TRANSFORM.off = null;
    }

    function transformDomOn() {
        const olMap = getOlMap();
        const div = olMap?.viewPortDiv;
        if (!div) return false;

        const onDown = (evt) => {
            if (!TRANSFORM.active || !TRANSFORM.mode) return;
            if (!overlayHasPolygon()) return;

            const p = getMercFromMapEvent(evt);
            if (!p) return;

            if (!pointInsideOverlay(p)) return;

            TRANSFORM.down = true;
            TRANSFORM.startPt = p;
            TRANSFORM.startGeom = geomCloneSafe(OVERLAY.feature.geometry);
            TRANSFORM.prevPt = p;

            if (TRANSFORM.mode === 'rotate') {
                const c = getOverlayCentroidXY();
                TRANSFORM.center = c;
                if (c) TRANSFORM.startAng = Math.atan2(p[1] - c[1], p[0] - c[0]);
            } else {
                TRANSFORM.center = null;
                TRANSFORM.startAng = 0;
            }

            try { evt.preventDefault(); } catch (e) {}
            try { evt.stopPropagation(); } catch (e) {}
        };

        const onMove = (evt) => {
            if (!TRANSFORM.active || !TRANSFORM.mode) return;
            if (!TRANSFORM.down) return;

            const p = getMercFromMapEvent(evt);
            if (!p) return;

            const ft = OVERLAY.feature;

            if (!ft) return;

            TRANSFORM.workGeom = ft.geometry;
            TRANSFORM.startGeom = geomCloneSafe(ft.geometry);
            if (!ft) return;

            if (!TRANSFORM.startGeom) return;

            if (TRANSFORM.mode === 'move') {
                const dx = p[0] - TRANSFORM.prevPt[0];
                const dy = p[1] - TRANSFORM.prevPt[1];
                TRANSFORM.prevPt = p;

                const wg = TRANSFORM.workGeom;
                if (!wg) return;

                wg.move(dx, dy);
                geomApplyAndRedraw(ft);
            }

            if (TRANSFORM.mode === 'rotate') {
                const c = TRANSFORM.center;
                if (!c) return;

                const ang = Math.atan2(p[1] - c[1], p[0] - c[0]);
                const delta = ang - TRANSFORM.startAng;

                const wg = TRANSFORM.workGeom;
                const sg = TRANSFORM.startGeom;
                if (!wg || !sg) return;

                copyGeometryXY(wg, sg);
                wg.rotate(delta, new OpenLayers.Geometry.Point(c[0], c[1]));
                geomApplyAndRedraw(ft);
            }

            try { evt.preventDefault(); } catch (e) {}
            try { evt.stopPropagation(); } catch (e) {}
        };

        const onUp = (evt) => {
            if (!TRANSFORM.active || !TRANSFORM.mode) return;
            if (!TRANSFORM.down) return;
            TRANSFORM.down = false;
            TRANSFORM.workGeom = null;
            TRANSFORM.startPt = null;
            TRANSFORM.startGeom = null;
            TRANSFORM.center = null;
            TRANSFORM.startAng = 0;
            TRANSFORM.prevPt = null;

            try { evt.preventDefault(); } catch (e) {}
            try { evt.stopPropagation(); } catch (e) {}
        };

        div.addEventListener('mousedown', onDown, true);
        div.addEventListener('mousemove', onMove, true);
        window.addEventListener('mouseup', onUp, true);

        TRANSFORM.off = () => {
            try { div.removeEventListener('mousedown', onDown, true); } catch (e) {}
            try { div.removeEventListener('mousemove', onMove, true); } catch (e) {}
            try { window.removeEventListener('mouseup', onUp, true); } catch (e) {}
        };

        return true;
    }

    function transformStop(reason = 'stop', opts = {}) {
        const { keepNav = false, keepSession = false } = opts || {};

        TRANSFORM.active = false;
        TRANSFORM.down = false;
        TRANSFORM.startPt = null;
        TRANSFORM.startGeom = null;
        TRANSFORM.center = null;
        TRANSFORM.startAng = 0;
        TRANSFORM.prevPt = null;
        TRANSFORM.workGeom = null;
        transformDomOff();

        if (!keepNav) restoreNavigation();
        if (!keepSession) TRANSFORM.sessionOrig = null;

        TRANSFORM.mode = null;

        try { mapEventsOff(); } catch (e) {}

        log('Transform stopped:', reason);
        return true;
    }

    function transformStart(mode) {
        if (mode !== 'move' && mode !== 'rotate') return false;

        if (!overlayHasPolygon()) {
            uiSetStep('Transform: Draw/Create overlay first.');
            refreshUiStatus();
            return false;
        }

        try { cancelInput('transform-start'); } catch (e) {}
        try { OVERLAY.drawCtrl?.deactivate?.(); } catch (e) {}

        const nav = findNavControl();
        CTRL.prevNavActive = !!nav?.active;
        try { nav?.deactivate?.(); } catch (e) {}

        TRANSFORM.sessionOrig = geomCloneSafe(OVERLAY.feature.geometry);

        if (!TRANSFORM.baseline) transformResetBaseline();

        transformStop('switch-mode', { keepNav: true, keepSession: true });

        TRANSFORM.mode = mode;
        TRANSFORM.active = true;

        if (!transformDomOn()) {
            TRANSFORM.active = false;
            TRANSFORM.mode = null;
            uiSetStep('Transform: map div not found.');
            refreshUiStatus();
            return false;
        }

        uiSetStep(mode === 'move'
                  ? 'Move mode: Click-hold ON the overlay and drag. Then Apply / Cancel.'
                  : 'Rotate mode: Click-hold ON the overlay and move mouse to rotate. Then Apply / Cancel.'
                 );
        refreshUiStatus();
        return true;
    }

    function transformApply() {
        if (!TRANSFORM.mode) return false;
        if (!overlayHasPolygon()) return false;

        transformResetBaseline();
        transformStop('apply', { keepNav: false, keepSession: false });

        uiSetStep('Transform applied ✔');
        refreshUiStatus();
        return true;
    }


    addDisposer(() => {
        try { transformStop('dispose'); } catch (e) {}
        TRANSFORM.baseline = null;
        TRANSFORM.sessionOrig = null;
    });


    const UI = {
        registered: false,
        tab: null,
        statusEl: null,
        btnClear: null,
        btnCreate: null,
        btnRecreate: null,
        btnCopyPasteJb: null,
        recreateEditTarget: null,
        recreateEditKey: null,
        recreateTurnSnapshot: null,
        editCard: null,
        colorCard: null,
        actionCard: null,
        clickedJbRing: null,
        copiedJbRing: null,
        copiedJbKey: null,
        lastSelectedJbKey: null,
        clickedJbAt: 0,
        clickCaptureInstalled: false,
        retryTimer: null,
        retryStarted: false,
    };

    function setUiStatus(lines) {
        if (!UI.statusEl) return false;
        try {
            UI.statusEl.textContent = Array.isArray(lines) ? lines.filter(Boolean).join('\n') : String(lines || '');
            return true;
        } catch (e) {
            return false;
        }
    }

    function uiSetStep(text) {
        try {
            setUiStatus([
                UI.statusEl?.textContent || '',
                '',
                String(text || ''),
            ]);
        } catch (e) {}
    }

    function ringSignatureForCopy(ring) {
        if (!Array.isArray(ring) || ring.length < 4) return null;
        return ring
            .map(p => `${Number(p?.[0] || 0).toFixed(1)},${Number(p?.[1] || 0).toFixed(1)}`)
            .join('|');
    }

    function ringRoughBounds(ring) {
        const pts = ringIsClosed(ring) ? ring.slice(0, -1) : (ring || []);
        if (!pts.length) return null;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const p of pts) {
            const x = Number(p?.[0]);
            const y = Number(p?.[1]);
            if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        }
        if (!Number.isFinite(minX) || !Number.isFinite(minY) || !Number.isFinite(maxX) || !Number.isFinite(maxY)) return null;
        return { minX, minY, maxX, maxY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
    }

    function ringsLookSameEnough(a, b) {
        const ba = ringRoughBounds(a);
        const bb = ringRoughBounds(b);
        if (!ba || !bb) return false;
        const sizeA = Math.max(1, Math.hypot(ba.maxX - ba.minX, ba.maxY - ba.minY));
        const sizeB = Math.max(1, Math.hypot(bb.maxX - bb.minX, bb.maxY - bb.minY));
        const centerDist = Math.hypot(ba.cx - bb.cx, ba.cy - bb.cy);
        const sizeDist = Math.abs(sizeA - sizeB);
        return centerDist <= Math.max(4, sizeA * 0.035) && sizeDist <= Math.max(4, sizeA * 0.08);
    }

    function getRealSelectedJunctionBoxObject() {
        try {
            const selected = getSelectedJunctionBoxObjects();
            for (const obj of selected) {
                if (maybeJunctionBoxObject(obj)) return obj;
            }
        } catch (e) {}
        return null;
    }

    function getRealJunctionBoxObjectMatchingRing(ring) {
        if (!ring || ring.length < 4) return null;
        try {
            for (const obj of getJunctionBoxCandidateObjects({})) {
                if (!maybeJunctionBoxObject(obj)) continue;
                const objRing = getJunctionBoxRingFromObject(obj);
                if (objRing && ringsLookSameEnough(ring, objRing)) return obj;
            }
        } catch (e) {}
        return null;
    }

    function hasRealJunctionBoxSelectedOrClicked() {
        if (getRealSelectedJunctionBoxObject()) return true;
        if (UI.clickedJbRing && UI.clickedJbRing.length >= 4) return true;
        return false;
    }

    function getCurrentJunctionBoxCopyKey() {
        if (!hasRealJunctionBoxSelectedOrClicked()) return null;
        const ring = getJunctionBoxRingFromContext({});
        return ringSignatureForCopy(ring);
    }

    function ringCentroidMerc(ring) {
        const pts = ringIsClosed(ring) ? ring.slice(0, -1) : (ring || []);
        if (!pts.length) return null;
        let x = 0, y = 0;
        for (const p of pts) {
            x += Number(p?.[0] || 0);
            y += Number(p?.[1] || 0);
        }
        return [x / pts.length, y / pts.length];
    }







    function refreshUiStatus() {
        const overlayOk = !!OVERLAY?.feature?.geometry;
        const shapePlaced = editorHasPlacedShape();
        const currentRing = shapePlaced ? (EDITOR.previewRing || overlayGetRingMercClosed() || editorOpenToClosed(EDITOR.rawPoints || [])) : null;
        const validation = shapePlaced ? validateJbShapeRing(currentRing, { minAngleDeg: 7 }) : { ok: true, reason: 'ok' };
        EDITOR.lastValidation = validation;
        const shapeValid = !shapePlaced || validation.ok;
        const selectedJb = hasRealJunctionBoxSelectedOrClicked();
        const currentJbKey = selectedJb ? getCurrentJunctionBoxCopyKey() : null;
        if (currentJbKey && UI.copiedJbKey && currentJbKey !== UI.copiedJbKey && UI.lastSelectedJbKey !== currentJbKey) {
            UI.copiedJbRing = null;
            UI.copiedJbKey = null;
        }
        if (currentJbKey) UI.lastSelectedJbKey = currentJbKey;
        const copiedJb = !!(UI.copiedJbRing && UI.copiedJbRing.length >= 4);
        editorUpdateHistoryButtons();
        if (UI.editCard) UI.editCard.classList.toggle('is-disabled', !shapePlaced);
        if (UI.colorCard) UI.colorCard.classList.toggle('is-disabled', !shapePlaced || !shapeValid);
        if (UI.actionCard) UI.actionCard.classList.toggle('is-disabled', !(shapePlaced || selectedJb));
        if (EDITOR.ui.radius) EDITOR.ui.radius.disabled = !shapePlaced;
        if (EDITOR.ui.size) EDITOR.ui.size.disabled = !shapePlaced;
        if (EDITOR.ui.colorButtons) {
            for (const b of EDITOR.ui.colorButtons) b.disabled = !shapePlaced || !shapeValid;
        }
        if (UI.btnCreate) UI.btnCreate.disabled = !shapePlaced || !shapeValid;
        if (UI.btnClear) UI.btnClear.disabled = !shapePlaced;
        if (UI.btnRecreate) UI.btnRecreate.disabled = false;
        if (UI.btnCopyPasteJb) {
            UI.btnCopyPasteJb.disabled = !selectedJb;
            UI.btnCopyPasteJb.textContent = getUiText().replaceJb;
        }
        const cached = getCachedJbTool?.();
        const jbSeen = !!cached?.control;

        const drawing = !!W?.editingMediator?.attributes?.drawing;
        const nav = !!W?.editingMediator?.attributes?.navigation;

        const mode = TRANSFORM.mode ? `transform:${TRANSFORM.mode}` : (drawing ? 'drawing' : (nav ? 'navigation' : 'unknown'));

        const lines = [
            `Overlay: ${overlayOk ? 'OK ✅' : 'missing (Draw Overlay first)'}`,
            `Geometry: ${shapeValid ? 'valid ✅' : `blocked — ${readableShapeValidationReason(validation.reason)}`}`,
            `Selected JB: ${selectedJb ? 'detected ✅' : 'none'}`,
            `JB Tool: ${jbSeen ? 'detected ✅' : 'not detected (Click Create Junction )'}`,
            `Mode: ${mode}`,
            `Editor: ${EDITOR.rawPoints.length >= 3 ? `${EDITOR.rawPoints.length} vertices / radius ${Number(EDITOR.radius || 0).toFixed(0)}m` : 'no editable shape'}`,
        ];

        setUiStatus(lines);
    }


    function startRectangle2Lines() {
        uiSetStep('Rectangle: Click CENTER');
        log('Rectangle: pick CENTER');

        try { transformStop('rect-start'); } catch (e) {}

        cancelInput('rect-start');

        const nav = findNavControl();
        CTRL.prevNavActive = !!nav?.active;
        try { nav?.deactivate?.(); } catch (e) {}

        let center = null;

        mapOnClick((p) => {
            if (!center) {
                center = p;
                rubberStart(center);

                uiSetStep('Rectangle: Move mouse to preview, click to set CORNER');

                mapOnMove((m) => {
                    rubberUpdate(m);
                    const ring = buildRectangleFromCenterCorner(center, m);
                    if (ring) overlaySetPolygonFromMercRing(ring);
                });

                return;
            }

            const ring = buildRectangleFromCenterCorner(center, p);
            if (!ring) {
                uiSetStep('Rectangle: invalid corner');
                return;
            }

            overlaySetPolygonFromMercRing(ring);

            rubberStop();
            mapEventsOff();
            restoreNavigation();

            uiSetStep('Rectangle created ✔');
        });

        uiSetStep('Rectangle: Click CENTER');
        rubberStop();
    }

    function startCircleCenterRadius() {
        uiSetStep('Circle: Click CENTER');
        log('Circle: pick CENTER');

        try { transformStop('circle-start'); } catch (e) {}

        cancelInput('circle-start');

        const nav = findNavControl();
        CTRL.prevNavActive = !!nav?.active;
        try { nav?.deactivate?.(); } catch (e) {}

        let center = null;

        mapOnClick((p) => {
            if (!center) {
                center = p;
                rubberStart(center);

                uiSetStep('Circle: Move mouse to preview, click to set RADIUS');

                mapOnMove((m) => {
                    rubberUpdate(m);
                    const ring = buildCircleFromCenterRadius(center, m, 64);
                    if (ring) overlaySetPolygonFromMercRing(ring);
                });

                return;
            }

            const ring = buildCircleFromCenterRadius(center, p, 64);
            if (!ring) {
                uiSetStep('Circle: invalid radius');
                return;
            }

            overlaySetPolygonFromMercRing(ring);

            rubberStop();
            mapEventsOff();
            restoreNavigation();

            uiSetStep('Circle created ✔');
        });

        uiSetStep('Circle: Click CENTER');
        rubberStop();
    }


    const DEBUG = {
        layer: null,
        byRole: new Map(),
    };

    function dbgEnsureLayer() {
        if (DEBUG.layer) return DEBUG.layer;
        if (!window.OpenLayers) return null;

        const olMap = getOlMap();
        if (!olMap) return null;

        const layer = new OpenLayers.Layer.Vector('JB Debug', {
            displayInLayerSwitcher: false,
        });

        try { olMap.addLayer(layer); } catch (e) {
            try { W?.map?.addLayer?.(layer); } catch (_) {}
        }

        DEBUG.layer = layer;
        return layer;
    }

    function dbgStyleForRole(role) {
        switch (role) {
            case 'source': return { strokeWidth: 2, strokeOpacity: 0.9, fillOpacity: 0.05 };
            case 'fixed': return { strokeWidth: 3, strokeOpacity: 0.95, fillOpacity: 0.10 };
            case 'committed': return { strokeWidth: 4, strokeOpacity: 0.95, fillOpacity: 0.04, strokeDashstyle: 'solid' };
            case 'bbox_source': return { strokeWidth: 1, strokeOpacity: 0.9, fillOpacity: 0.0, strokeDashstyle: 'dash' };
            case 'bbox_fixed': return { strokeWidth: 1, strokeOpacity: 0.9, fillOpacity: 0.0, strokeDashstyle: 'dot' };
            case 'bbox_committed': return { strokeWidth: 1, strokeOpacity: 0.9, fillOpacity: 0.0, strokeDashstyle: 'dashdot' };
            default: return { strokeWidth: 2, strokeOpacity: 0.9, fillOpacity: 0.0 };
        }
    }

    function dbgClearRole(role) {
        const layer = DEBUG.layer;
        const ft = DEBUG.byRole.get(role);
        if (!layer || !ft) return;
        try { layer.removeFeatures([ft]); } catch (e) {}
        DEBUG.byRole.delete(role);
    }

    function dbgRenderRole(role, olGeometryOrNull) {
        const layer = dbgEnsureLayer();
        if (!layer) return false;

        if (!olGeometryOrNull) {
            dbgClearRole(role);
            try { layer.redraw?.(true); } catch (e) {}
            return true;
        }

        const geom = (typeof olGeometryOrNull.clone === 'function')
        ? olGeometryOrNull.clone()
        : olGeometryOrNull;

        dbgClearRole(role);

        const style = dbgStyleForRole(role);
        const ft = new OpenLayers.Feature.Vector(geom, { role }, style);
        try { layer.addFeatures([ft]); } catch (e) { return false; }

        DEBUG.byRole.set(role, ft);

        try { layer.redraw?.(true); } catch (e) {}
        try { getOlMap()?.redraw?.(true); } catch (e) {}

        return true;
    }

    function buildOl2BoundsRectPolygon(bounds) {
        if (!window.OpenLayers || !bounds) return null;

        const pts = [
            new OpenLayers.Geometry.Point(bounds.left, bounds.bottom),
            new OpenLayers.Geometry.Point(bounds.right, bounds.bottom),
            new OpenLayers.Geometry.Point(bounds.right, bounds.top),
            new OpenLayers.Geometry.Point(bounds.left, bounds.top),
            new OpenLayers.Geometry.Point(bounds.left, bounds.bottom),
        ];

        const ring = new OpenLayers.Geometry.LinearRing(pts);
        return new OpenLayers.Geometry.Polygon([ring]);
    }

    function dbgRenderBBoxFor(roleBase, geom) {
        const bboxRole = `bbox_${roleBase}`;
        if (!geom) return dbgRenderRole(bboxRole, null);

        const b = geom.getBounds?.() || geom.bounds;
        if (!b) return dbgRenderRole(bboxRole, null);

        const rect = buildOl2BoundsRectPolygon(b);
        return dbgRenderRole(bboxRole, rect);
    }

    function dbgClearCommitted() {
        try { dbgClearRole('committed'); } catch (e) {}
        try { dbgClearRole('bbox_committed'); } catch (e) {}
    }

    function dbgRemoveLayer() {
        const layer = DEBUG.layer;
        if (!layer) return;
        try { layer.removeAllFeatures(); } catch (e) {}
        DEBUG.byRole.clear();
        try { getOlMap()?.removeLayer?.(layer); } catch (e) {}
        DEBUG.layer = null;
    }


    const JB_TOOL = {
        control: null,
        handler: null,
        lastSeenAt: 0,
    };

    function clearJbToolCache() {
        JB_TOOL.control = null;
        JB_TOOL.handler = null;
        JB_TOOL.lastSeenAt = 0;
    }

    function releaseExternalJbSketch(reason = 'release') {
        try {
            const found = getCachedJbTool?.();
            if (found?.handler || found?.control) {
                try { resetJbSketchForInjection(found.handler, found.control); } catch (e) {}
                try { found.control?.deactivate?.(); } catch (e) {}
            }
        } catch (e) {}
        try { clearJbToolCache(); } catch (e) {}
        try { restoreNavigation(); } catch (e) {}
        try { editorSetMapCursor(''); } catch (e) {}
        return true;
    }

    function hardUnlockMap(reason = 'unlock') {
        try { editorCancelInteraction(reason); } catch (e) {}
        try { manualCancel(reason); } catch (e) {}
        try { cancelInput(reason); } catch (e) {}
        try { transformStop(reason); } catch (e) {}
        try { overlayDisableTools(); } catch (e) {}
        try { editorDomOff(); } catch (e) {}
        try { mapEventsOff(); } catch (e) {}
        try { manualDomOff(); } catch (e) {}
        try { transformDomOff(); } catch (e) {}
        try { releaseExternalJbSketch(reason); } catch (e) {}
        const olMap = getOlMap();

        try { EDITOR.layer?.removeAllFeatures?.(); } catch (e) {}
        try { if (EDITOR.layer) olMap?.removeLayer?.(EDITOR.layer); } catch (e) {}
        EDITOR.layer = null;
        EDITOR.handles = [];

        try { OVERLAY.drawCtrl?.deactivate?.(); } catch (e) {}
        try { OVERLAY.layer?.removeAllFeatures?.(); } catch (e) {}
        try { if (OVERLAY.layer) olMap?.removeLayer?.(OVERLAY.layer); } catch (e) {}
        OVERLAY.layer = null;
        OVERLAY.feature = null;
        OVERLAY.drawCtrl = null;

        try { INPUT.layer?.removeAllFeatures?.(); } catch (e) {}
        try { editorRemoveToolbar(); } catch (e) {}
        try { document.body.style.cursor = ''; } catch (e) {}
        try { getMapDiv()?.style && (getMapDiv().style.cursor = ''); } catch (e) {}
        try { restoreNavigation(); } catch (e) {}
        try { softResetWmeMode(reason); } catch (e) {}
        return true;
    }


    function softResetWmeMode(reason = 'recover') {
        try {
            const evtBase = { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true, cancelable: true };
            for (const target of [window, document, document.body, getMapDiv()].filter(Boolean)) {
                try { target.dispatchEvent(new KeyboardEvent('keydown', evtBase)); } catch (e) {}
                try { target.dispatchEvent(new KeyboardEvent('keyup', evtBase)); } catch (e) {}
            }
        } catch (e) {}

        try {
            const em = W?.editingMediator;
            if (em?.set) {
                try { em.set('drawing', false); } catch (e) {}
                try { em.set('navigation', true); } catch (e) {}
                try { em.set({ drawing: false, navigation: true }); } catch (e) {}
            }
        } catch (e) {}

        try {
            const nav = findNavControl();
            if (nav && !nav.active) nav.activate?.();
        } catch (e) {}

        try { document.body.style.cursor = ''; } catch (e) {}
        try { getMapDiv()?.style && (getMapDiv().style.cursor = ''); } catch (e) {}

        window.setTimeout(() => {
            try {
                const nav = findNavControl();
                if (nav && !nav.active) nav.activate?.();
            } catch (e) {}
            try { document.body.style.cursor = ''; } catch (e) {}
            try { getMapDiv()?.style && (getMapDiv().style.cursor = ''); } catch (e) {}
        }, 80);

        return true;
    }

    function forceWmeEditRecovery(reason = 'recover') {
        try { editorCancelInteraction(reason); } catch (e) {}
        try { manualCancel(reason); } catch (e) {}
        try { cancelInput(reason); } catch (e) {}
        try { transformStop(reason); } catch (e) {}
        try { mapEventsOff(); } catch (e) {}
        try { editorDomOff(); } catch (e) {}
        try { transformDomOff(); } catch (e) {}
        try { releaseExternalJbSketch(reason); } catch (e) {}
        try { softResetWmeMode(reason); } catch (e) {}
        return true;
    }


    function findSketchDrawControlAny() {
        const olMap = getOlMap();
        const ctrls = olMap?.controls || [];
        for (const c of ctrls) {
            if (c?.CLASS_NAME !== 'OpenLayers.Control.DrawFeature') continue;
            if (c?.layer?.name !== 'sketch') continue;

            const h = c?.handler;
            if ((h?.CLASS_NAME || h?.constructor?.name) !== 'OpenLayers.Handler.Polygon') continue;
            if (c === OVERLAY.drawCtrl) continue;

            if (!h?.layer && !c?.layer) continue;

            return { control: c, handler: h };
        }
        return null;
    }

    function refreshJbToolCache() {
        const found = findSketchDrawControlAny();
        if (!found) return null;

        JB_TOOL.control = found.control;
        JB_TOOL.handler = found.handler;
        JB_TOOL.lastSeenAt = Date.now();
        return found;
    }

    function getCachedJbTool() {
        const nowFound = refreshJbToolCache();
        if (nowFound) return nowFound;

        if (JB_TOOL.control && JB_TOOL.handler) return { control: JB_TOOL.control, handler: JB_TOOL.handler };
        return null;
    }

    function ensureJbToolActive() {
        const found = getCachedJbTool();
        if (!found) return null;

        const { control: c } = found;
        try { if (!c.active && typeof c.activate === 'function') c.activate(); } catch (e) {}
        return found;
    }

    function getBigJunctionsLayerOl() {
        const olMap = getOlMap();
        return (olMap?.layers || []).find(l => l?.name === 'big_junctions') || null;
    }

    function snapshotBigJunctionFeatureIds() {
        const bj = getBigJunctionsLayerOl();
        const feats = bj?.features || [];
        return new Set(feats.map(f => f?.id).filter(Boolean));
    }

    function findNewBigJunctionFeature(beforeIds) {
        const bj = getBigJunctionsLayerOl();
        const feats = bj?.features || [];
        for (const f of feats) {
            const id = f?.id;
            if (id && !beforeIds.has(id)) return f;
        }
        return null;
    }

    function waitForCommittedBigJunction({ beforeIds, timeoutMs = 2500, pollMs = 100 }) {
        const started = Date.now();

        return new Promise((resolve) => {
            const t = window.setInterval(() => {
                const f = findNewBigJunctionFeature(beforeIds);
                if (f) {
                    window.clearInterval(t);
                    resolve(f);
                    return;
                }
                if (Date.now() - started >= timeoutMs) {
                    window.clearInterval(t);
                    resolve(null);
                }
            }, pollMs);

            state.timers.add(t);
        });
    }

    function buildOlPolygonFromOverlay() {
        const g = OVERLAY?.feature?.geometry;
        if (!g) return null;
        const cls = g.CLASS_NAME || g.constructor?.name;
        if (cls !== 'OpenLayers.Geometry.Polygon') {
            log('CreateBridge: overlay geometry is not Polygon', cls);
            return null;
        }
        return (typeof g.clone === 'function') ? g.clone() : g;
    }

    function resetJbSketchForInjection(h, control = null) {
        const layer = h?.layer || control?.layer || h?.control?.layer || null;
        try {
            const features = (layer?.features || []).slice();
            const sketchPolys = features.filter(f => f?.geometry?.CLASS_NAME === 'OpenLayers.Geometry.Polygon');
            if (sketchPolys.length) layer.removeFeatures(sketchPolys);
        } catch (e) {}

        try { h.polygon = null; } catch (e) {}
        try { h.feature = null; } catch (e) {}
        try { h.geometry = null; } catch (e) {}
    }

    function ensureJbHandlerPolygon(h, olPoly, control = null) {
        if (!h || !olPoly || !window.OpenLayers) return null;

        const layer = h.layer || control?.layer || h?.control?.layer || null;
        if (!layer) return null;

        const clone = () => {
            try { return typeof olPoly.clone === 'function' ? olPoly.clone() : olPoly; } catch (e) { return olPoly; }
        };

        let ft = h.polygon || null;

        if (ft && !ft.geometry && ft.CLASS_NAME === 'OpenLayers.Geometry.Polygon') {
            ft = new OpenLayers.Feature.Vector(ft, { role: 'jb-create-polygon' });
            h.polygon = ft;
        }

        if (!ft || !ft.geometry) {
            const existing = (layer.features || []).find(
                f => f?.geometry?.CLASS_NAME === 'OpenLayers.Geometry.Polygon'
            );
            ft = existing || new OpenLayers.Feature.Vector(clone(), { role: 'jb-create-polygon' });
            h.polygon = ft;

            if (!existing) {
                try { layer.addFeatures([ft]); } catch (e) {}
            }
        }

        const geom = clone();
        ft.geometry = geom;
        h.polygon = ft;

        try { h.feature = ft; } catch (e) {}
        try { h.geometry = geom; } catch (e) {}

        try {
            const feats = layer.features || [];
            if (!feats.includes(ft)) layer.addFeatures([ft]);
        } catch (e) {}

        try { ft.geometry.calculateBounds?.(); } catch (e) {}
        try { ft.layer = layer; } catch (e) {}
        try { layer.drawFeature?.(ft); } catch (e) {}
        try { layer.redraw?.(true); } catch (e) {}

        return ft?.geometry ? ft : null;
    }

    function createJbFromOverlay() {
        const olPoly = buildOlPolygonFromOverlay();
        if (!olPoly) {
            log('CreateBridge: no overlay polygon. Draw overlay first.');
            return false;
        }

        let found = ensureJbToolActive();
        if (!found) {
            log('CreateBridge: JB tool not detected. Click Create Junction.');
            return false;
        }

        let { control: c, handler: h } = found;

        try {
            try { c?.activate?.(); } catch (e) {}
            try { nudgeMouseToMapCenter(); } catch (e) {}

            const ft = ensureJbHandlerPolygon(h, olPoly, c);
            if (!ft || !ft.geometry) {
                found = refreshJbToolCache() || found;
                c = found?.control;
                h = found?.handler;
            }

            const finalFt = ensureJbHandlerPolygon(h, olPoly, c);
            if (!finalFt || !finalFt.geometry) return false;
        } catch (e) {
            log('CreateBridge: failed to inject polygon into handler', e);
            uiSetStep('Create failed: WME JB draw handler was not ready. Press J once, then Create Junction Box again.');
            return false;
        }

        let committed = false;

        try {
            if (typeof c.finishSketch === 'function') {
                c.finishSketch();
                committed = true;
            }
        } catch (e) {}

        if (!committed) {
            try {
                if (typeof h.finishGeometry === 'function') {
                    h.finishGeometry();
                    committed = true;
                }
            } catch (e) {}
        }

        try { c.deactivate?.(); } catch (e) {}

        if (!committed) log('CreateBridge: injected polygon, but could not auto-commit. Finish manually (double click).');
        else log('CreateBridge: committed ✔');

        return true;
    }

    function olGeomBoundsSig(geom, digits = 2) {
        const b = geom?.getBounds?.() || geom?.bounds;
        if (!b) return null;
        const r = (n) => (Number.isFinite(n) ? Number(n.toFixed(digits)) : null);
        return `${r(b.left)}|${r(b.bottom)}|${r(b.right)}|${r(b.top)}`;
    }

    function sigCloseEnough(a, b) {
        return a && b && a === b;
    }


    const SETTINGS_KEY = `${SCRIPT_ID}.settings.v1`;

    function readSettings() {
        try {
            return Object.assign(
                { autoClearAfterCreate: true, overlayColor: '#E6E6E6', language: 'en', snapToGrid: false, activeSettingsTab: 'builder' },
                JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}'),
                { shortcutKey: 'j' }
            );
        } catch (e) {
            return { shortcutKey: 'j', autoClearAfterCreate: true, overlayColor: '#E6E6E6', language: 'en', snapToGrid: false, activeSettingsTab: 'builder' };
        }
    }

    function writeSettings(next) {
        const current = readSettings();
        const merged = Object.assign({}, current, next || {}, { shortcutKey: 'j' });
        merged.language = getSupportedLanguageCodes().includes(merged.language) ? merged.language : (getSupportedLanguageCodes().includes(current.language) ? current.language : 'en');
        merged.snapToGrid = !!merged.snapToGrid;
        merged.activeSettingsTab = merged.activeSettingsTab === 'settings' ? 'settings' : 'builder';
        try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged)); } catch (e) {}
        return merged;
    }

    function stripGreekTonos(str) {
        return String(str || '')
            .replace(/[Ά]/g, 'Α')
            .replace(/[Έ]/g, 'Ε')
            .replace(/[Ή]/g, 'Η')
            .replace(/[ΊΪ]/g, 'Ι')
            .replace(/[Ό]/g, 'Ο')
            .replace(/[ΎΫ]/g, 'Υ')
            .replace(/[Ώ]/g, 'Ω');
    }

    function radiusUnitLabel() {
        return 'px';
    }

    function getSupportedLanguageOptions() {
        return [
            { code: 'en', nativeName: 'English', label: 'English' },
            { code: 'el', nativeName: 'Ελληνικά', label: 'Greek' },
            { code: 'de', nativeName: 'Deutsch', label: 'German' },
            { code: 'fr', nativeName: 'Français', label: 'French' },
            { code: 'es', nativeName: 'Español', label: 'Spanish' },
            { code: 'it', nativeName: 'Italiano', label: 'Italian' },
            { code: 'pt', nativeName: 'Português', label: 'Portuguese' },
            { code: 'nl', nativeName: 'Nederlands', label: 'Dutch' },
            { code: 'pl', nativeName: 'Polski', label: 'Polish' },
            { code: 'tr', nativeName: 'Türkçe', label: 'Turkish' },
            { code: 'ro', nativeName: 'Română', label: 'Romanian' },
            { code: 'bg', nativeName: 'Български', label: 'Bulgarian' },
            { code: 'he', nativeName: 'עברית', label: 'Hebrew' },
            { code: 'ar', nativeName: 'العربية', label: 'Arabic' },
        ];
    }

    function getSupportedLanguageCodes() {
        return getSupportedLanguageOptions().map(l => l.code);
    }

    function getLanguageOption(code) {
        return getSupportedLanguageOptions().find(l => l.code === code) || getSupportedLanguageOptions()[0];
    }

    function isRtlLanguage(code) {
        return code === 'ar' || code === 'he';
    }

    function getUiText(lang = readSettings().language) {
        const dict = {
            en: {
                builderTab: 'Builder',
                settingsTab: 'Settings',
                title: 'JB Geometry',
                subtitle: 'Build, edit, and recreate Junction Box geometry directly on the map.',
                shape: 'Shape',
                square: 'Square',
                rectangle: 'Rectangle',
                circle: 'Circle',
                draw: 'Draw',
                recreate: 'Custom Polygon',
                customPolygonTitle: 'Custom Polygon',
                customPolygonDesc: 'Paste GeoJSON, KML, WKT, or raw lon/lat coordinates. The outer polygon ring will be loaded as an editable shape.',
                customPolygonPlaceholder: 'GeoJSON Polygon / Feature\nKML <coordinates>...\nWKT POLYGON((lon lat, lon lat, ...))\nOr raw lines: lon,lat',
                customPolygonLoad: 'Load polygon',
                customPolygonInvalid: 'Could not read a polygon from that text.',
                customPolygonLoaded: 'Custom polygon loaded as editable shape.',
                validationDetailsTitle: 'Why this shape is invalid',
                shortcutsTitle: 'Keyboard shortcuts',
                shortcutsDesc: 'Useful editing shortcuts while shaping a JB.',
                replaceJb: 'Replace JB',
                replaceJbNoSelection: 'Select/click an existing Junction Box first.',
                replaceJbDone: 'Junction Box removed and loaded as editable shape. Modify it, then click Create JB to create the replacement and copy turn permissions.',
                recreateEditLoaded: 'JB loaded as editable shape. Modify it, then click Create JB to test direct update.',
                directUpdateOk: 'Direct update was attempted on the selected JB. Try saving in WME.',
                directUpdateFail: 'Direct update failed. Use Replace JB instead.',
                openEditorPrompt: 'Open JB Geometry editor',
                overlayColor: 'Overlay color',
                editShape: 'Edit shape',
                cornerRadius: 'Corner radius',
                shapeSize: 'Shape size',
                undo: 'Undo',
                redo: 'Redo',
                reset: 'Reset',
                create: 'Create JB',
                abort: 'Abort',
                status: 'Status',
                show: 'Show',
                hide: 'Hide',
                language: 'Language',
                english: 'English',
                greek: 'Greek',
                snap: 'Snap to grid',
                snapDesc: 'Applies while drawing and editing the shape.',
                snapOn: 'Snap to grid enabled.',
                snapOff: 'Snap to grid disabled.',
                slidersReset: 'Sliders reset.',
                selectJbFirst: 'Select/click an existing Junction Box first.',
                aborted: 'Aborted.',
                abandonShapeTitle: 'Shape still active',
                abandonShapeMessage: 'Create the JB or Abort before leaving this shape.',
            },
            el: {
                builderTab: 'Σχεδιασμός',
                settingsTab: 'Ρυθμίσεις',
                title: 'JB Geometry',
                subtitle: 'Δημιουργία, επεξεργασία και αναδημιουργία Junction Box geometry απευθείας στον χάρτη.',
                shape: 'Σχήμα',
                square: 'Τετράγωνο',
                rectangle: 'Ορθογώνιο',
                circle: 'Κύκλος',
                draw: 'Σχεδίαση',
                recreate: 'Custom Polygon',
                replaceJb: 'Replace JB',
                replaceJbNoSelection: 'Επίλεξε ή πάτα ένα υπάρχον Junction Box πρώτα.',
                replaceJbDone: 'Το Junction Box αφαιρέθηκε και φορτώθηκε σαν editable shape. Τροποποίησέ το και μετά πάτα Δημιουργία JB για να δημιουργηθεί το νέο με τα ίδια turn permissions.',
                recreateEditLoaded: 'Το JB φορτώθηκε σαν editable shape. Τροποποίησέ το και πάτα Δημιουργία JB για δοκιμή direct update.',
                directUpdateOk: 'Έγινε προσπάθεια direct update στο επιλεγμένο JB. Δοκίμασε save στο WME.',
                directUpdateFail: 'Το direct update δεν πέτυχε. Χρησιμοποίησε Replace JB.',
                openEditorPrompt: 'Άνοιξε το JB Geometry editor',
                overlayColor: 'Χρώμα overlay',
                editShape: 'Επεξεργασία σχήματος',
                cornerRadius: 'Στρογγύλεμα γωνιών',
                shapeSize: 'Μέγεθος σχήματος',
                undo: 'Αναίρεση',
                redo: 'Επαναφορά',
                reset: 'Μηδενισμός',
                create: 'Δημιουργία JB',
                abort: 'Ακύρωση',
                status: 'Κατάσταση',
                show: 'Εμφάνιση',
                hide: 'Απόκρυψη',
                language: 'Γλώσσα',
                english: 'English',
                greek: 'Ελληνικά',
                snap: 'Snap σε πλέγμα',
                snapDesc: 'Εφαρμόζεται στη σχεδίαση και στην επεξεργασία του σχήματος.',
                snapOn: 'Snap σε πλέγμα ενεργό.',
                snapOff: 'Snap σε πλέγμα ανενεργό.',
                slidersReset: 'Τα sliders επανήλθαν.',
                selectJbFirst: 'Επίλεξε ή πάτα ένα υπάρχον Junction Box πρώτα.',
                aborted: 'Ακυρώθηκε.',
                abandonShapeTitle: 'Το σχήμα είναι ακόμα ενεργό',
                abandonShapeMessage: 'Πάτα Δημιουργία JB ή Ακύρωση πριν φύγεις από το σχήμα.',
            },
            de: {
                builderTab: 'Editor',
                settingsTab: 'Einstellungen',
                title: 'JB Geometry',
                subtitle: 'Junction-Box-Geometrie direkt auf der Karte erstellen, bearbeiten und neu erstellen.',
                shape: 'Form',
                square: 'Quadrat',
                rectangle: 'Rechteck',
                circle: 'Kreis',
                draw: 'Zeichnen',
                recreate: 'Custom Polygon',
                replaceJb: 'JB ersetzen',
                replaceJbNoSelection: 'Wähle/klicke zuerst eine bestehende Junction Box.',
                replaceJbDone: 'Junction Box entfernt und als bearbeitbare Form geladen. Ändere sie und klicke dann auf JB erstellen, um den Ersatz mit kopierten Turn Permissions zu erstellen.',
                recreateEditLoaded: 'JB als bearbeitbare Form geladen. Ändere sie und klicke auf JB erstellen, um das direkte Update zu testen.',
                directUpdateOk: 'Direktes Update wurde an der ausgewählten JB versucht. Versuche in WME zu speichern.',
                directUpdateFail: 'Direktes Update fehlgeschlagen. Verwende stattdessen JB ersetzen.',
                openEditorPrompt: 'JB Geometry Editor öffnen',
                overlayColor: 'Overlay-Farbe',
                editShape: 'Form bearbeiten',
                cornerRadius: 'Eckenradius',
                shapeSize: 'Formgröße',
                undo: 'Rückgängig',
                redo: 'Wiederholen',
                reset: 'Zurücksetzen',
                create: 'JB erstellen',
                abort: 'Abbrechen',
                status: 'Status',
                show: 'Anzeigen',
                hide: 'Ausblenden',
                language: 'Sprache',
                english: 'Englisch',
                greek: 'Griechisch',
                snap: 'Am Raster einrasten',
                snapDesc: 'Gilt beim Zeichnen und Bearbeiten der Form.',
                snapOn: 'Rastereinrastung aktiviert.',
                snapOff: 'Rastereinrastung deaktiviert.',
                slidersReset: 'Schieberegler zurückgesetzt.',
                selectJbFirst: 'Wähle/klicke zuerst eine bestehende Junction Box.',
                aborted: 'Abgebrochen.',
                abandonShapeTitle: 'Form noch aktiv',
                abandonShapeMessage: 'Erstelle die JB oder brich ab, bevor du die Form verlässt.',
            },
            fr: {
                builderTab: 'Éditeur',
                settingsTab: 'Paramètres',
                title: 'JB Geometry',
                subtitle: 'Créer, modifier et recréer la géométrie de Junction Box directement sur la carte.',
                shape: 'Forme',
                square: 'Carré',
                rectangle: 'Rectangle',
                circle: 'Cercle',
                draw: 'Dessiner',
                recreate: 'Custom Polygon',
                replaceJb: 'Remplacer JB',
                replaceJbNoSelection: 'Sélectionne/clique d’abord une Junction Box existante.',
                replaceJbDone: 'Junction Box supprimée et chargée comme forme modifiable. Modifie-la, puis clique sur Créer JB pour créer le remplacement avec les mêmes permissions de virage.',
                recreateEditLoaded: 'JB chargée comme forme modifiable. Modifie-la, puis clique sur Créer JB pour tester la mise à jour directe.',
                directUpdateOk: 'Mise à jour directe tentée sur la JB sélectionnée. Essaie de sauvegarder dans WME.',
                directUpdateFail: 'Mise à jour directe échouée. Utilise plutôt Remplacer JB.',
                openEditorPrompt: 'Ouvrir l’éditeur JB Geometry',
                overlayColor: 'Couleur overlay',
                editShape: 'Modifier la forme',
                cornerRadius: 'Rayon des coins',
                shapeSize: 'Taille de la forme',
                undo: 'Annuler',
                redo: 'Rétablir',
                reset: 'Réinitialiser',
                create: 'Créer JB',
                abort: 'Annuler',
                status: 'Statut',
                show: 'Afficher',
                hide: 'Masquer',
                language: 'Langue',
                english: 'Anglais',
                greek: 'Grec',
                snap: 'Accrocher à la grille',
                snapDesc: 'S’applique pendant le dessin et la modification de la forme.',
                snapOn: 'Accrochage à la grille activé.',
                snapOff: 'Accrochage à la grille désactivé.',
                slidersReset: 'Curseurs réinitialisés.',
                selectJbFirst: 'Sélectionne/clique d’abord une Junction Box existante.',
                aborted: 'Annulé.',
                abandonShapeTitle: 'Forme encore active',
                abandonShapeMessage: 'Crée la JB ou annule avant de quitter cette forme.',
            },
            es: {
                builderTab: 'Editor',
                settingsTab: 'Ajustes',
                title: 'JB Geometry',
                subtitle: 'Crea, edita y recrea la geometría de Junction Box directamente en el mapa.',
                shape: 'Forma',
                square: 'Cuadrado',
                rectangle: 'Rectángulo',
                circle: 'Círculo',
                draw: 'Dibujar',
                recreate: 'Custom Polygon',
                replaceJb: 'Reemplazar JB',
                replaceJbNoSelection: 'Selecciona/haz clic primero en una Junction Box existente.',
                replaceJbDone: 'Junction Box eliminada y cargada como forma editable. Modifícala y luego haz clic en Crear JB para crear el reemplazo y copiar los permisos de giro.',
                recreateEditLoaded: 'JB cargada como forma editable. Modifícala y haz clic en Crear JB para probar la actualización directa.',
                directUpdateOk: 'Se intentó actualizar directamente la JB seleccionada. Intenta guardar en WME.',
                directUpdateFail: 'La actualización directa falló. Usa Reemplazar JB.',
                openEditorPrompt: 'Abrir editor JB Geometry',
                overlayColor: 'Color del overlay',
                editShape: 'Editar forma',
                cornerRadius: 'Radio de esquinas',
                shapeSize: 'Tamaño de forma',
                undo: 'Deshacer',
                redo: 'Rehacer',
                reset: 'Restablecer',
                create: 'Crear JB',
                abort: 'Cancelar',
                status: 'Estado',
                show: 'Mostrar',
                hide: 'Ocultar',
                language: 'Idioma',
                english: 'Inglés',
                greek: 'Griego',
                snap: 'Ajustar a cuadrícula',
                snapDesc: 'Se aplica al dibujar y editar la forma.',
                snapOn: 'Ajuste a cuadrícula activado.',
                snapOff: 'Ajuste a cuadrícula desactivado.',
                slidersReset: 'Controles restablecidos.',
                selectJbFirst: 'Selecciona/haz clic primero en una Junction Box existente.',
                aborted: 'Cancelado.',
                abandonShapeTitle: 'Forma aún activa',
                abandonShapeMessage: 'Crea la JB o cancela antes de salir de esta forma.',
            },
            it: {
                builderTab: 'Editor',
                settingsTab: 'Impostazioni',
                title: 'JB Geometry',
                subtitle: 'Crea, modifica e ricrea la geometria delle Junction Box direttamente sulla mappa.',
                shape: 'Forma',
                square: 'Quadrato',
                rectangle: 'Rettangolo',
                circle: 'Cerchio',
                draw: 'Disegna',
                recreate: 'Custom Polygon',
                replaceJb: 'Sostituisci JB',
                replaceJbNoSelection: 'Seleziona/fai clic prima su una Junction Box esistente.',
                replaceJbDone: 'Junction Box rimossa e caricata come forma modificabile. Modificala, poi fai clic su Crea JB per creare la sostituzione e copiare i permessi di svolta.',
                recreateEditLoaded: 'JB caricata come forma modificabile. Modificala, poi fai clic su Crea JB per testare l’aggiornamento diretto.',
                directUpdateOk: 'Aggiornamento diretto tentato sulla JB selezionata. Prova a salvare in WME.',
                directUpdateFail: 'Aggiornamento diretto non riuscito. Usa Sostituisci JB.',
                openEditorPrompt: 'Apri editor JB Geometry',
                overlayColor: 'Colore overlay',
                editShape: 'Modifica forma',
                cornerRadius: 'Raggio angoli',
                shapeSize: 'Dimensione forma',
                undo: 'Annulla',
                redo: 'Ripeti',
                reset: 'Reimposta',
                create: 'Crea JB',
                abort: 'Annulla',
                status: 'Stato',
                show: 'Mostra',
                hide: 'Nascondi',
                language: 'Lingua',
                english: 'Inglese',
                greek: 'Greco',
                snap: 'Aggancia alla griglia',
                snapDesc: 'Si applica durante il disegno e la modifica della forma.',
                snapOn: 'Aggancio alla griglia attivato.',
                snapOff: 'Aggancio alla griglia disattivato.',
                slidersReset: 'Slider reimpostati.',
                selectJbFirst: 'Seleziona/fai clic prima su una Junction Box esistente.',
                aborted: 'Annullato.',
                abandonShapeTitle: 'Forma ancora attiva',
                abandonShapeMessage: 'Crea la JB o annulla prima di lasciare questa forma.',
            },
            pt: {
                builderTab: 'Editor',
                settingsTab: 'Definições',
                title: 'JB Geometry',
                subtitle: 'Cria, edita e recria geometria de Junction Box diretamente no mapa.',
                shape: 'Forma',
                square: 'Quadrado',
                rectangle: 'Retângulo',
                circle: 'Círculo',
                draw: 'Desenhar',
                recreate: 'Custom Polygon',
                replaceJb: 'Substituir JB',
                replaceJbNoSelection: 'Seleciona/clica primeiro numa Junction Box existente.',
                replaceJbDone: 'Junction Box carregada como forma editável. Modifica-a e depois clica em Criar JB para atualizar a JB original.',
                recreateEditLoaded: 'JB carregada como forma editável. Modifica-a e clica em Criar JB para testar a atualização direta.',
                directUpdateOk: 'Foi tentada a atualização direta na JB selecionada. Tenta guardar no WME.',
                directUpdateFail: 'A atualização direta falhou. Usa Substituir JB.',
                openEditorPrompt: 'Abrir editor JB Geometry',
                overlayColor: 'Cor do overlay',
                editShape: 'Editar forma',
                cornerRadius: 'Raio dos cantos',
                shapeSize: 'Tamanho da forma',
                undo: 'Desfazer',
                redo: 'Refazer',
                reset: 'Repor',
                create: 'Criar JB',
                abort: 'Cancelar',
                status: 'Estado',
                show: 'Mostrar',
                hide: 'Ocultar',
                language: 'Idioma',
                english: 'Inglês',
                greek: 'Grego',
                snap: 'Ajustar à grelha',
                snapDesc: 'Aplica-se ao desenhar e editar a forma.',
                snapOn: 'Ajuste à grelha ativado.',
                snapOff: 'Ajuste à grelha desativado.',
                slidersReset: 'Controlos repostos.',
                selectJbFirst: 'Seleciona/clica primeiro numa Junction Box existente.',
                aborted: 'Cancelado.',
                abandonShapeTitle: 'Forma ainda ativa',
                abandonShapeMessage: 'Cria a JB ou cancela antes de sair desta forma.',
            },
            nl: {
                builderTab: 'Bouwer',
                settingsTab: 'Instellingen',
                title: 'JB Geometry',
                subtitle: 'Maak, bewerk en reconstrueer Junction Box-geometrie direct op de kaart.',
                shape: 'Vorm',
                square: 'Vierkant',
                rectangle: 'Rechthoek',
                circle: 'Cirkel',
                draw: 'Tekenen',
                recreate: 'Custom Polygon',
                replaceJb: 'JB vervangen',
                replaceJbNoSelection: 'Selecteer/klik eerst een bestaande Junction Box.',
                replaceJbDone: 'Junction Box verwijderd en geladen als bewerkbare vorm. Pas deze aan en klik daarna op JB maken om de vervanging te maken en turn permissions te kopiëren.',
                recreateEditLoaded: 'JB geladen als bewerkbare vorm. Pas deze aan en klik op JB maken om directe update te testen.',
                directUpdateOk: 'Directe update geprobeerd op de geselecteerde JB. Probeer op te slaan in WME.',
                directUpdateFail: 'Directe update mislukt. Gebruik JB vervangen.',
                openEditorPrompt: 'Open JB Geometry-editor',
                overlayColor: 'Overlaykleur',
                editShape: 'Vorm bewerken',
                cornerRadius: 'Hoekradius',
                shapeSize: 'Vormgrootte',
                undo: 'Ongedaan maken',
                redo: 'Opnieuw',
                reset: 'Resetten',
                create: 'JB maken',
                abort: 'Annuleren',
                status: 'Status',
                show: 'Tonen',
                hide: 'Verbergen',
                language: 'Taal',
                english: 'Engels',
                greek: 'Grieks',
                snap: 'Uitlijnen op raster',
                snapDesc: 'Van toepassing tijdens tekenen en bewerken van de vorm.',
                snapOn: 'Uitlijnen op raster ingeschakeld.',
                snapOff: 'Uitlijnen op raster uitgeschakeld.',
                slidersReset: 'Schuifregelaars gereset.',
                selectJbFirst: 'Selecteer/klik eerst een bestaande Junction Box.',
                aborted: 'Geannuleerd.',
                abandonShapeTitle: 'Vorm nog actief',
                abandonShapeMessage: 'Maak de JB of annuleer voordat je deze vorm verlaat.',
            },
            pl: {
                builderTab: 'Edytor',
                settingsTab: 'Ustawienia',
                title: 'JB Geometry',
                subtitle: 'Twórz, edytuj i odtwarzaj geometrię Junction Box bezpośrednio na mapie.',
                shape: 'Kształt',
                square: 'Kwadrat',
                rectangle: 'Prostokąt',
                circle: 'Okrąg',
                draw: 'Rysuj',
                recreate: 'Custom Polygon',
                replaceJb: 'Zastąp JB',
                replaceJbNoSelection: 'Najpierw wybierz/kliknij istniejącą Junction Box.',
                replaceJbDone: 'Junction Box usunięta i wczytana jako edytowalny kształt. Zmień ją, a potem kliknij Utwórz JB.',
                recreateEditLoaded: 'JB wczytana jako edytowalny kształt. Zmień ją i kliknij Utwórz JB, aby przetestować bezpośrednią aktualizację.',
                directUpdateOk: 'Podjęto próbę bezpośredniej aktualizacji wybranej JB. Spróbuj zapisać w WME.',
                directUpdateFail: 'Bezpośrednia aktualizacja nie powiodła się. Użyj Zastąp JB.',
                openEditorPrompt: 'Otwórz edytor JB Geometry',
                overlayColor: 'Kolor overlay',
                editShape: 'Edytuj kształt',
                cornerRadius: 'Promień narożników',
                shapeSize: 'Rozmiar kształtu',
                undo: 'Cofnij',
                redo: 'Ponów',
                reset: 'Resetuj',
                create: 'Utwórz JB',
                abort: 'Anuluj',
                status: 'Status',
                show: 'Pokaż',
                hide: 'Ukryj',
                language: 'Język',
                english: 'Angielski',
                greek: 'Grecki',
                snap: 'Przyciągaj do siatki',
                snapDesc: 'Działa podczas rysowania i edycji kształtu.',
                snapOn: 'Przyciąganie do siatki włączone.',
                snapOff: 'Przyciąganie do siatki wyłączone.',
                slidersReset: 'Suwaki zresetowane.',
                selectJbFirst: 'Najpierw wybierz/kliknij istniejącą Junction Box.',
                aborted: 'Anulowano.',
                abandonShapeTitle: 'Kształt nadal aktywny',
                abandonShapeMessage: 'Utwórz JB albo anuluj przed opuszczeniem tego kształtu.',
            },
            tr: {
                builderTab: 'Düzenleyici',
                settingsTab: 'Ayarlar',
                title: 'JB Geometry',
                subtitle: 'Junction Box geometrisini harita üzerinde oluştur, düzenle ve yeniden oluştur.',
                shape: 'Şekil',
                square: 'Kare',
                rectangle: 'Dikdörtgen',
                circle: 'Daire',
                draw: 'Çiz',
                recreate: 'Custom Polygon',
                replaceJb: 'JB değiştir',
                replaceJbNoSelection: 'Önce mevcut bir Junction Box seç/tıkla.',
                replaceJbDone: 'Junction Box silindi ve düzenlenebilir şekil olarak yüklendi. Düzenle, sonra JB oluştur’a tıkla.',
                recreateEditLoaded: 'JB düzenlenebilir şekil olarak yüklendi. Düzenle, sonra doğrudan güncellemeyi test etmek için JB oluştur’a tıkla.',
                directUpdateOk: 'Seçilen JB üzerinde doğrudan güncelleme denendi. WME’de kaydetmeyi dene.',
                directUpdateFail: 'Doğrudan güncelleme başarısız. Bunun yerine JB değiştir kullan.',
                openEditorPrompt: 'JB Geometry editörünü aç',
                overlayColor: 'Overlay rengi',
                editShape: 'Şekli düzenle',
                cornerRadius: 'Köşe yarıçapı',
                shapeSize: 'Şekil boyutu',
                undo: 'Geri al',
                redo: 'Yinele',
                reset: 'Sıfırla',
                create: 'JB oluştur',
                abort: 'İptal',
                status: 'Durum',
                show: 'Göster',
                hide: 'Gizle',
                language: 'Dil',
                english: 'İngilizce',
                greek: 'Yunanca',
                snap: 'Izgaraya yasla',
                snapDesc: 'Şekil çizerken ve düzenlerken uygulanır.',
                snapOn: 'Izgaraya yaslama açık.',
                snapOff: 'Izgaraya yaslama kapalı.',
                slidersReset: 'Sürgüler sıfırlandı.',
                selectJbFirst: 'Önce mevcut bir Junction Box seç/tıkla.',
                aborted: 'İptal edildi.',
                abandonShapeTitle: 'Şekil hâlâ aktif',
                abandonShapeMessage: 'Bu şekilden çıkmadan önce JB oluştur veya iptal et.',
            },
            ro: {
                builderTab: 'Editor',
                settingsTab: 'Setări',
                title: 'JB Geometry',
                subtitle: 'Creează, editează și recreează geometria Junction Box direct pe hartă.',
                shape: 'Formă',
                square: 'Pătrat',
                rectangle: 'Dreptunghi',
                circle: 'Cerc',
                draw: 'Desenează',
                recreate: 'Custom Polygon',
                replaceJb: 'Înlocuiește JB',
                replaceJbNoSelection: 'Selectează/clic pe o Junction Box existentă mai întâi.',
                replaceJbDone: 'Junction Box încărcată ca formă editabilă. Modific-o, apoi apasă Creează JB pentru a actualiza JB originală.',
                recreateEditLoaded: 'JB încărcată ca formă editabilă. Modific-o, apoi apasă Creează JB pentru a testa actualizarea directă.',
                directUpdateOk: 'S-a încercat actualizarea directă a JB selectate. Încearcă să salvezi în WME.',
                directUpdateFail: 'Actualizarea directă a eșuat. Folosește Înlocuiește JB.',
                openEditorPrompt: 'Deschide editorul JB Geometry',
                overlayColor: 'Culoare overlay',
                editShape: 'Editează forma',
                cornerRadius: 'Raza colțurilor',
                shapeSize: 'Dimensiunea formei',
                undo: 'Anulează',
                redo: 'Refă',
                reset: 'Resetează',
                create: 'Creează JB',
                abort: 'Anulează',
                status: 'Stare',
                show: 'Afișează',
                hide: 'Ascunde',
                language: 'Limbă',
                english: 'Engleză',
                greek: 'Greacă',
                snap: 'Fixare pe grilă',
                snapDesc: 'Se aplică la desenarea și editarea formei.',
                snapOn: 'Fixarea pe grilă activată.',
                snapOff: 'Fixarea pe grilă dezactivată.',
                slidersReset: 'Glisoarele au fost resetate.',
                selectJbFirst: 'Selectează/clic pe o Junction Box existentă mai întâi.',
                aborted: 'Anulat.',
                abandonShapeTitle: 'Forma este încă activă',
                abandonShapeMessage: 'Creează JB sau anulează înainte să părăsești forma.',
            },
            bg: {
                builderTab: 'Редактор',
                settingsTab: 'Настройки',
                title: 'JB Geometry',
                subtitle: 'Създавай, редактирай и пресъздавай геометрия на Junction Box директно върху картата.',
                shape: 'Форма',
                square: 'Квадрат',
                rectangle: 'Правоъгълник',
                circle: 'Кръг',
                draw: 'Рисувай',
                recreate: 'Custom Polygon',
                replaceJb: 'Замени JB',
                replaceJbNoSelection: 'Първо избери/кликни съществуваща Junction Box.',
                replaceJbDone: 'Junction Box е премахнат и зареден като редактируема форма. Промени го и после кликни Създай JB, за да се създаде заместител с копирани turn permissions.',
                recreateEditLoaded: 'JB е заредена като редактируема форма. Промени я и кликни Създай JB, за да тестваш директна актуализация.',
                directUpdateOk: 'Опитан е директен update на избраната JB. Опитай да запазиш в WME.',
                directUpdateFail: 'Директният update не успя. Използвай Замени JB.',
                openEditorPrompt: 'Отвори JB Geometry редактора',
                overlayColor: 'Цвят на overlay',
                editShape: 'Редактирай форма',
                cornerRadius: 'Радиус на ъглите',
                shapeSize: 'Размер на формата',
                undo: 'Отмени',
                redo: 'Повтори',
                reset: 'Нулирай',
                create: 'Създай JB',
                abort: 'Отказ',
                status: 'Статус',
                show: 'Покажи',
                hide: 'Скрий',
                language: 'Език',
                english: 'Английски',
                greek: 'Гръцки',
                snap: 'Прилепване към мрежа',
                snapDesc: 'Прилага се при рисуване и редакция на формата.',
                snapOn: 'Прилепването към мрежа е включено.',
                snapOff: 'Прилепването към мрежа е изключено.',
                slidersReset: 'Плъзгачите са нулирани.',
                selectJbFirst: 'Първо избери/кликни съществуваща Junction Box.',
                aborted: 'Отказано.',
                abandonShapeTitle: 'Формата е още активна',
                abandonShapeMessage: 'Създай JB или откажи, преди да напуснеш формата.',
            },
            he: {
                builderTab: 'עורך',
                settingsTab: 'הגדרות',
                title: 'JB Geometry',
                subtitle: 'יצירה, עריכה ושחזור של גיאומטריית Junction Box ישירות על המפה.',
                shape: 'צורה',
                square: 'ריבוע',
                rectangle: 'מלבן',
                circle: 'עיגול',
                draw: 'ציור',
                recreate: 'Custom Polygon',
                replaceJb: 'החלפת JB',
                replaceJbNoSelection: 'בחר/לחץ קודם על Junction Box קיימת.',
                replaceJbDone: 'Junction Box נמחקה ונטענה כצורה ניתנת לעריכה. שנה אותה ואז לחץ Create JB כדי ליצור החלפה עם אותן הרשאות פנייה.',
                recreateEditLoaded: 'JB נטענה כצורה ניתנת לעריכה. שנה אותה ואז לחץ Create JB כדי לבדוק עדכון ישיר.',
                directUpdateOk: 'בוצע ניסיון לעדכון ישיר של ה-JB שנבחרה. נסה לשמור ב-WME.',
                directUpdateFail: 'עדכון ישיר נכשל. השתמש ב-Replace JB במקום.',
                openEditorPrompt: 'פתח את עורך JB Geometry',
                overlayColor: 'צבע overlay',
                editShape: 'עריכת צורה',
                cornerRadius: 'רדיוס פינות',
                shapeSize: 'גודל צורה',
                undo: 'בטל',
                redo: 'בצע שוב',
                reset: 'איפוס',
                create: 'Create JB',
                abort: 'ביטול',
                status: 'סטטוס',
                show: 'הצג',
                hide: 'הסתר',
                language: 'שפה',
                english: 'אנגלית',
                greek: 'יוונית',
                snap: 'הצמדה לרשת',
                snapDesc: 'חל בזמן ציור ועריכת הצורה.',
                snapOn: 'הצמדה לרשת הופעלה.',
                snapOff: 'הצמדה לרשת כובתה.',
                slidersReset: 'המחוונים אופסו.',
                selectJbFirst: 'בחר/לחץ קודם על Junction Box קיימת.',
                aborted: 'בוטל.',
                abandonShapeTitle: 'הצורה עדיין פעילה',
                abandonShapeMessage: 'צור JB או בטל לפני שתעזוב את הצורה.',
            },
            ar: {
                builderTab: 'المحرر',
                settingsTab: 'الإعدادات',
                title: 'JB Geometry',
                subtitle: 'إنشاء وتعديل وإعادة إنشاء هندسة Junction Box مباشرة على الخريطة.',
                shape: 'الشكل',
                square: 'مربع',
                rectangle: 'مستطيل',
                circle: 'دائرة',
                draw: 'رسم',
                recreate: 'Custom Polygon',
                replaceJb: 'استبدال JB',
                replaceJbNoSelection: 'اختر/اضغط على Junction Box موجودة أولاً.',
                replaceJbDone: 'تم حذف Junction Box وتحميلها كشكل قابل للتعديل. عدّلها ثم اضغط Create JB لإنشاء البديل ونسخ أذونات الانعطاف.',
                recreateEditLoaded: 'تم تحميل JB كشكل قابل للتعديل. عدّلها ثم اضغط Create JB لاختبار التحديث المباشر.',
                directUpdateOk: 'تمت محاولة تحديث مباشر للـ JB المحددة. حاول الحفظ في WME.',
                directUpdateFail: 'فشل التحديث المباشر. استخدم استبدال JB بدلاً من ذلك.',
                openEditorPrompt: 'افتح محرر JB Geometry',
                overlayColor: 'لون overlay',
                editShape: 'تعديل الشكل',
                cornerRadius: 'نصف قطر الزوايا',
                shapeSize: 'حجم الشكل',
                undo: 'تراجع',
                redo: 'إعادة',
                reset: 'إعادة ضبط',
                create: 'Create JB',
                abort: 'إلغاء',
                status: 'الحالة',
                show: 'إظهار',
                hide: 'إخفاء',
                language: 'اللغة',
                english: 'الإنجليزية',
                greek: 'اليونانية',
                snap: 'الالتقاط إلى الشبكة',
                snapDesc: 'يطبق أثناء الرسم وتعديل الشكل.',
                snapOn: 'تم تفعيل الالتقاط إلى الشبكة.',
                snapOff: 'تم إيقاف الالتقاط إلى الشبكة.',
                slidersReset: 'تمت إعادة ضبط الشرائط.',
                selectJbFirst: 'اختر/اضغط على Junction Box موجودة أولاً.',
                aborted: 'تم الإلغاء.',
                abandonShapeTitle: 'الشكل ما زال نشطاً',
                abandonShapeMessage: 'أنشئ JB أو ألغِ قبل مغادرة هذا الشكل.',
            },
        };

        return Object.assign({}, dict.en, dict[lang] || dict.en);
    }
    function injectModernUiStyles() {
        const styleId = `${SCRIPT_ID}-styles`;
        document.getElementById(styleId)?.remove();

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .jbg-shell {
                --jbg-bg: var(--background_default, #141820);
                --jbg-elev: color-mix(in srgb, var(--background_default, #141820) 88%, var(--content_default, #fff) 4%);
                --jbg-elev-2: color-mix(in srgb, var(--background_default, #141820) 76%, var(--content_default, #fff) 6%);
                --jbg-text: var(--content_default, #f4f7fb);
                --jbg-muted: color-mix(in srgb, var(--content_default, #f4f7fb) 58%, transparent);
                --jbg-soft: color-mix(in srgb, var(--content_default, #f4f7fb) 8%, transparent);
                --jbg-border: color-mix(in srgb, var(--content_default, #f4f7fb) 12%, transparent);
                --jbg-blue: #2aa8ff;
                --jbg-blue-2: #0b74ff;
                --jbg-green: #22c77a;
                --jbg-red: #ff5366;
                color: var(--jbg-text);
                display: flex;
                flex-direction: column;
                gap: 7px;
                padding: 8px;
                min-height: 100%;
                box-sizing: border-box;
                font-family: var(--content_font, inherit);
            }
            .jbg-shell, .jbg-shell * { box-sizing: border-box; }
            .jbg-nav-menu {
                margin-right: 14px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 6px;
                padding: 4px;
                border-radius: 15px;
                border: 1px solid var(--jbg-border);
                background: rgba(255,255,255,.055);
            }
            .jbg-nav-tab {
                appearance: none;
                border: 0;
                border-radius: 12px;
                padding: 10px 12px 9px;
                min-height: 34px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                line-height: 1;
                font-weight: 850;
                color: color-mix(in srgb, var(--jbg-text) 72%, transparent) !important;
                -webkit-text-fill-color: color-mix(in srgb, var(--jbg-text) 72%, transparent) !important;
                background: transparent;
                cursor: pointer;
            }
            .jbg-nav-tab.is-active {
                color: #fff !important;
                -webkit-text-fill-color: #fff !important;
                background: linear-gradient(180deg, var(--jbg-blue), var(--jbg-blue-2));
                box-shadow: 0 8px 18px rgba(42,168,255,.24);
            }
            .jbg-nav-menu + .jbg-panel,
            .jbg-nav-menu + .jbg-panel + .jbg-panel {
                margin-top: 8px;
            }
            .jbg-panel[hidden] {
                display: none !important;
            }
            .jbg-panel > .jbg-card + .jbg-card {
                margin-top: 8px;
            }
            .jbg-setting-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                padding: 10px;
                border-radius: 14px;
                border: 1px solid var(--jbg-border);
                background: rgba(255,255,255,.045);
            }
            .jbg-setting-copy {
                min-width: 0;
                display: flex;
                flex-direction: column;
                gap: 3px;
            }
            .jbg-setting-title {
                font-size: 12px;
                font-weight: 850;
                color: var(--jbg-text);
            }
            .jbg-setting-desc {
                font-size: 11px;
                line-height: 1.25;
                color: var(--jbg-muted);
            }
            .jbg-custom-select {
                position: relative;
                min-width: 160px;
                flex: 0 0 auto;
            }
            .jbg-custom-select-btn {
                width: 100%;
                min-height: 34px;
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                padding: 9px 12px 8px;
                border-radius: 14px;
                border: 1px solid color-mix(in srgb, var(--content_default, #fff) 14%, transparent);
                background:
                    linear-gradient(180deg, rgba(255,255,255,.105), rgba(255,255,255,.052));
                color: var(--jbg-text);
                font-size: 12px;
                line-height: 1;
                font-weight: 850;
                cursor: pointer;
                box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 8px 18px rgba(0,0,0,.16);
                transition: border-color .12s ease, background .12s ease, box-shadow .12s ease;
            }
            .jbg-custom-select-btn:hover {
                border-color: rgba(42,168,255,.38);
                background:
                    linear-gradient(180deg, rgba(255,255,255,.13), rgba(255,255,255,.065));
            }
            .jbg-custom-select-btn::after {
                content: '';
                width: 7px;
                height: 7px;
                border-right: 2px solid color-mix(in srgb, var(--content_default, #fff) 72%, transparent);
                border-bottom: 2px solid color-mix(in srgb, var(--content_default, #fff) 72%, transparent);
                transform: rotate(45deg) translateY(-2px);
                transition: transform .12s ease;
                flex: 0 0 auto;
            }
            .jbg-custom-select.is-open .jbg-custom-select-btn {
                border-color: rgba(42,168,255,.55);
                box-shadow: inset 0 1px 0 rgba(255,255,255,.10), 0 0 0 3px rgba(42,168,255,.12), 0 10px 24px rgba(0,0,0,.20);
            }
            .jbg-custom-select.is-open .jbg-custom-select-btn::after {
                transform: rotate(225deg) translate(-2px, -1px);
            }
            .jbg-custom-select-menu {
                position: fixed;
                right: auto;
                top: auto;
                left: 0;
                z-index: 2147483647;
                width: min(214px, 72vw);
                max-height: 260px;
                overflow-y: auto;
                overflow-x: hidden;
                overscroll-behavior: contain;
                padding: 6px;
                border-radius: 16px;
                border: 1px solid color-mix(in srgb, var(--content_default, #fff) 13%, transparent);
                background:
                    radial-gradient(circle at 100% 0%, rgba(42,168,255,.15), transparent 34%),
                    color-mix(in srgb, var(--background_default, #141820) 96%, transparent);
                box-shadow: 0 18px 44px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.08);
                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
                transform-origin: top right;
                animation: jbgSelectIn .115s ease-out;
                scrollbar-width: none;
            }
            .jbg-custom-select-menu::-webkit-scrollbar {
                width: 0 !important;
                height: 0 !important;
                display: none !important;
            }
            .jbg-custom-select-menu[hidden] {
                display: none !important;
            }
            @keyframes jbgSelectIn {
                from { opacity: 0; transform: translateY(-4px) scale(.985); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .jbg-custom-select-option {
                width: 100%;
                min-height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                padding: 8px 10px;
                border: 0;
                border-radius: 11px;
                background: transparent;
                color: color-mix(in srgb, var(--content_default, #fff) 78%, transparent);
                font-size: 12px;
                line-height: 1;
                font-weight: 780;
                cursor: pointer;
                text-align: left;
                transition: background .095s ease, color .095s ease, transform .095s ease;
            }
            .jbg-custom-select-option:hover {
                background: rgba(255,255,255,.075);
                color: var(--jbg-text);
                transform: translateX(1px);
            }
            .jbg-custom-select-option.is-active {
                color: #000 !important;
                -webkit-text-fill-color: #000 !important;
                background:
                    linear-gradient(180deg, rgba(42,168,255,.96), rgba(11,116,255,.90));
                box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 8px 16px rgba(42,168,255,.18);
            }
            .jbg-custom-select-option.is-active::after {
                content: '';
            }
            .jbg-segmented {
                display: inline-flex;
                gap: 4px;
                padding: 4px;
                border-radius: 13px;
                border: 1px solid var(--jbg-border);
                background: rgba(255,255,255,.055);
                flex-shrink: 0;
            }
            .jbg-segmented-btn {
                appearance: none;
                border: 0;
                border-radius: 10px;
                padding: 8px 10px 7px;
                min-height: 28px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                line-height: 1;
                font-weight: 850;
                color: var(--jbg-muted);
                background: transparent;
                cursor: pointer;
            }
            .jbg-segmented-btn.is-active {
                color: #fff !important;
                -webkit-text-fill-color: #fff !important;
                background: rgba(42,168,255,.92);
            }
            .jbg-toggle {
                position: relative;
                width: 46px;
                height: 26px;
                border: 1px solid var(--jbg-border);
                border-radius: 999px;
                background: rgba(255,255,255,.12);
                cursor: pointer;
                flex: 0 0 auto;
            }
            .jbg-toggle::after {
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                left: 2px;
                top: 2px;
                border-radius: 50%;
                background: #fff;
                transition: transform .18s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,.25);
            }
            .jbg-toggle.is-on {
                background: linear-gradient(180deg, var(--jbg-blue), var(--jbg-blue-2));
                border-color: rgba(42,168,255,.66);
            }
            .jbg-toggle.is-on::after {
                transform: translateX(20px);
            }

            .jbg-hero {
                margin-right: 14px;
                padding: 14px;
                border-radius: 18px;
                border: 1px solid rgba(255,255,255,.12);
                background:
                    radial-gradient(circle at 0% 0%, rgba(42,168,255,.28), transparent 38%),
                    linear-gradient(180deg, rgba(28,38,52,.96), rgba(15,23,42,.94));
                box-shadow: 0 14px 36px rgba(0,0,0,.20), inset 0 1px 0 rgba(255,255,255,.08);
                overflow: hidden;
            }
            .jbg-title-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                min-width: 0;
            }
            .jbg-title-block {
                display: flex;
                flex-direction: column;
                gap: 4px;
                min-width: 0;
            }
            .jbg-title {
                color: #fff;
                font-size: 16px;
                line-height: 1.1;
                font-weight: 950;
                letter-spacing: -.02em;
            }
            .jbg-subtitle {
                color: rgba(255,255,255,.68);
                font-size: 11px;
                line-height: 1.25;
                font-weight: 750;
                max-width: 240px;
            }

            .jbg-pill {
                border: 1px solid color-mix(in srgb, var(--jbg-blue) 30%, var(--jbg-border));
                color: var(--jbg-text);
                background: color-mix(in srgb, var(--jbg-blue) 14%, var(--jbg-elev));
                border-radius: 999px;
                padding: 3px 7px;
                font-size: 10px;
                font-weight: 900;
                white-space: nowrap;
            }
            .jbg-card {

                margin-right: 14px;border: 1px solid var(--jbg-border);
                border-radius: 16px;
                padding: 9px;
                background: linear-gradient(180deg, var(--jbg-elev), color-mix(in srgb, var(--jbg-elev) 88%, transparent));
                box-shadow: inset 0 1px 0 rgba(255,255,255,.04), 0 10px 22px rgba(0,0,0,.09);
                backdrop-filter: blur(14px) saturate(140%);
                -webkit-backdrop-filter: blur(14px) saturate(140%);
            }
        .jbg-card.is-disabled { opacity: .56; }
        .jbg-card.is-disabled .jbg-card-title,
        .jbg-card.is-disabled .jbg-small-label { opacity: .86; }

            .jbg-card-head {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                margin-bottom: 8px;
            }
            .jbg-card-title {
                font-size: 10.5px;
                font-weight: 950;
                letter-spacing: .075em;
                text-transform: uppercase;
                color: var(--jbg-muted);
            }
            .jbg-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
            .jbg-stack { display: flex; flex-direction: column; gap: 8px; }
            .jbg-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
            .jbg-btn {
                appearance: none;
                box-sizing: border-box;
                border: 1px solid color-mix(in srgb, var(--jbg-text) 13%, transparent);
                border-radius: 13px;
                min-height: 34px;
                padding: 3px 10px 0;
                color: var(--jbg-text);
                background: color-mix(in srgb, var(--jbg-elev-2) 88%, transparent);
                font-family: inherit;
                font-size: 11.2px;
                font-weight: 850;
                line-height: 1.15;
                cursor: pointer;
                transition: transform .12s ease, border-color .12s ease, background .12s ease, box-shadow .12s ease, opacity .12s ease;
                box-shadow: inset 0 1px 0 rgba(255,255,255,.035), 0 6px 14px rgba(0,0,0,.08);
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                white-space: nowrap;
                text-align: center;
                vertical-align: middle;
            }
            .jbg-btn:hover {
                transform: translateY(-1px);
                border-color: color-mix(in srgb, var(--jbg-blue) 55%, var(--jbg-border));
                background: color-mix(in srgb, var(--jbg-blue) 12%, var(--jbg-elev-2));
                box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 10px 20px rgba(0,0,0,.14);
            }
            .jbg-btn:active { transform: translateY(0) scale(.99); }
            .jbg-btn:disabled {
                opacity: .42;
                cursor: not-allowed;
                transform: none !important;
                box-shadow: inset 0 1px 0 rgba(255,255,255,.025);
            }
            .jbg-reset-btn { grid-column: 1 / -1; }
            .jbg-color-tabs {
                display: grid;
                grid-template-columns: repeat(5, minmax(0, 1fr));
                gap: 6px;
            }
            .jbg-color-tab {
                appearance: none;
                box-sizing: border-box;
                height: 32px;
                border-radius: 999px;
                border: 1px solid color-mix(in srgb, var(--jbg-text) 14%, transparent);
                background: color-mix(in srgb, var(--jbg-elev-2) 80%, transparent);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                box-shadow: inset 0 1px 0 rgba(255,255,255,.035);
            }
            .jbg-color-tab::before {
                content: '';
                width: 18px;
                height: 18px;
                border-radius: 999px;
                background: var(--swatch);
                box-shadow: 0 0 0 2px rgba(255,255,255,.12), 0 6px 14px rgba(0,0,0,.18);
            }
            .jbg-color-tab.is-active {
                border-color: color-mix(in srgb, var(--swatch) 70%, var(--jbg-border));
                background: color-mix(in srgb, var(--swatch) 18%, var(--jbg-elev-2));
                box-shadow: 0 0 0 3px color-mix(in srgb, var(--swatch) 18%, transparent), inset 0 1px 0 rgba(255,255,255,.08);
            }
            .jbg-btn-primary {
                width: 100%;
                min-height: 42px;
                border: 1px solid rgba(255,255,255,.28);
                background: linear-gradient(135deg, #1d8fff, #0866ff);
                color: #ffffff !important;
                -webkit-text-fill-color: #ffffff !important;
                box-shadow: none !important;
                font-size: 12px;
                font-weight: 950;
            }
            .jbg-btn-green {
                border-color: rgba(34,199,122,.34);
                background: color-mix(in srgb, var(--jbg-green) 17%, var(--jbg-elev-2));
            }
            .jbg-btn-red {
                border-color: rgba(255,83,102,.34);
                background: color-mix(in srgb, var(--jbg-red) 12%, var(--jbg-elev-2));
                color: #ffffff !important;
                -webkit-text-fill-color: #ffffff !important;
                text-shadow: none !important;
            }

            .jbg-btn-red:hover {
                transform: translateY(-1px);
                border-color: rgba(255,110,128,.62) !important;
                background: color-mix(in srgb, var(--jbg-red) 24%, var(--jbg-elev-2)) !important;
                color: #ffffff !important;
                -webkit-text-fill-color: #ffffff !important;
                text-shadow: none !important;
                box-shadow: inset 0 1px 0 rgba(255,255,255,.10), 0 10px 20px rgba(255,83,102,.18) !important;
            }

            .jbg-shell:not([data-jbg-theme="dark"]) .jbg-btn-red {
                border-color: rgba(185,28,28,.46) !important;
                background: linear-gradient(135deg, #ef4444, #b91c1c) !important;
                color: #ffffff !important;
                -webkit-text-fill-color: #ffffff !important;
                text-shadow: none !important;
            }
            .jbg-shell:not([data-jbg-theme="dark"]) .jbg-btn-red:hover {
                border-color: rgba(153,27,27,.66) !important;
                background: linear-gradient(135deg, #ff5a5a, #dc2626) !important;
                color: #ffffff !important;
                -webkit-text-fill-color: #ffffff !important;
                text-shadow: none !important;
                box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 10px 22px rgba(220,38,38,.24) !important;
            }
            .jbg-input {
                width: 38px;
                height: 30px;
                text-align: center;
                border: 1px solid var(--jbg-border);
                border-radius: 11px;
                padding: 5px;
                outline: none;
                background: var(--jbg-elev-2);
                color: var(--jbg-text);
                font-size: 13px;
                font-weight: 900;
                text-transform: lowercase;
            }
            .jbg-input:focus { border-color: rgba(42,168,255,.68); box-shadow: 0 0 0 3px rgba(42,168,255,.14); }
            .jbg-small-label { color: var(--jbg-muted); font-size: 11px; font-weight: 800; }


            .jbg-action-grid-final {
                display: grid !important;
                grid-template-columns: minmax(0, 1fr) 86px !important;
                grid-template-areas: "create abort" !important;
                gap: 8px !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                overflow: hidden !important;
                box-sizing: border-box !important;
            }
            .jbg-action-grid-final .jbg-action-primary {
                grid-area: create !important;
                min-width: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
            }
            .jbg-action-grid-final .jbg-action-abort {
                grid-area: abort !important;
                min-width: 0 !important;
                width: 86px !important;
                max-width: 86px !important;
                margin-top: 0 !important;
                padding-left: 6px !important;
                padding-right: 6px !important;
            }
            .jbg-btn:disabled,
            .jbg-btn-primary:disabled,
            .jbg-btn-red:disabled {
                opacity: .42 !important;
                cursor: not-allowed !important;
                pointer-events: none !important;
                filter: grayscale(.35) !important;
                box-shadow: none !important;
            }

            .jbg-action-grid {
                display: grid !important;
                grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
                grid-template-areas:
                    "recreate create"
                    "abort abort" !important;
                gap: 8px !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                overflow: hidden !important;
                box-sizing: border-box !important;
            }

            .jbg-action-grid-simple {
                grid-template-columns: 1fr !important;
                grid-template-areas:
                    "create"
                    "abort" !important;
            }

            .jbg-action-grid .jbg-btn {
                min-width: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                padding-left: 6px !important;
                padding-right: 6px !important;
            }
            .jbg-action-secondary { grid-area: recreate !important; }
            .jbg-action-primary { grid-area: create !important; }
            .jbg-action-abort { grid-area: abort !important; margin-top: 0 !important; }
            .jbg-action-row {
                display: grid !important;
                grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
                gap: 8px !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                overflow: hidden !important;
            }
            .jbg-action-row .jbg-btn {
                min-width: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                padding-left: 6px !important;
                padding-right: 6px !important;
            }


            .jbg-final-action-row {
                display: grid !important;
                grid-template-columns: minmax(0, 1fr) 84px !important;
                gap: 8px !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                overflow: hidden !important;
                box-sizing: border-box !important;
                align-items: stretch !important;
            }
            .jbg-final-action-row .jbg-btn,
            .jbg-final-action-row .jbg-btn-primary,
            .jbg-final-action-row .jbg-btn-red {
                min-width: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                height: 38px !important;
                min-height: 38px !important;
                box-sizing: border-box !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                margin: 0 !important;
                padding: 0 6px !important;
                line-height: 38px !important;
                align-items: center !important;
                justify-content: center !important;
            }
            .jbg-final-create {
                grid-column: 1 !important;
            }
            .jbg-final-abort {
                grid-column: 2 !important;
            }
            .jbg-final-create,
            .jbg-final-abort {
                color: #ffffff !important;
                -webkit-text-fill-color: #ffffff !important;
            }

            .jbg-status-card { padding: 8px 9px; }
            .jbg-status-card .jbg-card-head { margin-bottom: 0; }
            .jbg-status-card.is-open .jbg-card-head { margin-bottom: 8px; }
            .jbg-status-toggle {
                appearance: none;
                border: 1px solid color-mix(in srgb, var(--jbg-blue) 34%, var(--jbg-border));
                border-radius: 999px;
                min-height: 24px;
                padding: 0 10px;
                color: var(--jbg-text);
                background: color-mix(in srgb, var(--jbg-blue) 12%, var(--jbg-elev-2));
                font-size: 10px;
                font-weight: 950;
                line-height: 1;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
            .jbg-status {
                display: none;
                margin: 0;
                min-height: 58px;
                max-height: 126px;
                overflow: auto;
                border: 1px solid var(--jbg-border);
                border-radius: 14px;
                padding: 8px;
                background: color-mix(in srgb, #000 18%, var(--jbg-bg));
                color: var(--jbg-text);
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 10.3px;
                line-height: 1.34;
                white-space: pre-wrap;
            }
            .jbg-status-card.is-open .jbg-status { display: block; }
            .jbg-status::-webkit-scrollbar { width: 5px; height: 5px; }
            .jbg-status::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--jbg-text) 20%, transparent); border-radius: 999px; }
            .jbg-range-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
            .jbg-radius-value {
                border: 1px solid rgba(42,168,255,.40);
                border-radius: 999px;
                padding: 3px 9px;
                background: rgba(42,168,255,.14);
                color: var(--jbg-text);
                font-size: 11px;
                font-weight: 950;
                min-width: 44px;
                text-align: center;
            }
            .jbg-value-pill {
                appearance: none;
                cursor: pointer;
                line-height: 1;
            }
            .jbg-value-pill:hover {
                border-color: rgba(42,168,255,.70);
                background: rgba(42,168,255,.22);
            }
            .jbg-manual-cursor-marker {
                position: fixed;
                z-index: 2147483647;
                width: 13px;
                height: 13px;
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                background: #2aa8ff;
                border: 2px solid #fff;
                box-shadow: 0 0 0 3px rgba(42,168,255,.22), 0 8px 22px rgba(0,0,0,.35);
            }
            .jbg-manual-cursor-marker::after {
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 1px solid rgba(42,168,255,.55);
                transform: translate(-50%, -50%);
            }

            .jbg-range {
                width: 100%;
                appearance: none;
                -webkit-appearance: none;
                height: 24px;
                margin: 0;
                cursor: pointer;
                --jbg-range-pct: 0%;
                background:
                    linear-gradient(90deg,
                        rgba(42,168,255,.88) 0%,
                        rgba(42,168,255,.88) var(--jbg-range-pct),
                        color-mix(in srgb, var(--jbg-text) 16%, transparent) var(--jbg-range-pct),
                        color-mix(in srgb, var(--jbg-text) 16%, transparent) 100%);
                background-repeat: no-repeat;
                background-size: 100% 7px;
                background-position: center;
                border-radius: 999px;
            }
            .jbg-range::-webkit-slider-runnable-track {
                height: 7px;
                border-radius: 999px;
                border: 1px solid color-mix(in srgb, var(--jbg-text) 15%, transparent);
                background: transparent;
                box-shadow: inset 0 1px 2px rgba(0,0,0,.20);
            }
            .jbg-range::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 18px;
                height: 18px;
                margin-top: -6px;
                border-radius: 999px;
                border: 2px solid color-mix(in srgb, #fff 72%, var(--jbg-blue));
                background: linear-gradient(135deg, #35b5ff, #0b74ff);
                box-shadow: 0 6px 16px rgba(42,168,255,.34), 0 0 0 4px rgba(42,168,255,.13);
                transition: transform .12s ease, box-shadow .12s ease;
            }
            .jbg-range:hover::-webkit-slider-thumb {
                transform: scale(1.08);
                box-shadow: 0 8px 20px rgba(42,168,255,.42), 0 0 0 5px rgba(42,168,255,.16);
            }
            .jbg-range::-moz-range-track {
                height: 7px;
                border-radius: 999px;
                border: 1px solid color-mix(in srgb, var(--jbg-text) 15%, transparent);
                background: transparent;
            }
            .jbg-range::-moz-range-progress {
                height: 7px;
                border-radius: 999px;
                background: rgba(42,168,255,.88);
            }
            .jbg-range::-moz-range-thumb {
                width: 18px;
                height: 18px;
                border-radius: 999px;
                border: 2px solid color-mix(in srgb, #fff 72%, var(--jbg-blue));
                background: linear-gradient(135deg, #35b5ff, #0b74ff);
                box-shadow: 0 6px 16px rgba(42,168,255,.34), 0 0 0 4px rgba(42,168,255,.13);
            }
            .jbg-check-row {
                display: flex;
                align-items: center;
                gap: 8px;
                user-select: none;
                padding: 4px 2px 0;
            }
            .jbg-check-row input { accent-color: var(--jbg-blue); }
            .jbg-editor-info {
                border: 1px solid var(--jbg-border);
                border-radius: 14px;
                padding: 8px 9px;
                background: color-mix(in srgb, var(--jbg-elev-2) 82%, transparent);
                color: var(--jbg-muted);
                font-size: 11px;
                font-weight: 800;
                line-height: 1.32;
            }
            .jbg-action-row {
                display: grid;
                grid-template-columns: 1fr 86px;
                gap: 7px;
                align-items: stretch;
            }
            .jbg-delete-btn {
                min-height: 42px;
                font-size: 11px;
                font-weight: 950;
                color: #fff !important;
            }
            .jbg-compact-row {
                display: grid;
                grid-template-columns: repeat(4, minmax(0, 1fr));
                gap: 6px;
            }
            .jbg-compact-row .jbg-btn { min-height: 32px; padding-left: 4px; padding-right: 4px; font-size: 10.6px; line-height: 1; }
            .jbg-map-toolbar {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 10000000;
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 4px;
                border: 1px solid rgba(255,255,255,.24);
                border-radius: 14px;
                background: linear-gradient(180deg, rgba(22,28,38,.82), rgba(13,18,27,.72));
                color: #f8fafc;
                box-shadow: 0 14px 34px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.16);
                backdrop-filter: blur(16px) saturate(170%);
                -webkit-backdrop-filter: blur(16px) saturate(170%);
                opacity: 0;
                pointer-events: none;
                transform: translate3d(-9999px, -9999px, 0);
                transition: opacity .14s ease, box-shadow .14s ease;
                user-select: none;
            }
            .jbg-map-toolbar.is-visible { opacity: 1; pointer-events: auto; }
            .jbg-map-toolbar.is-moving, .jbg-map-toolbar.is-rotating { box-shadow: 0 18px 42px rgba(42,168,255,.22), 0 14px 34px rgba(0,0,0,.32), inset 0 1px 0 rgba(255,255,255,.18); }
            .jbg-map-tool {
                appearance: none;
                border: 1px solid rgba(255,255,255,.14);
                border-radius: 11px;
                height: 34px;
                padding: 0 10px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 7px;
                color: #f8fafc;
                background: rgba(255,255,255,.08);
                font: 800 12px/1 system-ui, -apple-system, Segoe UI, sans-serif;
                cursor: grab;
                transition: transform .12s ease, background .12s ease, border-color .12s ease;
            }
            .jbg-map-tool:hover { background: rgba(42,168,255,.18); border-color: rgba(42,168,255,.50); transform: translateY(-1px); }
            .jbg-map-tool:active { cursor: grabbing; transform: translateY(0) scale(.98); }
            .jbg-map-toolbar.is-moving [data-tool="move"],
            .jbg-map-toolbar.is-rotating [data-tool="rotate"] { background: rgba(42,168,255,.30); border-color: rgba(42,168,255,.75); }
            .jbg-map-tool-icon { width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center; }
            .jbg-map-tool-icon svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2.1; stroke-linecap: round; stroke-linejoin: round; }
            @media (max-width: 360px) {
                .jbg-map-tool-text { display: none; }
                .jbg-map-tool { padding: 0 8px; }
                .jbg-compact-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            }

            .jbg-modal-backdrop {
                position: fixed;
                inset: 0;
                z-index: 2147483647;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
                background: rgba(3, 7, 18, .54);
                backdrop-filter: blur(10px) saturate(145%);
                -webkit-backdrop-filter: blur(10px) saturate(145%);
                animation: jbgModalFade .14s ease both;
            }
            .jbg-modal {
                width: min(440px, calc(100vw - 36px));
                border-radius: 22px;
                border: 1px solid rgba(255,255,255,.16);
                background: linear-gradient(180deg, rgba(31, 41, 55, .98), rgba(12, 17, 27, .98));
                color: #f8fafc;
                box-shadow: 0 30px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(42,168,255,.10), inset 0 1px 0 rgba(255,255,255,.10);
                padding: 18px;
                transform-origin: center;
                animation: jbgModalPop .16s cubic-bezier(.2,.8,.2,1) both;
                font-family: system-ui, -apple-system, Segoe UI, sans-serif;
            }
            .jbg-modal-title {
                font-size: 15px;
                line-height: 1.2;
                font-weight: 950;
                letter-spacing: -.01em;
                margin: 0 0 8px;
                color: #fff;
            }
            .jbg-modal-message {
                color: rgba(226,232,240,.88);
                font-size: 13px;
                line-height: 1.45;
                margin: 0 0 18px;
            }
            .jbg-modal-actions {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 10px;
            }
            .jbg-modal-btn {
                appearance: none;
                min-height: 36px;
                border-radius: 13px;
                border: 1px solid rgba(255,255,255,.14);
                padding: 3px 14px 0;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background: rgba(255,255,255,.07);
                color: #fff;
                -webkit-text-fill-color: #fff;
                text-shadow: none;
                font: 900 12px/1 system-ui, -apple-system, Segoe UI, sans-serif;
                cursor: pointer;
                box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
                transition: transform .12s ease, background .12s ease, border-color .12s ease, box-shadow .12s ease;
            }
            .jbg-modal-btn:hover {
                background: rgba(255,255,255,.11);
                border-color: rgba(255,255,255,.22);
                transform: translateY(-1px);
            }
            .jbg-modal-btn:active { transform: translateY(0) scale(.98); }
            .jbg-modal-btn-primary {
                border-color: rgba(42,168,255,.65);
                background: linear-gradient(180deg, #2aa8ff, #0b7cff);
                color: #fff !important;
                -webkit-text-fill-color: #fff !important;
                box-shadow: 0 10px 26px rgba(42,168,255,.28), inset 0 1px 0 rgba(255,255,255,.22);
            }
            .jbg-modal-btn-primary:hover {
                background: linear-gradient(180deg, #48b7ff, #137fff);
                border-color: rgba(125,211,252,.80);
            }
            @keyframes jbgModalFade { from { opacity: 0; } to { opacity: 1; } }
            @keyframes jbgModalPop { from { opacity: 0; transform: scale(.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
            .jbg-splash-backdrop {
                position: fixed;
                inset: 0;
                z-index: 2147483647;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
                background: rgba(3, 7, 18, .48);
                backdrop-filter: blur(18px) saturate(160%);
                -webkit-backdrop-filter: blur(18px) saturate(160%);
                animation: jbgModalFade .16s ease both;
            }
            .jbg-splash {
                width: min(560px, calc(100vw - 34px));
                border-radius: 26px;
                border: 1px solid rgba(255,255,255,.16);
                background:
                    radial-gradient(circle at 18% 0%, rgba(42,168,255,.22), transparent 34%),
                    radial-gradient(circle at 92% 8%, rgba(192,132,252,.18), transparent 32%),
                    linear-gradient(180deg, rgba(31,41,55,.98), rgba(12,17,27,.98));
                color: #f8fafc;
                box-shadow: 0 30px 90px rgba(0,0,0,.56), inset 0 1px 0 rgba(255,255,255,.12);
                padding: 22px;
                font-family: system-ui, -apple-system, Segoe UI, sans-serif;
                animation: jbgModalPop .18s cubic-bezier(.2,.8,.2,1) both;
            }
            .jbg-splash-kicker {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                min-height: 24px;
                padding: 4px 10px;
                border-radius: 999px;
                border: 1px solid rgba(42,168,255,.34);
                background: rgba(42,168,255,.12);
                color: #dbeafe;
                font-size: 11px;
                font-weight: 900;
                letter-spacing: .03em;
                text-transform: uppercase;
            }
            .jbg-splash-title {
                margin-top: 14px;
                font-size: 26px;
                line-height: 1.04;
                font-weight: 950;
                letter-spacing: -.035em;
                color: #fff;
            }
            .jbg-splash-subtitle {
                margin-top: 9px;
                color: rgba(226,232,240,.80);
                font-size: 13px;
                line-height: 1.45;
                max-width: 48ch;
            }
            .jbg-splash-grid {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 10px;
                margin-top: 18px;
            }
            .jbg-splash-item {
                border: 1px solid rgba(255,255,255,.10);
                border-radius: 16px;
                background: rgba(255,255,255,.055);
                padding: 12px;
                min-height: 78px;
            }
            .jbg-splash-item-title {
                color: #fff;
                font-size: 13px;
                line-height: 1.15;
                font-weight: 920;
                margin-bottom: 5px;
            }
            .jbg-splash-item-text {
                color: rgba(226,232,240,.74);
                font-size: 12px;
                line-height: 1.35;
            }
            .jbg-changelog-list {
                display: grid;
                grid-template-columns: 1fr;
                gap: 12px;
                margin-top: 20px;
                max-width: 58ch;
            }
            .jbg-changelog-row {
                display: grid;
                grid-template-columns: 74px 1fr;
                gap: 12px;
                align-items: start;
            }
            .jbg-changelog-type {
                width: fit-content;
                min-width: 56px;
                padding: 4px 9px;
                border-radius: 999px;
                border: 1px solid rgba(42,168,255,.32);
                background: rgba(42,168,255,.12);
                color: #dbeafe;
                -webkit-text-fill-color: #dbeafe;
                font-size: 11px;
                line-height: 1.15;
                font-weight: 950;
                text-align: center;
            }
            .jbg-changelog-type.is-fixed {
                border-color: rgba(34,197,94,.38);
                background: rgba(34,197,94,.14);
                color: #bbf7d0;
                -webkit-text-fill-color: #bbf7d0;
            }
            .jbg-changelog-type.is-added {
                border-color: rgba(42,168,255,.32);
                background: rgba(42,168,255,.12);
                color: #dbeafe;
                -webkit-text-fill-color: #dbeafe;
            }
            .jbg-changelog-type.is-known-issue {
                border-color: rgba(248,113,113,.42);
                background: rgba(248,113,113,.14);
                color: #fecaca;
                -webkit-text-fill-color: #fecaca;
            }
            .jbg-changelog-text {
                color: rgba(226,232,240,.82);
                -webkit-text-fill-color: rgba(226,232,240,.82);
                font-size: 13px;
                line-height: 1.42;
                padding-top: 2px;
            }
            .jbg-splash-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 18px;
            }
            .jbg-splash-btn {
                appearance: none;
                min-height: 38px;
                height: 38px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 14px;
                border: 1px solid rgba(125,211,252,.40);
                padding: 0 15px;
                background: linear-gradient(180deg, #2aa8ff, #0b74ff);
                color: #fff;
                -webkit-text-fill-color: #fff;
                font-size: 12px;
                line-height: 1;
                font-weight: 900;
                cursor: pointer;
                box-shadow: 0 12px 28px rgba(42,168,255,.24);
            }
            .jbg-splash-btn:hover {
                background: linear-gradient(180deg, #48b7ff, #137fff);
            }

            .jbg-setup-grid {
                display: grid;
                grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
                gap: 12px;
                margin-top: 18px;
                align-items: stretch;
            }
            .jbg-setup-field {
                min-width: 0;
                display: grid;
                grid-template-rows: auto 1fr;
                gap: 8px;
            }
            .jbg-setup-label {
                color: rgba(226,232,240,.78);
                font-size: 12px;
                font-weight: 900;
            }
            .jbg-splash .jbg-custom-select {
                width: 250px;
                min-width: 0;
                max-width: 250px;
                position: relative;
            }
            .jbg-splash .jbg-custom-select-btn {
                min-height: 44px;
                border-radius: 16px;
                padding: 0 13px;
                background: linear-gradient(180deg, rgba(255,255,255,.105), rgba(255,255,255,.052));
                border-color: rgba(255,255,255,.16);
                color: #fff;
                -webkit-text-fill-color: #fff;
            }
            .jbg-splash .jbg-custom-select-menu {
                position: absolute !important;
                left: 0 !important;
                right: auto !important;
                top: calc(100% + 7px) !important;
                bottom: auto !important;
                width: 250px !important;
                max-width: 250px !important;
                max-height: 236px;
                z-index: 2147483647;
                scrollbar-width: none;
            }
            .jbg-splash .jbg-custom-select-menu::-webkit-scrollbar {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
            }
            .jbg-setup-toggle {
                width: 100%;
                min-height: 44px;
                height: 44px;
                overflow: hidden;
                border-radius: 16px;
                border: 1px solid rgba(255,255,255,.16);
                background: rgba(255,255,255,.065);
                color: #fff;
                -webkit-text-fill-color: #fff;
                padding: 8px 12px;
                display: grid;
                grid-template-columns: minmax(0, 1fr) auto;
                align-items: center;
                gap: 12px;
                cursor: pointer;
                text-align: left;
            }
            .jbg-setup-toggle-title {
                font-size: 13px;
                font-weight: 920;
                line-height: 1.1;
            }
            .jbg-setup-toggle-sub {
                margin-top: 3px;
                color: rgba(226,232,240,.68);
                font-size: 11px;
                line-height: 1.2;
                font-weight: 650;
            }
            .jbg-setup-switch {
                width: 42px;
                height: 24px;
                border-radius: 999px;
                background: rgba(148,163,184,.34);
                position: relative;
                box-shadow: inset 0 1px 2px rgba(0,0,0,.28);
                transition: background .14s ease;
            }
            .jbg-setup-switch::after {
                content: '';
                position: absolute;
                width: 18px;
                height: 18px;
                left: 3px;
                top: 3px;
                border-radius: 999px;
                background: #fff;
                box-shadow: 0 4px 10px rgba(0,0,0,.28);
                transition: transform .14s ease;
            }
            .jbg-setup-toggle.is-on .jbg-setup-switch {
                background: #2aa8ff;
            }
            .jbg-setup-toggle.is-on .jbg-setup-switch::after {
                transform: translateX(18px);
            }

            .jbg-setup-field:first-child {
                width: 250px;
                max-width: 250px;
            }
            .jbg-setup-field:nth-child(2) {
                min-width: 0;
            }
            .jbg-setup-info-btn {
                appearance: none;
                width: 22px;
                height: 22px;
                border-radius: 999px;
                border: 1px solid rgba(125,211,252,.45);
                background: rgba(42,168,255,.14);
                color: #fff;
                -webkit-text-fill-color: #fff;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font: 950 12px/1 system-ui, -apple-system, Segoe UI, sans-serif;
                cursor: pointer;
                flex: 0 0 auto;
            }
            .jbg-setup-info-btn:hover {
                background: rgba(42,168,255,.22);
            }
            .jbg-setup-toggle-copy {
                min-width: 0;
            }
            .jbg-setup-toggle-title-row {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                min-width: 0;
            }
            .jbg-setup-toggle-title-row .jbg-setup-toggle-title {
                white-space: nowrap;
            }

            .jbg-setup-toggle-copy {
                display: inline-flex !important;
                align-items: center !important;
                min-width: 0 !important;
            }
            .jbg-setup-toggle-sub {
                display: none !important;
            }
            .jbg-setup-toggle-title-row {
                display: inline-flex !important;
                align-items: center !important;
                gap: 7px !important;
                min-width: 0 !important;
            }
            .jbg-setup-toggle-title-row .jbg-setup-toggle-title {
                white-space: nowrap !important;
            }
            @media (max-width: 560px) {
                .jbg-setup-field:first-child,
                .jbg-splash .jbg-custom-select,
                .jbg-splash .jbg-custom-select-menu {
                    width: 100% !important;
                    max-width: none !important;
                }
            }
            @media (max-width: 560px) {
                .jbg-setup-grid { grid-template-columns: 1fr; }
            }
            @media (max-width: 520px) {
                .jbg-splash-grid { grid-template-columns: 1fr; }
                .jbg-splash-title { font-size: 22px; }
            }


            .jbg-warning-toast,
            .jbg-info-toast {
                position: fixed;
                left: 50%;
                bottom: 24px;
                z-index: 2147483647;
                width: min(520px, calc(100vw - 32px));
                display: grid;
                grid-template-columns: minmax(0, 1fr) auto;
                gap: 14px;
                align-items: center;
                padding: 14px;
                border-radius: 18px;
                border: 1px solid rgba(255,83,102,.55);
                background: linear-gradient(180deg, rgba(75, 19, 28, .98), rgba(45, 12, 20, .98));
                color: #fff;
                box-shadow: 0 20px 70px rgba(0,0,0,.48), 0 0 0 1px rgba(255,83,102,.14), inset 0 1px 0 rgba(255,255,255,.10);
                font-family: system-ui, -apple-system, Segoe UI, sans-serif;
                opacity: 0;
                transform: translate(-50%, 12px) scale(.98);
                transition: opacity .16s ease, transform .16s ease;
                pointer-events: auto;
            }
            .jbg-warning-toast.is-visible,
            .jbg-info-toast.is-visible {
                opacity: 1;
                transform: translate(-50%, 0) scale(1);
            }
            .jbg-info-toast {
                border-color: rgba(42,168,255,.50);
            }
            .jbg-info-toast .jbg-warning-title {
                color: #fff;
            }
            .jbg-info-toast {
                border-color: rgba(42,168,255,.50) !important;
                background:
                    radial-gradient(circle at 0% 0%, rgba(42,168,255,.18), transparent 34%),
                    color-mix(in srgb, var(--background_default, #141820) 92%, transparent) !important;
                box-shadow: 0 18px 48px rgba(0,0,0,.34), 0 0 0 1px rgba(42,168,255,.12) !important;
            }
            .jbg-info-toast .jbg-warning-title {
                color: var(--content_default, #fff) !important;
                -webkit-text-fill-color: var(--content_default, #fff) !important;
            }
            .jbg-info-toast .jbg-warning-message {
                color: color-mix(in srgb, var(--content_default, #fff) 78%, transparent) !important;
            }
            .jbg-info-toast .jbg-warning-btn,
            .jbg-info-toast .jbg-warning-btn-primary {
                border-color: rgba(42,168,255,.55) !important;
                background: rgba(42,168,255,.18) !important;
                color: var(--content_default, #fff) !important;
                -webkit-text-fill-color: var(--content_default, #fff) !important;
                box-shadow: none !important;
                transform: none !important;
                filter: none !important;
            }
            .jbg-info-toast .jbg-warning-btn:hover,
            .jbg-info-toast .jbg-warning-btn:focus,
            .jbg-info-toast .jbg-warning-btn:active,
            .jbg-info-toast .jbg-warning-btn-primary:hover,
            .jbg-info-toast .jbg-warning-btn-primary:focus,
            .jbg-info-toast .jbg-warning-btn-primary:active {
                border-color: rgba(42,168,255,.55) !important;
                background: rgba(42,168,255,.18) !important;
                color: var(--content_default, #fff) !important;
                -webkit-text-fill-color: var(--content_default, #fff) !important;
                box-shadow: none !important;
                transform: none !important;
                filter: none !important;
            }
            .jbg-warning-title {
                font-size: 13px;
                line-height: 1.2;
                font-weight: 950;
                letter-spacing: -.01em;
                color: #fff;
                margin-bottom: 3px;
            }
            .jbg-warning-message {
                font-size: 12px;
                line-height: 1.35;
                font-weight: 760;
                color: rgba(255,235,238,.84);
            }
            .jbg-warning-actions {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .jbg-warning-btn {
                appearance: none;
                min-height: 34px;
                border-radius: 12px;
                border: 1px solid rgba(255,83,102,.42);
                padding: 0px 15px 0;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background: rgba(255,83,102,.18);
                color: #fff;
                font: 900 12px/1 system-ui, -apple-system, Segoe UI, sans-serif;
                cursor: pointer;
                white-space: nowrap;
            }
            .jbg-warning-btn-primary {
                color: #fff !important;
                padding: 10px 10px;
                border-color: rgba(255,150,165,.62);
                background: linear-gradient(180deg, #ff5f7a, #f0254d);
                box-shadow: 0 10px 24px rgba(255,83,102,.24), inset 0 1px 0 rgba(255,255,255,.18);
            }
            .jbg-warning-btn:hover {
                background: rgba(255,83,102,.26);
                border-color: rgba(255,130,145,.62);
            }
            .jbg-warning-btn-primary,
            .jbg-warning-btn-primary * {
                color: #fff !important;
                -webkit-text-fill-color: #fff !important;
            }
            .jbg-warning-btn-primary:hover {
                background: linear-gradient(180deg, #ff7088, #ff3158);
                border-color: rgba(255,170,185,.76);
            }

            @media (max-width: 520px) {
                .jbg-warning-toast {
                    grid-template-columns: 1fr;
                }
                .jbg-warning-actions {
                    justify-content: flex-end;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .jbg-btn, .jbg-map-toolbar, .jbg-map-tool { transition: none; }
                .jbg-btn:hover, .jbg-map-tool:hover { transform: none; }
            }

            .jbg-map-tool.jbg-rotate-tool,
            .jbg-map-tool.jbg-rotate-tool:hover,
            .jbg-map-tool.jbg-rotate-tool:active,
            .jbg-map-tool.jbg-rotate-tool:focus,
            .jbg-map-toolbar.is-rotating .jbg-map-tool.jbg-rotate-tool,
            .jbg-map-toolbar [data-tool="rotate"],
            .jbg-map-toolbar [data-tool="rotate"]:hover,
            .jbg-map-toolbar [data-tool="rotate"]:active,
            .jbg-map-toolbar [data-tool="rotate"]:focus {
                appearance: none !important;
                width: 28px !important;
                min-width: 28px !important;
                height: 28px !important;
                min-height: 28px !important;
                padding: 0 !important;
                margin: 0 !important;
                border: 0 !important;
                outline: 0 !important;
                border-radius: 0 !important;
                background: transparent !important;
                box-shadow: none !important;
                transform: none !important;
                color: #fff !important;
            }
            .jbg-map-tool.jbg-rotate-tool::before,
            .jbg-map-tool.jbg-rotate-tool::after,
            .jbg-map-toolbar [data-tool="rotate"]::before,
            .jbg-map-toolbar [data-tool="rotate"]::after {
                display: none !important;
                content: none !important;
            }
            .jbg-map-tool.jbg-rotate-tool .jbg-map-tool-icon,
            .jbg-map-tool.jbg-rotate-tool svg,
            .jbg-map-toolbar [data-tool="rotate"] .jbg-map-tool-icon,
            .jbg-map-toolbar [data-tool="rotate"] svg,
            .jbg-map-toolbar [data-tool="rotate"] .jbg-map-tool-text {
                display: none !important;
            }
            .jbg-rotate-glyph {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                width: 28px !important;
                height: 28px !important;
                background: transparent !important;
                border: 0 !important;
                border-radius: 0 !important;
                box-shadow: none !important;
                color: #fff !important;
                -webkit-text-fill-color: #fff !important;
                font: 900 24px/1 system-ui, -apple-system, Segoe UI, sans-serif !important;
                text-shadow:
                    0 1px 2px rgba(0,0,0,.95),
                    0 3px 6px rgba(0,0,0,.80),
                    0 7px 14px rgba(0,0,0,.58) !important;
                transform: translateY(-1px);
                pointer-events: none !important;
            }
            .jbg-map-toolbar.is-rotating {
                background: transparent !important;
                border-color: transparent !important;
                box-shadow: none !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }

            .jbg-info-toast,
            .jbg-warning-toast {
                backdrop-filter: blur(18px) saturate(160%) !important;
                -webkit-backdrop-filter: blur(18px) saturate(160%) !important;
            }

            .jbg-splash .jbg-setup-field .jbg-custom-select {
                position: relative !important;
                width: 250px !important;
                max-width: 250px !important;
            }
            .jbg-splash .jbg-setup-field .jbg-custom-select .jbg-custom-select-menu {
                position: absolute !important;
                left: 0 !important;
                right: auto !important;
                top: calc(100% + 7px) !important;
                bottom: auto !important;
                width: 250px !important;
                max-width: 250px !important;
                transform: none !important;
            }

            .jbg-custom-poly-textarea {
                width: 100%;
                min-height: 170px;
                resize: vertical;
                border-radius: 16px;
                border: 1px solid rgba(255,255,255,.16);
                background: rgba(255,255,255,.07);
                color: #fff;
                -webkit-text-fill-color: #fff;
                padding: 12px;
                font: 700 12px/1.35 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                outline: none;
                box-sizing: border-box;
            }
            .jbg-custom-poly-textarea::placeholder {
                color: rgba(226,232,240,.55);
                -webkit-text-fill-color: rgba(226,232,240,.55);
            }
            .jbg-shortcuts-grid {
                display: grid;
                gap: 7px;
                margin-top: 4px;
            }
            .jbg-shortcut-row {
                display: grid;
                grid-template-columns: auto minmax(0, 1fr);
                align-items: center;
                gap: 10px;
                font-size: 12px;
                color: var(--jbg-muted);
            }
            .jbg-key {
                min-width: 34px;
                min-height: 24px;
                padding: 3px 8px 2px;
                border-radius: 8px;
                border: 1px solid var(--jbg-border);
                background: rgba(255,255,255,.075);
                color: var(--jbg-text);
                -webkit-text-fill-color: var(--jbg-text);
                font: 900 11px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }

            .jbg-shortcuts-card {
                display: block !important;
                width: 100% !important;
                box-sizing: border-box !important;
                margin-top: 8px;
            }
            .jbg-shortcuts-card .jbg-card-head {
                margin-bottom: 10px;
            }
            .jbg-shortcuts-card .jbg-setting-desc {
                margin-bottom: 12px;
            }

            .jbg-modal-btn,
            .jbg-modal-btn-primary {
                margin-top: 10px;
            }

            .jbg-splash-actions {
                align-items: center !important;
            }
            .jbg-splash-btn,
            .jbg-splash-btn:hover,
            .jbg-splash-btn:focus,
            .jbg-splash-btn:active,
            .jbg-splash .jbg-modal-btn,
            .jbg-splash .jbg-modal-btn:hover,
            .jbg-splash .jbg-modal-btn:focus,
            .jbg-splash .jbg-modal-btn:active {
                min-height: 38px !important;
                height: 38px !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 0 16px !important;
                line-height: 1 !important;
                margin-top: 0 !important;
                transform: none !important;
                box-sizing: border-box !important;
                vertical-align: middle !important;
            }
            .jbg-splash-btn {
                padding-top: 0 !important;
                padding-bottom: 0 !important;
            }
            .jbg-splash .jbg-modal-btn {
                padding-top: 0 !important;
                padding-bottom: 0 !important;
            }

            .jbg-shell .jbg-nav-tab:not(.is-active) {
                color: color-mix(in srgb, var(--jbg-text) 72%, #64748b) !important;
                -webkit-text-fill-color: color-mix(in srgb, var(--jbg-text) 72%, #64748b) !important;
            }
            .jbg-shell .jbg-nav-tab:not(.is-active):hover {
                color: var(--jbg-text) !important;
                -webkit-text-fill-color: var(--jbg-text) !important;
                background: color-mix(in srgb, var(--jbg-text) 7%, transparent);
            }
            html[wz-theme="light"] .jbg-shell .jbg-color-tab[data-color="#E6E6E6"]::before,
            body[wz-theme="light"] .jbg-shell .jbg-color-tab[data-color="#E6E6E6"]::before {
                border: 1px solid rgba(100,116,139,.70);
                box-shadow: 0 0 0 2px rgba(15,23,42,.16), 0 6px 14px rgba(0,0,0,.16);
            }

            .jbg-color-tab[data-color="#E6E6E6"] {
                background: color-mix(in srgb, var(--jbg-elev-2) 80%, transparent) !important;
            }
            .jbg-color-tab[data-color="#E6E6E6"].is-active {
                background: color-mix(in srgb, var(--swatch) 18%, var(--jbg-elev-2)) !important;
            }
            .jbg-color-tab[data-color="#E6E6E6"]::before {
                background: var(--swatch) !important;
                border: 0;
            }
            html[wz-theme="light"] .jbg-shell .jbg-color-tab[data-color="#E6E6E6"]::before,
            body[wz-theme="light"] .jbg-shell .jbg-color-tab[data-color="#E6E6E6"]::before {
                border: 1px solid rgba(100,116,139,.70) !important;
                box-shadow: 0 0 0 2px rgba(15,23,42,.16), 0 6px 14px rgba(0,0,0,.16) !important;
            }

            html[wz-theme="light"] .jbg-shell .jbg-hero,
            body[wz-theme="light"] .jbg-shell .jbg-hero,
            [wz-theme="light"] .jbg-shell .jbg-hero,
            .theme-light .jbg-shell .jbg-hero,
            .wmeRcLight .jbg-shell .jbg-hero {
                border-color: rgba(15,23,42,.12) !important;
                background:
                    radial-gradient(circle at 0% 0%, rgba(42,168,255,.16), transparent 40%),
                    linear-gradient(180deg, rgba(255,255,255,.98), rgba(241,245,249,.96)) !important;
                box-shadow: 0 14px 30px rgba(15,23,42,.10), inset 0 1px 0 rgba(255,255,255,.92) !important;
            }
            html[wz-theme="light"] .jbg-shell .jbg-title,
            body[wz-theme="light"] .jbg-shell .jbg-title,
            [wz-theme="light"] .jbg-shell .jbg-title,
            .theme-light .jbg-shell .jbg-title,
            .wmeRcLight .jbg-shell .jbg-title {
                color: #0f172a !important;
                -webkit-text-fill-color: #0f172a !important;
            }
            html[wz-theme="light"] .jbg-shell .jbg-subtitle,
            body[wz-theme="light"] .jbg-shell .jbg-subtitle,
            [wz-theme="light"] .jbg-shell .jbg-subtitle,
            .theme-light .jbg-shell .jbg-subtitle,
            .wmeRcLight .jbg-shell .jbg-subtitle {
                color: rgba(51,65,85,.82) !important;
                -webkit-text-fill-color: rgba(51,65,85,.82) !important;
            }
            html[wz-theme="light"] .jbg-modal-backdrop,
            html[wz-theme="light"] .jbg-splash-backdrop,
            [wz-theme="light"] .jbg-modal-backdrop,
            [wz-theme="light"] .jbg-splash-backdrop,
            .theme-light .jbg-modal-backdrop,
            .theme-light .jbg-splash-backdrop,
            .wmeRcLight .jbg-modal-backdrop,
            .wmeRcLight .jbg-splash-backdrop {
                background: rgba(248,250,252,.54) !important;
                backdrop-filter: blur(14px) saturate(150%) !important;
                -webkit-backdrop-filter: blur(14px) saturate(150%) !important;
            }
            html[wz-theme="light"] .jbg-modal,
            [wz-theme="light"] .jbg-modal,
            .theme-light .jbg-modal,
            .wmeRcLight .jbg-modal {
                border-color: rgba(15,23,42,.13) !important;
                background: linear-gradient(180deg, rgba(255,255,255,.98), rgba(248,250,252,.98)) !important;
                color: #0f172a !important;
                box-shadow: 0 30px 80px rgba(15,23,42,.20), 0 0 0 1px rgba(42,168,255,.06), inset 0 1px 0 rgba(255,255,255,.92) !important;
            }
            html[wz-theme="light"] .jbg-modal-title,
            [wz-theme="light"] .jbg-modal-title,
            .theme-light .jbg-modal-title,
            .wmeRcLight .jbg-modal-title {
                color: #0f172a !important;
                -webkit-text-fill-color: #0f172a !important;
            }
            html[wz-theme="light"] .jbg-modal-message,
            [wz-theme="light"] .jbg-modal-message,
            .theme-light .jbg-modal-message,
            .wmeRcLight .jbg-modal-message {
                color: rgba(51,65,85,.86) !important;
                -webkit-text-fill-color: rgba(51,65,85,.86) !important;
            }
            html[wz-theme="light"] .jbg-modal .jbg-modal-btn:not(.jbg-modal-btn-primary),
            [wz-theme="light"] .jbg-modal .jbg-modal-btn:not(.jbg-modal-btn-primary),
            .theme-light .jbg-modal .jbg-modal-btn:not(.jbg-modal-btn-primary),
            .wmeRcLight .jbg-modal .jbg-modal-btn:not(.jbg-modal-btn-primary) {
                border-color: rgba(185,28,28,.34) !important;
                background: linear-gradient(180deg, rgba(239,68,68,.92), rgba(185,28,28,.88)) !important;
                color: #fff !important;
                -webkit-text-fill-color: #fff !important;
                text-shadow: none !important;
                box-shadow: 0 10px 22px rgba(185,28,28,.20), inset 0 1px 0 rgba(255,255,255,.22) !important;
            }
            html[wz-theme="light"] .jbg-modal .jbg-modal-btn:not(.jbg-modal-btn-primary):hover,
            [wz-theme="light"] .jbg-modal .jbg-modal-btn:not(.jbg-modal-btn-primary):hover,
            .theme-light .jbg-modal .jbg-modal-btn:not(.jbg-modal-btn-primary):hover,
            .wmeRcLight .jbg-modal .jbg-modal-btn:not(.jbg-modal-btn-primary):hover {
                border-color: rgba(220,38,38,.52) !important;
                background: linear-gradient(180deg, rgba(248,113,113,.96), rgba(220,38,38,.92)) !important;
                box-shadow: 0 12px 26px rgba(185,28,28,.26), inset 0 1px 0 rgba(255,255,255,.26) !important;
            }
            html[wz-theme="light"] .jbg-splash,
            [wz-theme="light"] .jbg-splash,
            .theme-light .jbg-splash,
            .wmeRcLight .jbg-splash {
                border-color: rgba(15,23,42,.13) !important;
                background:
                    radial-gradient(circle at 18% 0%, rgba(42,168,255,.14), transparent 34%),
                    radial-gradient(circle at 92% 8%, rgba(192,132,252,.12), transparent 32%),
                    linear-gradient(180deg, rgba(255,255,255,.98), rgba(248,250,252,.98)) !important;
                color: #0f172a !important;
                box-shadow: 0 30px 90px rgba(15,23,42,.20), inset 0 1px 0 rgba(255,255,255,.92) !important;
            }
            html[wz-theme="light"] .jbg-splash-title,
            html[wz-theme="light"] .jbg-splash-item-title,
            html[wz-theme="light"] .jbg-setup-toggle-title,
            [wz-theme="light"] .jbg-splash-title,
            [wz-theme="light"] .jbg-splash-item-title,
            [wz-theme="light"] .jbg-setup-toggle-title,
            .theme-light .jbg-splash-title,
            .theme-light .jbg-splash-item-title,
            .theme-light .jbg-setup-toggle-title,
            .wmeRcLight .jbg-splash-title,
            .wmeRcLight .jbg-splash-item-title,
            .wmeRcLight .jbg-setup-toggle-title {
                color: #0f172a !important;
                -webkit-text-fill-color: #0f172a !important;
            }
            html[wz-theme="light"] .jbg-splash-subtitle,
            html[wz-theme="light"] .jbg-splash-item-text,
            html[wz-theme="light"] .jbg-setup-label,
            html[wz-theme="light"] .jbg-setup-toggle-sub,
            [wz-theme="light"] .jbg-splash-subtitle,
            [wz-theme="light"] .jbg-splash-item-text,
            [wz-theme="light"] .jbg-setup-label,
            [wz-theme="light"] .jbg-setup-toggle-sub,
            .theme-light .jbg-splash-subtitle,
            .theme-light .jbg-splash-item-text,
            .theme-light .jbg-setup-label,
            .theme-light .jbg-setup-toggle-sub,
            .wmeRcLight .jbg-splash-subtitle,
            .wmeRcLight .jbg-splash-item-text,
            .wmeRcLight .jbg-setup-label,
            .wmeRcLight .jbg-setup-toggle-sub {
                color: rgba(51,65,85,.82) !important;
                -webkit-text-fill-color: rgba(51,65,85,.82) !important;
            }
            html[wz-theme="light"] .jbg-splash-kicker,
            [wz-theme="light"] .jbg-splash-kicker,
            .theme-light .jbg-splash-kicker,
            .wmeRcLight .jbg-splash-kicker {
                border-color: rgba(37,99,235,.24) !important;
                background: rgba(37,99,235,.08) !important;
                color: #1d4ed8 !important;
                -webkit-text-fill-color: #1d4ed8 !important;
            }
            html[wz-theme="light"] .jbg-splash-item,
            [wz-theme="light"] .jbg-splash-item,
            .theme-light .jbg-splash-item,
            .wmeRcLight .jbg-splash-item,
            html[wz-theme="light"] .jbg-setup-toggle,
            [wz-theme="light"] .jbg-setup-toggle,
            .theme-light .jbg-setup-toggle,
            .wmeRcLight .jbg-setup-toggle {
                border-color: rgba(15,23,42,.11) !important;
                background: rgba(15,23,42,.045) !important;
                color: #0f172a !important;
                -webkit-text-fill-color: #0f172a !important;
            }
            html[wz-theme="light"] .jbg-splash .jbg-custom-select-btn,
            [wz-theme="light"] .jbg-splash .jbg-custom-select-btn,
            .theme-light .jbg-splash .jbg-custom-select-btn,
            .wmeRcLight .jbg-splash .jbg-custom-select-btn {
                border-color: rgba(15,23,42,.13) !important;
                background: linear-gradient(180deg, rgba(255,255,255,.95), rgba(241,245,249,.88)) !important;
                color: #0f172a !important;
                -webkit-text-fill-color: #0f172a !important;
            }
            html[wz-theme="light"] .jbg-splash .jbg-custom-select-menu,
            [wz-theme="light"] .jbg-splash .jbg-custom-select-menu,
            .theme-light .jbg-splash .jbg-custom-select-menu,
            .wmeRcLight .jbg-splash .jbg-custom-select-menu {
                border-color: rgba(15,23,42,.12) !important;
                background: rgba(255,255,255,.98) !important;
                box-shadow: 0 18px 44px rgba(15,23,42,.18), inset 0 1px 0 rgba(255,255,255,.92) !important;
            }
            html[wz-theme="light"] .jbg-custom-poly-textarea,
            [wz-theme="light"] .jbg-custom-poly-textarea,
            .theme-light .jbg-custom-poly-textarea,
            .wmeRcLight .jbg-custom-poly-textarea {
                border-color: rgba(15,23,42,.14) !important;
                background: rgba(15,23,42,.045) !important;
                color: #0f172a !important;
                -webkit-text-fill-color: #0f172a !important;
                scrollbar-color: rgba(100,116,139,.45) transparent;
            }
            html[wz-theme="light"] .jbg-custom-poly-textarea::placeholder,
            [wz-theme="light"] .jbg-custom-poly-textarea::placeholder,
            .theme-light .jbg-custom-poly-textarea::placeholder,
            .wmeRcLight .jbg-custom-poly-textarea::placeholder {
                color: rgba(100,116,139,.70) !important;
                -webkit-text-fill-color: rgba(100,116,139,.70) !important;
            }


            .jbg-shell .jbg-hero {
                border-color: var(--jbg-border) !important;
                background:
                    radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--jbg-blue, #2aa8ff) 18%, transparent), transparent 42%),
                    linear-gradient(180deg,
                        color-mix(in srgb, var(--background_default, #141820) 92%, var(--content_default, #fff) 8%),
                        color-mix(in srgb, var(--background_default, #141820) 98%, var(--content_default, #fff) 2%)
                    ) !important;
                box-shadow: inset 0 1px 0 color-mix(in srgb, var(--content_default, #fff) 8%, transparent), 0 14px 30px rgba(0,0,0,.14) !important;
            }
            .jbg-shell .jbg-title {
                color: var(--jbg-text) !important;
                -webkit-text-fill-color: var(--jbg-text) !important;
            }
            .jbg-shell .jbg-subtitle {
                color: var(--jbg-muted) !important;
                -webkit-text-fill-color: var(--jbg-muted) !important;
            }
            .jbg-modal-backdrop,
            .jbg-splash-backdrop {
                background: color-mix(in srgb, var(--background_default, #141820) 58%, transparent) !important;
                backdrop-filter: blur(14px) saturate(150%) !important;
                -webkit-backdrop-filter: blur(14px) saturate(150%) !important;
            }
            .jbg-modal,
            .jbg-splash {
                border-color: color-mix(in srgb, var(--content_default, #f4f7fb) 13%, transparent) !important;
                background:
                    radial-gradient(circle at 18% 0%, color-mix(in srgb, #2aa8ff 12%, transparent), transparent 34%),
                    radial-gradient(circle at 92% 8%, color-mix(in srgb, #a855f7 10%, transparent), transparent 32%),
                    linear-gradient(180deg,
                        color-mix(in srgb, var(--background_default, #141820) 94%, var(--content_default, #f4f7fb) 6%),
                        color-mix(in srgb, var(--background_default, #141820) 98%, var(--content_default, #f4f7fb) 2%)
                    ) !important;
                color: var(--content_default, #f4f7fb) !important;
                box-shadow: 0 30px 80px rgba(0,0,0,.28), inset 0 1px 0 color-mix(in srgb, var(--content_default, #f4f7fb) 8%, transparent) !important;
            }
            .jbg-modal-title,
            .jbg-splash-title,
            .jbg-splash-item-title,
            .jbg-setup-toggle-title {
                color: var(--content_default, #f4f7fb) !important;
                -webkit-text-fill-color: var(--content_default, #f4f7fb) !important;
            }
            .jbg-modal-message,
            .jbg-splash-subtitle,
            .jbg-splash-item-text,
            .jbg-setup-label,
            .jbg-setup-toggle-sub {
                color: color-mix(in srgb, var(--content_default, #f4f7fb) 70%, transparent) !important;
                -webkit-text-fill-color: color-mix(in srgb, var(--content_default, #f4f7fb) 70%, transparent) !important;
            }
            .jbg-splash-item,
            .jbg-setup-toggle {
                border-color: color-mix(in srgb, var(--content_default, #f4f7fb) 11%, transparent) !important;
                background: color-mix(in srgb, var(--content_default, #f4f7fb) 5%, transparent) !important;
                color: var(--content_default, #f4f7fb) !important;
                -webkit-text-fill-color: var(--content_default, #f4f7fb) !important;
            }
            .jbg-changelog-type.is-fixed {
                border-color: color-mix(in srgb, #22c55e 38%, transparent) !important;
                background: color-mix(in srgb, #22c55e 14%, transparent) !important;
                color: color-mix(in srgb, #22c55e 46%, var(--content_default, #f4f7fb)) !important;
                -webkit-text-fill-color: color-mix(in srgb, #22c55e 46%, var(--content_default, #f4f7fb)) !important;
            }
            .jbg-changelog-type.is-added {
                border-color: color-mix(in srgb, #2aa8ff 34%, transparent) !important;
                background: color-mix(in srgb, #2aa8ff 13%, transparent) !important;
                color: color-mix(in srgb, #2aa8ff 34%, var(--content_default, #f4f7fb)) !important;
                -webkit-text-fill-color: color-mix(in srgb, #2aa8ff 34%, var(--content_default, #f4f7fb)) !important;
            }
            .jbg-changelog-type.is-known-issue {
                border-color: color-mix(in srgb, #ef4444 40%, transparent) !important;
                background: color-mix(in srgb, #ef4444 14%, transparent) !important;
                color: color-mix(in srgb, #ef4444 52%, var(--content_default, #f4f7fb)) !important;
                -webkit-text-fill-color: color-mix(in srgb, #ef4444 52%, var(--content_default, #f4f7fb)) !important;
            }
            .jbg-changelog-text {
                color: color-mix(in srgb, var(--content_default, #f4f7fb) 74%, transparent) !important;
                -webkit-text-fill-color: color-mix(in srgb, var(--content_default, #f4f7fb) 74%, transparent) !important;
            }
            .jbg-custom-poly-textarea {
                border-color: color-mix(in srgb, var(--content_default, #f4f7fb) 14%, transparent) !important;
                background: color-mix(in srgb, var(--content_default, #f4f7fb) 5%, transparent) !important;
                color: var(--content_default, #f4f7fb) !important;
                -webkit-text-fill-color: var(--content_default, #f4f7fb) !important;
                scrollbar-color: color-mix(in srgb, var(--content_default, #f4f7fb) 35%, transparent) transparent;
            }
            .jbg-custom-poly-textarea::placeholder {
                color: color-mix(in srgb, var(--content_default, #f4f7fb) 48%, transparent) !important;
                -webkit-text-fill-color: color-mix(in srgb, var(--content_default, #f4f7fb) 48%, transparent) !important;
            }
            .jbg-modal .jbg-modal-btn:not(.jbg-modal-btn-primary) {
                border-color: color-mix(in srgb, #ef4444 55%, var(--content_default, #fff) 8%) !important;
                background: linear-gradient(180deg,
                    color-mix(in srgb, #ef4444 86%, var(--background_default, #141820) 14%),
                    color-mix(in srgb, #b91c1c 88%, var(--background_default, #141820) 12%)
                ) !important;
                color: #fff !important;
                -webkit-text-fill-color: #fff !important;
                text-shadow: none !important;
                box-shadow: 0 10px 22px color-mix(in srgb, #b91c1c 26%, transparent), inset 0 1px 0 rgba(255,255,255,.20) !important;
            }
            .jbg-modal .jbg-modal-btn:not(.jbg-modal-btn-primary):hover {
                border-color: color-mix(in srgb, #ff5f6f 70%, var(--content_default, #fff) 10%) !important;
                background: linear-gradient(180deg,
                    color-mix(in srgb, #ff6b78 90%, var(--background_default, #141820) 10%),
                    color-mix(in srgb, #dc2626 92%, var(--background_default, #141820) 8%)
                ) !important;
                box-shadow: 0 12px 26px color-mix(in srgb, #b91c1c 32%, transparent), inset 0 1px 0 rgba(255,255,255,.25) !important;
            }


            html[wz-theme="dark"] .jbg-shell .jbg-hero,
            body[wz-theme="dark"] .jbg-shell .jbg-hero,
            [wz-theme="dark"] .jbg-shell .jbg-hero,
            .theme-dark .jbg-shell .jbg-hero,
            .wmeRcDark .jbg-shell .jbg-hero {
                border-color: color-mix(in srgb, var(--content_default, #f4f7fb) 13%, transparent) !important;
                background:
                    radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--jbg-blue, #2aa8ff) 20%, transparent), transparent 42%),
                    linear-gradient(180deg,
                        color-mix(in srgb, var(--background_default, #141820) 90%, #0f172a 10%),
                        color-mix(in srgb, var(--background_default, #141820) 96%, #020617 4%)
                    ) !important;
                box-shadow: inset 0 1px 0 color-mix(in srgb, var(--content_default, #f4f7fb) 8%, transparent) !important;
            }
            html[wz-theme="dark"] .jbg-shell .jbg-title,
            body[wz-theme="dark"] .jbg-shell .jbg-title,
            [wz-theme="dark"] .jbg-shell .jbg-title,
            .theme-dark .jbg-shell .jbg-title,
            .wmeRcDark .jbg-shell .jbg-title {
                color: var(--content_default, #f4f7fb) !important;
                -webkit-text-fill-color: var(--content_default, #f4f7fb) !important;
            }
            html[wz-theme="dark"] .jbg-shell .jbg-subtitle,
            body[wz-theme="dark"] .jbg-shell .jbg-subtitle,
            [wz-theme="dark"] .jbg-shell .jbg-subtitle,
            .theme-dark .jbg-shell .jbg-subtitle,
            .wmeRcDark .jbg-shell .jbg-subtitle {
                color: color-mix(in srgb, var(--content_default, #f4f7fb) 72%, transparent) !important;
                -webkit-text-fill-color: color-mix(in srgb, var(--content_default, #f4f7fb) 72%, transparent) !important;
            }


            .jbg-btn-red,
            .jbg-final-abort {
                color: #ffffff !important;
                -webkit-text-fill-color: #ffffff !important;
                text-shadow: none !important;
            }

            html[wz-theme="dark"] .jbg-shell .jbg-btn-red,
            body[wz-theme="dark"] .jbg-shell .jbg-btn-red,
            [wz-theme="dark"] .jbg-shell .jbg-btn-red,
            .theme-dark .jbg-shell .jbg-btn-red,
            .wmeRcDark .jbg-shell .jbg-btn-red,
            .jbg-shell[data-jbg-theme="dark"] .jbg-btn-red {
                border-color: color-mix(in srgb, #ef4444 38%, var(--content_default, #f4f7fb) 10%) !important;
                background: linear-gradient(180deg,
                    color-mix(in srgb, #ef4444 18%, var(--background_default, #141820) 82%),
                    color-mix(in srgb, #b91c1c 16%, var(--background_default, #141820) 84%)
                ) !important;
                box-shadow: inset 0 1px 0 color-mix(in srgb, var(--content_default, #f4f7fb) 7%, transparent) !important;
            }

            html[wz-theme="dark"] .jbg-shell .jbg-btn-red:hover,
            body[wz-theme="dark"] .jbg-shell .jbg-btn-red:hover,
            [wz-theme="dark"] .jbg-shell .jbg-btn-red:hover,
            .theme-dark .jbg-shell .jbg-btn-red:hover,
            .wmeRcDark .jbg-shell .jbg-btn-red:hover,
            .jbg-shell[data-jbg-theme="dark"] .jbg-btn-red:hover {
                border-color: color-mix(in srgb, #ff5a66 64%, var(--content_default, #f4f7fb) 12%) !important;
                background: linear-gradient(180deg,
                    color-mix(in srgb, #ef4444 34%, var(--background_default, #141820) 66%),
                    color-mix(in srgb, #dc2626 30%, var(--background_default, #141820) 70%)
                ) !important;
                box-shadow: inset 0 1px 0 color-mix(in srgb, var(--content_default, #f4f7fb) 10%, transparent) !important;
            }

            html[wz-theme="light"] .jbg-shell .jbg-btn-red,
            body[wz-theme="light"] .jbg-shell .jbg-btn-red,
            [wz-theme="light"] .jbg-shell .jbg-btn-red,
            .theme-light .jbg-shell .jbg-btn-red,
            .wmeRcLight .jbg-shell .jbg-btn-red,
            .jbg-shell:not([data-jbg-theme="dark"]) .jbg-btn-red {
                border-color: rgba(185, 28, 28, .46) !important;
                background: linear-gradient(135deg, #ef4444, #b91c1c) !important;
            }

            html[wz-theme="light"] .jbg-shell .jbg-btn-red:hover,
            body[wz-theme="light"] .jbg-shell .jbg-btn-red:hover,
            [wz-theme="light"] .jbg-shell .jbg-btn-red:hover,
            .theme-light .jbg-shell .jbg-btn-red:hover,
            .wmeRcLight .jbg-shell .jbg-btn-red:hover,
            .jbg-shell:not([data-jbg-theme="dark"]) .jbg-btn-red:hover {
                border-color: rgba(153, 27, 27, .66) !important;
                background: linear-gradient(135deg, #ff5a5a, #dc2626) !important;
            }


            .jbg-splash-backdrop[data-jbg-theme="light"],
            .jbg-modal-backdrop[data-jbg-theme="light"] {
                background: rgba(241,245,249,.58) !important;
                backdrop-filter: blur(14px) saturate(145%) !important;
                -webkit-backdrop-filter: blur(14px) saturate(145%) !important;
            }
            .jbg-splash[data-jbg-theme="light"],
            .jbg-modal[data-jbg-theme="light"] {
                border-color: rgba(15,23,42,.14) !important;
                background:
                    radial-gradient(circle at 18% 0%, rgba(42,168,255,.12), transparent 34%),
                    radial-gradient(circle at 92% 8%, rgba(168,85,247,.10), transparent 32%),
                    linear-gradient(180deg, rgba(255,255,255,.98), rgba(248,250,252,.98)) !important;
                color: #0f172a !important;
                -webkit-text-fill-color: #0f172a !important;
                box-shadow: 0 30px 80px rgba(15,23,42,.18), inset 0 1px 0 rgba(255,255,255,.94) !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-splash-title,
            .jbg-splash[data-jbg-theme="light"] .jbg-splash-item-title,
            .jbg-splash[data-jbg-theme="light"] .jbg-setup-toggle-title,
            .jbg-modal[data-jbg-theme="light"] .jbg-modal-title {
                color: #0f172a !important;
                -webkit-text-fill-color: #0f172a !important;
                text-shadow: none !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-splash-subtitle,
            .jbg-splash[data-jbg-theme="light"] .jbg-splash-item-text,
            .jbg-splash[data-jbg-theme="light"] .jbg-setup-label,
            .jbg-splash[data-jbg-theme="light"] .jbg-setup-toggle-sub,
            .jbg-modal[data-jbg-theme="light"] .jbg-modal-message {
                color: rgba(51,65,85,.84) !important;
                -webkit-text-fill-color: rgba(51,65,85,.84) !important;
                text-shadow: none !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-splash-kicker {
                border-color: rgba(42,168,255,.30) !important;
                background: rgba(42,168,255,.12) !important;
                color: #1d4ed8 !important;
                -webkit-text-fill-color: #1d4ed8 !important;
                text-shadow: none !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-splash-item,
            .jbg-splash[data-jbg-theme="light"] .jbg-setup-toggle {
                border-color: rgba(15,23,42,.12) !important;
                background: rgba(15,23,42,.045) !important;
                color: #0f172a !important;
                -webkit-text-fill-color: #0f172a !important;
                text-shadow: none !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-changelog-type.is-fixed {
                border-color: rgba(34,197,94,.42) !important;
                background: rgba(34,197,94,.16) !important;
                color: #15803d !important;
                -webkit-text-fill-color: #15803d !important;
                text-shadow: none !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-changelog-type.is-added {
                border-color: rgba(42,168,255,.42) !important;
                background: rgba(42,168,255,.14) !important;
                color: #0757c8 !important;
                -webkit-text-fill-color: #0757c8 !important;
                text-shadow: none !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-changelog-type.is-known-issue {
                border-color: rgba(239,68,68,.38) !important;
                background: rgba(239,68,68,.13) !important;
                color: #b91c1c !important;
                -webkit-text-fill-color: #b91c1c !important;
                text-shadow: none !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-changelog-text {
                color: #334155 !important;
                -webkit-text-fill-color: #334155 !important;
                text-shadow: none !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-custom-select-btn {
                border-color: rgba(15,23,42,.14) !important;
                background: linear-gradient(180deg, rgba(255,255,255,.96), rgba(241,245,249,.90)) !important;
                color: #0f172a !important;
                -webkit-text-fill-color: #0f172a !important;
                text-shadow: none !important;
                box-shadow: inset 0 1px 0 rgba(255,255,255,.92), 0 8px 20px rgba(15,23,42,.12) !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-custom-select-btn::after {
                border-right-color: rgba(15,23,42,.72) !important;
                border-bottom-color: rgba(15,23,42,.72) !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-custom-select-menu {
                border-color: rgba(15,23,42,.13) !important;
                background: rgba(255,255,255,.98) !important;
                color: #0f172a !important;
                -webkit-text-fill-color: #0f172a !important;
                box-shadow: 0 18px 44px rgba(15,23,42,.18), inset 0 1px 0 rgba(255,255,255,.92) !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-custom-select-option {
                color: rgba(15,23,42,.82) !important;
                -webkit-text-fill-color: rgba(15,23,42,.82) !important;
                text-shadow: none !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-custom-select-option:hover {
                background: rgba(15,23,42,.06) !important;
                color: #0f172a !important;
                -webkit-text-fill-color: #0f172a !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-custom-select-option.is-active {
                background: linear-gradient(180deg, #2aa8ff, #0b74ff) !important;
                color: #fff !important;
                -webkit-text-fill-color: #fff !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-setup-switch {
                background: rgba(148,163,184,.34) !important;
                box-shadow: inset 0 1px 2px rgba(15,23,42,.16) !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-setup-switch::after {
                background: #fff !important;
                box-shadow: 0 3px 9px rgba(15,23,42,.24) !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-setup-toggle.is-on .jbg-setup-switch {
                background: #2aa8ff !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-modal-btn:not(.jbg-modal-btn-primary) {
                border-color: rgba(15,23,42,.12) !important;
                background: rgba(15,23,42,.045) !important;
                color: #334155 !important;
                -webkit-text-fill-color: #334155 !important;
                box-shadow: inset 0 1px 0 rgba(255,255,255,.86) !important;
                text-shadow: none !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-modal-btn:not(.jbg-modal-btn-primary):hover {
                border-color: rgba(42,168,255,.28) !important;
                background: rgba(42,168,255,.08) !important;
                color: #0f172a !important;
                -webkit-text-fill-color: #0f172a !important;
            }
            .jbg-splash[data-jbg-theme="light"] .jbg-splash-btn,
            .jbg-splash[data-jbg-theme="light"] .jbg-modal-btn-primary {
                color: #fff !important;
                -webkit-text-fill-color: #fff !important;
                text-shadow: none !important;
            }
            .jbg-splash[data-jbg-theme="dark"],
            .jbg-modal[data-jbg-theme="dark"] {
                color: #f8fafc !important;
                -webkit-text-fill-color: #f8fafc !important;
            }

`;
        document.head.appendChild(style);
    }

    function getJbgThemeHint() {
        const roots = [document.documentElement, document.body, document.querySelector('[wz-theme]')].filter(Boolean);
        for (const el of roots) {
            const attr = String(el.getAttribute('wz-theme') || '').toLowerCase();
            if (attr === 'light' || attr === 'dark') return attr;
        }
        for (const el of roots) {
            const cls = String(el.className || '').toLowerCase();
            if (cls.includes('theme-light') || cls.includes('wmerclight')) return 'light';
            if (cls.includes('theme-dark') || cls.includes('wmercdark')) return 'dark';
        }
        try {
            const css = getComputedStyle(document.documentElement);
            const raw = css.getPropertyValue('--background_default') || css.backgroundColor || '';
            const nums = String(raw).match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
            if (nums.length >= 3) {
                const brightness = (nums[0] * 299 + nums[1] * 587 + nums[2] * 114) / 1000;
                return brightness > 150 ? 'light' : 'dark';
            }
        } catch (e) {}
        try {
            return window.matchMedia?.('(prefers-color-scheme: light)')?.matches ? 'light' : 'dark';
        } catch (e) {}
        return 'dark';
    }

    function applyJbgThemeHint(el) {
        if (!el || !el.className) return;
        const cls = String(el.className);
        if (!/(^|\s)(jbg-shell|jbg-splash|jbg-splash-backdrop|jbg-modal|jbg-modal-backdrop)(\s|$)/.test(cls)) return;
        const theme = getJbgThemeHint();
        el.dataset.jbgTheme = theme;
        el.classList.toggle('jbg-theme-light', theme === 'light');
        el.classList.toggle('jbg-theme-dark', theme === 'dark');
    }

    function createEl(tag, className, text) {
        const el = document.createElement(tag);
        if (className) {
            el.className = className;
            applyJbgThemeHint(el);
        }
        if (text != null) el.textContent = text;
        return el;
    }

    function showUpdateSplashIfNeeded() {
        const splashKey = `${SCRIPT_ID}.lastSplashVersion`;
        const setupKey = `${SCRIPT_ID}.firstRunSetupDone`;
        let last = null;
        let setupDone = false;

        try { last = localStorage.getItem(splashKey); } catch (e) {}
        try { setupDone = localStorage.getItem(setupKey) === '1'; } catch (e) {}

        if (setupDone && last === VERSION) return false;

        const firstRun = !setupDone;
        let step = firstRun ? 'welcome' : 'updated';
        let selectedLang = getSupportedLanguageCodes().includes(readSettings().language) ? readSettings().language : 'en';
        let snapSetupOn = !!readSettings().snapToGrid;

        const splashTexts = {
            en: {
                welcomeKicker: 'Welcome',
                updatedKicker: `Updated · v${VERSION}`,
                setupKicker: 'First setup',
                title: 'JB Geometry',
                setupTitle: 'Set up JB Geometry',
                welcomeSubtitle: 'Create and refine Junction Box shapes directly on the map with clean editing tools, validation, and fast WME creation.',
                setupSubtitle: 'Choose your language and whether drawing/editing should snap to the grid. You can change both later from Settings.',
                next: 'Next',
                gotIt: 'Got it',
                back: 'Back',
                start: 'Start using JB Geometry',
                language: 'Language',
                drawing: 'Drawing',
                snapTitle: 'Snap to grid',
                snapSub: 'Keeps shape drawing and editing aligned.',
                snapInfoTitle: 'Snap to grid',
                snapInfoText: 'When enabled, points and edits are aligned to a fixed grid so the shape stays cleaner and easier to adjust.',
                features: [
                    ['Shape builder', 'Start from square, rectangle, circle, manual drawing, or an existing JB/map note.'],
                    ['Live editing', 'Drag vertices, insert/delete points, resize, round corners, move, and rotate the shape.'],
                    ['Validation', 'Self-crossing and invalid shapes are blocked before creating a JB.'],
                    ['WME workflow', 'Create JB, Replace JB, Re-create geometry, Abort, Undo/Redo, and snap-to-grid.'],
                ],
            },
            el: {
                welcomeKicker: 'Καλώς ήρθες',
                updatedKicker: `Ενημέρωση · v${VERSION}`,
                setupKicker: 'Πρώτη ρύθμιση',
                title: 'JB Geometry',
                setupTitle: 'Ρύθμιση JB Geometry',
                welcomeSubtitle: 'Δημιούργησε και επεξεργάσου Junction Box σχήματα απευθείας στον χάρτη με καθαρά εργαλεία, έλεγχο εγκυρότητας και γρήγορη δημιουργία στο WME.',
                setupSubtitle: 'Διάλεξε γλώσσα και αν η σχεδίαση/επεξεργασία θα κάνει snap στο πλέγμα. Μπορείς να τα αλλάξεις αργότερα από τις Ρυθμίσεις.',
                next: 'Επόμενο',
                gotIt: 'Εντάξει',
                back: 'Πίσω',
                start: 'Ξεκίνα το JB Geometry',
                language: 'Γλώσσα',
                drawing: 'Σχεδίαση',
                snapTitle: 'Snap σε πλέγμα',
                snapSub: 'Κρατά τη σχεδίαση και την επεξεργασία ευθυγραμμισμένη.',
                snapInfoTitle: 'Snap σε πλέγμα',
                snapInfoText: 'Όταν είναι ενεργό, τα σημεία και οι αλλαγές ευθυγραμμίζονται σε σταθερό πλέγμα ώστε το σχήμα να μένει πιο καθαρό και πιο εύκολο στην επεξεργασία.',
                features: [
                    ['Δημιουργία σχήματος', 'Ξεκίνα από τετράγωνο, ορθογώνιο, κύκλο, χειροκίνητη σχεδίαση ή υπάρχον JB/map note.'],
                    ['Ζωντανή επεξεργασία', 'Μετακίνησε κορυφές, πρόσθεσε/διέγραψε σημεία, άλλαξε μέγεθος, γωνίες, θέση και περιστροφή.'],
                    ['Έλεγχος εγκυρότητας', 'Τα self-crossing και μη έγκυρα σχήματα μπλοκάρονται πριν τη δημιουργία JB.'],
                    ['Ροή WME', 'Create JB, Replace JB, Re-create geometry, Abort, Undo/Redo και snap-to-grid.'],
                ],
            },
            de: {
                welcomeKicker: 'Willkommen',
                updatedKicker: `Aktualisiert · v${VERSION}`,
                setupKicker: 'Ersteinrichtung',
                title: 'JB Geometry',
                setupTitle: 'JB Geometry einrichten',
                welcomeSubtitle: 'Erstelle und verfeinere Junction-Box-Formen direkt auf der Karte mit sauberen Werkzeugen, Validierung und schneller WME-Erstellung.',
                setupSubtitle: 'Wähle Sprache und ob Zeichnen/Bearbeiten am Raster einrasten soll. Beides kannst du später in den Einstellungen ändern.',
                next: 'Weiter',
                gotIt: 'Verstanden',
                back: 'Zurück',
                start: 'JB Geometry starten',
                language: 'Sprache',
                drawing: 'Zeichnen',
                snapTitle: 'Am Raster einrasten',
                snapSub: 'Hält Zeichnen und Bearbeiten ausgerichtet.',
                snapInfoTitle: 'Am Raster einrasten',
                snapInfoText: 'Wenn aktiviert, werden Punkte und Änderungen an einem festen Raster ausgerichtet, damit die Form sauberer bleibt.',
                features: [
                    ['Form-Builder', 'Starte mit Quadrat, Rechteck, Kreis, freiem Zeichnen oder bestehender JB/Map Note.'],
                    ['Live-Bearbeitung', 'Ziehe Punkte, füge Punkte hinzu/lösche sie, skaliere, runde Ecken, verschiebe und rotiere.'],
                    ['Validierung', 'Ungültige und sich kreuzende Formen werden vor der JB-Erstellung blockiert.'],
                    ['WME-Workflow', 'Create JB, Replace JB, Re-create geometry, Abort, Undo/Redo und Snap-to-grid.'],
                ],
            },
            fr: {
                welcomeKicker: 'Bienvenue',
                updatedKicker: `Mis à jour · v${VERSION}`,
                setupKicker: 'Première configuration',
                title: 'JB Geometry',
                setupTitle: 'Configurer JB Geometry',
                welcomeSubtitle: 'Crée et ajuste des formes Junction Box directement sur la carte avec des outils propres, validation et création rapide dans WME.',
                setupSubtitle: 'Choisis la langue et si le dessin/la modification doivent s’accrocher à la grille. Tu peux changer ces options plus tard.',
                next: 'Suivant',
                gotIt: 'Compris',
                back: 'Retour',
                start: 'Commencer',
                language: 'Langue',
                drawing: 'Dessin',
                snapTitle: 'Accrocher à la grille',
                snapSub: 'Garde le dessin et l’édition alignés.',
                snapInfoTitle: 'Accrocher à la grille',
                snapInfoText: 'Quand c’est activé, les points et modifications s’alignent sur une grille fixe pour garder une forme plus propre.',
                features: [
                    ['Créateur de forme', 'Carré, rectangle, cercle, dessin manuel ou JB/map note existante.'],
                    ['Édition en direct', 'Déplace les sommets, ajoute/supprime des points, redimensionne, arrondis, déplace et fais pivoter.'],
                    ['Validation', 'Les formes invalides ou auto-croisées sont bloquées avant création.'],
                    ['Workflow WME', 'Create JB, Replace JB, Re-create geometry, Abort, Undo/Redo et snap-to-grid.'],
                ],
            },
            es: {
                welcomeKicker: 'Bienvenido',
                updatedKicker: `Actualizado · v${VERSION}`,
                setupKicker: 'Configuración inicial',
                title: 'JB Geometry',
                setupTitle: 'Configurar JB Geometry',
                welcomeSubtitle: 'Crea y ajusta formas Junction Box directamente en el mapa con herramientas limpias, validación y creación rápida en WME.',
                setupSubtitle: 'Elige idioma y si el dibujo/edición debe ajustarse a la cuadrícula. Puedes cambiarlo luego en Ajustes.',
                next: 'Siguiente',
                gotIt: 'Entendido',
                back: 'Atrás',
                start: 'Empezar',
                language: 'Idioma',
                drawing: 'Dibujo',
                snapTitle: 'Ajustar a cuadrícula',
                snapSub: 'Mantiene el dibujo y la edición alineados.',
                snapInfoTitle: 'Ajustar a cuadrícula',
                snapInfoText: 'Si está activado, los puntos y cambios se alinean a una cuadrícula fija para mantener la forma más limpia.',
                features: [
                    ['Constructor de formas', 'Cuadrado, rectángulo, círculo, dibujo manual o JB/map note existente.'],
                    ['Edición en vivo', 'Arrastra vértices, añade/elimina puntos, redimensiona, redondea, mueve y rota.'],
                    ['Validación', 'Las formas inválidas o cruzadas se bloquean antes de crear.'],
                    ['Flujo WME', 'Create JB, Replace JB, Re-create geometry, Abort, Undo/Redo y snap-to-grid.'],
                ],
            },
        };

        const t = () => splashTexts[selectedLang] || splashTexts.en;

        const backdrop = createEl('div', 'jbg-splash-backdrop');
        const modal = createEl('div', 'jbg-splash');
        backdrop.appendChild(modal);
        document.body.appendChild(backdrop);

        const close = () => {
            try { backdrop.remove(); } catch (e) {}
            document.removeEventListener('keydown', onKey, true);
        };

        const finishSetup = () => {
            writeSettings({
                language: getSupportedLanguageCodes().includes(selectedLang) ? selectedLang : 'en',
                snapToGrid: !!snapSetupOn,
            });
            try { localStorage.setItem(setupKey, '1'); } catch (e) {}
            try { localStorage.setItem(splashKey, VERSION); } catch (e) {}
            close();
        };

        const renderFeatureGrid = () => {
            const grid = createEl('div', 'jbg-splash-grid');
            for (const [title, body] of t().features) {
                const item = createEl('div', 'jbg-splash-item');
                item.appendChild(createEl('div', 'jbg-splash-item-title', title));
                item.appendChild(createEl('div', 'jbg-splash-item-text', body));
                grid.appendChild(item);
            }
            return grid;
        };

        const makeSplashLanguageDropdown = () => {
            const select = createEl('div', 'jbg-custom-select');
            const btn = createEl('button', 'jbg-custom-select-btn', getLanguageOption(selectedLang).nativeName);
            const menu = createEl('div', 'jbg-custom-select-menu');
            try {
                select.style.width = '250px';
                select.style.maxWidth = '250px';
                select.style.position = 'relative';
                menu.style.position = 'absolute';
                menu.style.left = '0';
                menu.style.right = 'auto';
                menu.style.top = 'calc(100% + 7px)';
                menu.style.bottom = 'auto';
                menu.style.width = '250px';
                menu.style.maxWidth = '250px';
                menu.style.transform = 'none';
            } catch (e) {}
            btn.type = 'button';
            menu.hidden = true;

            const closeMenu = () => {
                select.classList.remove('is-open');
                menu.hidden = true;
            };

            const renderMenu = () => {
                menu.innerHTML = '';
                for (const item of getSupportedLanguageOptions()) {
                    const optionBtn = createEl('button', 'jbg-custom-select-option', item.nativeName);
                    optionBtn.type = 'button';
                    optionBtn.title = item.label;
                    optionBtn.dataset.lang = item.code;
                    optionBtn.dir = isRtlLanguage(item.code) ? 'rtl' : 'ltr';
                    optionBtn.classList.toggle('is-active', item.code === selectedLang);
                    optionBtn.addEventListener('click', (evt) => {
                        try { evt.preventDefault(); evt.stopPropagation(); } catch (e) {}
                        selectedLang = item.code;
                        render();
                    }, true);
                    menu.appendChild(optionBtn);
                }
            };

            btn.addEventListener('click', (evt) => {
                try { evt.preventDefault(); evt.stopPropagation(); } catch (e) {}
                const open = !select.classList.contains('is-open');
                select.classList.toggle('is-open', open);
                menu.hidden = !open;
            }, true);

            document.addEventListener('click', (evt) => {
                if (!select.contains(evt.target)) closeMenu();
            }, false);

            renderMenu();
            select.appendChild(btn);
            select.appendChild(menu);
            return select;
        };

        const showSnapInfo = (evt) => {
            try { evt.preventDefault(); evt.stopPropagation(); } catch (e) {}
            showJbGeometryNotification(t().snapInfoText, {
                title: t().snapInfoTitle,
                closeLabel: 'OK',
                timeoutMs: 7200,
            });
        };

        const getUpdateChangelog = () => {
            const data = {
                en: {
                    kicker: `Update · v${VERSION}`,
                    title: 'Changelog',
                    subtitle: '',
                    items: [
                        ['Fixed', 'Replace JB would not capture the turn instructions.', 'fixed'],
                        ['Fixed', 'Some text in the light first setup modal was not visible for some users.', 'fixed'],
                        ['Added', 'Changelog modal.', 'added'],
                        ['Issue', 'Map Notes are treated as a JB, so they can be used to create a JB based on their geometry.', 'known-issue'],
                    ],
                },
                el: {
                    kicker: `Ενημέρωση · v${VERSION}`,
                    title: 'Αλλαγές έκδοσης',
                    subtitle: '',
                    items: [
                        ['Διορθώθηκε', 'Το Replace JB δεν κρατούσε τα turn instructions.', 'fixed'],
                        ['Διορθώθηκε', 'Κάποια κείμενα στο light first setup modal δεν ήταν ορατά για μερικούς χρήστες.', 'fixed'],
                        ['Προστέθηκε', 'Changelog modal.', 'added'],
                        ['Issue', 'Τα Map Notes αναγνωρίζονται σαν JB, οπότε μπορούν να χρησιμοποιηθούν για δημιουργία JB με βάση τη γεωμετρία τους.', 'known-issue'],
                    ],
                },
                de: {
                    kicker: `Update · v${VERSION}`,
                    title: 'Changelog',
                    subtitle: '',
                    items: [
                        ['Fixed', 'Replace JB would not capture the turn instructions.', 'fixed'],
                        ['Fixed', 'Some text in the light first setup modal was not visible for some users.', 'fixed'],
                        ['Added', 'Changelog modal.', 'added'],
                        ['Issue', 'Map Notes are treated as a JB, so they can be used to create a JB based on their geometry.', 'known-issue'],
                    ],
                },
                fr: {
                    kicker: `Mise à jour · v${VERSION}`,
                    title: 'Changelog',
                    subtitle: '',
                    items: [
                        ['Fixed', 'Replace JB would not capture the turn instructions.', 'fixed'],
                        ['Fixed', 'Some text in the light first setup modal was not visible for some users.', 'fixed'],
                        ['Added', 'Changelog modal.', 'added'],
                        ['Issue', 'Map Notes are treated as a JB, so they can be used to create a JB based on their geometry.', 'known-issue'],
                    ],
                },
                es: {
                    kicker: `Actualización · v${VERSION}`,
                    title: 'Changelog',
                    subtitle: '',
                    items: [
                        ['Fixed', 'Replace JB would not capture the turn instructions.', 'fixed'],
                        ['Fixed', 'Some text in the light first setup modal was not visible for some users.', 'fixed'],
                        ['Added', 'Changelog modal.', 'added'],
                        ['Issue', 'Map Notes are treated as a JB, so they can be used to create a JB based on their geometry.', 'known-issue'],
                    ],
                },
            };
            return data[selectedLang] || data.en;
        };

        const renderChangelogGrid = () => {
            const list = createEl('div', 'jbg-changelog-list');
            const change = getUpdateChangelog();
            for (const [title, body, kind] of change.items) {
                const row = createEl('div', 'jbg-changelog-row');
                row.appendChild(createEl('div', `jbg-changelog-type is-${kind || 'added'}`, title));
                row.appendChild(createEl('div', 'jbg-changelog-text', body));
                list.appendChild(row);
            }
            return list;
        };

        const render = () => {
            modal.innerHTML = '';
            modal.dir = isRtlLanguage(selectedLang) ? 'rtl' : 'ltr';

            if (step === 'updated') {
                const change = getUpdateChangelog();
                modal.appendChild(createEl('div', 'jbg-splash-kicker', change.kicker));
                modal.appendChild(createEl('div', 'jbg-splash-title', change.title));
                if (change.subtitle) modal.appendChild(createEl('div', 'jbg-splash-subtitle', change.subtitle));
                modal.appendChild(renderChangelogGrid());

                const actions = createEl('div', 'jbg-splash-actions');
                const ok = createEl('button', 'jbg-splash-btn', t().gotIt);
                ok.type = 'button';
                ok.addEventListener('click', () => {
                    try { localStorage.setItem(splashKey, VERSION); } catch (e) {}
                    close();
                });
                actions.appendChild(ok);
                modal.appendChild(actions);
                return;
            }

            if (step === 'welcome') {
                modal.appendChild(createEl('div', 'jbg-splash-kicker', t().welcomeKicker));
                modal.appendChild(createEl('div', 'jbg-splash-title', t().title));
                modal.appendChild(createEl('div', 'jbg-splash-subtitle', t().welcomeSubtitle));
                modal.appendChild(renderFeatureGrid());

                const actions = createEl('div', 'jbg-splash-actions');
                const ok = createEl('button', 'jbg-splash-btn', t().next);
                ok.type = 'button';
                ok.addEventListener('click', () => {
                    step = 'setup';
                    render();
                });
                actions.appendChild(ok);
                modal.appendChild(actions);
                return;
            }

            modal.appendChild(createEl('div', 'jbg-splash-kicker', t().setupKicker));
            modal.appendChild(createEl('div', 'jbg-splash-title', t().setupTitle));
            modal.appendChild(createEl('div', 'jbg-splash-subtitle', t().setupSubtitle));

            const setupGrid = createEl('div', 'jbg-setup-grid');

            const langField = createEl('div', 'jbg-setup-field');
            langField.appendChild(createEl('div', 'jbg-setup-label', t().language));
            langField.appendChild(makeSplashLanguageDropdown());

            const snapField = createEl('div', 'jbg-setup-field');
            snapField.appendChild(createEl('div', 'jbg-setup-label', t().drawing));
            const snapToggle = createEl('button', 'jbg-setup-toggle', '');
            snapToggle.type = 'button';
            snapToggle.classList.toggle('is-on', snapSetupOn);

            const copy = createEl('span', 'jbg-setup-toggle-copy');
            const titleRow = createEl('span', 'jbg-setup-toggle-title-row');
            titleRow.appendChild(createEl('span', 'jbg-setup-toggle-title', t().snapTitle));
            const infoBtn = createEl('button', 'jbg-setup-info-btn', 'i');
            infoBtn.type = 'button';
            infoBtn.title = t().snapInfoTitle;
            infoBtn.addEventListener('click', showSnapInfo, true);
            titleRow.appendChild(infoBtn);
            copy.appendChild(titleRow);

            snapToggle.appendChild(copy);
            snapToggle.appendChild(createEl('span', 'jbg-setup-switch'));
            snapToggle.addEventListener('click', () => {
                snapSetupOn = !snapSetupOn;
                snapToggle.classList.toggle('is-on', snapSetupOn);
            });
            snapField.appendChild(snapToggle);

            setupGrid.appendChild(langField);
            setupGrid.appendChild(snapField);
            modal.appendChild(setupGrid);

            const actions = createEl('div', 'jbg-splash-actions');
            const back = createEl('button', 'jbg-modal-btn', t().back);
            const startBtn = createEl('button', 'jbg-splash-btn', t().start);
            back.type = 'button';
            startBtn.type = 'button';
            back.addEventListener('click', () => {
                step = 'welcome';
                render();
            });
            startBtn.addEventListener('click', finishSetup);
            actions.appendChild(back);
            actions.appendChild(startBtn);
            modal.appendChild(actions);
        };

        const onKey = (evt) => {
            if (evt.key === 'Escape' && !firstRun) close();
            if (evt.key === 'Enter') {
                if (firstRun && step === 'setup') finishSetup();
                else if (firstRun && step === 'welcome') {
                    step = 'setup';
                    render();
                } else {
                    try { localStorage.setItem(splashKey, VERSION); } catch (e) {}
                    close();
                }
            }
        };

        backdrop.addEventListener('click', (evt) => {
            if (evt.target === backdrop && !firstRun) close();
        });
        document.addEventListener('keydown', onKey, true);
        addDisposer(() => { try { backdrop.remove(); } catch (e) {} });
        render();

        return true;
    }


    function showJbgConfirm(message, opts = {}) {
        const title = opts.title || 'Replace current shape?';
        const confirmText = opts.confirmText || 'Continue';
        const cancelText = opts.cancelText || 'Cancel';
        return new Promise((resolve) => {
            const backdrop = createEl('div', 'jbg-modal-backdrop');
            const modal = createEl('div', 'jbg-modal');
            const titleEl = createEl('div', 'jbg-modal-title', title);
            const msgEl = createEl('div', 'jbg-modal-message', message);
            const actions = createEl('div', 'jbg-modal-actions');
            const cancelBtn = createEl('button', 'jbg-modal-btn', cancelText);
            const okBtn = createEl('button', 'jbg-modal-btn jbg-modal-btn-primary', confirmText);
            cancelBtn.type = 'button';
            okBtn.type = 'button';
            actions.appendChild(cancelBtn);
            actions.appendChild(okBtn);
            modal.appendChild(titleEl);
            modal.appendChild(msgEl);
            modal.appendChild(actions);
            backdrop.appendChild(modal);
            document.body.appendChild(backdrop);
            const close = (value) => {
                document.removeEventListener('keydown', onKey, true);
                try { backdrop.remove(); } catch (e) {}
                resolve(value);
            };
            const onKey = (e) => {
                if (e.key === 'Escape') { e.preventDefault(); close(false); }
                if (e.key === 'Enter') { e.preventDefault(); close(true); }
            };
            cancelBtn.addEventListener('click', () => close(false), { once: true });
            okBtn.addEventListener('click', () => close(true), { once: true });
            backdrop.addEventListener('pointerdown', (e) => { if (e.target === backdrop) close(false); }, { once: true });
            document.addEventListener('keydown', onKey, true);
            setTimeout(() => okBtn.focus(), 0);
        });
    }

    function runSafely(fn, message = 'Error: see console') {
        try {
            const out = fn();
            if (out && typeof out.then === 'function') {
                return out.catch((e) => { console.error(e); setUiStatus(message); return null; });
            }
            return out;
        } catch (e) {
            console.error(e);
            setUiStatus(message);
            return null;
        }
    }

    function triggerJbShortcut(shortcutKey) {
        const key = 'j';
        const keyCode = 74;
        const evtInit = {
            key,
            code: 'KeyJ',
            keyCode,
            charCode: 0,
            which: keyCode,
            bubbles: true,
            cancelable: true,
            composed: true,
        };

        const targets = [];
        const mapDiv = getMapDiv();
        if (mapDiv) targets.push(mapDiv);
        if (document.activeElement) targets.push(document.activeElement);
        if (document.body) targets.push(document.body);
        if (document) targets.push(document);
        targets.push(window);

        try { mapDiv?.focus?.(); } catch (e) {}
        nudgeMouseToMapCenter();

        for (const target of [...new Set(targets)].filter(Boolean)) {
            try { target.dispatchEvent(new KeyboardEvent('keydown', evtInit)); } catch (e) {}
        }
        return true;
    }

    function sleep(ms) {
        return new Promise(resolve => window.setTimeout(resolve, ms));
    }

    function cloneOlGeometry(g) {
        try { return g?.clone ? g.clone() : g; } catch (e) { return g; }
    }

    async function waitForJbToolReady({ timeoutMs = 2200, pollMs = 80 } = {}) {
        const started = Date.now();

        let found = refreshJbToolCache();
        if (found?.control?.active && found?.handler) return found;

        clearJbToolCache();
        triggerJbShortcut('j');
        await sleep(160);

        while (Date.now() - started < timeoutMs) {
            found = refreshJbToolCache();
            if (found?.control && found?.handler) {
                try { found.control.activate?.(); } catch (e) {}
                await sleep(40);
                return found;
            }
            await sleep(pollMs);
        }

        found = refreshJbToolCache();
        if (found?.control && found?.handler) {
            try { found.control.activate?.(); } catch (e) {}
            return found;
        }
        return null;
    }

    function commitInjectedJbPolygon(control, handler, feature, olPoly) {
        const geom = cloneOlGeometry(feature?.geometry || olPoly);
        if (!geom) return false;

        let committed = false;
        const attempts = [];

        attempts.push(() => handler?.callback?.('done', [cloneOlGeometry(geom)]));
        attempts.push(() => handler?.callbacks?.done?.call(control || handler, cloneOlGeometry(geom)));
        attempts.push(() => handler?.finishGeometry?.());
        attempts.push(() => control?.finishSketch?.());
        attempts.push(() => handler?.finalize?.());

        for (const attempt of attempts) {
            if (committed) break;
            try {
                const result = attempt();
                committed = true;
                if (result === false) committed = false;
            } catch (e) {
                committed = false;
            }
        }

        return committed;
    }

    async function createJbFromOverlayAsync() {
        const ring = overlayGetRingMercClosed() || EDITOR.previewRing || editorOpenToClosed(EDITOR.rawPoints || []);
        const validation = validateJbShapeRing(ring, { minAngleDeg: 7 });
        EDITOR.lastValidation = validation;

        if (!validation.ok) {
            uiSetStep(`Create blocked: ${readableShapeValidationReason(validation.reason)}.`);
            refreshUiStatus();
            await showInvalidShapeWarning(validation);
            return false;
        }

        if (validation.ring && OVERLAY?.feature?.geometry) {
            try { overlaySetPolygonFromMercRing(validation.ring, { skipEditorSync: true }); } catch (e) {}
        }

        const olPoly = buildOlPolygonFromOverlay();
        if (!olPoly) {
            uiSetStep('Create failed: draw or create an overlay first.');
            return false;
        }

        const found = await waitForJbToolReady();
        if (!found?.control || !found?.handler) {
            uiSetStep('Create failed: WME Junction Box tool was not detected. Press J once, then try Create Junction Box again.');
            return false;
        }

        const { control: c, handler: h } = found;

        try { c.activate?.(); } catch (e) {}
        try { nudgeMouseToMapCenter(); } catch (e) {}
        await sleep(60);

        let ft = null;
        try { resetJbSketchForInjection(h, c); } catch (e) {}
        try {
            ft = ensureJbHandlerPolygon(h, olPoly, c);
        } catch (e) {
            ft = null;
        }

        if (!ft?.geometry) {
            await sleep(140);
            try { refreshJbToolCache(); } catch (e) {}
            try { ft = ensureJbHandlerPolygon(h, olPoly, c); } catch (e) { ft = null; }
        }

        if (!ft?.geometry) {
            uiSetStep('Create failed: WME JB sketch was not ready yet. Try Create Junction Box again.');
            return false;
        }

        const committed = commitInjectedJbPolygon(c, h, ft, olPoly);
        if (!committed) {
            try { c.deactivate?.(); } catch (e) {}
            try { resetJbSketchForInjection(h, c); } catch (e) {}
            clearJbToolCache();
            uiSetStep('Create failed: polygon injected, but WME did not accept auto-commit. Try Create Junction Box again.');
            return false;
        }

        try { c.deactivate?.(); } catch (e) {}
        try { resetJbSketchForInjection(h, c); } catch (e) {}
        clearJbToolCache();
        log('CreateBridge: committed ✔');
        return true;
    }

    function commitOverlayToJb({ autoClearAfterCreate = true } = {}) {
        return (async () => {
            refreshJbToolCache();

            const beforeIds = snapshotBigJunctionFeatureIds();
            const started = await createJbFromOverlayAsync();
            refreshUiStatus();

            if (!started) {
                refreshUiStatus();
                return null;
            }

            const newFt = await waitForCommittedBigJunction({ beforeIds, timeoutMs: 3500, pollMs: 120 });

            try {
                const fixedGeom = DEBUG.byRole?.get('fixed')?.geometry;
                const committedGeom = newFt?.geometry;
                const sFixed = olGeomBoundsSig(fixedGeom);
                const sComm = olGeomBoundsSig(committedGeom);
                const okMatch = sigCloseEnough(sFixed, sComm);

                setUiStatus([
                    UI.statusEl?.textContent,
                    '',
                    `Committed: ${newFt ? 'OK ✅' : 'not detected ⚠️'} (${newFt?.id || 'n/a'})`,
                    `Match fixed→committed: ${okMatch ? '✅' : '⚠️'}`,
                ]);
            } catch (e) {}

            if (newFt?.geometry) {
                try { dbgRenderRole('committed', newFt.geometry); } catch (e) {}
                dbgRenderBBoxFor('committed', newFt.geometry);
            } else {
                uiSetStep('Create sent to WME, but no new Junction Box was detected. If it appears on the map, you can ignore this.');
            }

            try { overlayClear(); } catch (e) {}
            try { forceWmeEditRecovery('post-create'); } catch (e) {}
            try {
                setTimeoutSafe(() => {
                    try { overlayClear(); } catch (e) {}
                    try { forceWmeEditRecovery('post-create-late'); } catch (_) {}
                }, 350);
            } catch (e) {}

            refreshUiStatus();
            return newFt;
        })();
    }



    function editorReplaceWithRectangleFromCurrent() {
        if (!EDITOR.rawPoints || EDITOR.rawPoints.length < 3) return false;
        editorPushHistory('replace-rectangle');
        const b = editorGetRawBounds();
        if (!b || b.width <= 0 || b.height <= 0) return false;
        const s = normalizeRectangleSize(b.width, b.height);
        const ring = buildAxisRectangleFromCenterSize([b.cx, b.cy], s.width, s.height);
        editorLoadFromRingClosed(ring, { preserveRadius: false, preserveSize: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();
        uiSetStep('Current overlay changed directly to rectangle ✔');
        refreshUiStatus();
        return true;
    }

    function editorReplaceWithSquareFromCurrent() {
        if (!EDITOR.rawPoints || EDITOR.rawPoints.length < 3) return false;
        editorPushHistory('replace-square');
        const b = editorGetRawBounds();
        if (!b || b.width <= 0 || b.height <= 0) return false;
        const side = Math.max(b.width, b.height);
        const hs = side / 2;
        const ring = [
            [b.cx + hs, b.cy + hs],
            [b.cx + hs, b.cy - hs],
            [b.cx - hs, b.cy - hs],
            [b.cx - hs, b.cy + hs],
            [b.cx + hs, b.cy + hs],
        ];
        editorLoadFromRingClosed(ring, { preserveRadius: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();
        uiSetStep('Current overlay changed directly to square ✔');
        refreshUiStatus();
        return true;
    }

    function editorReplaceWithCircleFromCurrent() {
        if (!EDITOR.rawPoints || EDITOR.rawPoints.length < 3) return false;
        editorPushHistory('replace-circle');
        const b = editorGetRawBounds();
        if (!b || b.width <= 0 || b.height <= 0) return false;
        const center = [b.cx, b.cy];
        const radius = Math.max(b.width, b.height) / 2;
        const radiusPoint = [center[0] + radius, center[1]];
        const ring = buildCircleFromCenterRadius(center, radiusPoint, 72);
        if (!ring) return false;
        editorLoadFromRingClosed(ring, { preserveRadius: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();
        uiSetStep('Current overlay changed directly to circle ✔');
        refreshUiStatus();
        return true;
    }


    function getViewportShapeMetrics() {
        const olMap = getOlMap();
        let center = null;

        try {
            const c = olMap?.getCenter?.();
            if (c && Number.isFinite(c.lon) && Number.isFinite(c.lat)) center = [c.lon, c.lat];
            else if (c && Number.isFinite(c.x) && Number.isFinite(c.y)) center = [c.x, c.y];
        } catch (e) {}

        if (!center) {
            const info = getMapViewportCenterPx();
            center = info ? getMercFromMapEvent({ clientX: info.clientX, clientY: info.clientY }) : null;
        }

        let width = 120;
        let height = 90;

        try {
            const ex = olMap?.getExtent?.();
            if (ex && Number.isFinite(ex.left) && Number.isFinite(ex.right) && Number.isFinite(ex.top) && Number.isFinite(ex.bottom)) {
                const vw = Math.abs(ex.right - ex.left);
                const vh = Math.abs(ex.top - ex.bottom);
                width = clamp(vw * 0.28, 35, 260);
                height = clamp(vh * 0.24, 28, 220);
            }
        } catch (e) {}

        if (!center) return null;
        return { center, width, height };
    }

    function createDefaultRectangleAtViewport() {
        const m = getViewportShapeMetrics();
        if (!m) {
            uiSetStep('Rectangle failed: map center not available.');
            refreshUiStatus();
            return false;
        }

        resetCurrentShapeForNewMode('rectangle-direct');
        const s = normalizeRectangleSize(m.width, m.height);
        const ring = buildAxisRectangleFromCenterSize(m.center, s.width, s.height);

        editorLoadFromRingClosed(ring, { preserveRadius: false, preserveSize: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();
        uiSetStep('Rectangle added at map center ✔ Drag inside to move, use vertices/edges/radius/size to adjust.');
        refreshUiStatus();
        return true;
    }

    function createDefaultSquareAtViewport() {
        const m = getViewportShapeMetrics();
        if (!m) {
            uiSetStep('Square failed: map center not available.');
            refreshUiStatus();
            return false;
        }

        resetCurrentShapeForNewMode('square-direct');
        const [cx, cy] = m.center;
        const side = Math.max(28, Math.min(Number(m.width || 120), Number(m.height || 90)));
        const hs = side / 2;
        const ring = [
            [cx + hs, cy + hs],
            [cx + hs, cy - hs],
            [cx - hs, cy - hs],
            [cx - hs, cy + hs],
            [cx + hs, cy + hs],
        ];

        editorLoadFromRingClosed(ring, { preserveRadius: false, preserveSize: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();
        uiSetStep('Square added at map center ✔ Drag inside to move, use vertices/edges/radius/size to adjust.');
        refreshUiStatus();
        return true;
    }

    function createDefaultCircleAtViewport() {
        const m = getViewportShapeMetrics();
        if (!m) {
            uiSetStep('Circle failed: map center not available.');
            refreshUiStatus();
            return false;
        }

        resetCurrentShapeForNewMode('circle-direct');
        const r = Math.max(18, Math.min(160, Math.max(m.width, m.height) / 2));
        const ring = buildCircleFromCenterRadius(m.center, [m.center[0] + r, m.center[1]], 72);
        if (!ring) return false;

        editorLoadFromRingClosed(ring, { preserveRadius: false, preserveSize: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();
        uiSetStep('Circle added at map center ✔ Drag inside to move, use vertices/edges/radius/size to adjust.');
        refreshUiStatus();
        return true;
    }


    async function createDefaultRectangleAtMerc(center, opts = {}) {
        const { confirmExisting = true, label = 'clicked point' } = opts || {};
        if (!Array.isArray(center) || center.length < 2 || !Number.isFinite(center[0]) || !Number.isFinite(center[1])) {
            uiSetStep('Rectangle failed: clicked map location not available.');
            refreshUiStatus();
            return false;
        }
        if (confirmExisting && !(await confirmReplaceCurrentShape('a Rectangle'))) return false;

        const m = getViewportShapeMetrics() || { width: 120, height: 90 };
        resetCurrentShapeForNewMode('rectangle-at-point');
        const s = normalizeRectangleSize(m.width, m.height);
        const ring = buildAxisRectangleFromCenterSize(center, s.width, s.height);

        editorLoadFromRingClosed(ring, { preserveRadius: false, preserveSize: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();
        uiSetStep(`Rectangle added at ${label} ✔`);
        refreshUiStatus();
        return true;
    }

    async function createDefaultCircleAtMerc(center, opts = {}) {
        const { confirmExisting = true, label = 'clicked point' } = opts || {};
        if (!Array.isArray(center) || center.length < 2 || !Number.isFinite(center[0]) || !Number.isFinite(center[1])) {
            uiSetStep('Circle failed: clicked map location not available.');
            refreshUiStatus();
            return false;
        }
        if (confirmExisting && !(await confirmReplaceCurrentShape('a Circle'))) return false;

        const m = getViewportShapeMetrics() || { width: 120, height: 90 };
        resetCurrentShapeForNewMode('circle-at-point');
        const r = Math.max(18, Math.min(160, Math.max(Number(m.width || 120), Number(m.height || 90)) / 2));
        const ring = buildCircleFromCenterRadius(center, [center[0] + r, center[1]], 72);
        if (!ring) return false;

        editorLoadFromRingClosed(ring, { preserveRadius: false, preserveSize: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();
        uiSetStep(`Circle added at ${label} ✔`);
        refreshUiStatus();
        return true;
    }

    async function startSquareOrConvertCurrent() {
        if (EDITOR.rawPoints && EDITOR.rawPoints.length >= 3) {
            if (!(await showJbgConfirm('This will replace the current editable shape with a square using the same center.'))) return false;
            return editorReplaceWithSquareFromCurrent();
        }
        if (OVERLAY?.feature?.geometry) {
            const ring = overlayGetRingMercClosed();
            if (ring) editorLoadFromRingClosed(ring, { preserveRadius: true, renderOverlay: false });
            if (EDITOR.rawPoints.length >= 3) {
                if (!(await showJbgConfirm('This will replace the current overlay with a square using the same center.'))) return false;
                return editorReplaceWithSquareFromCurrent();
            }
        }
        if (!(await confirmReplaceCurrentShape('a Square'))) return false;
        return createDefaultSquareAtViewport();
    }

    async function startRectangleOrConvertCurrent() {
        if (EDITOR.rawPoints && EDITOR.rawPoints.length >= 3) {
            if (!(await showJbgConfirm('This will replace the current editable shape with a rectangle using the same footprint.'))) return false;
            return editorReplaceWithRectangleFromCurrent();
        }
        if (OVERLAY?.feature?.geometry) {
            const ring = overlayGetRingMercClosed();
            if (ring) editorLoadFromRingClosed(ring, { preserveRadius: true, renderOverlay: false });
            if (EDITOR.rawPoints.length >= 3) {
                if (!(await showJbgConfirm('This will replace the current overlay with a rectangle using the same footprint.'))) return false;
                return editorReplaceWithRectangleFromCurrent();
            }
        }
        if (!(await confirmReplaceCurrentShape('a Rectangle'))) return false;
        return createDefaultRectangleAtViewport();
    }

    async function startCircleOrConvertCurrent() {
        if (EDITOR.rawPoints && EDITOR.rawPoints.length >= 3) {
            if (!(await showJbgConfirm('This will replace the current editable shape with a circle using the same footprint.'))) return false;
            return editorReplaceWithCircleFromCurrent();
        }
        if (OVERLAY?.feature?.geometry) {
            const ring = overlayGetRingMercClosed();
            if (ring) editorLoadFromRingClosed(ring, { preserveRadius: true, renderOverlay: false });
            if (EDITOR.rawPoints.length >= 3) {
                if (!(await showJbgConfirm('This will replace the current overlay with a circle using the same footprint.'))) return false;
                return editorReplaceWithCircleFromCurrent();
            }
        }
        if (!(await confirmReplaceCurrentShape('a Circle'))) return false;
        return createDefaultCircleAtViewport();
    }

    function hasEditableOrOverlayState() {
        return !!(MANUAL.active || OVERLAY?.feature?.geometry || (EDITOR.rawPoints && EDITOR.rawPoints.length >= 3));
    }

    async function confirmReplaceCurrentShape(nextName = 'new shape') {
        if (!hasEditableOrOverlayState()) return true;
        return showJbgConfirm(`This will replace the current overlay/edit state with ${nextName}.`, {
            title: 'Replace current shape?',
            confirmText: 'Replace',
            cancelText: 'Cancel'
        });
    }

    function resetCurrentShapeForNewMode(reason = 'new-shape') {
        try { manualCancel(reason); } catch (e) {}
        try { cancelInput(reason); } catch (e) {}
        try { transformStop(reason); } catch (e) {}
        try { overlayClear(); } catch (e) {}
        try { editorClear(); } catch (e) {}
        try { editorSetRadius(0); } catch (e) {}
        EDITOR.createAbortReminderShownForShape = false;
        refreshUiStatus();
    }

    function initScriptsTabUiOnce() {
        if (UI.registered) return true;

        const us = W?.userscripts;
        if (!us?.registerSidebarTab) {
            log('UI: W.userscripts.registerSidebarTab not available yet');
            return false;
        }

        let tab;
        try {
            tab = us.registerSidebarTab(SCRIPT_ID);
        } catch (e) {
            log('UI: registerSidebarTab failed, retry remove+add', e);
            try { us.removeSidebarTab?.(SCRIPT_ID); } catch (_) {}
            tab = us.registerSidebarTab(SCRIPT_ID);
        }

        const { tabLabel, tabPane } = tab || {};
        if (!tabLabel || !tabPane) {
            log('UI: unexpected registerSidebarTab return', tab);
            return false;
        }

        injectModernUiStyles();
        const settings = readSettings();
        let lang = getSupportedLanguageCodes().includes(settings.language) ? settings.language : 'en';
        if (settings.language !== lang) writeSettings({ language: lang });
        let TX = getUiText(lang);
        EDITOR.overlayColor = normalizeOverlayColor(settings.overlayColor);
        MANUAL.snapEnabled = !!settings.snapToGrid;

        tabLabel.textContent = 'JB Geometry';
        tabPane.innerHTML = '';
        tabPane.style.padding = '0';

        const shell = createEl('div', 'jbg-shell');
        shell.dir = isRtlLanguage(lang) ? 'rtl' : 'ltr';

        const hero = createEl('section', 'jbg-hero');
        const titleRow = createEl('div', 'jbg-title-row');
        const titleBlock = createEl('div', 'jbg-title-block');
        const titleEl = createEl('div', 'jbg-title', TX.title);
        const subtitleEl = createEl('div', 'jbg-subtitle', TX.subtitle);
        titleBlock.appendChild(titleEl);
        titleBlock.appendChild(subtitleEl);
        titleRow.appendChild(titleBlock);
        hero.appendChild(titleRow);


        function mkBtn(label, className = '') {
            const b = createEl('button', `jbg-btn ${className}`.trim(), label);
            b.type = 'button';
            return b;
        }

        const shapesCard = createEl('section', 'jbg-card');
        shapesCard.dataset.jbgGuide = 'shape-builder';
        const shapesHead = createEl('div', 'jbg-card-head');
        const shapeTitle = createEl('div', 'jbg-card-title', TX.shape);
        shapesHead.appendChild(shapeTitle);
        shapesCard.appendChild(shapesHead);
        const shapesGrid = createEl('div', 'jbg-grid');
        const btnSquare = mkBtn(TX.square);
        const btnRect = mkBtn(TX.rectangle);
        const btnCircle = mkBtn(TX.circle);
        const btnManual = mkBtn(TX.draw);
        const btnRecreate = mkBtn(TX.recreate);
        const btnCopyPasteJb = mkBtn(TX.replaceJb);
        btnRecreate.dataset.jbgGuide = 'custom-polygon';
        btnCopyPasteJb.dataset.jbgGuide = 'replace-jb';
        btnRecreate.disabled = false;
        btnCopyPasteJb.disabled = true;
        shapesGrid.appendChild(btnSquare);
        shapesGrid.appendChild(btnRect);
        shapesGrid.appendChild(btnCircle);
        shapesGrid.appendChild(btnManual);
        shapesGrid.appendChild(btnRecreate);
        shapesGrid.appendChild(btnCopyPasteJb);
        shapesCard.appendChild(shapesGrid);

        const colorCard = createEl('section', 'jbg-card jbg-stack');
        colorCard.dataset.jbgGuide = 'overlay-color';
        const colorHead = createEl('div', 'jbg-card-head');
        const colorTitle = createEl('div', 'jbg-card-title', TX.overlayColor);
        colorHead.appendChild(colorTitle);
        colorCard.appendChild(colorHead);
        const colorTabs = createEl('div', 'jbg-color-tabs');
        const colorOptions = [
            ['#E6E6E6', 'White'],
            ['#2AA8FF', 'Blue'],
            ['#22C77A', 'Green'],
            ['#FFB020', 'Amber'],
            ['#FF5366', 'Red'],
        ];
        EDITOR.ui.colorButtons = [];
        for (const [color, label] of colorOptions) {
            const b = createEl('button', 'jbg-color-tab', '');
            b.type = 'button';
            b.title = label;
            b.dataset.color = color;
            b.style.setProperty('--swatch', color);
            b.classList.toggle('is-active', normalizeOverlayColor(color) === EDITOR.overlayColor);
            b.addEventListener('click', () => runSafely(() => { applyOverlayColor(color); refreshUiStatus(); }));
            EDITOR.ui.colorButtons.push(b);
            colorTabs.appendChild(b);
        }
        colorCard.appendChild(colorTabs);

        const editCard = createEl('section', 'jbg-card jbg-stack');
        editCard.dataset.jbgGuide = 'edit-shape';
        const editHead = createEl('div', 'jbg-card-head');
        const editTitle = createEl('div', 'jbg-card-title', TX.editShape);
        editHead.appendChild(editTitle);
        editCard.appendChild(editHead);
        const radiusRow = createEl('div', 'jbg-range-row');
        const cornerRadiusLabel = createEl('span', 'jbg-small-label', TX.cornerRadius);
        radiusRow.appendChild(cornerRadiusLabel);
        const radiusValue = createEl('span', 'jbg-radius-value', `${EDITOR.radius.toFixed(0)}${radiusUnitLabel()}`);
        radiusRow.appendChild(radiusValue);
        editCard.appendChild(radiusRow);
        const radiusInput = createEl('input', 'jbg-range');
        radiusInput.type = 'range';
        radiusInput.min = '0';
        radiusInput.max = '60';
        radiusInput.step = '1';
        radiusInput.value = String(EDITOR.radius || 0);
        editCard.appendChild(radiusInput);

        const sizeRow = createEl('div', 'jbg-range-row');
        const shapeSizeLabel = createEl('span', 'jbg-small-label', TX.shapeSize);
        sizeRow.appendChild(shapeSizeLabel);
        const sizeValue = createEl('button', 'jbg-radius-value jbg-value-pill', formatAreaSqm(editorCurrentAreaSqm()));
        sizeValue.type = 'button';
        sizeValue.title = 'Click to show size percentage';
        sizeRow.appendChild(sizeValue);
        editCard.appendChild(sizeRow);
        const sizeInput = createEl('input', 'jbg-range');
        sizeInput.type = 'range';
        sizeInput.min = '20';
        sizeInput.max = '250';
        sizeInput.step = '1';
        sizeInput.value = String(Math.round(EDITOR.sizePercent || 100));
        editCard.appendChild(sizeInput);

        EDITOR.ui.radius = radiusInput;
        EDITOR.ui.radiusValue = radiusValue;
        EDITOR.ui.size = sizeInput;
        EDITOR.ui.sizeValue = sizeValue;
        EDITOR.ui.info = null;
        updateAllRangeProgress();
        const editGrid = createEl('div', 'jbg-grid');
        const btnUndo = mkBtn(TX.undo);
        const btnRedo = mkBtn(TX.redo);
        const btnResetRadius = mkBtn(TX.reset, 'jbg-reset-btn');
        editGrid.appendChild(btnUndo);
        editGrid.appendChild(btnRedo);
        editGrid.appendChild(btnResetRadius);
        editCard.appendChild(editGrid);
        EDITOR.ui.undo = btnUndo;
        EDITOR.ui.redo = btnRedo;
        EDITOR.ui.reset = btnResetRadius;
        editorUpdateHistoryButtons();

        const actionCard = createEl('section', 'jbg-card jbg-stack');
        actionCard.dataset.jbgGuide = 'actions';
        const actionGrid = createEl('div', 'jbg-final-action-row');
        const btnCreate = mkBtn(TX.create, 'jbg-btn-primary jbg-final-create');
        btnCreate.dataset.jbgGuide = 'create-jb';
        const btnClear = mkBtn(TX.abort, 'jbg-btn-red jbg-delete-btn jbg-final-abort');
        btnClear.dataset.jbgGuide = 'abort';
        actionGrid.appendChild(btnCreate);
        actionGrid.appendChild(btnClear);
        actionCard.appendChild(actionGrid);

        const status = null;

        const navMenu = createEl('div', 'jbg-nav-menu');
        const builderTab = createEl('button', 'jbg-nav-tab is-active', TX.builderTab);
        const settingsTab = createEl('button', 'jbg-nav-tab', TX.settingsTab);
        builderTab.type = 'button';
        settingsTab.type = 'button';
        navMenu.appendChild(builderTab);
        navMenu.appendChild(settingsTab);

        const builderPanel = createEl('div', 'jbg-panel');
        builderPanel.appendChild(shapesCard);
        builderPanel.appendChild(colorCard);
        builderPanel.appendChild(editCard);
        builderPanel.appendChild(actionCard);

        const settingsCard = createEl('section', 'jbg-card jbg-stack jbg-panel');
        settingsCard.hidden = true;
        const settingsHead = createEl('div', 'jbg-card-head');
        const settingsTitle = createEl('div', 'jbg-card-title', TX.settingsTab);
        settingsHead.appendChild(settingsTitle);
        settingsCard.appendChild(settingsHead);

        const languageRow = createEl('div', 'jbg-setting-row');
        const languageCopy = createEl('div', 'jbg-setting-copy');
        const languageTitle = createEl('div', 'jbg-setting-title', TX.language);
        languageCopy.appendChild(languageTitle);
        const languageSelect = createEl('div', 'jbg-custom-select');
        const languageSelectBtn = createEl('button', 'jbg-custom-select-btn', getLanguageOption(lang).nativeName);
        const languageSelectMenu = createEl('div', 'jbg-custom-select-menu');
        languageSelectBtn.type = 'button';
        languageSelectMenu.hidden = true;
        languageSelect.appendChild(languageSelectBtn);
        document.body.appendChild(languageSelectMenu);
        languageRow.appendChild(languageCopy);
        languageRow.appendChild(languageSelect);
        settingsCard.appendChild(languageRow);

        const snapRow = createEl('div', 'jbg-setting-row');
        const snapCopy = createEl('div', 'jbg-setting-copy');
        const snapTitle = createEl('div', 'jbg-setting-title', TX.snap);
        const snapDesc = createEl('div', 'jbg-setting-desc', TX.snapDesc);
        snapCopy.appendChild(snapTitle);
        snapCopy.appendChild(snapDesc);
        const snapToggle = createEl('button', 'jbg-toggle', '');
        snapToggle.type = 'button';
        snapToggle.setAttribute('aria-label', TX.snap);
        snapRow.appendChild(snapCopy);
        snapRow.appendChild(snapToggle);
        settingsCard.appendChild(snapRow);

        const shortcutsCard = createEl('section', 'jbg-setting-row jbg-shortcuts-card');
        const shortcutsHead = createEl('div', 'jbg-card-head');
        const shortcutsTitle = createEl('div', 'jbg-card-title', TX.shortcutsTitle || 'Keyboard shortcuts');
        shortcutsHead.appendChild(shortcutsTitle);
        shortcutsCard.appendChild(shortcutsHead);
        shortcutsCard.appendChild(createEl('div', 'jbg-setting-desc', TX.shortcutsDesc || 'Useful editing shortcuts while shaping a JB.'));
        const shortcutsGrid = createEl('div', 'jbg-shortcuts-grid');
        const shortcutItems = [
            ['D', 'Delete hovered vertex'],
            ['Del', 'Delete hovered vertex'],
            ['Esc', 'Cancel current edit/draw mode'],
            ['Ctrl+Z', 'Undo'],
            ['Ctrl+Y', 'Redo'],
            ['Ctrl', 'Snap rotate to 15° while rotating'],
            ['Enter', 'Finish manual drawing'],
        ];
        for (const [key, desc] of shortcutItems) {
            const row = createEl('div', 'jbg-shortcut-row');
            row.appendChild(createEl('span', 'jbg-key', key));
            row.appendChild(createEl('span', '', desc));
            shortcutsGrid.appendChild(row);
        }
        shortcutsCard.appendChild(shortcutsGrid);
        settingsCard.appendChild(shortcutsCard);


        function setActivePanel(name, opts = {}) {
            const settingsOpen = name === 'settings';
            builderPanel.hidden = settingsOpen;
            settingsCard.hidden = !settingsOpen;
            builderTab.classList.toggle('is-active', !settingsOpen);
            settingsTab.classList.toggle('is-active', settingsOpen);
            if (!opts.skipSave) writeSettings({ activeSettingsTab: settingsOpen ? 'settings' : 'builder' });
        }

        function refreshLanguageDropdown() {
            const s = readSettings();
            const opt = getLanguageOption(s.language);
            languageSelectBtn.textContent = opt.nativeName;
            languageSelectMenu.innerHTML = '';
            for (const item of getSupportedLanguageOptions()) {
                const optionBtn = createEl('button', 'jbg-custom-select-option', item.nativeName);
                optionBtn.type = 'button';
                optionBtn.title = item.label;
                optionBtn.dataset.lang = item.code;
                optionBtn.dir = isRtlLanguage(item.code) ? 'rtl' : 'ltr';
                optionBtn.classList.toggle('is-active', item.code === s.language);
                const chooseLanguage = (evt) => {
                    try { evt.preventDefault(); } catch (e) {}
                    try { evt.stopPropagation(); } catch (e) {}
                    try { evt.stopImmediatePropagation?.(); } catch (e) {}
                    closeLanguageDropdown();
                    applyLanguage(item.code);
                };
                optionBtn.addEventListener('pointerdown', chooseLanguage, true);
                optionBtn.addEventListener('mousedown', chooseLanguage, true);
                optionBtn.addEventListener('click', chooseLanguage, true);
                languageSelectMenu.appendChild(optionBtn);
            }
        }

        function refreshSettingsControls() {
            const s = readSettings();
            refreshLanguageDropdown();
            snapToggle.classList.toggle('is-on', !!s.snapToGrid);
            snapToggle.setAttribute('aria-pressed', String(!!s.snapToGrid));
        }

        function applyLanguage(nextLang) {
            lang = getSupportedLanguageCodes().includes(nextLang) ? nextLang : 'en';
            const saved = writeSettings({ language: lang });
            lang = getSupportedLanguageCodes().includes(saved.language) ? saved.language : lang;
            TX = getUiText(lang);
            titleEl.textContent = TX.title;
            subtitleEl.textContent = TX.subtitle;
            shell.dir = isRtlLanguage(lang) ? 'rtl' : 'ltr';
            shapeTitle.textContent = TX.shape;
            btnSquare.textContent = TX.square;
            btnRect.textContent = TX.rectangle;
            btnCircle.textContent = TX.circle;
            btnManual.textContent = TX.draw;
            btnRecreate.textContent = TX.recreate;
            btnCopyPasteJb.textContent = TX.replaceJb;
            colorTitle.textContent = TX.overlayColor;
            editTitle.textContent = TX.editShape;
            cornerRadiusLabel.textContent = TX.cornerRadius;
            shapeSizeLabel.textContent = TX.shapeSize;
            btnUndo.textContent = TX.undo;
            btnRedo.textContent = TX.redo;
            btnResetRadius.textContent = TX.reset;
            btnCreate.textContent = TX.create;
            btnClear.textContent = TX.abort;
            builderTab.textContent = TX.builderTab;
            settingsTab.textContent = TX.settingsTab;
            settingsTitle.textContent = TX.settingsTab;
            try { shortcutsTitle.textContent = TX.shortcutsTitle || 'Keyboard shortcuts'; } catch (e) {}
            languageTitle.textContent = TX.language;
            snapTitle.textContent = TX.snap;
            snapDesc.textContent = TX.snapDesc;
            snapToggle.setAttribute('aria-label', TX.snap);
            if (UI.jbOpenPrompt) UI.jbOpenPrompt.textContent = TX.openEditorPrompt || 'Open JB Geometry editor';
            if (EDITOR.ui.radiusValue) EDITOR.ui.radiusValue.textContent = `${Number(EDITOR.radius || 0).toFixed(0)}${radiusUnitLabel()}`;
            refreshSettingsControls();
        }

        shell.appendChild(hero);
        shell.appendChild(navMenu);
        shell.appendChild(builderPanel);
        shell.appendChild(settingsCard);
        tabPane.appendChild(shell);

        builderTab.addEventListener('click', () => setActivePanel('builder'));
        settingsTab.addEventListener('click', () => setActivePanel('settings'));
        function positionLanguageDropdown() {
            try {
                const rect = languageSelectBtn.getBoundingClientRect();
                const menuWidth = Math.max(214, Math.round(rect.width));
                languageSelectMenu.style.width = `${menuWidth}px`;
                languageSelectMenu.style.left = `${Math.round(rect.right - menuWidth)}px`;
                languageSelectMenu.style.right = 'auto';
                languageSelectMenu.style.bottom = '';
                languageSelectMenu.style.top = `${Math.round(rect.bottom + 7)}px`;

                const maxHeight = Math.max(180, Math.min(320, window.innerHeight - 24));
                languageSelectMenu.style.maxHeight = `${maxHeight}px`;
                const menuRect = languageSelectMenu.getBoundingClientRect();
                const availableBelow = window.innerHeight - rect.bottom;
                if (availableBelow < menuRect.height + 12) {
                    languageSelectMenu.style.top = `${Math.max(8, Math.round(rect.top - Math.min(menuRect.height, maxHeight) - 7))}px`;
                }
            } catch (e) {}
        }

        function closeLanguageDropdown() {
            languageSelect.classList.remove('is-open');
            languageSelectMenu.hidden = true;
        }

        languageSelectBtn.addEventListener('click', (evt) => {
            try { evt.preventDefault(); } catch (e) {}
            try { evt.stopPropagation(); } catch (e) {}
            const open = !languageSelect.classList.contains('is-open');
            if (open) {
                languageSelect.classList.add('is-open');
                languageSelectMenu.hidden = false;
                positionLanguageDropdown();
            } else {
                closeLanguageDropdown();
            }
        });
        document.addEventListener('click', (evt) => {
            if (!languageSelect.contains(evt.target) && !languageSelectMenu.contains(evt.target)) {
                closeLanguageDropdown();
            }
        }, false);
        window.addEventListener('resize', () => {
            if (!languageSelectMenu.hidden) positionLanguageDropdown();
        }, true);
        window.addEventListener('scroll', () => {
            if (!languageSelectMenu.hidden) positionLanguageDropdown();
        }, true);
        snapToggle.addEventListener('click', () => runSafely(() => {
            const next = !readSettings().snapToGrid;
            writeSettings({ snapToGrid: next });
            MANUAL.snapEnabled = next;
            refreshSettingsControls();
            uiSetStep(next ? TX.snapOn : TX.snapOff);
            refreshUiStatus();
        }));
        refreshSettingsControls();
        setActivePanel(readSettings().activeSettingsTab === 'settings' ? 'settings' : 'builder', { skipSave: true });

        btnUndo.addEventListener('click', () => runSafely(() => editorUndo()));
        btnRedo.addEventListener('click', () => runSafely(() => editorRedo()));
        radiusInput.addEventListener('pointerdown', () => runSafely(() => { if (EDITOR.rawPoints.length >= 3) editorPushHistory('radius'); }));
        radiusInput.addEventListener('input', () => runSafely(() => {
            editorSetRadius(Number(radiusInput.value || 0));
            refreshUiStatus();
        }));
        sizeInput.addEventListener('pointerdown', () => runSafely(() => {
            if (EDITOR.rawPoints.length >= 3) editorPushHistory('shape-size');
            EDITOR.scaleStartPoints = (EDITOR.rawPoints || []).map(p => [p[0], p[1]]);
            EDITOR.scaleStartCenter = editorGetRawCenter();
            EDITOR.scaleStartPercent = Math.max(20, Math.min(250, Number(EDITOR.sizePercent || 100)));
        }));
        sizeInput.addEventListener('input', () => runSafely(() => {
            editorSetSizePercent(Number(sizeInput.value || 100), { fromScaleSession: true });
            refreshUiStatus();
        }));
        sizeValue.addEventListener('click', () => runSafely(() => {
            EDITOR.sizeValueMode = EDITOR.sizeValueMode === 'area' ? 'percent' : 'area';
            updateSizeValuePill();
        }));
        sizeInput.addEventListener('pointerup', () => runSafely(() => {
            EDITOR.scaleStartPoints = null;
            EDITOR.scaleStartCenter = null;
            EDITOR.scaleStartPercent = EDITOR.sizePercent;
        }));
        btnResetRadius.addEventListener('click', () => runSafely(() => {
            const changed = Number(EDITOR.radius || 0) !== 0 || Number(EDITOR.sizePercent || 100) !== 100;
            if (!changed) return;
            if (EDITOR.rawPoints.length >= 3) editorPushHistory('reset-sliders');
            editorSetRadius(0);
            editorSetSizePercent(100);
            uiSetStep(TX.slidersReset);
            refreshUiStatus();
        }));

        btnRecreate.addEventListener('click', () => runSafely(async () => {
            await openCustomPolygonImporter();
            refreshUiStatus();
        }));
        btnCopyPasteJb.addEventListener('click', () => runSafely(async () => {
            await replaceSelectedJunctionBoxWithShape();
            refreshUiStatus();
        }));
        btnClear.addEventListener('click', () => runSafely(() => { clearRecreateEditTarget(); if (EDITOR.rawPoints.length >= 3) editorPushHistory('clear'); EDITOR.createAbortReminderShownForShape = false; overlayClear(); hardUnlockMap('delete'); forceWmeEditRecovery('delete'); refreshUiStatus(); }));
        btnSquare.addEventListener('click', () => runSafely(async () => { clearRecreateEditTarget(); await startSquareOrConvertCurrent(); refreshUiStatus(); }));
        btnRect.addEventListener('click', () => runSafely(async () => { clearRecreateEditTarget(); await startRectangleOrConvertCurrent(); refreshUiStatus(); }));
        btnCircle.addEventListener('click', () => runSafely(async () => { clearRecreateEditTarget(); await startCircleOrConvertCurrent(); refreshUiStatus(); }));
        btnManual.addEventListener('click', () => runSafely(async () => { clearRecreateEditTarget(); if (!(await confirmReplaceCurrentShape('a new Manual shape'))) return; resetCurrentShapeForNewMode('manual-new'); ensureOverlayLayer(); manualStart(); refreshUiStatus(); }));
        btnCreate.addEventListener('click', () => runSafely(async () => {
            if (UI.recreateTurnSnapshot || UI.recreateEditTarget) {
                await recreateReplacedJunctionBoxWithTurnSnapshot();
                return;
            }
            const current = writeSettings({ shortcutKey: 'j' });
            commitOverlayToJb({ autoClearAfterCreate: current.autoClearAfterCreate });
            EDITOR.createAbortReminderShownForShape = false;
        }));

        UI.registered = true;
        UI.tab = tab;
        UI.btnClear = btnClear;
        UI.btnCreate = btnCreate;
        UI.btnRecreate = btnRecreate;
        UI.btnCopyPasteJb = btnCopyPasteJb;
        UI.editCard = editCard;
        UI.colorCard = colorCard;
        UI.actionCard = actionCard;
        UI.statusEl = null;

        installJunctionBoxClickCapture();

        try { window.setTimeout(showUpdateSplashIfNeeded, 350); } catch (e) {}

        refreshUiStatus();
        const selectionRefreshTimer = setIntervalSafe(() => {
            try { installJunctionBoxClickCapture(); } catch (e) {}
            try { refreshUiStatus(); } catch (e) {}
        }, 700);

        addDisposer(() => {
            try { window.clearInterval(selectionRefreshTimer); state.timers.delete(selectionRefreshTimer); } catch (e) {}
            try { W?.userscripts?.removeSidebarTab?.(SCRIPT_ID); } catch (e) {}
            UI.registered = false;
            UI.tab = null;
            UI.statusEl = null;
            UI.btnClear = null;
            UI.btnCreate = null;
            UI.btnCopyPasteJb = null;
            clearRecreateEditTarget();
            UI.editCard = null;
            UI.colorCard = null;
            UI.actionCard = null;
            try { languageSelectMenu.remove(); } catch (e) {}
        });

        log('UI: sidebar tab ready');
        return true;
    }

    function startScriptsTabRetry() {
        if (UI.registered || UI.retryStarted) return;
        UI.retryStarted = true;

        const tryInstall = () => {
            if (UI.registered) {
                if (UI.retryTimer) {
                    window.clearInterval(UI.retryTimer);
                    UI.retryTimer = null;
                }
                return;
            }

            try {
                if (initScriptsTabUiOnce()) {
                    if (UI.retryTimer) {
                        window.clearInterval(UI.retryTimer);
                        UI.retryTimer = null;
                    }
                }
            } catch (e) {}
        };

        tryInstall();

        if (!UI.registered) {
            UI.retryTimer = window.setInterval(tryInstall, 500);
            state.timers.add(UI.retryTimer);
        }

        document.addEventListener('wme-ready', tryInstall, false);
        window.addEventListener('wme-ready', tryInstall, false);
        window.addEventListener('load', tryInstall, false);

        addDisposer(() => {
            try { document.removeEventListener('wme-ready', tryInstall, false); } catch (e) {}
            try { window.removeEventListener('wme-ready', tryInstall, false); } catch (e) {}
            try { window.removeEventListener('load', tryInstall, false); } catch (e) {}
            if (UI.retryTimer) {
                try { window.clearInterval(UI.retryTimer); } catch (e) {}
                UI.retryTimer = null;
            }
            UI.retryStarted = false;
        });
    }



    const RIGHT_CLICK = {
        providerId: 'jb-geometry',
        mapProviderId: 'jb-geometry-map',
        segmentProviderId: 'jb-geometry',
        legacyProviderIds: ['jb-geometry-segment'],
        registered: false,
        retryTimer: null,
        retryStarted: false,
    };

    function getRightClickProviderIds() {
        return Array.from(new Set([RIGHT_CLICK.providerId, RIGHT_CLICK.mapProviderId, RIGHT_CLICK.segmentProviderId, ...RIGHT_CLICK.legacyProviderIds]));
    }

    function getRightClickRoots() {
        const roots = [window];
        try {
            if (typeof unsafeWindow !== 'undefined' && unsafeWindow && unsafeWindow !== window) roots.push(unsafeWindow);
        } catch (e) {}
        return roots;
    }

    function getRightClickRoot() {
        for (const root of getRightClickRoots()) {
            const api = root?.WmeRightClickFunctionsApi || root?.WmeRightClickFunctions;
            if (api?.registerMenuProvider) return root;
        }
        return null;
    }

    function getRightClickApiFromRoot(root) {
        return root?.WmeRightClickFunctionsApi || root?.WmeRightClickFunctions || null;
    }

    function getRightClickApi() {
        return getRightClickApiFromRoot(getRightClickRoot());
    }

    function installRightClickMeta() {
        for (const root of getRightClickRoots()) {
            try {
                root.WmeRightClickExtensionMeta = root.WmeRightClickExtensionMeta || {};
                root.WmeRightClickExtensionMeta[RIGHT_CLICK.providerId] = { name: SCRIPT_NAME };
                root.WmeRightClickExtensionMeta[RIGHT_CLICK.mapProviderId] = { name: SCRIPT_NAME };
                for (const id of RIGHT_CLICK.legacyProviderIds) {
                    try { delete root.WmeRightClickExtensionMeta[id]; } catch (e) {}
                }
            } catch (e) {}
        }
    }

    function lonLatLikeToMerc(lonLat) {
        if (!lonLat) return null;

        let lon;
        let lat;

        if (Array.isArray(lonLat)) {
            lon = Number(lonLat[0]);
            lat = Number(lonLat[1]);
        } else if (typeof lonLat === 'object') {
            lon = Number(lonLat.lon ?? lonLat.lng ?? lonLat.longitude ?? lonLat.x);
            lat = Number(lonLat.lat ?? lonLat.latitude ?? lonLat.y);
        }

        if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;

        if (Math.abs(lon) > 180 || Math.abs(lat) > 90) return [lon, lat];

        try {
            if (window.OpenLayers) {
                const src = new OpenLayers.Projection('EPSG:4326');
                const dst = new OpenLayers.Projection('EPSG:900913');
                const ll = new OpenLayers.LonLat(lon, lat).transform(src, dst);
                return [ll.lon, ll.lat];
            }
        } catch (e) {}

        const x = lon * 20037508.34 / 180;
        let y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
        y = y * 20037508.34 / 180;
        return [x, y];
    }

    function tryOpenSidebarTab() {
        try { initScriptsTabUiOnce(); } catch (e) {}
        try { UI.tab?.tabLabel?.click?.(); return true; } catch (e) {}
        try {
            const lbl = document.querySelector('[data-script-id="' + SCRIPT_ID + '"]');
            lbl?.click?.();
            return !!lbl;
        } catch (e) {}
        return false;
    }

    function getSegmentObjectById(id) {
        if (id == null) return null;
        const sid = String(id);
        const stores = [
            W?.model?.segments,
            W?.model?.roadSegments,
            W?.model?.segment,
        ].filter(Boolean);

        for (const store of stores) {
            try { const obj = store.getObjectById?.(sid) || store.getObjectById?.(Number(sid)); if (obj) return obj; } catch (e) {}
            try { const obj = store.get?.(sid) || store.get?.(Number(sid)); if (obj) return obj; } catch (e) {}
            try { const obj = store.objects?.[sid] || store.objects?.[Number(sid)]; if (obj) return obj; } catch (e) {}
        }
        return null;
    }

    function collectPointsFromGeometryObject(obj, out) {
        if (!obj || !out) return;

        const pushPoint = (x, y) => {
            x = Number(x); y = Number(y);
            if (Number.isFinite(x) && Number.isFinite(y)) out.push([x, y]);
        };

        const visit = (g) => {
            if (!g) return;
            if (Array.isArray(g)) {
                if (g.length >= 2 && Number.isFinite(Number(g[0])) && Number.isFinite(Number(g[1]))) {
                    pushPoint(g[0], g[1]);
                } else {
                    for (const item of g) visit(item);
                }
                return;
            }
            if (typeof g !== 'object') return;

            if (Number.isFinite(Number(g.x)) && Number.isFinite(Number(g.y))) pushPoint(g.x, g.y);
            if (Number.isFinite(Number(g.lon)) && Number.isFinite(Number(g.lat))) {
                const p = lonLatLikeToMerc({ lon: g.lon, lat: g.lat });
                if (p) out.push(p);
            }
            if (Number.isFinite(Number(g.lng)) && Number.isFinite(Number(g.lat))) {
                const p = lonLatLikeToMerc({ lng: g.lng, lat: g.lat });
                if (p) out.push(p);
            }

            if (Array.isArray(g.components)) for (const c of g.components) visit(c);
            if (Array.isArray(g.points)) for (const c of g.points) visit(c);
            if (Array.isArray(g.coordinates)) for (const c of g.coordinates) visit(c);
            if (Array.isArray(g.geometry)) for (const c of g.geometry) visit(c);
        };

        try { visit(obj.geometry); } catch (e) {}
        try { visit(obj.attributes?.geometry); } catch (e) {}
        try { visit(obj.model?.geometry); } catch (e) {}
        try { visit(obj.getAttribute?.('geometry')); } catch (e) {}
    }


    function getJunctionBoxStores() {
        return [
            W?.model?.junctionBoxes,
            W?.model?.junctionboxes,
            W?.model?.junctionBox,
            W?.model?.junctionbox,
            W?.model?.junctions,
            W?.model?.junctionBoxes?.objects,
            W?.model?.junctionboxes?.objects,
        ].filter(Boolean);
    }

    function getObjectFromStoreById(store, id) {
        if (!store || id == null) return null;
        const sid = String(id);
        const nid = Number(id);
        try { const obj = store.getObjectById?.(sid) || store.getObjectById?.(nid); if (obj) return obj; } catch (e) {}
        try { const obj = store.get?.(sid) || store.get?.(nid); if (obj) return obj; } catch (e) {}
        try { const obj = store.objects?.[sid] || store.objects?.[nid]; if (obj) return obj; } catch (e) {}
        try { const obj = store[sid] || store[nid]; if (obj && typeof obj === 'object') return obj; } catch (e) {}
        return null;
    }

    function getJunctionBoxObjectById(id) {
        for (const store of getJunctionBoxStores()) {
            const obj = getObjectFromStoreById(store, id);
            if (obj) return obj;
        }
        return null;
    }

    function maybeJunctionBoxObject(obj) {
        if (!obj || typeof obj !== 'object') return false;
        const parts = [
            obj.type,
            obj.objectType,
            obj.modelType,
            obj.featureType,
            obj.className,
            obj.attributes?.type,
            obj.attributes?.objectType,
            obj.attributes?.modelType,
            obj.model?.type,
            obj.model?.objectType,
            obj.model?.className,
            obj.constructor?.name,
        ].map(v => String(v || '').toLowerCase()).join(' ');
        return /junction\s*box|junctionbox|jb/.test(parts);
    }

    function collectJunctionBoxIdsFromCtx(ctx) {
        const ids = [];
        const push = (v) => {
            if (v == null) return;
            if (Array.isArray(v)) {
                for (const item of v) push(item);
                return;
            }
            if (typeof v === 'object') {
                push(v.id ?? v.objectId ?? v.model?.id ?? v.attributes?.id);
                return;
            }
            ids.push(String(v));
        };

        push(ctx?.junctionBoxIds);
        push(ctx?.junctionBoxId);
        push(ctx?.junctionboxIds);
        push(ctx?.junctionboxId);
        push(ctx?.jbIds);
        push(ctx?.jbId);
        push(ctx?.objectIds);
        push(ctx?.objectId);
        push(ctx?.featureIds);
        push(ctx?.featureId);
        push(ctx?.ids);
        push(ctx?.id);

        return Array.from(new Set(ids.filter(Boolean)));
    }

    function getSelectedWmeFeaturesSafe() {
        try { return W?.selectionManager?.getSelectedWMEFeatures?.() || []; } catch (e) {}
        return [];
    }

    function selectionHasOnlyNonJunctionBox() {
        const feats = getSelectedWmeFeaturesSafe();
        if (!feats.length) return false;
        for (const ft of feats) {
            const candidates = [ft, ft?.model, ft?.feature, ft?.attributes];
            for (const c of candidates) {
                if (maybeJunctionBoxObject(c)) return false;
            }
        }
        return true;
    }

    function getSelectedJunctionBoxObjects() {
        const out = [];
        try {
            const feats = getSelectedWmeFeaturesSafe();
            for (const ft of feats) {
                const candidates = [ft, ft?.model, ft?.feature, ft?.attributes];
                for (const c of candidates) {
                    if (maybeJunctionBoxObject(c)) {
                        out.push(c);
                        break;
                    }
                }
            }
        } catch (e) {}
        return out;
    }

    function getJunctionBoxCandidateObjects(ctx) {
        const out = [];
        const pushObj = (obj) => { if (obj && typeof obj === 'object' && !out.includes(obj)) out.push(obj); };

        for (const key of ['junctionBox', 'junctionbox', 'jb', 'object', 'feature', 'model', 'placeInfo']) {
            const obj = ctx?.[key];
            if (Array.isArray(obj)) obj.forEach(pushObj);
            else pushObj(obj);
        }

        for (const id of collectJunctionBoxIdsFromCtx(ctx)) {
            pushObj(getJunctionBoxObjectById(id));
        }

        for (const obj of getSelectedJunctionBoxObjects()) pushObj(obj);

        return out;
    }

    function getJunctionBoxRingFromObject(obj) {
        const pts = [];
        collectPointsFromGeometryObject(obj, pts);
        if (!pts.length) return null;

        const unique = [];
        for (const p of pts) {
            if (!p || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) continue;
            const prev = unique[unique.length - 1];
            if (prev && Math.abs(prev[0] - p[0]) < 0.001 && Math.abs(prev[1] - p[1]) < 0.001) continue;
            unique.push([p[0], p[1]]);
        }

        if (unique.length < 3) return null;
        return ringClose(unique);
    }

    function getJunctionBoxRingFromContext(ctx) {
        for (const obj of getJunctionBoxCandidateObjects(ctx)) {
            if (!maybeJunctionBoxObject(obj)) continue;
            const ring = getJunctionBoxRingFromObject(obj);
            if (ring && ring.length >= 4) return ring;
        }
        if (UI.clickedJbRing && UI.clickedJbRing.length >= 4) return UI.clickedJbRing;
        return null;
    }

    function getFirstJunctionBoxObjectFromContext(ctx = {}) {
        for (const obj of getJunctionBoxCandidateObjects(ctx)) {
            if (!maybeJunctionBoxObject(obj)) continue;
            const ring = getJunctionBoxRingFromObject(obj);
            if (ring && ring.length >= 4) return obj;
        }
        if (UI.clickedJbRing && UI.clickedJbRing.length >= 4) return getRealJunctionBoxObjectMatchingRing(UI.clickedJbRing);
        return null;
    }

    function clearRecreateEditTarget() {
        UI.recreateEditTarget = null;
        UI.recreateEditKey = null;
        UI.recreateTurnSnapshot = null;
    }

    function cloneOlGeometrySafe(g) {
        try { return g?.clone?.() || null; } catch (e) { return null; }
    }

    function trySetGeometryOnObject(obj, geom) {
        if (!obj || !geom) return false;

        const candidates = [
            obj,
            obj?.model,
            obj?.feature,
            obj?.attributes,
            obj?.model?.attributes,
            obj?.feature?.attributes,
        ].filter(Boolean);

        let changed = false;

        for (const c of candidates) {
            const g = cloneOlGeometrySafe(geom);
            if (!g) continue;

            try {
                if ('geometry' in c || c.geometry) {
                    c.geometry = g;
                    changed = true;
                }
            } catch (e) {}

            try {
                if (typeof c.setGeometry === 'function') {
                    c.setGeometry(cloneOlGeometrySafe(geom));
                    changed = true;
                }
            } catch (e) {}

            try {
                if (typeof c.set === 'function') {
                    c.set('geometry', cloneOlGeometrySafe(geom));
                    changed = true;
                }
            } catch (e) {}

            try {
                if (c.attributes && typeof c.attributes === 'object') {
                    c.attributes.geometry = cloneOlGeometrySafe(geom);
                    changed = true;
                }
            } catch (e) {}

            try { c.geometry?.calculateBounds?.(); } catch (e) {}
            try { c.changed?.(); } catch (e) {}
            try { c.trigger?.('change'); } catch (e) {}
            try { c.emit?.('change'); } catch (e) {}
        }

        try {
            const olMap = getOlMap();
            for (const layer of (olMap?.layers || [])) {
                try { layer.drawFeature?.(obj); } catch (e) {}
                try { layer.drawFeature?.(obj?.feature); } catch (e) {}
                try { layer.redraw?.(true); } catch (e) {}
            }
        } catch (e) {}

        try { W?.model?.events?.triggerEvent?.('objectschanged'); } catch (e) {}
        try { W?.model?.events?.trigger?.('change'); } catch (e) {}

        return changed;
    }

    function getJunctionBoxObjectId(obj) {
        return String(obj?.id ?? obj?.model?.id ?? obj?.attributes?.id ?? obj?.objectId ?? '');
    }

    function cloneTurnSnapshotValue(value) {
        if (value == null) return value;
        try { return JSON.parse(JSON.stringify(value)); } catch (e) {}
        if (Array.isArray(value)) return value.map(v => cloneTurnSnapshotValue(v));
        if (typeof value === 'object') return Object.assign({}, value);
        return value;
    }

    function normalizeTurnSegmentPath(path) {
        if (!Array.isArray(path)) return [];
        return path
            .map(v => Number(v))
            .filter(v => Number.isFinite(v));
    }

    function getTurnMatchKey(turn, withPath = false) {
        if (!turn) return '';
        const path = normalizeTurnSegmentPath(turn.segmentPath).map(String).join(',');
        const base = [
            turn.fromSegmentId,
            turn.fromSegmentFwd ? 1 : 0,
            turn.toSegmentId,
            turn.toSegmentFwd ? 1 : 0,
        ].join('|');
        return withPath ? `${base}|${path}` : base;
    }

    function collectTurnSegmentIds(turn) {
        const ids = [];
        const add = (v) => {
            const n = Number(v);
            if (Number.isFinite(n) && !ids.includes(n)) ids.push(n);
        };
        add(turn?.fromSegmentId);
        add(turn?.toSegmentId);
        for (const id of normalizeTurnSegmentPath(turn?.segmentPath)) add(id);
        return ids;
    }

    function turnSharesAnySegment(turn, segmentIds) {
        if (!segmentIds || !segmentIds.size) return false;
        return collectTurnSegmentIds(turn).some(id => segmentIds.has(Number(id)));
    }

    function getPathSignature(path) {
        const ids = normalizeTurnSegmentPath(path);
        return ids.length ? ids.join(',') : '';
    }

    function normalizeLaneIndexesFromTurnLanes(lanes) {
        if (lanes == null) return null;

        const out = [];
        const pushIndex = (idx) => {
            const n = Number(idx);
            if (Number.isInteger(n) && n >= 0 && !out.includes(n)) out.push(n);
        };

        const pushRange = (a, b) => {
            const from = Number(a);
            const to = Number(b);
            if (!Number.isInteger(from) || !Number.isInteger(to)) return;
            const min = Math.min(from, to);
            const max = Math.max(from, to);
            for (let i = min; i <= max; i++) pushIndex(i);
        };

        const scan = (entry) => {
            if (entry == null) return;

            if (Array.isArray(entry)) {
                for (const item of entry) scan(item);
                return;
            }

            if (typeof entry === 'number') {
                pushIndex(entry);
                return;
            }

            if (typeof entry !== 'object') return;

            if (Array.isArray(entry.laneIndexes)) {
                for (const idx of entry.laneIndexes) pushIndex(idx);
            }
            if (Array.isArray(entry.enabledLaneIndexes)) {
                for (const idx of entry.enabledLaneIndexes) pushIndex(idx);
            }
            if (Array.isArray(entry.indexes)) {
                for (const idx of entry.indexes) pushIndex(idx);
            }

            if (entry.fromLaneIndex != null && entry.toLaneIndex != null) {
                pushRange(entry.fromLaneIndex, entry.toLaneIndex);
            } else if (entry.fromLaneIndex != null) {
                pushIndex(entry.fromLaneIndex);
            } else if (entry.toLaneIndex != null) {
                pushIndex(entry.toLaneIndex);
            }
        };

        scan(lanes);
        out.sort((a, b) => a - b);
        return out;
    }

    function cleanTurnSnapshotRow(turn) {
        const segmentPath = normalizeTurnSegmentPath(turn?.segmentPath);
        return {
            id: String(turn?.id || ''),
            key: getTurnMatchKey(turn, false),
            fullKey: getTurnMatchKey(turn, true),
            fromSegmentId: turn?.fromSegmentId,
            fromSegmentFwd: !!turn?.fromSegmentFwd,
            toSegmentId: turn?.toSegmentId,
            toSegmentFwd: !!turn?.toSegmentFwd,
            segmentPath,
            pathSignature: getPathSignature(segmentPath),
            relatedSegmentIds: collectTurnSegmentIds(Object.assign({}, turn, { segmentPath })),
            isJunctionBoxTurn: !!turn?.isJunctionBoxTurn,
            isPathTurn: !!turn?.isPathTurn || segmentPath.length > 0,
            isAllowed: !!turn?.isAllowed,
            restrictions: cloneTurnSnapshotValue(turn?.restrictions || []),
            instructionOpCode: turn?.instructionOpCode ?? null,
            lanes: cloneTurnSnapshotValue(turn?.lanes ?? null),
            laneIndexes: normalizeLaneIndexesFromTurnLanes(turn?.lanes ?? null),
        };
    }

    async function getSdkTurnsModuleSafe() {
        try {
            const sdk = await initSdkOnce();
            return sdk?.DataModel?.Turns || null;
        } catch (e) {
            log('Turns SDK unavailable:', e);
            return null;
        }
    }

    async function getAllTurnsSafe() {
        const turns = await getSdkTurnsModuleSafe();
        if (!turns?.getAll) return [];
        try {
            const res = turns.getAll();
            const rows = (res && typeof res.then === 'function') ? await res : res;
            return Array.isArray(rows) ? rows : [];
        } catch (e) {
            log('Turns.getAll failed:', e);
            return [];
        }
    }

    async function captureJunctionBoxTurnSnapshot() {
        const rows = await getAllTurnsSafe();
        const valid = rows.filter(t => t && t.id && t.fromSegmentId != null && t.toSegmentId != null);
        const jbTurns = valid.filter(t => !!t.isJunctionBoxTurn);

        const unique = new Map();
        for (const turn of jbTurns) {
            const snap = cleanTurnSnapshotRow(turn);
            if (!snap.key) continue;
            if (!unique.has(snap.key)) unique.set(snap.key, snap);
        }
        return Array.from(unique.values());
    }

    async function waitForReplacementTurns(snapshot, timeoutMs = 4500) {
        const wanted = new Set((snapshot || []).map(t => t.key).filter(Boolean));
        const started = Date.now();
        let last = [];
        while (Date.now() - started <= timeoutMs) {
            const turns = await getAllTurnsSafe();
            last = turns.filter(t => t?.isJunctionBoxTurn && wanted.has(getTurnMatchKey(t, false)));
            if (last.length || !wanted.size) return turns;
            await sleep(220);
        }
        return await getAllTurnsSafe();
    }

    async function createPathTurnFromSnapshot(src) {
        const turns = await getSdkTurnsModuleSafe();
        if (!turns?.createPathTurn || !src?.isPathTurn) return null;
        if (src.fromSegmentId == null || src.toSegmentId == null) return null;

        const attempts = [
            {
                fromSegmentId: Number(src.fromSegmentId),
                isForward: !!src.toSegmentFwd,
                toSegmentId: Number(src.toSegmentId),
            },
            {
                fromSegmentId: Number(src.fromSegmentId),
                isForward: !src.toSegmentFwd,
                toSegmentId: Number(src.toSegmentId),
            },
        ];

        for (const args of attempts) {
            try {
                const res = turns.createPathTurn(args);
                const created = (res && typeof res.then === 'function') ? await res : res;
                if (created?.id) return created;
            } catch (e) {
                log('Turns.createPathTurn failed:', e, args, src);
            }
        }

        return null;
    }

    async function updateTurnFromSnapshot(destTurn, src) {
        const turns = await getSdkTurnsModuleSafe();
        if (!turns?.updateTurn || !destTurn?.id || !src) return false;

        try {
            const res = turns.updateTurn({ turnId: destTurn.id, isAllowed: !!src.isAllowed });
            if (res && typeof res.then === 'function') await res;
            return true;
        } catch (e) {
            log('Turns.updateTurn failed:', e);
            return false;
        }
    }

    async function applyTurnLaneGuidanceFromSnapshot(destTurn, src) {
        const turns = await getSdkTurnsModuleSafe();
        if (!turns?.setTurnLaneGuidance || !destTurn?.id || !src) return false;

        const laneIndexes = Array.isArray(src.laneIndexes)
            ? src.laneIndexes.filter(n => Number.isInteger(Number(n)) && Number(n) >= 0).map(Number)
            : normalizeLaneIndexesFromTurnLanes(src.lanes);

        if (!Array.isArray(laneIndexes)) return false;
        if (src.lanes == null && laneIndexes.length === 0) return false;

        try {
            const res = turns.setTurnLaneGuidance({ turnId: destTurn.id, laneIndexes });
            if (res && typeof res.then === 'function') await res;
            return true;
        } catch (e) {
            log('Turns.setTurnLaneGuidance failed:', e);
            return false;
        }
    }

    async function applyJunctionBoxTurnSnapshot(snapshot) {
        if (!Array.isArray(snapshot) || !snapshot.length) return { applied: 0, total: 0, lanesApplied: 0, lanesTotal: 0 };

        const turns = await waitForReplacementTurns(snapshot);

        const byFull = new Map();
        const byBase = new Map();
        for (const turn of turns || []) {
            if (!turn?.id || !turn.isJunctionBoxTurn) continue;
            const full = getTurnMatchKey(turn, true);
            const base = getTurnMatchKey(turn, false);
            if (full) byFull.set(full, turn);
            if (base && !byBase.has(base)) byBase.set(base, turn);
        }

        let applied = 0;
        let lanesApplied = 0;
        let lanesTotal = 0;
        for (const src of snapshot) {
            const dest = byFull.get(src.fullKey) || byBase.get(src.key);
            if (!dest) continue;

            const ok = await updateTurnFromSnapshot(dest, src);
            if (ok) applied++;

            if (src.lanes != null || Array.isArray(src.laneIndexes)) {
                lanesTotal++;
                const laneOk = await applyTurnLaneGuidanceFromSnapshot(dest, src);
                if (laneOk) lanesApplied++;
            }
        }
        return { applied, total: snapshot.length, lanesApplied, lanesTotal };
    }

    async function recreateReplacedJunctionBoxWithTurnSnapshot() {
        const snapshot = UI.recreateTurnSnapshot || await captureJunctionBoxTurnSnapshot();
        const current = writeSettings({ shortcutKey: 'j' });
        const newFt = await commitOverlayToJb({ autoClearAfterCreate: current.autoClearAfterCreate });
        const result = await applyJunctionBoxTurnSnapshot(snapshot);
        clearRecreateEditTarget();
        EDITOR.createAbortReminderShownForShape = false;
        const laneText = result.lanesTotal ? ` Lane guidance copied: ${result.lanesApplied}/${result.lanesTotal}.` : '';
        showJbGeometryNotification(`Junction Box replaced. Turn permissions copied: ${result.applied}/${result.total}.${laneText} Review before saving.`, {
            title: getUiText().replaceJb,
            closeLabel: 'OK',
            timeoutMs: 8500,
        });
        refreshUiStatus();
        return !!newFt;
    }

    async function updateRecreatedJunctionBoxDirectly() {
        const target = UI.recreateEditTarget || getFirstJunctionBoxObjectFromContext({});
        if (!target) {
            showJbGeometryNotification(getUiText().directUpdateFail, { title: getUiText().recreate, closeLabel: 'OK', timeoutMs: 6500 });
            clearRecreateEditTarget();
            return false;
        }

        const ring = overlayGetRingMercClosed() || EDITOR.previewRing || editorOpenToClosed(EDITOR.rawPoints || []);
        const validation = validateJbShapeRing(ring, { minAngleDeg: 7 });
        if (!validation.ok) {
            await showInvalidShapeWarning(validation);
            return false;
        }

        if (validation.ring && OVERLAY?.feature?.geometry) {
            try { overlaySetPolygonFromMercRing(validation.ring, { skipEditorSync: true }); } catch (e) {}
        }

        const geom = buildOlPolygonFromOverlay();
        if (!geom) {
            showJbGeometryNotification(getUiText().directUpdateFail, { title: getUiText().recreate, closeLabel: 'OK', timeoutMs: 6500 });
            clearRecreateEditTarget();
            return false;
        }

        const ok = trySetGeometryOnObject(target, geom);
        clearRecreateEditTarget();

        showJbGeometryNotification(ok ? getUiText().directUpdateOk : getUiText().directUpdateFail, {
            title: getUiText().recreate,
            closeLabel: 'OK',
            timeoutMs: 7500,
        });

        refreshUiStatus();
        return ok;
    }

    function parseSvgPathNumbers(d) {
        const nums = String(d || '').match(/-?\d+(?:\.\d+)?/g);
        if (!nums || nums.length < 6) return [];
        const out = [];
        for (let i = 0; i + 1 < nums.length; i += 2) {
            const x = Number(nums[i]);
            const y = Number(nums[i + 1]);
            if (Number.isFinite(x) && Number.isFinite(y)) out.push([x, y]);
        }
        return out;
    }

    function svgPathLooksLikeJunctionBox(path) {
        if (!path || String(path.tagName || '').toLowerCase() !== 'path') return false;

        let ancestorText = '';
        let node = path;
        for (let i = 0; node && i < 9; i++, node = node.parentNode) {
            const txt = [
                node.id,
                node.className,
                node.getAttribute?.('class'),
                node.getAttribute?.('data-model-type'),
                node.getAttribute?.('data-testid'),
                node.getAttribute?.('aria-label'),
                node.getAttribute?.('title'),
                node.getAttribute?.('name'),
            ].map(v => String(v || '').toLowerCase()).join(' ');
            ancestorText += ` ${txt}`;

            if (/junction.?box|junctionbox|big.?junction|\bjb\b|map.?note|\bnote\b/.test(txt)) return true;
        }

        const id = String(path.id || '');
        const d = path.getAttribute?.('d') || '';
        if (!/^OpenLayers_Geometry_Polygon_/i.test(id) || !d) return false;

        let fill = '';
        let stroke = '';
        let fillOpacity = 0;
        let strokeWidth = 0;
        let pointerEvents = '';
        try {
            const cs = window.getComputedStyle(path);
            fill = String(path.getAttribute('fill') || cs.fill || '').toLowerCase();
            stroke = String(path.getAttribute('stroke') || cs.stroke || '').toLowerCase();
            fillOpacity = Number(path.getAttribute?.('fill-opacity') || path.style?.fillOpacity || cs.fillOpacity || 0);
            strokeWidth = Number(path.getAttribute?.('stroke-width') || path.style?.strokeWidth || cs.strokeWidth || 0);
            pointerEvents = String(path.getAttribute?.('pointer-events') || path.style?.pointerEvents || cs.pointerEvents || '').toLowerCase();
        } catch (e) {
            fill = String(path.getAttribute?.('fill') || '').toLowerCase();
            stroke = String(path.getAttribute?.('stroke') || '').toLowerCase();
            fillOpacity = Number(path.getAttribute?.('fill-opacity') || path.style?.fillOpacity || 0);
            strokeWidth = Number(path.getAttribute?.('stroke-width') || path.style?.strokeWidth || 0);
            pointerEvents = String(path.getAttribute?.('pointer-events') || path.style?.pointerEvents || '').toLowerCase();
        }

        const isCyan =
            stroke.includes('00ece3') ||
            stroke.includes('0, 236, 227') ||
            fill.includes('00ece3') ||
            fill.includes('0, 236, 227') ||
            stroke.includes('rgb(0, 236, 227)') ||
            fill.includes('rgb(0, 236, 227)');

        if (isCyan) return true;

        if (strokeWidth >= 1 && stroke && stroke !== 'none' && fill && fill !== 'none' && fillOpacity > 0 && pointerEvents.includes('visible')) {
            return true;
        }

        return false;
    }

    function svgPathToMercRing(path) {
        const localPts = parseSvgPathNumbers(path?.getAttribute?.('d'));
        if (localPts.length < 3) return null;

        const mapDiv = getMapDiv();
        if (!mapDiv) return null;
        const mapRect = mapDiv.getBoundingClientRect();

        let matrix = null;
        try { matrix = path.getScreenCTM?.(); } catch (e) {}
        if (!matrix) return null;

        const merc = [];
        for (const [x, y] of localPts) {
            const clientX = matrix.a * x + matrix.c * y + matrix.e;
            const clientY = matrix.b * x + matrix.d * y + matrix.f;
            const p = viewportPixelToMerc({ x: clientX - mapRect.left, y: clientY - mapRect.top });
            if (p) merc.push(p);
        }

        if (merc.length < 3) return null;
        return ringClose(merc);
    }

    function rememberClickedJunctionBoxFromEvent(evt) {
        let el = evt?.target || null;
        while (el && el !== document && String(el.tagName || '').toLowerCase() !== 'path') el = el.parentNode;
        if (!svgPathLooksLikeJunctionBox(el)) return false;

        const ring = svgPathToMercRing(el);
        if (!ring || ring.length < 4) return false;

        UI.clickedJbRing = ring;
        UI.clickedJbAt = Date.now();
        refreshUiStatus();
        return true;
    }

    function installJunctionBoxClickCapture() {
        if (UI.clickCaptureInstalled) return true;
        const div = getMapDiv();
        if (!div) return false;

        const onClick = (evt) => {
            try {
                if (!rememberClickedJunctionBoxFromEvent(evt)) {
                    UI.clickedJbRing = null;
                    UI.clickedJbAt = 0;
                    refreshUiStatus();
                }
            } catch (e) {}
        };

        div.addEventListener('click', onClick, true);
        UI.clickCaptureInstalled = true;
        addDisposer(() => {
            try { div.removeEventListener('click', onClick, true); } catch (e) {}
            UI.clickCaptureInstalled = false;
        });
        return true;
    }

    function extractFirstCoordinateArrayFromGeoJson(obj) {
        if (!obj) return null;
        if (obj.type === 'Feature') return extractFirstCoordinateArrayFromGeoJson(obj.geometry);
        if (obj.type === 'FeatureCollection') {
            for (const f of obj.features || []) {
                const got = extractFirstCoordinateArrayFromGeoJson(f);
                if (got) return got;
            }
        }
        if (obj.type === 'Polygon') return obj.coordinates?.[0] || null;
        if (obj.type === 'MultiPolygon') return obj.coordinates?.[0]?.[0] || null;
        if (Array.isArray(obj.coordinates)) return obj.coordinates?.[0] || null;
        return null;
    }

    function parseCustomPolygonText(input) {
        const raw = String(input || '').trim();
        if (!raw) return null;

        let coords = null;

        try {
            const json = JSON.parse(raw);
            coords = extractFirstCoordinateArrayFromGeoJson(json);
        } catch (e) {}

        if (!coords) {
            const kml = raw.match(/<coordinates[^>]*>([\s\S]*?)<\/coordinates>/i);
            if (kml) {
                coords = kml[1].trim().split(/\s+/).map(part => {
                    const nums = part.split(',').map(Number);
                    return [nums[0], nums[1]];
                });
            }
        }

        if (!coords) {
            const wkt = raw.match(/(?:POLYGON|MULTIPOLYGON)\s*\(\s*\(?\s*\(?([\s\S]*?)\)?\s*\)?\s*\)\s*$/i);
            if (wkt) {
                coords = wkt[1]
                    .split(',')
                    .map(part => part.trim().split(/\s+/).map(Number))
                    .filter(pair => pair.length >= 2)
                    .map(pair => [pair[0], pair[1]]);
            }
        }

        if (!coords) {
            const pairs = [];
            const matches = raw.matchAll(/(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)/g);
            for (const m of matches) pairs.push([Number(m[1]), Number(m[2])]);
            if (pairs.length >= 3) coords = pairs;
        }

        if (!Array.isArray(coords) || coords.length < 3) return null;

        const ring = coords
            .map(c => lonLatLikeToMerc(c))
            .filter(p => p && Number.isFinite(p[0]) && Number.isFinite(p[1]));

        if (ring.length < 3) return null;
        return ringClose(ring);
    }

    async function showCustomPolygonModal() {
        return new Promise((resolve) => {
            const TX = getUiText();
            const backdrop = createEl('div', 'jbg-modal-backdrop');
            const modal = createEl('div', 'jbg-modal');
            modal.style.width = 'min(620px, calc(100vw - 36px))';

            const title = createEl('div', 'jbg-modal-title', TX.customPolygonTitle || 'Custom Polygon');
            const msg = createEl('div', 'jbg-modal-message', TX.customPolygonDesc || '');
            const textarea = createEl('textarea', 'jbg-custom-poly-textarea');
            textarea.placeholder = TX.customPolygonPlaceholder || 'GeoJSON / KML / WKT / lon,lat';
            const actions = createEl('div', 'jbg-modal-actions');
            const cancel = createEl('button', 'jbg-modal-btn', TX.abort || 'Cancel');
            const load = createEl('button', 'jbg-modal-btn jbg-modal-btn-primary', TX.customPolygonLoad || 'Load polygon');
            cancel.type = 'button';
            load.type = 'button';

            actions.appendChild(cancel);
            actions.appendChild(load);
            modal.appendChild(title);
            modal.appendChild(msg);
            modal.appendChild(textarea);
            modal.appendChild(actions);
            backdrop.appendChild(modal);
            document.body.appendChild(backdrop);
            setTimeout(() => textarea.focus(), 30);

            const close = (value) => {
                try { backdrop.remove(); } catch (e) {}
                document.removeEventListener('keydown', onKey, true);
                resolve(value);
            };

            const onKey = (evt) => {
                if (evt.key === 'Escape') close(null);
                if ((evt.ctrlKey || evt.metaKey) && evt.key === 'Enter') close(textarea.value);
            };

            cancel.addEventListener('click', () => close(null));
            load.addEventListener('click', () => close(textarea.value));
            document.addEventListener('keydown', onKey, true);
        });
    }

    function focusCustomPolygonIfFar(ringClosed) {
        try {
            const olMap = getOlMap();
            if (!olMap || !Array.isArray(ringClosed) || ringClosed.length < 4) return false;

            const pts = ringIsClosed(ringClosed) ? ringClosed.slice(0, -1) : ringClosed;
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

            for (const p of pts) {
                const x = Number(p?.[0]);
                const y = Number(p?.[1]);
                if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }

            if (!Number.isFinite(minX) || !Number.isFinite(minY) || !Number.isFinite(maxX) || !Number.isFinite(maxY)) return false;

            const bounds = new OpenLayers.Bounds(minX, minY, maxX, maxY);
            const center = bounds.getCenterLonLat?.() || new OpenLayers.LonLat((minX + maxX) / 2, (minY + maxY) / 2);

            try {
                olMap.zoomToExtent?.(bounds, true);
                const z = olMap.getZoom?.();
                if (Number.isFinite(z) && z > 20) olMap.zoomTo?.(20);
            } catch (e) {
                try { olMap.setCenter?.(center); } catch (_) {}
            }

            try { window.setTimeout(() => editorPositionToolbar(), 180); } catch (e) {}
            return true;
        } catch (e) {
            return false;
        }
    }


    async function openCustomPolygonImporter() {
        const input = await showCustomPolygonModal();
        if (!input) return false;

        const ring = parseCustomPolygonText(input);
        if (!ring) {
            showJbGeometryNotification(getUiText().customPolygonInvalid || 'Could not read a polygon from that text.', {
                title: getUiText().customPolygonTitle || 'Custom Polygon',
                closeLabel: 'OK',
                timeoutMs: 7000,
            });
            return false;
        }

        const validation = validateJbShapeRing(ring, { minAngleDeg: 7 });
        if (!validation.ok) {
            await showInvalidShapeWarning(validation);
            return false;
        }

        if (!(await confirmReplaceCurrentShape('a Custom Polygon'))) return false;
        resetCurrentShapeForNewMode('custom-polygon');
        editorLoadFromRingClosed(validation.ring || ring, { preserveRadius: false, preserveSize: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();
        focusCustomPolygonIfFar(validation.ring || ring);
        showJbGeometryNotification(getUiText().customPolygonLoaded || 'Custom polygon loaded as editable shape.', {
            title: getUiText().customPolygonTitle || 'Custom Polygon',
            closeLabel: 'OK',
            timeoutMs: 5200,
        });
        refreshUiStatus();
        return true;
    }

    async function createShapeFromExistingJunctionBox(ctx) {
        const targetObj = getFirstJunctionBoxObjectFromContext(ctx);
        const ring = getJunctionBoxRingFromContext(ctx);
        if (!ring || ring.length < 4) {
            uiSetStep('Existing JB geometry not found. Select/right-click an existing Junction Box and try again.');
            refreshUiStatus();
            return false;
        }

        const sani = ringSanitizeClosed(ring, { minDist: 0.5, maxPoints: SMOOTH.defaults.maxPoints });
        if (!sani.ok || !sani.ring) {
            uiSetStep(`Existing JB geometry failed: ${sani.reason}`);
            refreshUiStatus();
            return false;
        }

        if (!(await confirmReplaceCurrentShape('geometry from existing Junction Box'))) return false;
        resetCurrentShapeForNewMode('existing-jb-copy');
        editorLoadFromRingClosed(sani.ring, { preserveRadius: false, preserveSize: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();
        UI.recreateEditTarget = targetObj || getFirstJunctionBoxObjectFromContext(ctx);
        UI.recreateEditKey = ringSignatureForCopy(sani.ring);
        showJbGeometryNotification(getUiText().recreateEditLoaded, {
            title: getUiText().recreate,
            closeLabel: 'OK',
            timeoutMs: 7500,
        });
        refreshUiStatus();
        return true;
    }

    function dispatchDeleteSelectedJunctionBox() {
        const evtBase = {
            key: 'Delete',
            code: 'Delete',
            keyCode: 46,
            which: 46,
            bubbles: true,
            cancelable: true,
            composed: true,
        };

        try { document.activeElement?.blur?.(); } catch (e) {}
        try { getMapDiv()?.focus?.(); } catch (e) {}

        const targets = [
            getMapDiv(),
            document.querySelector('#map'),
            document.querySelector('.olMap'),
            document.body,
            document,
            window,
        ].filter(Boolean);

        for (const target of targets) {
            try { target.dispatchEvent(new KeyboardEvent('keydown', evtBase)); } catch (e) {}
            try { target.dispatchEvent(new KeyboardEvent('keyup', evtBase)); } catch (e) {}
        }

        return true;
    }

    function showJbGeometryNotification(message, opts = {}) {
        try { document.querySelector('.jbg-info-toast')?.remove(); } catch (e) {}

        const toast = createEl('div', 'jbg-info-toast');
        const textWrap = createEl('div', 'jbg-warning-text');
        textWrap.appendChild(createEl('div', 'jbg-warning-title', opts.title || 'JB Geometry'));
        textWrap.appendChild(createEl('div', 'jbg-warning-message', message));

        const actions = createEl('div', 'jbg-warning-actions');
        const closeBtn = createEl('button', 'jbg-warning-btn', opts.closeLabel || 'OK');
        closeBtn.type = 'button';
        actions.appendChild(closeBtn);

        toast.appendChild(textWrap);
        toast.appendChild(actions);
        document.body.appendChild(toast);

        const close = () => {
            try { toast.classList.remove('is-visible'); } catch (e) {}
            try { window.setTimeout(() => toast.remove(), 160); } catch (e) { try { toast.remove(); } catch (_) {} }
        };

        closeBtn.addEventListener('click', close);

        try { window.setTimeout(() => toast.classList.add('is-visible'), 20); } catch (e) {}
        try { window.setTimeout(close, Number(opts.timeoutMs || 6500)); } catch (e) {}

        return true;
    }

    async function replaceSelectedJunctionBoxWithShape() {
        if (!hasRealJunctionBoxSelectedOrClicked()) {
            uiSetStep(getUiText().replaceJbNoSelection);
            refreshUiStatus();
            return false;
        }
        const ring = getJunctionBoxRingFromContext({});
        if (!ring || ring.length < 4) {
            uiSetStep(getUiText().replaceJbNoSelection);
            refreshUiStatus();
            return false;
        }

        const sani = ringSanitizeClosed(ring, { minDist: 0.5, maxPoints: SMOOTH.defaults.maxPoints });
        if (!sani.ok || !sani.ring) {
            uiSetStep(`Existing JB geometry failed: ${sani.reason}`);
            refreshUiStatus();
            return false;
        }

        if (!(await confirmReplaceCurrentShape('selected Junction Box geometry'))) return false;

        const targetObj = getFirstJunctionBoxObjectFromContext({});
        const turnSnapshot = await captureJunctionBoxTurnSnapshot();

        dispatchDeleteSelectedJunctionBox();

        try { await sleep(180); } catch (e) {}

        resetCurrentShapeForNewMode('replace-jb');
        editorLoadFromRingClosed(sani.ring, { preserveRadius: false, preserveSize: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();

        UI.recreateEditTarget = targetObj || getFirstJunctionBoxObjectFromContext({});
        UI.recreateEditKey = ringSignatureForCopy(sani.ring);
        UI.recreateTurnSnapshot = turnSnapshot;
        UI.copiedJbRing = null;
        UI.copiedJbKey = null;
        UI.lastSelectedJbKey = null;

        showJbGeometryNotification(`${getUiText().replaceJbDone} Turn permissions captured: ${turnSnapshot.length}.`, {
            title: getUiText().replaceJb,
            closeLabel: 'OK',
            timeoutMs: 7500,
        });
        refreshUiStatus();
        return true;
    }

    function getSelectedSegmentIds() {
        const out = [];
        try {
            const feats = W?.selectionManager?.getSelectedWMEFeatures?.() || [];
            for (const ft of feats) {
                const cand = ft?.model?.id ?? ft?.attributes?.id ?? ft?.id;
                if (cand != null) out.push(String(cand));
            }
        } catch (e) {}
        return Array.from(new Set(out));
    }

    function getSegmentPointsFromIds(segmentIds) {
        const ids = (segmentIds || []).map(String).filter(Boolean);
        const pts = [];
        for (const id of ids) {
            const seg = getSegmentObjectById(id);
            collectPointsFromGeometryObject(seg, pts);
        }
        return pts.filter(p => Array.isArray(p) && p.length >= 2 && Number.isFinite(p[0]) && Number.isFinite(p[1]));
    }

    function getSegmentPointGroupsFromIds(segmentIds) {
        const ids = (segmentIds || []).map(String).filter(Boolean);
        const groups = [];
        for (const id of ids) {
            const seg = getSegmentObjectById(id);
            const pts = [];
            collectPointsFromGeometryObject(seg, pts);
            const clean = pts.filter(p => Array.isArray(p) && p.length >= 2 && Number.isFinite(p[0]) && Number.isFinite(p[1]));
            if (clean.length) groups.push(clean);
        }
        return groups;
    }

    function flattenPointGroups(groups) {
        const out = [];
        for (const g of groups || []) for (const p of g || []) out.push(p);
        return out;
    }

    function clampNumber(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function findSharedNodeCenterFromGroups(groups) {
        const clusters = new Map();
        for (let gi = 0; gi < (groups || []).length; gi++) {
            const local = new Set();
            for (const p of groups[gi] || []) {
                const key = `${Math.round(p[0])}|${Math.round(p[1])}`;
                local.add(key);
            }
            for (const key of local) {
                const [x, y] = key.split('|').map(Number);
                const row = clusters.get(key) || { x, y, count: 0 };
                row.count++;
                clusters.set(key, row);
            }
        }
        const shared = Array.from(clusters.values()).filter(c => c.count >= 2);
        if (shared.length) {
            shared.sort((a, b) => b.count - a.count);
            const topCount = shared[0].count;
            const best = shared.filter(c => c.count === topCount);
            if (best.length === 1) return [best[0].x, best[0].y];
            const b = pointsBoundsMerc(flattenPointGroups(groups));
            const cx = b ? b.cx : best.reduce((s, c) => s + c.x, 0) / best.length;
            const cy = b ? b.cy : best.reduce((s, c) => s + c.y, 0) / best.length;
            best.sort((a, b2) => Math.hypot(a.x - cx, a.y - cy) - Math.hypot(b2.x - cx, b2.y - cy));
            return [best[0].x, best[0].y];
        }
        const b = pointsBoundsMerc(flattenPointGroups(groups));
        return b ? [b.cx, b.cy] : null;
    }

    function closestPointOnSegmentMerc(a, b, c) {
        const vx = b[0] - a[0];
        const vy = b[1] - a[1];
        const wx = c[0] - a[0];
        const wy = c[1] - a[1];
        const len2 = vx * vx + vy * vy;
        const t = len2 > 0 ? clampNumber((wx * vx + wy * vy) / len2, 0, 1) : 0;
        return { point: [a[0] + vx * t, a[1] + vy * t], t };
    }

    function interpolatePolylineAtMerc(points, s) {
        if (!Array.isArray(points) || !points.length) return null;
        if (points.length === 1) return [points[0][0], points[0][1]];
        let left = clampNumber(s, 0, Infinity);
        for (let i = 0; i < points.length - 1; i++) {
            const a = points[i], b = points[i + 1];
            const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
            if (len <= 0) continue;
            if (left <= len) {
                const t = left / len;
                return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
            }
            left -= len;
        }
        const last = points[points.length - 1];
        return [last[0], last[1]];
    }

    function samplePolylineAroundCenter(points, center, reach) {
        if (!Array.isArray(points) || points.length < 2 || !center) return [];
        const lengths = [0];
        for (let i = 0; i < points.length - 1; i++) {
            const a = points[i], b = points[i + 1];
            lengths.push(lengths[lengths.length - 1] + Math.hypot(b[0] - a[0], b[1] - a[1]));
        }
        const total = lengths[lengths.length - 1];
        if (!Number.isFinite(total) || total <= 0) return points.slice(0, 1);
        let bestS = 0;
        let bestD = Infinity;
        for (let i = 0; i < points.length - 1; i++) {
            const a = points[i], b = points[i + 1];
            const cp = closestPointOnSegmentMerc(a, b, center);
            const d = Math.hypot(cp.point[0] - center[0], cp.point[1] - center[1]);
            if (d < bestD) {
                bestD = d;
                bestS = lengths[i] + Math.hypot(b[0] - a[0], b[1] - a[1]) * cp.t;
            }
        }
        const out = [];
        const step = Math.max(8, Math.min(18, reach / 4));
        for (let s = Math.max(0, bestS - reach); s <= Math.min(total, bestS + reach); s += step) {
            const p = interpolatePolylineAtMerc(points, s);
            if (p) out.push(p);
        }
        const p0 = interpolatePolylineAtMerc(points, Math.max(0, bestS - reach));
        const p1 = interpolatePolylineAtMerc(points, bestS);
        const p2 = interpolatePolylineAtMerc(points, Math.min(total, bestS + reach));
        if (p0) out.push(p0);
        if (p1) out.push(p1);
        if (p2) out.push(p2);
        for (const p of points) if (Math.hypot(p[0] - center[0], p[1] - center[1]) <= reach) out.push(p);
        return out;
    }

    function normalizeAngleRad(a) {
        while (a <= -Math.PI) a += Math.PI * 2;
        while (a > Math.PI) a -= Math.PI * 2;
        return a;
    }

    function positiveAngleDiffRad(a, b) {
        let d = normalizeAngleRad(b - a);
        if (d < 0) d += Math.PI * 2;
        return d;
    }

    function smallAngleDiffRad(a, b) {
        return Math.abs(normalizeAngleRad(a - b));
    }

    function polarMerc(center, angle, radius) {
        return [center[0] + Math.cos(angle) * radius, center[1] + Math.sin(angle) * radius];
    }

    function getPolylineMeasureInfo(points, center) {
        if (!Array.isArray(points) || points.length < 2 || !center) return null;
        const lengths = [0];
        for (let i = 0; i < points.length - 1; i++) {
            const a = points[i], b = points[i + 1];
            lengths.push(lengths[lengths.length - 1] + Math.hypot(b[0] - a[0], b[1] - a[1]));
        }
        const total = lengths[lengths.length - 1];
        if (!Number.isFinite(total) || total <= 0) return null;
        let bestS = 0;
        let bestD = Infinity;
        let bestPoint = null;
        for (let i = 0; i < points.length - 1; i++) {
            const a = points[i], b = points[i + 1];
            const cp = closestPointOnSegmentMerc(a, b, center);
            const segLen = Math.hypot(b[0] - a[0], b[1] - a[1]);
            const s = lengths[i] + segLen * cp.t;
            const d = Math.hypot(cp.point[0] - center[0], cp.point[1] - center[1]);
            if (d < bestD) {
                bestD = d;
                bestS = s;
                bestPoint = cp.point;
            }
        }
        return { total, bestS, bestD, bestPoint };
    }

    function getBranchRaysFromSegmentGroups(groups, center, reach) {
        const raw = [];
        const minLen = Math.max(12, reach * 0.28);
        for (const g of groups || []) {
            const info = getPolylineMeasureInfo(g, center);
            if (!info) continue;
            for (const dir of [-1, 1]) {
                const targetS = clampNumber(info.bestS + dir * reach, 0, info.total);
                const endpoint = interpolatePolylineAtMerc(g, targetS);
                if (!endpoint) continue;
                const dx = endpoint[0] - center[0];
                const dy = endpoint[1] - center[1];
                const len = Math.hypot(dx, dy);
                if (!Number.isFinite(len) || len < minLen) continue;
                raw.push({ angle: Math.atan2(dy, dx), len, endpoint });
            }
        }
        raw.sort((a, b) => b.len - a.len);
        const merged = [];
        for (const r of raw) {
            const hit = merged.find(m => smallAngleDiffRad(m.angle, r.angle) < 0.42);
            if (hit) {
                if (r.len > hit.len) {
                    hit.angle = r.angle;
                    hit.len = r.len;
                    hit.endpoint = r.endpoint;
                }
            } else {
                merged.push({ angle: r.angle, len: r.len, endpoint: r.endpoint });
            }
        }
        merged.sort((a, b) => a.angle - b.angle);
        return merged;
    }

    function snapFourWayBranchesIfClean(branches) {
        if (!Array.isArray(branches) || branches.length !== 4) return branches || [];
        const sorted = branches.slice().sort((a, b) => a.angle - b.angle);
        const gaps = sorted.map((b, i) => positiveAngleDiffRad(b.angle, sorted[(i + 1) % sorted.length].angle));
        const ok = gaps.every(g => Math.abs(g - Math.PI / 2) <= 0.45);
        if (!ok) return sorted;
        let sx = 0, sy = 0;
        for (let i = 0; i < sorted.length; i++) {
            const base = normalizeAngleRad(sorted[i].angle - i * Math.PI / 2);
            sx += Math.cos(base);
            sy += Math.sin(base);
        }
        const baseAngle = Math.atan2(sy, sx);
        const lens = sorted.map(b => b.len).sort((a, b) => a - b);
        const balancedLen = clampNumber((lens[1] + lens[2]) / 2, Math.min(...lens) * 0.8, Math.max(...lens) * 1.15);
        return sorted.map((b, i) => ({ angle: normalizeAngleRad(baseAngle + i * Math.PI / 2), len: balancedLen, endpoint: null })).sort((a, b) => a.angle - b.angle);
    }

    function buildSegmentCapsRingFromBranches(branches, center, reach) {
        let clean = (branches || []).filter(b => Number.isFinite(b.angle) && Number.isFinite(b.len) && b.len > 0);
        if (!center || clean.length < 2) return null;
        clean = clean.sort((a, b) => a.angle - b.angle);
        const armLen = clampNumber(reach * 0.44, 10, 20);
        const halfWidth = clampNumber(reach * 0.20, 4.8, 7.2);
        const back = clampNumber(reach * 0.12, 2.5, 5.5);
        const core = clampNumber(halfWidth * 1.05, 5.2, 8.2);
        const maxR = armLen + halfWidth * 1.9;
        const inside = (x, y) => {
            const dx = x - center[0];
            const dy = y - center[1];
            if (Math.hypot(dx, dy) <= core) return true;
            for (const b of clean) {
                const ux = Math.cos(b.angle);
                const uy = Math.sin(b.angle);
                const along = dx * ux + dy * uy;
                if (along < -back || along > armLen) continue;
                const side = dx * -uy + dy * ux;
                if (Math.abs(side) <= halfWidth) return true;
            }
            return false;
        };
        const angles = [];
        const pushAngle = a => angles.push(normalizeAngleRad(a));
        const edgeDelta = Math.atan2(halfWidth, Math.max(armLen, 1));
        for (const b of clean) {
            pushAngle(b.angle - edgeDelta * 1.08);
            pushAngle(b.angle - edgeDelta * 0.55);
            pushAngle(b.angle);
            pushAngle(b.angle + edgeDelta * 0.55);
            pushAngle(b.angle + edgeDelta * 1.08);
            pushAngle(b.angle + Math.PI / 2);
            pushAngle(b.angle - Math.PI / 2);
        }
        for (let i = 0; i < 24; i++) pushAngle(-Math.PI + i * Math.PI * 2 / 24);
        const unique = [];
        const seen = new Set();
        for (const a of angles.sort((a, b) => a - b)) {
            const k = Math.round((a + Math.PI) * 1000);
            if (seen.has(k)) continue;
            seen.add(k);
            unique.push(a);
        }
        const pts = [];
        for (const a of unique) {
            let lo = 0;
            let hi = maxR;
            if (!inside(center[0] + Math.cos(a) * lo, center[1] + Math.sin(a) * lo)) continue;
            for (let i = 0; i < 18; i++) {
                const mid = (lo + hi) / 2;
                const x = center[0] + Math.cos(a) * mid;
                const y = center[1] + Math.sin(a) * mid;
                if (inside(x, y)) lo = mid;
                else hi = mid;
            }
            if (lo >= core * 0.65) pts.push([center[0] + Math.cos(a) * lo, center[1] + Math.sin(a) * lo]);
        }
        const sani = uniqueMercPoints(pts, 1);
        if (sani.length < 3) return null;
        return ringClose(sani);
    }

    function perpendicularDistanceToLine(p, a, b) {
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const den = Math.hypot(dx, dy);
        if (!den) return Math.hypot(p[0] - a[0], p[1] - a[1]);
        return Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / den;
    }

    function simplifyOpenRingDouglas(points, tolerance) {
        if (!Array.isArray(points) || points.length <= 3) return points || [];
        let maxDist = 0;
        let index = -1;
        const first = points[0];
        const last = points[points.length - 1];
        for (let i = 1; i < points.length - 1; i++) {
            const d = perpendicularDistanceToLine(points[i], first, last);
            if (d > maxDist) {
                maxDist = d;
                index = i;
            }
        }
        if (maxDist <= tolerance || index < 0) return [first, last];
        const left = simplifyOpenRingDouglas(points.slice(0, index + 1), tolerance);
        const right = simplifyOpenRingDouglas(points.slice(index), tolerance);
        return left.slice(0, -1).concat(right);
    }

    function removeAlmostCollinearOpenRing(points, minAngleDeg, minEdgeLen) {
        let out = (points || []).slice();
        if (out.length <= 3) return out;
        const minTurn = minAngleDeg * Math.PI / 180;
        let changed = true;
        let guard = 0;
        while (changed && guard++ < 4) {
            changed = false;
            const next = [];
            for (let i = 0; i < out.length; i++) {
                const prev = out[(i - 1 + out.length) % out.length];
                const p = out[i];
                const n = out[(i + 1) % out.length];
                const a1 = Math.atan2(p[1] - prev[1], p[0] - prev[0]);
                const a2 = Math.atan2(n[1] - p[1], n[0] - p[0]);
                const turn = Math.abs(normalizeAngleRad(a2 - a1));
                const shortA = Math.hypot(p[0] - prev[0], p[1] - prev[1]) < minEdgeLen;
                const shortB = Math.hypot(n[0] - p[0], n[1] - p[1]) < minEdgeLen;
                if (out.length > 4 && (turn < minTurn || Math.abs(Math.PI - turn) < minTurn || (shortA && shortB))) {
                    changed = true;
                    continue;
                }
                next.push(p);
            }
            out = next;
        }
        return out;
    }

    function simplifySmartRingClosed(ringClosed, tolerance = 2.6, maxPoints = 30) {
        if (!Array.isArray(ringClosed) || ringClosed.length < 4) return ringClosed;
        let open = ringIsClosed(ringClosed) ? ringClosed.slice(0, -1) : ringClosed.slice();
        if (open.length <= 12) return ringClose(open);
        const startIndex = open.reduce((best, p, i, arr) => {
            const b = arr[best];
            return (p[0] < b[0] || (p[0] === b[0] && p[1] < b[1])) ? i : best;
        }, 0);
        open = open.slice(startIndex).concat(open.slice(0, startIndex));
        const line = open.concat([open[0]]);
        let simplified = simplifyOpenRingDouglas(line, tolerance).slice(0, -1);
        simplified = removeAlmostCollinearOpenRing(simplified, 8, 2.2);
        while (simplified.length > maxPoints && tolerance < 8) {
            tolerance += 0.8;
            simplified = simplifyOpenRingDouglas(line, tolerance).slice(0, -1);
            simplified = removeAlmostCollinearOpenRing(simplified, 9, 2.5);
        }
        if (simplified.length < 3) return ringClosed;
        return ringClose(simplified);
    }

    function buildJunctionArmRingFromBranches(branches, center, reach) {
        return buildSegmentCapsRingFromBranches(branches, center, reach);
    }

    function polylineLengthsMerc(points) {
        const lengths = [0];
        for (let i = 0; i < (points || []).length - 1; i++) {
            const a = points[i], b = points[i + 1];
            lengths.push(lengths[lengths.length - 1] + Math.hypot(b[0] - a[0], b[1] - a[1]));
        }
        return lengths;
    }

    function splitPolylineFromCenterMerc(points, center, maxReach) {
        const info = getPolylineMeasureInfo(points, center);
        if (!info) return [];
        const lengths = polylineLengthsMerc(points);
        const total = lengths[lengths.length - 1];
        const branches = [];
        for (const dir of [-1, 1]) {
            const startS = info.bestS;
            const endS = clampNumber(info.bestS + dir * maxReach, 0, total);
            if (Math.abs(endS - startS) < 8) continue;
            const pts = [];
            const a = Math.min(startS, endS);
            const b = Math.max(startS, endS);
            const step = Math.max(10, Math.min(22, Math.abs(b - a) / 4));
            for (let s = a; s <= b; s += step) {
                const p = interpolatePolylineAtMerc(points, s);
                if (p) pts.push(p);
            }
            const pEnd = interpolatePolylineAtMerc(points, b);
            if (pEnd) pts.push(pEnd);
            if (dir < 0) pts.reverse();
            branches.push(uniqueMercPoints(pts, 2));
        }
        return branches.filter(g => g.length >= 2);
    }

    function makeOffsetPointsFromPolyline(points, halfWidth) {
        const left = [];
        const right = [];
        for (let i = 0; i < points.length; i++) {
            const prev = points[Math.max(0, i - 1)];
            const next = points[Math.min(points.length - 1, i + 1)];
            const dx = next[0] - prev[0];
            const dy = next[1] - prev[1];
            const len = Math.hypot(dx, dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;
            left.push([points[i][0] + nx * halfWidth, points[i][1] + ny * halfWidth]);
            right.push([points[i][0] - nx * halfWidth, points[i][1] - ny * halfWidth]);
        }
        return { left, right };
    }

    function buildSegmentGeometryFootprintRingFromGroups(groups) {
        const all = flattenPointGroups(groups);
        const bounds = pointsBoundsMerc(all);
        if (!bounds) return null;
        const center = findSharedNodeCenterFromGroups(groups) || [bounds.cx, bounds.cy];
        const span = Math.max(bounds.width, bounds.height);
        const maxReach = clampNumber(span * 0.10, 26, 46);
        const halfWidth = clampNumber(span * 0.018, 5.5, 9);
        const boundaryPts = [];
        for (const g of groups || []) {
            for (const branch of splitPolylineFromCenterMerc(g, center, maxReach)) {
                const trimmed = uniqueMercPoints(branch.filter(p => Math.hypot(p[0] - center[0], p[1] - center[1]) <= maxReach + 2), 2);
                if (trimmed.length < 2) continue;
                const off = makeOffsetPointsFromPolyline(trimmed, halfWidth);
                boundaryPts.push(...off.left, ...off.right);
            }
        }
        if (boundaryPts.length < 3) return null;
        let hull = convexHullOpen(boundaryPts);
        if (!Array.isArray(hull) || hull.length < 3) return null;
        hull = expandOpenRingRadially(hull, Math.max(1.5, Math.min(4, halfWidth * 0.25)), center);
        let ring = ringClose(hull);
        ring = simplifySmartRingClosed(ring, 3.2, 16);
        return ring;
    }

    function getJunctionCorePointsFromSegmentGroups(groups) {
        const all = flattenPointGroups(groups);
        const bounds = pointsBoundsMerc(all);
        if (!bounds) return { points: [], center: null, reach: 0 };
        const center = findSharedNodeCenterFromGroups(groups) || [bounds.cx, bounds.cy];
        const reach = clampNumber(Math.max(bounds.width, bounds.height) * 0.12, 24, 58);
        const points = [];
        for (const g of groups || []) points.push(...samplePolylineAroundCenter(g, center, reach));
        for (const p of all) if (Math.hypot(p[0] - center[0], p[1] - center[1]) <= reach * 0.9) points.push(p);
        return { points: uniqueMercPoints(points), center, reach };
    }

    function pointsBoundsMerc(points) {
        if (!Array.isArray(points) || !points.length) return null;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const p of points) {
            if (!p || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) continue;
            minX = Math.min(minX, p[0]); minY = Math.min(minY, p[1]);
            maxX = Math.max(maxX, p[0]); maxY = Math.max(maxY, p[1]);
        }
        if (!Number.isFinite(minX) || !Number.isFinite(minY) || !Number.isFinite(maxX) || !Number.isFinite(maxY)) return null;
        return { minX, minY, maxX, maxY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, width: maxX - minX, height: maxY - minY };
    }

    function uniqueMercPoints(points, precision = 2) {
        const seen = new Set();
        const out = [];
        for (const p of points || []) {
            if (!p || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) continue;
            const key = `${p[0].toFixed(precision)}|${p[1].toFixed(precision)}`;
            if (seen.has(key)) continue;
            seen.add(key);
            out.push([p[0], p[1]]);
        }
        return out;
    }

    function cross2(o, a, b) {
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    }

    function convexHullOpen(points) {
        const pts = uniqueMercPoints(points).sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));
        if (pts.length <= 1) return pts.slice();

        const lower = [];
        for (const p of pts) {
            while (lower.length >= 2 && cross2(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
            lower.push(p);
        }
        const upper = [];
        for (let i = pts.length - 1; i >= 0; i--) {
            const p = pts[i];
            while (upper.length >= 2 && cross2(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
            upper.push(p);
        }
        lower.pop();
        upper.pop();
        return lower.concat(upper);
    }

    function polygonCentroidOpen(openRing) {
        if (!Array.isArray(openRing) || openRing.length < 1) return null;
        let area2 = 0;
        let cx = 0;
        let cy = 0;
        for (let i = 0; i < openRing.length; i++) {
            const a = openRing[i];
            const b = openRing[(i + 1) % openRing.length];
            const f = a[0] * b[1] - b[0] * a[1];
            area2 += f;
            cx += (a[0] + b[0]) * f;
            cy += (a[1] + b[1]) * f;
        }
        if (Math.abs(area2) < 1e-6) {
            const b = pointsBoundsMerc(openRing);
            return b ? [b.cx, b.cy] : null;
        }
        return [cx / (3 * area2), cy / (3 * area2)];
    }

    function expandOpenRingRadially(openRing, pad, center = null) {
        if (!Array.isArray(openRing) || !openRing.length) return openRing;
        const c = center || polygonCentroidOpen(openRing) || [0, 0];
        return openRing.map((p) => {
            const dx = p[0] - c[0];
            const dy = p[1] - c[1];
            const d = Math.hypot(dx, dy);
            if (d < 1e-6) return [p[0] + pad, p[1]];
            const scale = (d + pad) / d;
            return [c[0] + dx * scale, c[1] + dy * scale];
        });
    }

    function getSegmentBoundsFromIds(segmentIds) {
        const pts = getSegmentPointsFromIds(segmentIds);
        if (!pts.length) return null;

        const raw = pointsBoundsMerc(pts);
        if (!raw) return null;
        const width = Math.max(25, raw.width);
        const height = Math.max(25, raw.height);
        const pad = Math.max(18, Math.min(120, Math.max(width, height) * 0.28));

        return {
            minX: raw.minX - pad,
            minY: raw.minY - pad,
            maxX: raw.maxX + pad,
            maxY: raw.maxY + pad,
            cx: raw.cx,
            cy: raw.cy,
            width: width + pad * 2,
            height: height + pad * 2,
            rawWidth: width,
            rawHeight: height,
            pad,
        };
    }

    async function createRectangleAroundSegments(segmentIds) {
        const b = getSegmentBoundsFromIds(segmentIds);
        if (!b) {
            uiSetStep('Segment overlay failed: selected segment geometry not loaded. Zoom/pan until segments are loaded, then try again.');
            refreshUiStatus();
            return false;
        }
        if (!(await confirmReplaceCurrentShape('a Rectangle around selected segments'))) return false;
        resetCurrentShapeForNewMode('rectangle-segments');
        const ring = [
            [b.maxX, b.maxY],
            [b.maxX, b.minY],
            [b.minX, b.minY],
            [b.minX, b.maxY],
            [b.maxX, b.maxY],
        ];
        editorLoadFromRingClosed(ring, { preserveRadius: false, preserveSize: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();
        uiSetStep(`Rectangle added around ${segmentIds?.length || 0} segment(s) ✔`);
        refreshUiStatus();
        return true;
    }

    async function createCircleAroundSegments(segmentIds) {
        const b = getSegmentBoundsFromIds(segmentIds);
        if (!b) {
            uiSetStep('Segment overlay failed: selected segment geometry not loaded. Zoom/pan until segments are loaded, then try again.');
            refreshUiStatus();
            return false;
        }
        if (!(await confirmReplaceCurrentShape('a Circle around selected segments'))) return false;
        resetCurrentShapeForNewMode('circle-segments');
        const r = Math.max(20, Math.max(b.width, b.height) / 2);
        const ring = buildCircleFromCenterRadius([b.cx, b.cy], [b.cx + r, b.cy], 72);
        if (!ring) return false;
        editorLoadFromRingClosed(ring, { preserveRadius: false, preserveSize: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();
        uiSetStep(`Circle added around ${segmentIds?.length || 0} segment(s) ✔`);
        refreshUiStatus();
        return true;
    }

    async function createSmartShapeAroundSegments(segmentIds) {
        const groups = getSegmentPointGroupsFromIds(segmentIds);
        const allPts = flattenPointGroups(groups);
        if (!allPts.length) {
            uiSetStep('Segment overlay failed: selected segment geometry not loaded. Zoom/pan until segments are loaded, then try again.');
            refreshUiStatus();
            return false;
        }
        if (!(await confirmReplaceCurrentShape('a Segment geometry core shape around selected segments'))) return false;
        resetCurrentShapeForNewMode('segment-geometry');

        let ring = buildSegmentGeometryFootprintRingFromGroups(groups);
        if (!ring) {
            const bounds = pointsBoundsMerc(allPts);
            if (!bounds) {
                uiSetStep('Segment geometry shape failed: could not read selected segment geometry.');
                refreshUiStatus();
                return false;
            }
            const pad = Math.max(10, Math.min(28, Math.max(bounds.width, bounds.height) * 0.12));
            const hull = convexHullOpen(allPts);
            ring = ringClose(expandOpenRingRadially(hull, pad, [bounds.cx, bounds.cy]));
        }

        const sani = ringSanitizeClosed(ring, { minDist: 0.5, maxPoints: SMOOTH.defaults.maxPoints });
        if (!sani.ok || !sani.ring) {
            uiSetStep(`Segment geometry shape failed: ${sani.reason}`);
            refreshUiStatus();
            return false;
        }

        const simpleRing = simplifySmartRingClosed(sani.ring, 3.2, 24);
        editorLoadFromRingClosed(simpleRing, { preserveRadius: false, preserveSize: false, renderOverlay: false });
        editorSetRadius(0);
        editorRenderOverlayFromRaw();
        uiSetStep(`Segment geometry shape added from ${segmentIds?.length || 0} segment(s) ✔`);
        refreshUiStatus();
        return true;
    }

    function exposePublicApi() {
        const publicApi = {
            version: VERSION,
            openPanel() {
                return tryOpenSidebarTab();
            },
            createCircleAt(lonLat) {
                tryOpenSidebarTab();
                const p = lonLatLikeToMerc(lonLat);
                return createDefaultCircleAtMerc(p, { confirmExisting: true, label: 'right-click point' });
            },
            createRectangleAt(lonLat) {
                tryOpenSidebarTab();
                const p = lonLatLikeToMerc(lonLat);
                return createDefaultRectangleAtMerc(p, { confirmExisting: true, label: 'right-click point' });
            },
            async startManualAt(lonLat) {
                tryOpenSidebarTab();
                const p = lonLatLikeToMerc(lonLat);
                if (!p) {
                    uiSetStep('Manual draw failed: clicked map location not available.');
                    refreshUiStatus();
                    return false;
                }
                if (!(await confirmReplaceCurrentShape('a Manual shape'))) return false;
                resetCurrentShapeForNewMode('manual-right-click');
                ensureOverlayLayer();
                manualStart();
                manualAddPoint(p);
                uiSetStep('Manual draw started at right-click point. Continue clicking points, Enter/double-click to finish.');
                refreshUiStatus();
                return true;
            },
            createFromExistingJunctionBox(ctx) {
                tryOpenSidebarTab();
                return createShapeFromExistingJunctionBox(ctx);
            },
            clear() {
                tryOpenSidebarTab();
                editorClear();
                return true;
            },
            hasEditableShape() {
                return !!(EDITOR.rawPoints && EDITOR.rawPoints.length >= 3);
            },
        };

        for (const root of getRightClickRoots()) {
            try { root.JBGeometryApi = publicApi; } catch (e) {}
        }
        installRightClickMeta();
        return publicApi;
    }

    function unregisterRightClickIntegration() {
        for (const root of getRightClickRoots()) {
            const rc = getRightClickApiFromRoot(root);
            if (!rc?.unregisterMenuProvider) continue;
            try { rc.unregisterMenuProvider('map', RIGHT_CLICK.mapProviderId); } catch (e) {}
            try { rc.unregisterMenuProvider('place', RIGHT_CLICK.providerId + '-place'); } catch (e) {}
            try { rc.unregisterMenuProvider('segment', RIGHT_CLICK.segmentProviderId); } catch (e) {}
            for (const id of RIGHT_CLICK.legacyProviderIds) {
                try { rc.unregisterMenuProvider('map', id); } catch (e) {}
                try { rc.unregisterMenuProvider('segment', id); } catch (e) {}
            }
        }
        RIGHT_CLICK.registered = false;
    }

    function registerRightClickIntegration() {
        exposePublicApi();
        installRightClickMeta();

        const UW = getRightClickRoot();
        const rc = getRightClickApiFromRoot(UW);
        if (!rc?.registerMenuProvider) return false;

        unregisterRightClickIntegration();

        const MAP_PROVIDER_ID = RIGHT_CLICK.mapProviderId;
        rc.registerMenuProvider('map', MAP_PROVIDER_ID, (ctx) => {
            const jb = UW.JBGeometryApi || window.JBGeometryApi || exposePublicApi();
            return [{
                label: 'JB Geometry',
                sub: 'Create/edit overlay here',
                submenu: true,
                getSubmenuItems: () => [
                    {
                        label: 'Circle here',
                        sub: 'Editable round overlay at right-click point',
                        onClick: () => runSafely(() => { rc.closeMenu?.(); jb.createCircleAt(ctx?.lonLat || ctx?.clickedLonLat || ctx?.location); }),
                    },
                    {
                        label: 'Rectangle here',
                        sub: 'Editable rectangle overlay at right-click point',
                        onClick: () => runSafely(() => { rc.closeMenu?.(); jb.createRectangleAt(ctx?.lonLat || ctx?.clickedLonLat || ctx?.location); }),
                    },
                    {
                        label: 'Draw from here',
                        sub: 'Start manual polygon at right-click point',
                        onClick: () => runSafely(() => { rc.closeMenu?.(); jb.startManualAt(ctx?.lonLat || ctx?.clickedLonLat || ctx?.location); }),
                    },
                    { type: 'sep' },
                    {
                        label: 'Open Geometry Editor',
                        onClick: () => runSafely(() => { rc.closeMenu?.(); jb.openPanel(); }),
                    },
                ],
            }];
        });

        RIGHT_CLICK.registered = true;
        try { rc.listMenuProviders?.(); } catch (e) {}
        log('RightClick integration registered', MAP_PROVIDER_ID, SEGMENT_PROVIDER_ID);
        return true;
    }

    function startRightClickIntegrationRetry() {
        exposePublicApi();
        installRightClickMeta();

        if (registerRightClickIntegration()) return true;
        if (RIGHT_CLICK.retryStarted) return false;
        RIGHT_CLICK.retryStarted = true;

        let tries = 0;
        const tryRegister = () => {
            tries++;
            installRightClickMeta();
            if (registerRightClickIntegration()) {
                if (RIGHT_CLICK.retryTimer) {
                    window.clearInterval(RIGHT_CLICK.retryTimer);
                    state.timers.delete(RIGHT_CLICK.retryTimer);
                    RIGHT_CLICK.retryTimer = null;
                }
                return true;
            }
            return false;
        };

        const t = window.setInterval(() => {
            if (tryRegister() || tries >= 300) {
                window.clearInterval(t);
                state.timers.delete(t);
                RIGHT_CLICK.retryTimer = null;
            }
        }, 1000);
        state.timers.add(t);
        RIGHT_CLICK.retryTimer = t;

        const onPossibleReady = () => { tryRegister(); };
        document.addEventListener('wme-ready', onPossibleReady, false);
        window.addEventListener('WmeRightClickFunctionsApiReady', onPossibleReady, false);
        window.addEventListener('wme-rightclick-functions-ready', onPossibleReady, false);
        window.addEventListener('WME_RIGHT_CLICK_FUNCTIONS_READY', onPossibleReady, false);
        addDisposer(() => {
            try { document.removeEventListener('wme-ready', onPossibleReady, false); } catch (e) {}
            try { window.removeEventListener('WmeRightClickFunctionsApiReady', onPossibleReady, false); } catch (e) {}
            try { window.removeEventListener('wme-rightclick-functions-ready', onPossibleReady, false); } catch (e) {}
            try { window.removeEventListener('WME_RIGHT_CLICK_FUNCTIONS_READY', onPossibleReady, false); } catch (e) {}
        });

        return false;
    }


    function wmeGatesPass() {
        return (
            typeof window.W === 'object' &&
            !!W.map &&
            !!W.selectionManager &&
            typeof W.selectionManager.getSelectedWMEFeatures === 'function' &&
            typeof window.getWmeSdk === 'function'
        );
    }

    function initSdkOnce() {
        if (state.sdk) return state.sdk;

        let res;
        try {
            res = getWmeSdk({ scriptId: SCRIPT_ID, scriptName: SCRIPT_NAME, version: VERSION });
        } catch (e) {
            log('SDK init failed:', e);
            throw e;
        }

        if (res && typeof res.then === 'function') {
            return res.then((sdk) => {
                state.sdk = sdk;
                return sdk;
            });
        }

        state.sdk = res;
        return res;
    }

    function cleanup() {
        clearTimers();
        for (const dispose of state.disposers.splice(0)) {
            try { dispose(); } catch (e) { }
        }

        try { unregisterRightClickIntegration(); } catch (e) {}
        for (const root of getRightClickRoots()) {
            try { delete root.JBGeometryApi; } catch (e) { try { root.JBGeometryApi = null; } catch (_) {} }
        }
        try { dbgRemoveLayer(); } catch (e) {}
        window[GLOBAL_KEY] = null;
        log('Cleaned up');
    }

    window[GLOBAL_KEY] = { state, cleanup };



    function installRightClickHardBridge() {
        const UW = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
        const PROVIDER_ID = 'jb-geometry';
        const SCRIPT_NAME_HUMAN = 'JB Geometry';
        const installedKey = '__JB_GEOMETRY_RIGHTCLICK_HARD_BRIDGE__';

        UW.WmeRightClickExtensionMeta = UW.WmeRightClickExtensionMeta || {};
        UW.WmeRightClickExtensionMeta[PROVIDER_ID] = { name: SCRIPT_NAME_HUMAN };
        UW.WmeRightClickExtensionMeta[PROVIDER_ID + '-map'] = { name: SCRIPT_NAME_HUMAN };

        function getApi() {
            return UW.WmeRightClickFunctionsApi || UW.WmeRightClickFunctions || null;
        }

        function getJb() {
            return UW.JBGeometryApi || window.JBGeometryApi || exposePublicApi();
        }

        function install(api) {
            if (!api?.registerMenuProvider) return false;

            if (UW[installedKey]?.installed && UW[installedKey]?.api === api) return true;

            try { api.unregisterMenuProvider?.('segment', PROVIDER_ID); } catch (e) {}
            try { api.unregisterMenuProvider?.('map', PROVIDER_ID + '-map'); } catch (e) {}
            try { api.unregisterMenuProvider?.('place', PROVIDER_ID + '-place'); } catch (e) {}
            try { api.unregisterMenuProvider?.('segment', 'jb-geometry-segment'); } catch (e) {}
            try { api.unregisterMenuProvider?.('map', 'jb-geometry-segment'); } catch (e) {}


            api.registerMenuProvider('map', PROVIDER_ID + '-map', (ctx) => {
                const ll = ctx?.lonLat || ctx?.clickedLonLat || ctx?.location;
                if (!ll) return [];
                return [{
                    label: 'JB Geometry',
                    sub: 'At clicked point',
                    submenu: true,
                    getSubmenuItems: () => [
                        {
                            label: 'Circle here',
                            sub: 'Editable overlay',
                            onClick: () => runSafely(() => {
                                api.closeMenu?.();
                                getJb().createCircleAt(ll);
                            }),
                        },
                        {
                            label: 'Rectangle here',
                            sub: 'Editable overlay',
                            onClick: () => runSafely(() => {
                                api.closeMenu?.();
                                getJb().createRectangleAt(ll);
                            }),
                        },
                        {
                            label: 'Draw from here',
                            sub: 'Start manual shape',
                            onClick: () => runSafely(() => {
                                api.closeMenu?.();
                                getJb().startManualAt(ll);
                            }),
                        },
                        { type: 'sep' },
                        {
                            label: 'Open Geometry Editor',
                            onClick: () => runSafely(() => {
                                api.closeMenu?.();
                                getJb().openPanel();
                            }),
                        },
                    ],
                }];
            });

            UW[installedKey] = { installed: true, api, at: Date.now() };
            log('RightClick hard bridge installed', PROVIDER_ID, PROVIDER_ID + '-map');
            return true;
        }

        function boot() {
            const api = getApi();
            if (!api?.registerMenuProvider) return false;
            return install(api);
        }

        if (boot()) return true;

        let tries = 0;
        const timer = window.setInterval(() => {
            tries++;
            UW.WmeRightClickExtensionMeta = UW.WmeRightClickExtensionMeta || {};
            UW.WmeRightClickExtensionMeta[PROVIDER_ID] = { name: SCRIPT_NAME_HUMAN };
            UW.WmeRightClickExtensionMeta[PROVIDER_ID + '-map'] = { name: SCRIPT_NAME_HUMAN };
            if (boot() || tries >= 300) {
                window.clearInterval(timer);
                state.timers.delete(timer);
            }
        }, 1000);
        state.timers.add(timer);

        const readyHandler = () => { boot(); };
        document.addEventListener('wme-ready', readyHandler, false);
        window.addEventListener('WmeRightClickFunctionsApiReady', readyHandler, false);
        window.addEventListener('wme-rightclick-functions-ready', readyHandler, false);
        window.addEventListener('WME_RIGHT_CLICK_FUNCTIONS_READY', readyHandler, false);
        addDisposer(() => {
            try { document.removeEventListener('wme-ready', readyHandler, false); } catch (e) {}
            try { window.removeEventListener('WmeRightClickFunctionsApiReady', readyHandler, false); } catch (e) {}
            try { window.removeEventListener('wme-rightclick-functions-ready', readyHandler, false); } catch (e) {}
            try { window.removeEventListener('WME_RIGHT_CLICK_FUNCTIONS_READY', readyHandler, false); } catch (e) {}
            try { getApi()?.unregisterMenuProvider?.('segment', PROVIDER_ID); } catch (e) {}
            try { getApi()?.unregisterMenuProvider?.('map', PROVIDER_ID + '-map'); } catch (e) {}
            try { getApi()?.unregisterMenuProvider?.('place', PROVIDER_ID + '-place'); } catch (e) {}
        });
        return false;
    }

    function onReady() {
        state.isReady = true;
        log('WME gates passed. Map:', W.map?.constructor?.name, 'Projection:', W.map?.getProjectionObject?.()?.projCode);

        try {
            const maybePromise = initSdkOnce();
            if (maybePromise && typeof maybePromise.then === 'function') {
                maybePromise.then(() => log('SDK ready (async).')).catch((e) => log('SDK init error:', e));
            } else {
                log('SDK ready (sync).');
            }
        } catch (e) {
            log('SDK not available due to init error. (Hard refresh if version mismatch)');
        }

        const api = window[GLOBAL_KEY] || (window[GLOBAL_KEY] = {});
        api.state = state;
        api.cleanup = cleanup;
        api.smoothPrepValidate = smoothPrepValidate;
        api.startCircleCenterRadius = startCircleCenterRadius;
        api.startRectangle2Lines = startRectangle2Lines;

        api.overlayEnableDraw = overlayEnableDraw;
        api.overlayClear = overlayClear;
        api.overlayGetRing = overlayGetRingMercClosed;
        api.smoothApplyFillet = smoothApplyFillet;
        api.refreshJbToolCache = refreshJbToolCache;
        api.getCachedJbTool = getCachedJbTool;
        api.ensureJbToolActive = ensureJbToolActive;
        api.createJbFromOverlay = createJbFromOverlay;

        api.dbgRenderRole = dbgRenderRole;
        api.dbgClearRole = dbgClearRole;
        api.dbgRenderBBoxFor = dbgRenderBBoxFor;

        api.cancelInput = cancelInput;

        api.manualStart = manualStart;
        api.manualFinish = manualFinish;
        api.manualCancel = manualCancel;
        api.manualAddPoint = manualAddPoint;
        api.manualUpdatePreview = manualUpdatePreview;
        api.manualClearPreview = manualClearPreview;
        api.manualResetState = manualResetState;
        api.snapPointToGrid = snapPointToGrid;
        api._manual = MANUAL;

        api.manualUpdatePreview = manualUpdatePreview;
        api.manualClearPreview = manualClearPreview;
        api.manualResetState = manualResetState;
        api.snapPointToGrid = snapPointToGrid;
        api._manual = MANUAL;

        api.editorSetRadius = editorSetRadius;
        api.editorSetLiveSmooth = editorSetLiveSmooth;
        api.editorRenderOverlayFromRaw = editorRenderOverlayFromRaw;
        api.editorLoadFromRingClosed = editorLoadFromRingClosed;
        api._editor = EDITOR;
        api.createDefaultCircleAtMerc = createDefaultCircleAtMerc;
        api.createDefaultRectangleAtMerc = createDefaultRectangleAtMerc;
        api.createShapeFromExistingJunctionBox = createShapeFromExistingJunctionBox;
        api.registerRightClickIntegration = registerRightClickIntegration;
        api.unregisterRightClickIntegration = unregisterRightClickIntegration;

        api.transformStart = transformStart;
        api.transformApply = transformApply;
        api.transformStop = transformStop;

        exposePublicApi();
        startScriptsTabRetry();
        startRightClickIntegrationRetry();
        installRightClickHardBridge();

        log('Try in console:', `${GLOBAL_KEY}.transformStart('move') / .transformStart('rotate')`);
    }

    setIntervalSafe(() => {
        if (state.isReady) return;
        if (!wmeGatesPass()) return;

        clearTimers();
        onReady();
    }, 300);

    log('Awaiting WazeMapEditor...');
})();
