---
sidebar_position: 1
title: URL Patterns
---

# URL Patterns

URL patterns determine which pages Graytool activates on. The extension only runs on matching URLs.

## Pattern Structure

Each URL pattern is stored as an object:

```typescript
interface UrlPattern {
  id: string;       // Auto-generated unique ID
  pattern: string;  // Glob pattern: "https://graylog.company.com/*"
  label: string;    // Display name: "Production Graylog"
  enabled: boolean; // Active/inactive toggle
}
```

## Wildcard Usage

The `*` character matches any text:

| Pattern | Matching URLs |
|---------|---------------|
| `https://graylog.company.com/*` | `https://graylog.company.com/search` ✅ |
| | `https://graylog.company.com/dashboards/abc` ✅ |
| `https://graylog-*.company.com/*` | `https://graylog-prod.company.com/search` ✅ |
| | `https://graylog-staging.company.com/search` ✅ |
| `https://*/search*` | `https://any-domain.com/search?q=test` ✅ |

## Multiple Patterns

You can add multiple patterns for different Graylog instances:

```
Pattern 1: "Production"    → https://graylog.company.com/*
Pattern 2: "Staging"       → https://graylog-staging.company.com/*
Pattern 3: "Local Dev"     → http://localhost:9000/*
```

Each pattern can be toggled on/off independently.

## Permission Management

Graytool uses Chrome's **optional host permissions** mechanism. This means the extension requests access only to specified URLs rather than all sites.

### Permission Flow

1. **Pattern is added** → `chrome.permissions.request()` is called
2. **Chrome shows dialog** → User approves or denies
3. **If approved** → Extension can work on that URL
4. **If denied** → Pattern is saved but won't function

:::warning
Chrome can only show permission dialogs during user interaction. Therefore, patterns must be added from the settings page.
:::

## Pattern-Button Relationship

Buttons can be assigned to specific patterns. For example:

- **"View User"** button → Only on Production Graylog
- **"Debug Info"** button → Only on Staging Graylog
- **"View Logs"** button → On all patterns

This is configured in the **URL Pattern Visibility** section of button settings.

## Editing Patterns

From the settings page:
- **Toggle** to temporarily disable a pattern
- **Edit** to change the label or pattern
- **Delete** to completely remove a pattern

:::tip
Disabling a pattern prevents all Graytool features from working on that URL — including buttons, JSON viewer, and search history.
:::
