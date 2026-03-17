---
sidebar_position: 2
title: Data Flow
---

# Data Flow

This section explains Graytool's main data flows.

## Activation Flow

```
User visits URL
        ↓
background.ts → tabs.onUpdated listener fires
        ↓
hasPermissionForUrl() → Permission check
        ↓ (if permitted)
checkUrlMatch() → URL compared against pattern list
        ↓ (if match found)
injectContentScript() → Content script injected
        ↓
chrome.tabs.sendMessage({ type: "ACTIVATE", matchedPatternId })
        ↓
inject/index.ts → Receives ACTIVATE message
        ↓
activate(matchedPatternId)
  ├─ getConfig() → Configuration loaded
  ├─ injectStyles() → Styles injected
  ├─ setupJsonViewerListener() → JSON viewer prepared
  ├─ setupSearchHistory() → Search history prepared
  ├─ processExistingRows() → Existing rows processed
  ├─ startObserver() → MutationObserver started
  └─ startPeriodicProcessing() → 2s interval scan starts
```

## Button Injection Flow

```
Row detected (observer / periodic / initial)
        ↓
processRow(row, config, matchedPatternId)
        ↓
PROCESSED_ATTR check → Already processed?
        ↓ (no)
discoverRowFields(row) → Fields discovered
  ├─ Strategy 1: Data attributes
  ├─ Strategy 2: JSON parse
  └─ Strategy 3: DOM patterns
        ↓
deduplicateFields() → Duplicates removed
        ↓
Row marked: data-graytool-processed="true"
        ↓
fieldMap created: { name → value }
        ↓
injectButtons(row, config, fieldMap, fields, matchedPatternId)
  ├─ For each button:
  │   ├─ Is button enabled?
  │   ├─ isButtonAllowedForPattern() → URL pattern check
  │   ├─ evaluateConditions() → Are conditions met?
  │   ├─ resolveUrl() → URL template resolved
  │   └─ Button added to DOM
  └─ Message detail button added
```

## JSON Viewer Flow

```
User clicks 🔍 message detail button
        ↓
CustomEvent dispatch: "graytool:open-detail"
  payload: { fields, config, row }
        ↓
json-viewer.ts listener fires
        ↓
Is defaultMessageField set?
  ├─ YES → Parse that field's JSON directly
  └─ NO → showFieldSelector() called
           ├─ Single field → Auto-selected
           └─ Multiple → Modal shown
               ├─ User selects
               └─ "Save as default" → saveConfig()
        ↓
JSON viewer panel opens
  ├─ JSON tree view built
  ├─ Search, filter, copy prepared
  └─ Tabs (Raw, DevTools, Code) loaded
```

## Configuration Update Flow

```
User makes changes on settings page
        ↓
saveConfig(partial) → chrome.storage.sync.set()
        ↓
chrome.storage.onChanged listener fires (background.ts)
        ↓
CONFIG_UPDATED message sent to all tabs
        ↓
Each content script:
  ├─ Current observer stopped
  ├─ Processed markers cleared
  ├─ New configuration loaded
  └─ activate() runs again
```

## Search History Flow

```
User searches in Graylog (Enter / Search button)
        ↓
search-history.ts → Ace Editor listener fires
        ↓
extractAceEditorValue() → Query text extracted
        ↓
saveSearchQuery(patternId, query)
  ├─ Same query exists → updated
  ├─ 50 limit checked
  └─ Saved to chrome.storage.local
        ↓
User presses Ctrl+H
        ↓
openHistoryPanel() → History loaded and displayed
        ↓
User clicks a query
        ↓
applySearchQuery(query)
  ├─ Written to Ace Editor textarea
  ├─ Input/change events dispatched
  ├─ Search button clicked
  └─ Panel closes
```

## Deactivation Flow

```
background.ts → URL no longer matches / extension disabled
        ↓
DEACTIVATE message sent
        ↓
inject/index.ts → deactivate()
  ├─ MutationObserver stopped
  ├─ Periodic scanning stopped
  ├─ Injected styles removed
  └─ Processed markers cleared
```
