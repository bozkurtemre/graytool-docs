---
sidebar_position: 2
title: Storage API
---

# Storage API

`src/shared/storage.ts` — All Chrome storage access must go through this module.

:::danger Important Rule
Direct access to the `chrome.storage` API is **forbidden**. All storage operations must go through this module.
:::

## Configuration Functions

### getConfig()

Loads the current configuration.

```typescript
async function getConfig(): Promise<GrayToolConfig>
```

**Behavior:**
- Reads configuration from `chrome.storage.sync`
- Returns default values if no configuration is found
- Automatically migrates v1 format to v2 if detected

**Usage:**

```typescript
import { getConfig } from "../shared/storage";

const config = await getConfig();
console.log(config.version); // 2
console.log(config.buttons); // ButtonConfig[]
```

### saveConfig()

Saves configuration with a partial update.

```typescript
async function saveConfig(partial: Partial<GrayToolConfig>): Promise<void>
```

**Behavior:**
- Reads the current configuration
- Merges the given partial update with the existing configuration
- Writes to `chrome.storage.sync`
- Checks `chrome.runtime.lastError`

**Usage:**

```typescript
import { saveConfig } from "../shared/storage";

// Update only settings
await saveConfig({
  settings: {
    ...config.settings,
    enabled: false,
  },
});

// Add a button
await saveConfig({
  buttons: [...config.buttons, newButton],
});
```

### getDefaultConfig()

Returns the default v2 configuration template.

```typescript
function getDefaultConfig(): GrayToolConfig
```

**Return Value:**

```typescript
{
  version: 2,
  urlPatterns: [],
  buttons: [],
  globalFieldConfig: {
    defaultMessageField: null,
    rowFieldPrefixes: ["msg.", "context.", ""],
    parseJsonStrings: true,
    jsonParseMaxDepth: 5,
  },
  settings: {
    enabled: true,
    showMessageDetailButton: true,
    jsonViewerEnabled: true,
    keyboardShortcutsEnabled: true,
    searchHistoryEnabled: true,
  },
}
```

## Search History Functions

### getSearchHistory()

Retrieves search history for a specific URL pattern.

```typescript
async function getSearchHistory(patternId: string): Promise<SearchHistoryEntry[]>
```

**Parameters:**
- `patternId` — Unique identifier of the URL pattern

**Behavior:**
- Reads from `chrome.storage.local`
- Returns an empty array if empty or undefined
- Maximum 50 entries are stored

### saveSearchQuery()

Saves a search query to the history.

```typescript
async function saveSearchQuery(patternId: string, query: string): Promise<void>
```

**Parameters:**
- `patternId` — Unique identifier of the URL pattern
- `query` — The search query to save

**Behavior:**
- Updates the timestamp if the same query already exists
- Deletes the oldest entry if the 50-entry limit is exceeded
- Writes to `chrome.storage.local`

### clearSearchHistory()

Clears all search history for a specific URL pattern.

```typescript
async function clearSearchHistory(patternId: string): Promise<void>
```

## V1 → V2 Migration

When `getConfig()` detects v1 format, automatic migration is performed:

### Converted Properties

| V1 | V2 |
|----|----|
| `paramMapping` | `fieldBindings` |
| `baseUrl` + `route` | `url` (template) |
| — | `urlPatternIds: []` (all) |
| Button `name` | Button `label` |
| Route `conditions` | Button `conditions` |

### Migration Flow

```
v1 config detected
    ↓
For each button:
  ├─ paramMapping → fieldBindings conversion
  ├─ URL template creation
  ├─ Conditions preserved
  └─ urlPatternIds empty (all patterns)
    ↓
v2 config created
    ↓
Save to chrome.storage.sync
    ↓
Return v2 config
```

## Storage Keys

| Key | Storage | Description |
|-----|---------|-------------|
| `graytool_config` | `sync` | Main configuration |
| `graytool_search_history_{patternId}` | `local` | Search history |
| `graytool_tabs_collapsed` | `localStorage` | Tab collapse state |
