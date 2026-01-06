# WME Merge Alternate Addresses

Batch apply and manage **alternate street names** across multiple selected segments in **Waze Map Editor (WME)**.

This userscript adds a modern floating panel that:
- builds a **combined list** of alternates found in your current selection,
- shows **Present vs Missing counts** per alternate,
- lets you **Add to missing** or **Remove alternate** in one click,
- and provides a quick **Undo** for the last operation.

> Unofficial tool. Not affiliated with Waze.

---

## Features

### Alternate merge workflow (selection-based)
- **Alternate union view**: shows all alternate names found in the selected segments.
- **Coverage chips per alternate**: `Present in X/Y` and `Missing in Z`.
- **Add to missing**: applies an alternate only to segments that don’t have it.
- **Remove alternate**: removes an alternate from segments where it exists.
- Buttons automatically **disable** when an action isn’t applicable.

### Review + cleanup
- Expand **Present** / **Missing** lists to see exactly which segments are affected.
- **Zoom-to-segment** button for fast verification.
- **Remove from this segment only** directly from the “Present” list (surgical cleanup).

### Safety + UX
- **Undo last operation** (via WME undo when available).
- Modern **floating / glassy UI** with smooth open/close behavior.
- **Minimize to a circular launcher** and drag it around.
- **Auto-expand** when you select multiple segments that already contain alternates (so you don’t miss it).
- Performance-friendly list rendering (shows a limited number of rows by default with a “show more/less” toggle).
- Remembers panel state/position (local storage).


<img width="1301" height="703" alt="Screenshot 2026-01-06 184140" src="https://github.com/user-attachments/assets/dab3b6a6-7b34-4f2c-ae9f-6c3d406bf9e8" />
<img width="1343" height="740" alt="Screenshot 2026-01-06 184246" src="https://github.com/user-attachments/assets/46844348-5d80-4e38-985f-fc31d40f6622" />
