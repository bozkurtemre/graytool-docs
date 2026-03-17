---
sidebar_position: 2
title: Build System
---

# Build System

Graytool uses a custom build system powered by **esbuild** for fast compilation.

## Build Process

```
1. Build artifacts are cleaned
2. TypeScript/TSX files are bundled in IIFE format
3. TailwindCSS is processed with PostCSS
4. FontAwesome assets are copied to src/webfonts/
5. CSS font paths are rewritten for Chrome extension compatibility
```

## Entry Points

| Source | Output |
|--------|--------|
| `src/background.ts` | `src/background.js` |
| `src/inject/index.ts` | `src/inject/index.js` |
| `src/options/options.tsx` | `src/options/options.js` |

## Bundle Format

**IIFE (Immediately Invoked Function Expression)** — the most suitable format for Chrome extension content scripts:

```javascript
(() => {
  // All code is encapsulated here
  // Does not pollute the global scope
})();
```

## Build Modes

### Development Build

```bash
npm run build
```

- Source maps included
- No minification
- Easy debugging

### Production Build

```bash
npm run build:prod
```

- No source maps
- Code is minified
- Smaller file size

### Watch Mode

```bash
npm run dev
```

- Automatically rebuilds on file changes
- Uses development build settings

## FontAwesome Processing

The build process handles FontAwesome font files specially:

1. Font files are copied from `node_modules/@fortawesome/fontawesome-free/webfonts/`
2. Placed in the `src/webfonts/` directory
3. CSS font paths are updated to `../webfonts/`

This ensures the Chrome extension can load font files from the correct location.

## Output Structure

After building, the `src/` directory:

```
src/
├── background.js        ← Compiled service worker
├── inject/
│   └── index.js         ← Compiled content script
├── options/
│   └── options.js       ← Compiled options page
├── css/
│   └── fontawesome.css  ← Processed CSS
├── webfonts/            ← Font files
└── manifest.json        ← Unchanged
```

:::info
Output is written to the `src/` directory because the Chrome extension is loaded directly from `src/` (`Load unpacked`). A separate `dist/` directory is not used.
:::

## Release

```bash
npm run release
```

Packages the `src/` directory as a zip file. This file can be uploaded to the Chrome Web Store.

## Build Configuration

The build configuration is in `tasks/build.js`. It uses the esbuild API:

```javascript
// Core configuration (conceptual)
esbuild.build({
  entryPoints: ["src/background.ts", "src/inject/index.ts", "src/options/options.tsx"],
  bundle: true,
  format: "iife",
  outdir: "src",
  sourcemap: isDev,
  minify: !isDev,
});
```
