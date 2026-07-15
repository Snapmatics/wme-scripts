# WME - RightClick Functions (Chrome Extension)

Manifest V3 Chrome extension version of **WME - RightClick Functions**.
It replaces the Tampermonkey installation while preserving the existing WME interface, Map Pins, Friends, reminders, Google Drive backup, production/beta sharing, and supported-script integrations.

## Install locally

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Select this `WME-RightClick-Extension` folder.
5. Disable the old **WME - RightClick Functions** userscript in Tampermonkey.
6. Reload every open WME production and beta tab.

Do not select the repository root. Select this folder, because `manifest.json` is located here.

## GitHub Desktop workflow

1. Clone `Snapmatics/wme-scripts` in GitHub Desktop.
2. Keep extension work inside this folder.
3. Before editing, use **Fetch origin** and then **Pull origin**.
4. Create a branch for larger or risky changes, for example `extension/friends-fix`.
5. Test the unpacked extension from this exact cloned folder.
6. Commit the changed files in GitHub Desktop and push the branch.
7. Merge into `main` after testing.

Chrome reads the files directly from the cloned folder. After pulling or changing code, press **Reload** on the extension card in `chrome://extensions`, then reload WME.

## Runtime files

- `manifest.json` — permissions, WME match patterns, and script loading order.
- `background.js` — privileged extension storage and cross-origin request bridge.
- `bridge.js` — communication between the page-world script and the extension service worker.
- `userscript.js` — the full WME RightClick application running in the page's main world.
- `content.js` — isolated Firebase realtime listener for Friends notifications.
- `firestore-rules-snippet.txt` — reference rules for the Friends realtime signal collection; not loaded by Chrome.

## Important

- Do not enable the Tampermonkey version and extension version at the same time.
- Do not rename runtime files without updating `manifest.json`.
- Never commit private OAuth client secrets, Firebase service-account keys, refresh tokens, or exported user data.
- The Firebase web configuration and public OAuth client ID in client-side code are identifiers, not server secrets; backend rules still enforce access.
