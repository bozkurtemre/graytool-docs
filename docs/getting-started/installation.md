---
sidebar_position: 1
title: Installation
---

# Installation

There are two ways to install Graytool in your Chrome browser.

## Developer Mode Installation (Recommended)

### Prerequisites

- Google Chrome (or a Chromium-based browser)
- Node.js (v18+) and npm

### Steps

1. **Clone the project:**

```bash
git clone https://github.com/graytool/graytool.git
cd graytool
```

2. **Install dependencies:**

```bash
npm install
```

3. **Build the project:**

```bash
npm run build
```

4. **Load into Chrome:**
   - Navigate to `chrome://extensions/` in Chrome
   - Enable **"Developer mode"** in the top right
   - Click **"Load unpacked"**
   - Select the `src` folder in the project

5. **Done!** The Graytool icon will appear in the toolbar.

### Updating

After code changes:

```bash
npm run build
```

Then click the **reload** (🔄) button on the Graytool card in `chrome://extensions/`.

## Production Build

Optimized build for distribution:

```bash
npm run build:prod
```

This produces minified files without source maps.

## Watch Mode (Development)

Automatic rebuild on file changes:

```bash
npm run dev
```

:::tip
In watch mode, you still need to reload the Chrome extension after each change. Use the reload button on the `chrome://extensions/` page.
:::

## Troubleshooting

### Extension won't load

- Make sure you selected the `src` folder (not the project root)
- Verify that `npm run build` completed successfully
- Ensure Chrome is up to date

### Permission errors

Graytool requests separate permissions for each URL pattern. When you add your first URL pattern, Chrome will show a permission dialog. You need to click "Allow".
