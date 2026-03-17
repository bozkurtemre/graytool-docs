---
sidebar_position: 3
title: Constants
---

# Constants

`src/shared/constants.ts` — All magic strings and shared values.

:::danger Important Rule
Magic strings must never be used directly. All constants must be imported from this module.
:::

## Storage Keys

### STORAGE_KEY

Main configuration storage key.

```typescript
export const STORAGE_KEY = "graytool_config";
```

**Usage:** Saving/reading configuration on `chrome.storage.sync`

### SEARCH_HISTORY_PREFIX

Search history storage key prefix.

```typescript
export const SEARCH_HISTORY_PREFIX = "graytool_search_history_";
```

**Usage:** On `chrome.storage.local` in the format `${SEARCH_HISTORY_PREFIX}${patternId}`

### TAB_COLLAPSED_KEY

JSON viewer tab collapse state key.

```typescript
export const TAB_COLLAPSED_KEY = "graytool_tabs_collapsed";
```

**Usage:** Boolean value on `localStorage`

## Limits

### MAX_HISTORY_ITEMS

Maximum number of search queries stored per URL pattern.

```typescript
export const MAX_HISTORY_ITEMS = 50;
```

## DOM Attributes

### PROCESSED_ATTR

Attribute indicating whether a row has been processed.

```typescript
export const PROCESSED_ATTR = "data-graytool-processed";
```

**Usage:** Added to log rows with `setAttribute(PROCESSED_ATTR, "true")`.

### BTN_ID_ATTR

Attribute to prevent button duplication.

```typescript
export const BTN_ID_ATTR = "data-graytool-btn-id";
```

**Usage:** Set on each injected button with `setAttribute(BTN_ID_ATTR, buttonId)`.

## Timing Values

### OBSERVER_DEBOUNCE_MS

Wait time for MutationObserver mutation events.

```typescript
export const OBSERVER_DEBOUNCE_MS = 50; // 50ms
```

**Purpose:** Batch processing of excessive mutation events

### PROCESS_INTERVAL_MS

Periodic row scanning interval.

```typescript
export const PROCESS_INTERVAL_MS = 2000; // 2 seconds
```

**Purpose:** Catch new rows that the observer might miss, handle SPA pagination transitions

### THEME_CHECK_INTERVAL_MS

Theme change check interval.

```typescript
export const THEME_CHECK_INTERVAL_MS = 500; // 500ms
```

**Purpose:** Detect Graylog theme changes (light ↔ dark)

## Usage Examples

```typescript
import {
  STORAGE_KEY,
  PROCESSED_ATTR,
  BTN_ID_ATTR,
  OBSERVER_DEBOUNCE_MS,
  PROCESS_INTERVAL_MS,
  THEME_CHECK_INTERVAL_MS,
  MAX_HISTORY_ITEMS,
  SEARCH_HISTORY_PREFIX,
} from "../shared/constants";

// Check if a row has been processed
if (row.hasAttribute(PROCESSED_ATTR)) return;

// Start periodic scanning
setInterval(() => processExistingRows(config), PROCESS_INTERVAL_MS);

// Theme watcher
setInterval(() => checkTheme(), THEME_CHECK_INTERVAL_MS);
```
