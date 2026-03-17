---
sidebar_position: 1
title: Architecture Overview
---

# Architecture Overview

Graytool is built on Chrome Extension Manifest V3 architecture. It consists of three main layers: Background Service Worker, Content Script (Inject), and Options Page.

## Component Map

```
┌──────────────────────────────────────────────────────────────┐
│                    Chrome Extension                          │
├──────────────────────────────────────────────────────────────┤
│  src/background.ts      │ Service worker: URL matching       │
│  src/inject/            │ Injected into matched pages        │
│    index.ts             │   Entry point, activation handling │
│    button-injector.ts   │   Button creation, URL resolution  │
│    field-detector.ts    │   Field discovery strategies       │
│    observer.ts          │   MutationObserver (DOM changes)   │
│    row-processor.ts     │   Log row processing               │
│    ui/                  │   UI components                    │
│      styles.ts          │     Theme and styles               │
│      json-viewer.ts     │     JSON viewer                    │
│      field-selector.ts  │     Field selector modal           │
│      search-history.ts  │     Search history panel           │
│  src/options/           │ Extension settings UI (React)      │
│    options.tsx          │   Entry point                      │
│    OptionsPage.tsx      │   Main page component              │
│  src/shared/            │ Shared code                        │
│    types.ts             │   TypeScript type definitions      │
│    storage.ts           │   Chrome storage abstraction       │
│    constants.ts         │   Constants and magic strings      │
│    utils.ts             │   Utility functions                │
└──────────────────────────────────────────────────────────────┘
```

## Layers

### 1. Background Service Worker

Runs in Chrome's service worker mechanism. **Has no access to page content**, only Chrome APIs.

**Responsibilities:**
- URL pattern matching
- Content script injection
- Permission management
- Configuration change notification

### 2. Content Script (Inject)

Injected into matched pages. **Can access the page's DOM** but not its JavaScript context.

**Responsibilities:**
- Detecting log rows
- Discovering fields
- Injecting buttons
- Providing UI like JSON viewer, search history

### 3. Options Page

A standalone page written with React. Uses Chrome's extension options mechanism.

**Responsibilities:**
- Configuration management
- Adding/editing URL patterns
- Defining buttons
- Import/export

### 4. Shared Layer

Common code used by all layers:

| Module | Purpose |
|--------|---------|
| `types.ts` | All type definitions |
| `storage.ts` | Single storage access point |
| `constants.ts` | Constants (timing, DOM attrs, keys) |
| `utils.ts` | XSS protection, clipboard |

## Isolation

### Content Script Isolation

Chrome content scripts run **isolated** from the web page's JavaScript context:

- Cannot directly access `window` object of the page
- Has its own global scope
- Can access DOM but not page JS
- Can access Chrome APIs (`chrome.runtime`, `chrome.storage`)

### CSS Isolation

Graytool styles are isolated with the `gt-` prefix:
- Doesn't break Graylog's styles
- Graylog's styles don't affect Graytool

## Manifest V3

Graytool uses Chrome's modern Manifest V3 system:

```json
{
  "manifest_version": 3,
  "permissions": ["storage", "activeTab", "scripting", "tabs"],
  "optional_host_permissions": ["<all_urls>"],
  "background": {
    "service_worker": "background.js"
  }
}
```

### Key Differences (V2 to V3)

| Feature | V2 | V3 |
|---------|----|----|
| Background | Persistent page | Service worker |
| Host permissions | In manifest | Optional (runtime) |
| Content script injection | In manifest | `chrome.scripting` API |
| CSP | Flexible | Stricter |
