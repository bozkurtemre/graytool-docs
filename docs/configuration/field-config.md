---
sidebar_position: 5
title: Field Configuration
---

# Field Configuration

Global field configuration controls how Graytool discovers fields from log rows and JSON parsing behavior.

## Structure

```typescript
interface GlobalFieldConfig {
  defaultMessageField?: string | null;  // Default field for JSON viewer
  rowFieldPrefixes: string[];           // Field prefixes to search
  searchPrefixes?: string[];            // Config UI alias
  parseJsonStrings?: boolean;           // Parse JSON in string values
  jsonParseMaxDepth?: number;           // Maximum parse depth
}
```

## Settings

### Default Message Field

Determines which field is automatically selected when the JSON viewer opens.

| Value | Behavior |
|-------|----------|
| `null` / `undefined` | Field selector dialog is shown |
| `"full_message"` | Opens `full_message` field directly |
| `"message"` | Opens `message` field directly |

:::tip
When you use the JSON viewer for the first time, you can easily set the default field by checking the "Save as default" option.
:::

### Row Field Prefixes

Different Graylog configurations store fields with different prefixes. This setting defines which prefixes to search.

**Default:** `["msg.", "context.", ""]`

```
Log data: { "msg.userId": "123", "context.env": "prod" }

Search order:
  "msg.userId"     → ✅ Found ("msg." prefix)
  "context.env"    → ✅ Found ("context." prefix)
  "userId"         → ✅ Found ("" empty prefix)
```

#### Customization

Adjust prefixes to match your Graylog configuration:

```
If your Graylog uses "app." prefix:
  → ["app.", "msg.", "context.", ""]
```

### Parse JSON Strings

Parses embedded JSON in string field values.

**Default:** `true`

```json
// parseJsonStrings: true
{
  "details": "{\"userId\": \"123\", \"action\": \"login\"}"
}
// ↓ Parsed to:
{
  "details.userId": "123",
  "details.action": "login"
}
```

```json
// parseJsonStrings: false
{
  "details": "{\"userId\": \"123\", \"action\": \"login\"}"
}
// ↓ Remains as string (not parsed)
```

:::info
This feature is very useful for log structures with nested JSON strings. However, you can disable it if you experience performance issues.
:::

### JSON Parse Max Depth

Sets the maximum JSON parse depth. Limits deeply nested structures.

**Default:** `5`
**Range:** `1` - `10`

```
Depth 1: { "a": "..." }
Depth 2: { "a": { "b": "..." } }
Depth 3: { "a": { "b": { "c": "..." } } }
...
Depth 5: a.b.c.d.e → Flattening stops at this point
```

:::warning
Very high depth values (8-10) may cause performance issues with large JSON objects. A value of `5` is sufficient for most use cases.
:::

## Default Configuration

```typescript
{
  defaultMessageField: null,       // Auto-detect
  rowFieldPrefixes: ["msg.", "context.", ""],
  parseJsonStrings: true,
  jsonParseMaxDepth: 5,
}
```

## Configuring from Settings

1. Go to **Options** → **"Field Config"** tab
2. Edit each setting:
   - **Default Message Field**: Text input (can be left empty)
   - **Row Field Prefixes**: Comma-separated list
   - **Parse JSON Strings**: Checkbox
   - **JSON Parse Max Depth**: Number input (1-10)
