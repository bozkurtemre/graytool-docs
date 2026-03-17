---
sidebar_position: 2
title: JSON Viewer
---

# JSON Viewer

Graytool's JSON Viewer lets you inspect, search, and copy log messages in a structured view.

## Opening

To open the JSON Viewer:

1. Click the 🔍 **message detail button** on a log row
2. On first open, a **field selector** is shown (if no defaultMessageField is set)
3. After selecting a field, the JSON Viewer panel opens

## Panel Structure

```
┌─────────────────────────────────────────────┐
│  Title                              [✕] [□] │  ← Header
├─────────────────────────────────────────────┤
│  [Field Selector ▼] [🔍 Search...] [📋 Copy]│  ← Toolbar
├─────────────────────────────────────────────┤
│  {                                          │
│    "userId": "12345",              [⊞] [📋] │  ← JSON Tree
│    "request": {                    [⊞] [📋] │
│      "method": "POST",            [⊞] [📋] │
│      "path": "/api/login"         [⊞] [📋] │
│    },                                       │
│    "level": "ERROR"                [⊞] [📋] │
│  }                                          │
├─────────────────────────────────────────────┤
│  [Raw] [DevTools] [Code]                    │  ← Tabs
│  ─────────────────────────────────          │
│  Tab content                                │
└─────────────────────────────────────────────┘
```

## Features

### Syntax Highlighting

JSON data is displayed with color coding:

| Element | Dark Theme | Light Theme |
|---------|-----------|-------------|
| Keys | `#56B6C2` (cyan) | `#0066CC` (blue) |
| Strings | `#98C379` (green) | `#22863A` (dark green) |
| Numbers | `#D19A66` (orange) | `#B08800` (gold) |
| Booleans | `#D19A66` | `#B08800` |
| Null | `#A0A0A0` (gray) | `#6A737D` (gray) |

### Search and Filter

- Type text in the toolbar search box
- Matching keys and values are highlighted
- Use `↑` / `↓` arrow keys to navigate between results
- Current result is highlighted with the primary color

### Row Actions

Two buttons appear on hover for each JSON row:

| Button | Function |
|--------|----------|
| **⊞ Filter** | Applies field:value to the Graylog search bar |
| **📋 Copy** | Copies the value to clipboard |

**Filter button:**
- Finds Graylog's search editor
- Adds a `field:value` format query
- Clicks the search button to update results

### Copy

- **📋 Copy All** (toolbar) — Copies entire JSON to clipboard
- **📋 Copy** (row) — Copies a single value
- A `✓ Copied` notification appears after copying

### Fullscreen / Minimize

- **□ Maximize** — Panel expands to full width
- **✕ Close** — Closes the panel

## Tabs

### Raw Tab

Displays raw JSON text in monospace font. Ideal for direct copying.

### DevTools Tab

Transformation tools for JSON text:

- **Escape** — Escapes a JSON string
- **Unescape** — Restores escaped text to original form

Useful for quickly fixing embedded JSON strings in log messages.

### Code Tab

Generates code snippets from JSON data in various languages:

| Language/Tool | Description |
|---------------|-------------|
| `curl` | cURL command |
| `fetch` | JavaScript Fetch API |
| `axios` | Axios HTTP client |
| `http` | Raw HTTP request |
| `php` | PHP code |
| `python` | Python requests |
| `go` | Go net/http |
| `java` | Java HttpClient |

### Tab Behaviors

- **Double-click** — Collapse/expand tab area
- **Drag** — Adjust tab height
- **Collapse threshold** — Auto-collapses below 30px
- **State persists** — Collapse state saved in `localStorage`

## Field Selector

When `defaultMessageField` is not set, a field selector modal is shown before opening the JSON viewer:

- Available fields are listed with radio buttons
- Each field shows a value preview (truncated to 80 characters)
- **"Save as default"** option can be checked
- Auto-selects if only one field is available

## Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| `Esc` | Close JSON viewer |
| `/` | Focus search box |
| `↑` | Previous search result |
| `↓` | Next search result |

## Notifications

Notifications appear in the bottom-right corner after actions like copy and filter:

- **Green** — Successful operation (copy, filter)
- **Red** — Error
- **Blue** — Info
- **Yellow** — Warning

Notifications auto-dismiss after **3.2 seconds**.
