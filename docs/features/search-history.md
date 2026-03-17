---
sidebar_position: 4
title: Search History
---

# Search History

Graytool automatically captures search queries executed in Graylog and allows quick reuse.

## How It Works

### Query Capture

Graytool listens to Graylog's Ace Editor component:

1. **Enter key** — When Enter is pressed in the search bar
2. **Search button** — When Graylog's search button is clicked

The query is extracted from three sources:
- `.ace_line` elements (visible text lines)
- `textarea.ace_text-input` (Ace Editor input field)
- `.ace_scroller` text content

### Storage

- Each URL pattern has its **own** history
- Maximum **50 queries** are stored (FIFO)
- Duplicate queries are updated (not duplicated)
- `chrome.storage.local` is used (not sync)

## Opening the History Panel

### Keyboard Shortcut

| Platform | Shortcut |
|----------|----------|
| Windows/Linux | `Ctrl + H` |
| macOS | `Cmd + H` |

:::info
The shortcut is not triggered while typing in a text field (except Ace Editor). This prevents accidentally opening the panel while using Graylog's search bar.
:::

### Panel Features

```
┌──────────────────────────────────────┐
│  Search History           [🔍] [🗑️] │
├──────────────────────────────────────┤
│  [Filter queries...]                  │
├──────────────────────────────────────┤
│  source:"api-gateway" AND level:ERROR │
│  2 minutes ago                  [📋] │
├──────────────────────────────────────┤
│  userId:"12345"                       │
│  15 minutes ago                 [📋] │
├──────────────────────────────────────┤
│  exception AND source:"payment-*"     │
│  1 hour ago                     [📋] │
└──────────────────────────────────────┘
```

### Panel Functions

| Function | Description |
|----------|-------------|
| **Click** | Applies the query to Graylog's search bar and executes it |
| **📋 Copy** | Copies query text to clipboard |
| **Filter** | Searches through history queries |
| **🗑️ Clear** | Deletes all history (with confirmation dialog) |

## Query Application

When a query is clicked from the history panel:

1. Graylog's Ace Editor textarea is found
2. Query text is written to the textarea
3. `input` and `change` events are dispatched
4. Graylog's search button is found and auto-clicked
5. Panel closes

## Per-URL-Pattern History

Each URL pattern has its **own** search history:

```
Production Graylog  → 50 query history
Staging Graylog     → 50 query history
Development Graylog → 50 query history
```

This keeps searches from different environments separate.

## Limits

| Limit | Value |
|-------|-------|
| Maximum queries | 50 per pattern |
| Storage | `chrome.storage.local` |
| Included in export | No |

## Settings

- **Settings** → **Search History Enabled**: `true` / `false`
- When disabled, query capture stops
- Existing history is not deleted, only new recording stops
- `Ctrl+H` shortcut is also disabled

## Clearing

Click the 🗑️ button in the history panel to clear all history. A confirmation dialog is shown.

:::warning
This action cannot be undone. Only the active URL pattern's history is cleared.
:::
