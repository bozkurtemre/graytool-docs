---
sidebar_position: 5
title: Keyboard Shortcuts
---

# Keyboard Shortcuts

Graytool provides keyboard shortcuts for efficient usage.

## Global Shortcuts

| Shortcut | Platform | Function |
|----------|----------|----------|
| `Ctrl + H` | Windows/Linux | Toggle search history panel |
| `Cmd + H` | macOS | Toggle search history panel |

## JSON Viewer Shortcuts

Available when the JSON viewer is open:

| Shortcut | Function |
|----------|----------|
| `Esc` | Close JSON viewer |
| `/` | Focus search box |
| `↑` (Up arrow) | Go to previous search result |
| `↓` (Down arrow) | Go to next search result |

## Shortcut Safety

Shortcuts are checked to prevent accidental triggering while typing:

### Non-triggering Situations

- Typing in an **input field** (`<input>`, `<textarea>`)
- Typing in a **contentEditable** element
- **Except** Ace Editor — `Ctrl+H` triggers in Ace Editor

### Why?

This check is necessary to avoid conflicts with Graylog's own shortcuts and to preserve user experience.

## Disabling Shortcuts

**Settings** → **Keyboard Shortcuts Enabled** → `false`

This disables all shortcuts.

:::tip
If you only want to disable the search history shortcut, turning off **Search History Enabled** is sufficient.
:::
