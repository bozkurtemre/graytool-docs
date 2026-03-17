---
sidebar_position: 6
title: Theming
---

# Theme Support

Graytool automatically adapts to Graylog's light and dark themes.

## Theme Detection

Graytool reads Graylog's theme setting from `localStorage.themeMode`:

```typescript
function detectGraylogTheme(): "light" | "dark" {
  // Read theme mode from localStorage
  // Handle JSON-encoded values
  // Default: "dark"
}
```

### Detection Timing

- Theme is detected on page load
- Theme changes are checked every **500ms**
- If theme changes, styles are automatically updated

## Color Palette

### Dark Theme

| Variable | Value | Usage |
|----------|-------|-------|
| `--gt-primary` | `rgb(98, 157, 226)` | Primary color (Graylog Blue) |
| `--gt-danger` | `#AD0707` | Danger/error |
| `--gt-warning` | `#C69B00` | Warning |
| `--gt-success` | `#00AE42` | Success |
| `--gt-text-primary` | `#ECECEC` | Primary text |
| `--gt-text-secondary` | `#A0A0A0` | Secondary text |
| `--gt-bg` | `#1a1a2e` | Background |

**JSON Syntax Colors (Dark):**

| Element | Color |
|---------|-------|
| Keys | `#56B6C2` (cyan) |
| Strings | `#98C379` (green) |
| Numbers | `#D19A66` (orange) |
| Booleans | `#D19A66` |
| Null | `#A0A0A0` (gray) |

### Light Theme

| Variable | Value | Usage |
|----------|-------|-------|
| `--gt-primary` | `rgb(87, 141, 204)` | Primary color |
| `--gt-text-primary` | `#1F1F1F` | Primary text |

**JSON Syntax Colors (Light):**

| Element | Color |
|---------|-------|
| Keys | `#0066CC` (blue) |
| Strings | `#22863A` (dark green) |
| Numbers | `#B08800` (gold) |

## CSS Classes

All Graytool elements use the `gt-` prefix:

```css
.gt-btn          /* Base button */
.gt-btn-primary  /* Blue button */
.gt-btn-default  /* Gray button */
.gt-btn-danger   /* Red button */
.gt-btn-warning  /* Yellow button */
.gt-btn-success  /* Green button */

.gt-json-panel   /* JSON viewer panel */
.gt-notification /* Notification */
```

### Why `gt-` Prefix?

All Graytool styles use the `gt-` prefix to avoid conflicts with Graylog's own CSS classes. This ensures the extension doesn't break the page appearance.

## Style Injection

All styles are injected as a single `<style>` element:

1. `inject/index.ts` calls `injectStyles()` during activation
2. `ui/styles.ts` detects the current theme
3. CSS custom properties are set according to theme values
4. Added to `<head>` as `<style id="graytool-styles">`
5. Removed during deactivation

## Theme Switching

When the user changes the theme in Graylog:

1. Graytool checks every 500ms
2. Theme change is detected
3. Current styles are removed
4. New theme-appropriate styles are injected
5. Buttons and JSON viewer automatically update

:::info
Theme transitions are not instant — there may be up to a 500ms delay.
:::
