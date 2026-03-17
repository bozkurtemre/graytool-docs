---
sidebar_position: 4
title: Conditions
---

# Conditions

Conditions control which log rows a button appears on. All conditions are evaluated with **AND** logic — every one must be true.

## Structure

```typescript
interface ButtonCondition {
  field: string;                      // Field name to check
  operator: ButtonConditionOperator;  // Comparison operator
  value?: string;                     // Comparison value
}

type ButtonConditionOperator =
  | "exists"      // Field exists and is non-empty
  | "equals"      // Field value matches exactly
  | "notEquals"   // Field value does not match
  | "contains"    // Field value contains the text
  | "startsWith"; // Field value starts with the text
```

## Operators

### `exists` — Field Exists

Passes if the field is defined and non-empty. The `value` parameter is not needed.

```json
{ "field": "userId", "operator": "exists" }
```

| Field Value | Result |
|-------------|--------|
| `"12345"` | ✅ Pass |
| `""` | ❌ Fail |
| `undefined` | ❌ Fail |

### `equals` — Exact Match

Field value exactly matches the given value.

```json
{ "field": "level", "operator": "equals", "value": "ERROR" }
```

| Field Value | Result |
|-------------|--------|
| `"ERROR"` | ✅ Pass |
| `"error"` | ❌ Fail (case-sensitive) |
| `"WARNING"` | ❌ Fail |

### `notEquals` — Not Equal

Field value differs from the given value.

```json
{ "field": "environment", "operator": "notEquals", "value": "production" }
```

| Field Value | Result |
|-------------|--------|
| `"staging"` | ✅ Pass |
| `"development"` | ✅ Pass |
| `"production"` | ❌ Fail |

### `contains` — Contains

Field value contains the given text.

```json
{ "field": "source", "operator": "contains", "value": "api-gateway" }
```

| Field Value | Result |
|-------------|--------|
| `"service-api-gateway-01"` | ✅ Pass |
| `"api-gateway"` | ✅ Pass |
| `"web-server"` | ❌ Fail |

### `startsWith` — Starts With

Field value starts with the given text.

```json
{ "field": "source", "operator": "startsWith", "value": "api-" }
```

| Field Value | Result |
|-------------|--------|
| `"api-gateway"` | ✅ Pass |
| `"api-auth-service"` | ✅ Pass |
| `"web-api-service"` | ❌ Fail |

## Multiple Conditions (AND Logic)

All conditions must be true **simultaneously**:

```json
{
  "conditions": [
    { "field": "level", "operator": "equals", "value": "ERROR" },
    { "field": "userId", "operator": "exists" },
    { "field": "source", "operator": "contains", "value": "payment" }
  ]
}
```

This button only appears when:
- Log level is `ERROR` **AND**
- `userId` field exists **AND**
- Source contains `payment`

## No Conditions

If no conditions are added to a button, it appears on **every row** as long as all URL template placeholders can be resolved.

## Practical Examples

### Error Logs Only

```json
[{ "field": "level", "operator": "equals", "value": "ERROR" }]
```

### Specific Service

```json
[
  { "field": "source", "operator": "startsWith", "value": "payment-" },
  { "field": "trace_id", "operator": "exists" }
]
```

### Non-Production Environments

```json
[{ "field": "environment", "operator": "notEquals", "value": "production" }]
```

### User and Session Info Available

```json
[
  { "field": "userId", "operator": "exists" },
  { "field": "sessionId", "operator": "exists" }
]
```
