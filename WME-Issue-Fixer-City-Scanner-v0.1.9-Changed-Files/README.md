# WME Issue Fixer Dashboard v0.1.9

Changed files only.

## Replace / add

- Replace `dashboard.html`
- Replace `dashboard.css`
- Add `dashboard-ui.js`
- Keep the existing `dashboard.js` unchanged

`dashboard-ui.js` is loaded after the existing dashboard logic. It enhances the interface without replacing the scanner, storage, fix or WME messaging code.

## Main changes

- Sticky command bar and compact scan controls
- Workflow tabs: Open, Fixable, Needs review, Pending save and Saved
- Grouped issue index
- Issue details drawer
- One custom Open menu instead of separate Go/WME/Beta buttons
- Row selection and guarded bulk fixing, limited to 25 fixes per batch
- Compact / comfortable density toggle
- System / dark / light dashboard theme toggle
- Recent scan history stored locally
- Improved responsive layout
- Larger dropdown options and custom scrollbars

## Safety

Bulk fixing only triggers fix buttons that the existing dashboard already exposes. It does not invent new fixes, press WME Save or bypass the extension's current safety checks.
