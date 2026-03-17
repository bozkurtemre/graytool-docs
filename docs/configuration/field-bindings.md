---
sidebar_position: 3
title: Field Bindings
---

# Field Bindings

Field bindings map URL template placeholders to actual field values from the log row.

## Structure

```typescript
interface FieldBinding {
  placeholder: string;        // Placeholder name in the URL
  fieldPath: string;          // Primary field path
  fallbackPaths?: string[];   // Alternative field paths
}
```

## Auto-Creation

When you type `{userId}` in a URL template, Graytool automatically creates a field binding:

```
URL: https://admin.com/users/{userId}
                              ↓
Auto binding: { placeholder: "userId", fieldPath: "userId" }
```

## Field Path

The field path specifies the field name within the log row's JSON data.

### Flat Fields

```
userId          → { "userId": "12345" }
request_id      → { "request_id": "abc-123" }
```

### Nested Fields

Dot notation is used to access nested fields:

```
context.user.id        → { "context": { "user": { "id": "12345" } } }
metadata.request.trace → { "metadata": { "request": { "trace": "xyz" } } }
```

:::info
Nested fields are flattened during JSON parsing. So `context.user.id` can be used directly as a field name.
:::

## Fallback Paths

If the primary field is not found, Graytool tries fallback paths in order:

```typescript
{
  placeholder: "userId",
  fieldPath: "userId",
  fallbackPaths: ["context.userId", "user_id", "msg.userId"]
}
```

### Resolution Order

```
1. fields["userId"]          → Not found ❌
2. fields["context.userId"]  → Not found ❌
3. fields["user_id"]         → "12345" found ✅
   → {userId} in URL is replaced with "12345"
```

## Resolution Failure

If **no** field is found for a placeholder (primary + all fallbacks fail), the button is **hidden** on that log row.

This behavior is by design — it's safer to hide the button than to create broken URLs.

## Field Discovery and Prefixes

Graytool discovers fields using various strategies. Some Graylog configurations add prefixes to fields:

```
msg.userId
context.userId
full_message.userId
```

The **Row Field Prefixes** setting defines which prefixes to search:

```
["msg.", "context.", ""]
```

Graytool searches for both prefixed and unprefixed versions.

## URL Encoding

All field values are automatically encoded with `encodeURIComponent()`:

```
Field value: "hello world"
URL result: https://example.com/search?q=hello%20world
```

## Practical Examples

### User and Order

```typescript
// URL: https://admin.com/users/{userId}/orders/{orderId}
fieldBindings: [
  {
    placeholder: "userId",
    fieldPath: "userId",
    fallbackPaths: ["user_id", "context.user_id"]
  },
  {
    placeholder: "orderId",
    fieldPath: "orderId",
    fallbackPaths: ["order_id", "metadata.orderId"]
  }
]
```

### Trace ID Tracking

```typescript
// URL: https://jaeger.company.com/trace/{traceId}
fieldBindings: [
  {
    placeholder: "traceId",
    fieldPath: "trace_id",
    fallbackPaths: ["traceId", "x-trace-id", "context.traceId"]
  }
]
```
