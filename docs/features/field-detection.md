---
sidebar_position: 3
title: Field Detection
---

# Field Detection

Graytool automatically discovers fields from log rows using multiple strategies.

## Detection Strategies

### Priority Order

```
1. Data Attributes (highest)  — data-field, data-testid
2. JSON Message Parsing       — Clipboard, full_message, pre tags
3. DOM Patterns (lowest)      — dt/dd, field-name class
```

Each strategy works independently and discovered fields are merged and deduplicated.

## Strategy 1: Data Attributes

The most reliable method. Reads data attributes from Graylog's DOM structure.

### Legacy Format

```html
<td data-field="userId">12345</td>
<td data-field="source">api-gateway</td>
```

### Modern Format (Graylog 5.x+)

```html
<td data-testid="message-summary-field-userId">12345</td>
<td data-testid="message-summary-field-source">api-gateway</td>
```

### Source Type

```typescript
source: "data-field"  // Priority: 4 (highest)
```

## Strategy 2: JSON Message Parsing

Finds JSON content in the log row and extracts fields.

### JSON Sources (in priority order)

1. **Clipboard button** — If copy button contains JSON:
```html
<button data-clipboard-text='{"userId":"12345","level":"ERROR"}'>Copy</button>
```

2. **full_message field** — If expanded message contains JSON:
```html
<td data-field="full_message">{"userId":"12345","request":{...}}</td>
```

3. **Pre tags** — If code blocks contain JSON:
```html
<pre>{"userId":"12345","level":"ERROR"}</pre>
```

### JSON Flattening

Nested JSON objects are flattened:

```json
// Original
{
  "userId": "12345",
  "context": {
    "user": {
      "name": "John",
      "role": "admin"
    }
  },
  "tags": ["api", "auth"]
}

// Flattened
{
  "userId": "12345",
  "context.user.name": "John",
  "context.user.role": "admin",
  "tags.0": "api",
  "tags.1": "auth"
}
```

### Depth Limit

Controlled by the `jsonParseMaxDepth` setting (default: 5):

```
Depth 0: { "a": { "b": { "c": "value" } } }
Depth 1: a → object (continue)
Depth 2: a.b → object (continue)
Depth 3: a.b.c → "value" (string, stop)
```

### JSON String Parsing

When `parseJsonStrings: true`, embedded JSON in string values is parsed:

```json
// Original
{ "details": "{\"userId\": \"123\"}" }

// Parse result
{ "details.userId": "123" }
```

### Source Type

```typescript
source: "json-parse"  // Priority: 2
```

## Strategy 3: DOM Patterns

Discovers fields from structural HTML elements.

### Description List (dt/dd)

In Graylog's expanded view:

```html
<dl>
  <dt>userId</dt>
  <dd>12345</dd>
  <dt>source</dt>
  <dd>api-gateway</dd>
</dl>
```

### Field Name Classes

```html
<span class="field-name">userId</span>
<span class="field-value">12345</span>
```

### Source Type

```typescript
source: "text-pattern"  // Priority: 1 (lowest)
```

## Deduplication

When the same field is discovered by multiple strategies, the highest-priority source is kept:

```
Priority order:
  data-field    → 4 (highest)
  dom-attribute → 3
  json-parse    → 2
  text-pattern  → 1 (lowest)
```

### Example

```
"userId" found:
  - data-field: "12345" (priority 4)     ← Selected ✅
  - json-parse: "12345" (priority 2)     ← Skipped
  - text-pattern: "12345" (priority 1)   ← Skipped
```

## DiscoveredField Structure

```typescript
interface DiscoveredField {
  name: string;         // Field name: "userId"
  value: string;        // Field value: "12345"
  source: FieldSource;  // Discovery method: "data-field"
  element?: Element;    // DOM reference (optional)
}

type FieldSource = "data-field" | "json-parse" | "text-pattern" | "dom-attribute";
```

## Row Field Prefixes

Some Graylog configurations add prefixes to fields. Graytool searches with configured prefixes:

```
Prefixes: ["msg.", "context.", ""]

Searching for: "userId"
Scan order:
  1. "msg.userId"     → { source: "data-field", value: "12345" } ✅
  2. "context.userId"  → Not found
  3. "userId"          → Not found (already found)
```

## Troubleshooting

### Fields not being detected

1. Verify there are actual log rows on the page
2. Make sure your Graylog version is supported
3. Check the `Row Field Prefixes` setting
4. Check the browser console for errors

### Wrong field values

1. Check the `parseJsonStrings` setting
2. Try increasing `jsonParseMaxDepth`
3. Use the JSON viewer to inspect raw data
