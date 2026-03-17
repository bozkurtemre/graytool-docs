---
sidebar_position: 1
title: Type Definitions
---

# Type Definitions (Types)

All TypeScript type definitions from the `src/shared/types.ts` file.

## Main Configuration

### GrayToolConfig

The main interface encompassing the entire extension configuration.

```typescript
interface GrayToolConfig {
  version: 2;
  urlPatterns: UrlPattern[];
  buttons: ButtonConfig[];
  globalFieldConfig: GlobalFieldConfig;
  settings: AppSettings;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `version` | `2` (literal) | Configuration format version |
| `urlPatterns` | `UrlPattern[]` | Active URL pattern list |
| `buttons` | `ButtonConfig[]` | Defined buttons list |
| `globalFieldConfig` | `GlobalFieldConfig` | Field discovery and JSON parse settings |
| `settings` | `AppSettings` | Feature toggle settings |

## URL Pattern

### UrlPattern

```typescript
interface UrlPattern {
  id: string;
  pattern: string;
  label: string;
  enabled: boolean;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier (auto-generated) |
| `pattern` | `string` | Glob pattern (`*` wildcard) |
| `label` | `string` | Display name |
| `enabled` | `boolean` | Active/inactive state |

## Button Configuration

### ButtonConfig

```typescript
interface ButtonConfig {
  id: string;
  label: string;
  url: string;
  fieldBindings: FieldBinding[];
  conditions: ButtonCondition[];
  openInNewTab: boolean;
  enabled: boolean;
  color: ButtonColor;
  icon?: string;
  urlPatternIds?: string[];
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `label` | `string` | Text displayed on the button |
| `url` | `string` | URL template with `{placeholder}` |
| `fieldBindings` | `FieldBinding[]` | Field bindings |
| `conditions` | `ButtonCondition[]` | Visibility conditions |
| `openInNewTab` | `boolean` | Open in new tab |
| `enabled` | `boolean` | Active/inactive |
| `color` | `ButtonColor` | Button color |
| `icon` | `string?` | Optional SVG icon string |
| `urlPatternIds` | `string[]?` | Show on specific patterns (empty = all) |

### ButtonColor

```typescript
type ButtonColor = "primary" | "default" | "danger" | "warning" | "success";
```

### FieldBinding

```typescript
interface FieldBinding {
  placeholder: string;
  fieldPath: string;
  fallbackPaths?: string[];
}
```

| Field | Type | Description |
|-------|------|-------------|
| `placeholder` | `string` | `{name}` in the URL |
| `fieldPath` | `string` | Primary field path |
| `fallbackPaths` | `string[]?` | Alternative field paths |

### ButtonCondition

```typescript
interface ButtonCondition {
  field: string;
  operator: ButtonConditionOperator;
  value?: string;
}
```

### ButtonConditionOperator

```typescript
type ButtonConditionOperator =
  | "exists"
  | "equals"
  | "contains"
  | "startsWith"
  | "notEquals";
```

## Field Configuration

### GlobalFieldConfig

```typescript
interface GlobalFieldConfig {
  defaultMessageField?: string | null;
  rowFieldPrefixes: string[];
  searchPrefixes?: string[];
  parseJsonStrings?: boolean;
  jsonParseMaxDepth?: number;
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `defaultMessageField` | `string \| null?` | `null` | JSON viewer default field |
| `rowFieldPrefixes` | `string[]` | `["msg.", "context.", ""]` | Prefixes to search |
| `searchPrefixes` | `string[]?` | — | UI alias |
| `parseJsonStrings` | `boolean?` | `true` | Parse JSON strings |
| `jsonParseMaxDepth` | `number?` | `5` | Max parse depth |

## Application Settings

### AppSettings

```typescript
interface AppSettings {
  enabled: boolean;
  showMessageDetailButton: boolean;
  jsonViewerEnabled: boolean;
  keyboardShortcutsEnabled: boolean;
  searchHistoryEnabled: boolean;
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Master on/off |
| `showMessageDetailButton` | `boolean` | `true` | Message detail button |
| `jsonViewerEnabled` | `boolean` | `true` | JSON viewer |
| `keyboardShortcutsEnabled` | `boolean` | `true` | Keyboard shortcuts |
| `searchHistoryEnabled` | `boolean` | `true` | Search history |

## Field Discovery

### DiscoveredField

```typescript
interface DiscoveredField {
  name: string;
  value: string;
  source: FieldSource;
  element?: Element;
}
```

### FieldSource

```typescript
type FieldSource = "data-field" | "json-parse" | "text-pattern" | "dom-attribute";
```

| Source | Priority | Description |
|--------|----------|-------------|
| `data-field` | 4 (highest) | HTML data attribute |
| `dom-attribute` | 3 | DOM structural element |
| `json-parse` | 2 | JSON parse result |
| `text-pattern` | 1 (lowest) | Text pattern |

## Search History

### SearchHistoryEntry

```typescript
interface SearchHistoryEntry {
  query: string;
  timestamp: number;
}
```

## Message Types

### GrayToolMessage

```typescript
type GrayToolMessage =
  | ActivateMessage
  | DeactivateMessage
  | ConfigUpdatedMessage
  | CheckUrlMessage
  | GetConfigMessage
  | PingMessage
  | RequestPermissionMessage
  | HasPermissionMessage
  | GetConfiguredOriginsMessage;
```

### ActivateMessage

```typescript
interface ActivateMessage {
  type: "ACTIVATE";
  matchedPatternId?: string;
}
```

### DeactivateMessage

```typescript
interface DeactivateMessage {
  type: "DEACTIVATE";
}
```

### ConfigUpdatedMessage

```typescript
interface ConfigUpdatedMessage {
  type: "CONFIG_UPDATED";
}
```

### Request Messages

```typescript
interface CheckUrlMessage { type: "CHECK_URL"; }
interface GetConfigMessage { type: "GET_CONFIG"; }
interface PingMessage { type: "PING"; }

interface RequestPermissionMessage {
  type: "REQUEST_PERMISSION";
  pattern: string;
}

interface HasPermissionMessage {
  type: "HAS_PERMISSION";
  url: string;
}

interface GetConfiguredOriginsMessage {
  type: "GET_CONFIGURED_ORIGINS";
}
```
