---
sidebar_position: 1
title: Button Injection
---

# Button Injection

The core feature of Graytool is injecting dynamic buttons into Graylog log rows.

## How It Works

### Injection Flow

```
Log row detected in DOM
    ↓
discoverRowFields() → Fields discovered from row
    ↓
For each button:
  ├─ isButtonAllowedForPattern() → URL pattern check
  ├─ evaluateConditions() → Condition check
  ├─ resolveUrl() → URL template resolution
  └─ Button element added to DOM
    ↓
Message detail button added (if enabled)
```

### Row Detection Strategies

Graytool uses multiple detection strategies to support different Graylog versions:

| Strategy | Selector | Graylog Version |
|----------|----------|-----------------|
| Modern | `tbody[data-testid^='message-summary-field-']` | 5.x+ |
| Modern TR | `tr[data-testid^='message-summary-field-']` | 5.x+ |
| Legacy | `tr` with `[data-field]` children | 3.x, 4.x |
| Custom | `[class*='log-row']` | Custom themes |
| Custom | `[class*='message-group']` | Custom themes |
| Custom | `[class*='MessageTableEntry']` | Some 4.x versions |

### Insertion Point

Buttons are placed in an appropriate section of the log row. Strategy (in order):

1. **Last `<td>` in table row** — Most common case
2. **Message content area** — `[data-field="message"]` or `.message-body`
3. **Element with "message" class** — General fallback
4. **Row element itself** — Last resort

### Duplicate Processing Protection

Each row is only processed **once**. It's marked with the `data-graytool-processed` attribute:

```html
<tr data-graytool-processed="true">
  <!-- Log row content -->
  <td>
    <span class="gt-btn-container">
      <button class="gt-btn gt-btn-primary">View User</button>
    </span>
  </td>
</tr>
```

## URL Template Resolution

### Placeholder Replacement

```
Template: https://admin.com/users/{userId}/orders/{orderId}
Fields:   { userId: "12345", orderId: "ORD-789" }
Result:   https://admin.com/users/12345/orders/ORD-789
```

### Resolution Order

For each placeholder:
1. **Direct match:** `fields["userId"]`
2. **Binding fieldPath:** `button.fieldBindings[i].fieldPath`
3. **Fallback paths:** `button.fieldBindings[i].fallbackPaths[]`

### Failed Resolution

If any placeholder cannot be resolved, `resolveUrl()` returns `null` and the button is **not shown on that row**.

## Periodic Processing

In addition to MutationObserver, Graytool scans existing rows every **2 seconds**:

```
Why?
- Some rows may escape the observer during Graylog SPA navigation
- Pagination changes may add new rows
- Slow-loading content may appear with delay
```

### Retry Mechanism

If no rows are found on the first scan, Graytool retries with increasing delays:

```
Attempt 1: after 100ms
Attempt 2: after 300ms
Attempt 3: after 600ms
Attempt 4: after 1000ms
Attempt 5: after 2000ms
Total: ~10 seconds
```

Gives up after 5 attempts (page probably isn't displaying logs).

## Message Detail Button

When `showMessageDetailButton: true`, an additional 🔍 button is added to each row:

- Only appears if at least 1 field is discovered in the row
- On click, dispatches a `graytool:open-detail` custom event
- JSON viewer listens for this event and opens the panel

## Styling

Buttons match Graylog's design language:

```css
.gt-btn {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.15s;
}
```

Color variants: `primary`, `default`, `danger`, `warning`, `success`

Each variant automatically adjusts for Graylog's light and dark themes.
