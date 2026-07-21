# WME Issue Fixer v0.1.11 — stable dashboard update

These files are made specifically to be copied over the working ZIP supplied by Harry: `WME-Issue-Fixer-City-Scanner-v0.1.0 (2).zip`.

## Replace / add

- Replace `dashboard.html`
- Replace `dashboard.css`
- Add or replace `dashboard-ui.js`
- Add or replace `dashboard-dropdown-fix.css`
- Add or replace `dashboard-dropdown-fix.js`

Keep the baseline ZIP's existing `dashboard.js`, `page-bridge.js`, `service-worker.js`, manifest, icons and all other files.

## Fixes in v0.1.11

- Keeps the redesigned workflow dashboard without replacing the working scanner/fixer engine.
- Removes the broken duplicate/native dropdown rendering.
- Uses larger custom dropdown options and themed scrollbars.
- Detects a missing WME receiving end before a scan/fix is sent.
- Reloads the WME tab and retries the original action once after reconnection.
- Reloads the dashboard automatically when Chrome invalidates the extension context after an extension update.
- Prevents Chrome's raw `Could not establish connection. Receiving end does not exist.` message from being shown as the primary dashboard error.

After copying the files, reload the unpacked extension, reload the WME tab, and reopen the dashboard.