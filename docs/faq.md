---
sidebar_position: 100
title: FAQ
---

# Frequently Asked Questions

## General

### Which Graylog versions does Graytool support?

Graytool supports various Graylog versions:
- **Graylog 5.x+** — Full support with modern data-testid attributes
- **Graylog 3.x - 4.x** — Support with legacy data-field attributes
- **Custom themes** — With log-row, message-group, MessageTableEntry classes

### Does Graytool collect my data?

No. Graytool does not send any data to external servers. All data is stored locally in Chrome storage and remains only on your device.

### Can I use multiple Graylog instances?

Yes! The URL Patterns feature is designed exactly for this. Add a separate pattern for each instance and assign buttons to the patterns you want.

## Installation

### Is the extension available on the Chrome Web Store?

Currently, loading in developer mode is required. See the [Installation](/getting-started/installation) page for details.

### Does it work on Firefox?

Currently only Chrome (and Chromium-based browsers: Edge, Brave, Opera) are supported.

## Configuration

### Why aren't my buttons showing?

Several possible reasons:

1. **Extension is disabled** — Check Settings → Extension Enabled
2. **URL pattern doesn't match** — Make sure the correct pattern is defined
3. **Permission not granted** — Did you approve the Chrome permission dialog when adding the pattern?
4. **Conditions not met** — Check the button conditions
5. **Field not found** — Ensure the placeholders in the URL template match the log fields
6. **Button is disabled** — Check the button's enabled state
7. **URL pattern assignment** — Is the button assigned to specific patterns only?

### JSON Viewer won't open

1. Check that the **jsonViewerEnabled** setting is `true`
2. Check that the **showMessageDetailButton** setting is `true`
3. Verify that at least 1 field can be discovered in the log row

### Search history isn't saving

1. Check the **searchHistoryEnabled** setting
2. Verify that Graylog uses Ace Editor (QueryEditor ID)
3. Make sure you're searching with Enter key or the search button

### Import isn't working

- Make sure the JSON format is valid
- Must have `version: 2` (or v1 format will be auto-migrated)
- Ensure the file size doesn't exceed the `chrome.storage.sync` limit (~100KB)

## Technical

### Does it affect Chrome page performance?

Graytool is designed for minimal performance impact:
- MutationObserver runs with 50ms debounce
- Rows are processed only once
- JSON parsing is done only when needed
- Styles are injected with a single `<style>` element

### Buttons disappear when the page refreshes

Normal behavior — buttons are dynamically injected. When the page refreshes, Graytool automatically reactivates and re-injects the buttons.

### Why does the content script run every 2 seconds?

Periodic scanning is necessary due to Graylog's SPA (Single Page Application) architecture:
- New rows arrive during pagination changes
- MutationObserver may miss some late-loading rows
- Graylog's DOM may not be ready on initial load

### What is localStorage access used for?

Only for these data:
- Graylog theme mode (`themeMode`)
- JSON viewer tab collapse state (`graytool_tabs_collapsed`)
