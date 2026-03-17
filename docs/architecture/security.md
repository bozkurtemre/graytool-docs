---
sidebar_position: 4
title: Security
---

# Security

Graytool is designed with security as a top priority.

## XSS Protection

### HTML Escaping

All user data and log fields are escaped before being added to the DOM:

```typescript
// For text content
escapeHtml(text: string): string
// Uses DOM API — safely escapes all HTML characters

// For HTML attribute values
escapeAttr(text: string): string
// Encodes &, ", ', <, > characters
```

### Usage

```typescript
// ✅ Safe
content.innerHTML = `
  <span data-field="${escapeAttr(fieldName)}">
    ${escapeHtml(value)}
  </span>
`;

// ❌ Dangerous (never do this)
content.innerHTML = `<span>${userInput}</span>`;
```

### innerHTML Usage

Graytool enforces the use of escape functions wherever `innerHTML` is used. User input is never added directly to the DOM.

## Permission Model

### Principle of Least Privilege

Only required permissions are declared in the manifest:

```json
{
  "permissions": [
    "storage",    // Configuration storage
    "activeTab",  // Current tab info
    "scripting",  // Content script injection
    "tabs"        // Tab listing and querying
  ]
}
```

### Optional Permissions

URL access is **optional** — requested at runtime, not in the manifest:

```json
{
  "optional_host_permissions": ["<all_urls>"]
}
```

Benefits of this approach:
- Users only grant access to URLs they actually use
- Fewer warnings on the Chrome Web Store
- Increased user trust

### Permission Flow

```
1. User adds a URL pattern
2. chrome.permissions.request() is called
3. Chrome shows a permission dialog to the user
4. User approves or denies
5. If approved, the extension can operate on that URL
```

## Data Storage

### Chrome Storage

All data is stored in Chrome's secure storage mechanisms:

| Storage | Usage | Encryption |
|---------|-------|------------|
| `chrome.storage.sync` | Configuration | By Chrome |
| `chrome.storage.local` | Search history | Local |
| `localStorage` | Theme preference, tab state | Page-scoped |

### Data Limits

- `chrome.storage.sync`: ~100KB total
- `chrome.storage.local`: ~5MB total
- Search history: 50 queries per pattern

## Content Script Isolation

Chrome content scripts are fully isolated from the web page's JavaScript context:

- Malicious code on the page cannot access the content script
- The content script cannot directly access the page's `window` object
- Communication happens only through the DOM

## URL Template Security

### Placeholder Encoding

Values in URL templates are encoded with `encodeURIComponent()`:

```
Value: <script>alert('xss')</script>
Encoded: %3Cscript%3Ealert(%27xss%27)%3C%2Fscript%3E
```

This prevents URL injection attacks.

### Template Validation

URL templates only resolve `{...}` placeholders. No other special characters or shell commands are executed.

## Silent Failure

Errors in content scripts **never break** the Graylog UI:

```typescript
try {
  processRow(row, config);
} catch (error) {
  // Silent failure — Graylog continues to work
}
```

This principle guarantees that the extension never breaks the host application.

## Security Best Practices

1. **`eval()` is never used**
2. **Dynamic `<script>` tags are never created**
3. **`innerHTML` is only used with escaped data**
4. **User inputs are validated** (import, forms)
5. **Chrome API errors are always checked**
6. **Storage access goes through a single module**
