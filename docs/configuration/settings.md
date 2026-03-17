---
sidebar_position: 6
title: Settings
---

# Application Settings

Feature toggles and general behavior settings for Graytool.

## Structure

```typescript
interface AppSettings {
  enabled: boolean;                       // Master toggle
  showMessageDetailButton: boolean;       // Message detail button
  jsonViewerEnabled: boolean;             // JSON viewer feature
  keyboardShortcutsEnabled: boolean;      // Keyboard shortcuts
  searchHistoryEnabled: boolean;          // Search history capture
}
```

## Setting Details

### Extension Enabled (Master Toggle)

Turns the entire Graytool on/off. When disabled, no features work.

| Value | Behavior |
|-------|----------|
| `true` | All features active (default) |
| `false` | Extension completely disabled |

### Show Message Detail Button

Controls the visibility of the 🔍 message detail button on log rows.

| Value | Behavior |
|-------|----------|
| `true` | Detail button visible on each row (default) |
| `false` | Detail button hidden |

Clicking this button opens the JSON viewer.

### JSON Viewer Enabled

Enables/disables the JSON viewer modal.

| Value | Behavior |
|-------|----------|
| `true` | JSON viewer can be opened (default) |
| `false` | JSON viewer disabled |

### Keyboard Shortcuts Enabled

Enables/disables keyboard shortcuts.

| Value | Behavior |
|-------|----------|
| `true` | Shortcuts work (default) |
| `false` | Shortcuts disabled |

Affected shortcuts:
- `Ctrl+H` / `Cmd+H` — Search history panel
- `Esc` — Close JSON viewer
- `/` — Focus search in JSON viewer
- `↑` / `↓` — Navigate search results

### Search History Enabled

Controls automatic capture of Graylog search queries.

| Value | Behavior |
|-------|----------|
| `true` | Searches are recorded (default) |
| `false` | No search recording |

## Default Values

```typescript
{
  enabled: true,
  showMessageDetailButton: true,
  jsonViewerEnabled: true,
  keyboardShortcutsEnabled: true,
  searchHistoryEnabled: true,
}
```

## Settings Page

You can control all these toggles from the **"Settings"** tab of the settings page.

Each setting change:
1. Is automatically saved
2. Synced via `chrome.storage.sync`
3. Sends a `CONFIG_UPDATED` message to all open tabs
4. Content scripts reload with the new configuration
