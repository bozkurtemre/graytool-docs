# AGENTS.md — Graytool Documentation

## Project Overview

This is the **Graytool documentation site**, built with [Docusaurus 3](https://docusaurus.io/) (classic preset). Graytool is a Chrome extension (Manifest V3) that enhances Graylog log management interfaces.

- **Site URL:** https://graytool.dev
- **Locales:** English (default), Turkish (`tr`)
- **Docs serve as the site root** (`routeBasePath: "/"`)

## Tech Stack

- Docusaurus 3.5+
- React 19
- MDX
- Node.js (use the version compatible with Docusaurus 3)

## Project Structure

```
docs/               # English documentation (Markdown/MDX)
i18n/tr/            # Turkish translations
src/css/custom.css  # Theme customization (CSS variables)
static/img/         # Static assets (logos, images)
sidebars.js         # Sidebar navigation structure
docusaurus.config.js # Site configuration
```

### Documentation Categories

| Category        | Path                    | Purpose                          |
|-----------------|-------------------------|----------------------------------|
| Getting Started | `docs/getting-started/` | Installation, quick start guides |
| Configuration   | `docs/configuration/`   | URL patterns, buttons, settings  |
| Features        | `docs/features/`        | Feature documentation            |
| Architecture    | `docs/architecture/`    | Internal design & data flow      |
| API Reference   | `docs/api/`             | Constants, types, utils, storage |
| Development     | `docs/development/`     | Contributing, build system, code style |
| Changelog       | `docs/changelog.md`     | Release notes                    |
| FAQ             | `docs/faq.md`           | Frequently asked questions       |

## Commands

```bash
npm start          # Start dev server (hot reload)
npm run build      # Production build
npm run serve      # Serve production build locally
npm run clear      # Clear Docusaurus cache
```

## Conventions

### Documentation

- All docs are Markdown (`.md`) files under `docs/`.
- Each category folder has a `_category_.json` for sidebar metadata.
- Frontmatter fields: `slug`, `sidebar_position`, `title` (at minimum).
- Use relative links between docs (e.g., `[Buttons](/configuration/buttons)`).
- Code blocks should specify language for syntax highlighting.

### Localization (i18n)

- Turkish translations live in `i18n/tr/docusaurus-plugin-content-docs/current/`.
- Keep translated file paths and frontmatter slugs identical to English originals.
- Do not modify English docs when updating translations, and vice versa.

### Styling

- Theme colors are defined as CSS custom properties in `src/css/custom.css`.
- Primary color: `#629de2`. Do not change without approval.
- Both light and dark themes are supported.

### File Naming

- Use kebab-case for all doc filenames (e.g., `field-bindings.md`).
- Images go in `static/img/` and are referenced as `/img/filename.png`.

## Rules for Agents

1. **Do not modify `build/`** — it is generated output. Run `npm run build` to regenerate.
2. **Do not delete or rename existing docs** without explicit instruction.
3. **Sidebar order** is controlled by `sidebar_position` in frontmatter and `sidebars.js`. Keep them in sync.
4. **Validate after changes** — run `npm run build` to ensure no broken links or build errors (`onBrokenLinks: "throw"`).
5. **Preserve i18n structure** — if adding a new English doc, note that a Turkish translation stub may be needed.
6. **Keep Markdown clean** — no trailing whitespace, use ATX-style headers (`#`), one blank line between sections.
7. **Indent with 2 spaces** in JS, JSON, YAML, and MDX files (see `.editorconfig`).
