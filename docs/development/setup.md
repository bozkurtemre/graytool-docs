---
sidebar_position: 1
title: Development Environment
---

# Development Environment Setup

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **Google Chrome** (or a Chromium-based browser)
- **Git**

## Installation

```bash
git clone https://github.com/graytool/graytool.git
cd graytool
npm install
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Development build (includes source maps) |
| `npm run build:prod` | Production build (minified, no source maps) |
| `npm run dev` | Watch mode — auto-rebuild on file changes |
| `npm run typecheck` | TypeScript type checking (no emit) |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting (for CI) |
| `npm run lint` | typecheck + format:check |
| `npm run clean` | Clean build artifacts |
| `npm run release` | Create release zip package |

## Loading in Chrome

1. Run `npm run build`
2. Navigate to `chrome://extensions/` in Chrome
3. Enable **"Developer mode"**
4. Click **"Load unpacked"**
5. Select the **`src`** folder in the project

## Development Workflow

```
1. Make code changes
2. npm run build (or automatic in dev mode)
3. chrome://extensions/ → Click Graytool's reload button
4. Refresh the Graylog page
5. Test
```

:::tip
The `npm run dev` command automatically rebuilds on file changes, but you still need to reload the Chrome extension.
:::

## Dependencies

### Runtime

| Package | Version | Description |
|---------|---------|-------------|
| `react` | 18.2.0 | UI framework |
| `react-dom` | 18.2.0 | React DOM renderer |
| `@fortawesome/fontawesome-free` | 7.2.0 | Icon library |

### Development

| Package | Version | Description |
|---------|---------|-------------|
| `typescript` | 5.0.0 | TypeScript compiler |
| `esbuild` | 0.27.3 | Fast JavaScript bundler |
| `prettier` | 3.8.1 | Code formatter |
| `@types/chrome` | 0.0.260 | Chrome API types |

## TypeScript Configuration

The project is configured with **strict mode**:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx"
  }
}
```
