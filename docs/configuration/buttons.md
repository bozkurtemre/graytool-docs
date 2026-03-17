---
sidebar_position: 2
title: Buttons
---

# Button Configuration

Buttons are the core feature of Graytool. Each button uses fields from the log row to build dynamic URLs and navigates the user to the relevant page.

## Button Structure

```typescript
interface ButtonConfig {
  id: string;                    // Unique ID (auto-generated)
  label: string;                 // Text displayed on the button
  url: string;                   // URL template: "https://admin.com/users/{userId}"
  fieldBindings: FieldBinding[]; // Field bindings
  conditions: ButtonCondition[]; // Visibility conditions
  openInNewTab: boolean;         // Open in new tab
  enabled: boolean;              // Active/inactive
  color: ButtonColor;            // Color
  icon?: string;                 // Optional SVG icon
  urlPatternIds?: string[];      // Which patterns to show on
}
```

## Button Colors

| Color | Use Case | Appearance |
|-------|----------|------------|
| `primary` | Main action (blue) | Graylog primary color |
| `default` | General purpose (gray) | Neutral |
| `success` | Success action (green) | Confirmation |
| `warning` | Attention needed (yellow) | Warning |
| `danger` | Dangerous action (red) | Delete/risk |

## URL Template Syntax

URL templates define placeholders with curly braces (`{...}`):

```
https://admin.company.com/users/{userId}
https://dashboard.company.com/orders/{orderId}?tab=details
https://kibana.company.com/app/discover#/{index}?q={searchQuery}
```

### Multiple Placeholders

```
https://admin.com/users/{userId}/orders/{orderId}
```

### URL Encoding

Placeholder values are automatically URL-encoded:

```
userId = "john doe"
→ https://admin.com/users/john%20doe
```

## Button Visibility

For a button to be visible, **all** of the following must be true:

1. ✅ Button must be `enabled: true`
2. ✅ URL pattern filter must pass (or button is assigned to all patterns)
3. ✅ All `conditions` must be true (AND logic)
4. ✅ All URL template placeholders must be resolved

If any of these fail, the button is **hidden** on that row.

## URL Pattern Assignment

Buttons can be assigned to specific Graylog instances:

- **Left empty** → Visible on all patterns
- **Selected** → Only visible on selected patterns

This is useful for defining different buttons for different environments (production, staging).

### Example

| Button | URL Patterns |
|--------|-------------|
| View User | Production, Staging |
| Debug Panel | Staging only |
| Admin Console | Production only |
| View Logs | All (empty) |

## Open in New Tab

When `openInNewTab: true`, clicking the button opens the URL in a new tab. This is `true` by default.

## Icon Support

Optional SVG icons can be added to buttons. The icon appears to the left of the button text.

## Examples

### Simple User Button

```json
{
  "label": "View User",
  "url": "https://admin.company.com/users/{userId}",
  "color": "primary",
  "fieldBindings": [
    { "placeholder": "userId", "fieldPath": "userId" }
  ],
  "conditions": [
    { "field": "userId", "operator": "exists" }
  ]
}
```

### Conditional Error Panel Button

```json
{
  "label": "Error Details",
  "url": "https://sentry.company.com/issues/{errorId}",
  "color": "danger",
  "fieldBindings": [
    { "placeholder": "errorId", "fieldPath": "exception.id" }
  ],
  "conditions": [
    { "field": "level", "operator": "equals", "value": "ERROR" },
    { "field": "exception.id", "operator": "exists" }
  ]
}
```

### Multi-Environment Button

```json
{
  "label": "Kibana Logs",
  "url": "https://kibana-{env}.company.com/app/discover?q={traceId}",
  "color": "default",
  "fieldBindings": [
    { "placeholder": "env", "fieldPath": "environment" },
    { "placeholder": "traceId", "fieldPath": "trace_id" }
  ],
  "conditions": [
    { "field": "trace_id", "operator": "exists" }
  ]
}
```
