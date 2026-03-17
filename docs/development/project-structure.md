---
sidebar_position: 3
title: Project Structure
---

# Project Structure

## Directory Tree

```
graytool/
├── src/                          # Extension source code and output directory
│   ├── manifest.json             # Chrome extension manifest (V3)
│   ├── background.ts             # Service worker source code
│   ├── background.js             # Compiled service worker
│   ├── inject/                   # Content script (injected into Graylog)
│   │   ├── index.ts              # Entry point, activation coordination
│   │   ├── index.js              # Compiled content script
│   │   ├── button-injector.ts    # Button creation and URL resolution
│   │   ├── field-detector.ts     # Field discovery strategies
│   │   ├── observer.ts           # MutationObserver (DOM changes)
│   │   ├── row-processor.ts      # Log row processing
│   │   └── ui/                   # Content script UI components
│   │       ├── styles.ts         # Theme detection and CSS
│   │       ├── json-viewer.ts    # JSON viewer panel
│   │       ├── field-selector.ts # Field selector modal
│   │       └── search-history.ts # Search history panel
│   ├── options/                  # Settings page (React)
│   │   ├── options.tsx           # React entry point
│   │   ├── options.js            # Compiled options page
│   │   ├── options.html          # HTML shell
│   │   ├── options.css           # Tailwind CSS
│   │   └── OptionsPage.tsx       # Main component
│   ├── shared/                   # Shared modules
│   │   ├── types.ts              # All TypeScript type definitions
│   │   ├── storage.ts            # Chrome storage abstraction
│   │   ├── constants.ts          # Constants (timing, keys, attrs)
│   │   └── utils.ts              # Utility functions
│   ├── css/                      # Processed CSS files
│   │   └── fontawesome.css       # FontAwesome styles
│   ├── icons/                    # Extension icons
│   ├── webfonts/                 # FontAwesome font files
│   └── logo.svg                  # Logo used on the options page
├── tasks/                        # Build scripts
│   ├── build.js                  # esbuild configuration
│   ├── clean.js                  # Cleanup script
│   └── release.js                # Release packaging script
├── docs/                         # This documentation site
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── AGENTS.md                     # Guide for AI coding agents
├── README.md                     # Project overview
├── CONTRIBUTING.md               # Contributing guide
├── SECURITY.md                   # Security policy
├── CODE_OF_CONDUCT.md            # Code of conduct
└── LICENSE                       # License
```

## Module Responsibilities

### src/shared/ — Shared Layer

Common code used by all other modules. Dependency on this layer is one-directional — shared does not depend on other layers.

| File | Responsibility |
|------|----------------|
| `types.ts` | All TypeScript interface and type definitions |
| `storage.ts` | Chrome storage.sync and storage.local abstraction |
| `constants.ts` | Magic strings, timing values, DOM attribute names |
| `utils.ts` | XSS protection (escaping), clipboard access |

### src/inject/ — Content Script

Code injected into Graylog pages. Has DOM access.

| File | Responsibility |
|------|----------------|
| `index.ts` | Activation/deactivation coordination |
| `button-injector.ts` | Button DOM element creation, URL resolution |
| `field-detector.ts` | Three-strategy field discovery |
| `observer.ts` | New row detection (MutationObserver) |
| `row-processor.ts` | Individual row processing orchestration |
| `ui/styles.ts` | Theme detection, CSS injection |
| `ui/json-viewer.ts` | JSON viewer — all features |
| `ui/field-selector.ts` | Default field selector modal |
| `ui/search-history.ts` | Search capture and history panel |

### src/background.ts — Service Worker

Runs in Chrome's background process. No DOM access.

### src/options/ — Settings Page

A standalone SPA built with React. Opened via `chrome://extensions/` → Options.

## Dependency Graph

```
shared/types.ts ←── Every module
shared/constants.ts ←── Every module
shared/storage.ts ←── background.ts, inject/index.ts, options/OptionsPage.tsx
shared/utils.ts ←── inject/button-injector.ts, inject/ui/json-viewer.ts

inject/index.ts
  ├── inject/row-processor.ts
  │     ├── inject/field-detector.ts
  │     └── inject/button-injector.ts
  ├── inject/observer.ts
  ├── inject/ui/styles.ts
  ├── inject/ui/json-viewer.ts
  ├── inject/ui/field-selector.ts
  └── inject/ui/search-history.ts
```
