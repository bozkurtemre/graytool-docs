---
sidebar_position: 4
title: Code Style
---

# Code Style Guide

This guide explains the coding conventions used in the Graytool project.

## Formatting

Formatting is enforced by **Prettier**. Rules:

| Rule | Value |
|------|-------|
| Indentation | 2 spaces |
| Semicolons | Required |
| Quotes | Double quotes (`"`) |
| Trailing comma | Required in multi-line |
| Print width | 100 characters |
| End of line | LF |

```bash
# Format all files
npm run format

# Check formatting (CI)
npm run format:check
```

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Variables | camelCase | `fieldMap`, `resolvedUrl` |
| Functions | camelCase | `getConfig()`, `processRow()` |
| Constants | SCREAMING_SNAKE_CASE | `DEBOUNCE_MS`, `STORAGE_KEY` |
| Types/Interfaces | PascalCase | `ButtonConfig`, `GrayToolConfig` |
| Type unions | PascalCase | `ButtonColor`, `FieldSource` |
| React components | PascalCase | `ButtonsPage`, `ButtonCard` |
| CSS classes | kebab-case + `gt-` | `gt-btn`, `gt-btn-primary` |
| Data attributes | kebab-case + `graytool-` | `data-graytool-btn-id` |

## Import Order

```typescript
// 1. External packages
import React, { useState, useEffect } from "react";

// 2. Shared (constants, utils, storage)
import { PROCESS_INTERVAL_MS } from "../shared/constants";
import { escapeHtml } from "../shared/utils";
import { getConfig } from "../shared/storage";

// 3. Internal modules
import { processRow } from "./row-processor";

// 4. Type-only imports
import type { GrayToolConfig } from "../shared/types";
```

### Type-Only Imports

Imports used only as types must use `import type`:

```typescript
// ✅ Correct
import type { GrayToolConfig, ButtonConfig } from "../shared/types";

// ❌ Wrong
import { GrayToolConfig } from "../shared/types";
```

## File Headers

Each file includes a descriptive header comment:

```typescript
// inject/button-injector.ts — Button injection into Graylog log rows
// Resolves URL templates, evaluates conditions, and injects styled buttons.
```

## Section Dividers

For logical groupings within a file:

```typescript
// ─── Section Name ─────────────────────────────────────────
```

## TypeScript Rules

### Strict Mode

The project runs in strict mode. This means:

- `noImplicitAny` — `any` type must be explicitly stated
- `strictNullChecks` — null/undefined checks are required
- `strictFunctionTypes` — strict function parameter types

### Explicit Return Types

Return types are required for exported functions:

```typescript
// ✅ Correct
export async function getConfig(): Promise<GrayToolConfig> {
  // ...
}

// ❌ Wrong
export async function getConfig() {
  // ...
}
```

### Avoiding `any`

`unknown` is preferred over `any`:

```typescript
// ✅ Correct
function parse(data: unknown): GrayToolConfig {
  // ...
}

// ❌ Wrong
function parse(data: any) {
  return data;
}
```

## Error Handling

### Chrome API Errors

```typescript
// ✅ Always check
return new Promise((resolve, reject) => {
  chrome.storage.sync.set({ [STORAGE_KEY]: updated }, () => {
    if (chrome.runtime.lastError) {
      reject(new Error(chrome.runtime.lastError.message));
    } else {
      resolve();
    }
  });
});
```

### Silent Failure in Content Scripts

```typescript
// ✅ Don't break Graylog
try {
  processRow(row, config);
} catch (error) {
  // Silent failure
}
```

### Logging

```typescript
// ✅ With prefix
console.log("Graytool: Error loading config:", error);
```

## Mandatory Import Rules

### Storage Access

**All** storage access must go through `shared/storage.ts`:

```typescript
// ✅ Correct
import { getConfig, saveConfig } from "../shared/storage";

// ❌ Never
chrome.storage.sync.get(["graytool_config"], (result) => { ... });
```

### Constants

**All** constants must be imported from `shared/constants.ts`:

```typescript
// ✅ Correct
import { STORAGE_KEY, PROCESSED_ATTR } from "../shared/constants";

// ❌ Never
const STORAGE_KEY = "graytool_config";
```

### Utility Functions

**All** utility functions must be imported from `shared/utils.ts`:

```typescript
// ✅ Correct
import { escapeHtml, escapeAttr, copyToClipboard } from "../shared/utils";
```
