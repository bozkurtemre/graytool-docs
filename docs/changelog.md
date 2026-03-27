---
sidebar_position: 101
title: Changelog
---

# Changelog

## v2.0.4 (Current)

### Features
- New `showJsonViewerCounts` setting to toggle key/item counts in JSON viewer
- Options page now displays extension version in the navbar

### Improvements
- Updated JSON viewer rendering to conditionally show key/item counts based on user setting
- Adjusted indentation logic in JSON viewer for consistent appearance (fixed 16px padding)

### Localization
- Added English and Turkish translations for the new "Show key/item counts in JSON viewer" option

Full Changelog: [v2.0.3...v2.0.4](https://github.com/bozkurtemre/graytool/compare/v2.0.3...v2.0.4)

## v2.0.3

### Features
- Multi-language (i18n) support with English and Turkish
- Language switching from options page with immediate effect
- New `collectSelectableFields` function for robust field extraction from Graylog rows
- Auto-detection of rich JSON content in JSON viewer, minimizing unnecessary popups
- Toolbar field selector with "Default" option for switching between raw and parsed views

### Improvements
- Replaced all hardcoded UI strings with `t()` translation function calls
- Enhanced JSON field extraction logic with DOM attributes, sibling rows, and JSON payload support
- Added utility functions (`resolveViewerData`, `parseObjectLike`, `tryParseObject`, `extractJsonObjectCandidate`) for reliable JSON parsing
- Updated icon assets for improved visual quality
- Code formatting refactored for improved readability across multiple files

### Localization
- Added `_locales/` directory with `en/messages.json` and `tr/messages.json`
- Updated i18n strings for field selector titles and JSON viewer labels
- Release script now includes `_locales` directory in package

Full Changelog: [v2.0.2...v2.0.3](https://github.com/bozkurtemre/graytool/compare/v2.0.2...v2.0.3)

## v2.0.2

### Features
- Full Chrome Manifest V3 compatibility
- Dynamic permission management (optional host permissions)
- Log detail viewing with JSON viewer
- Search history capture and reuse (Ctrl+H)
- Automatic light/dark theme detection
- Code generator (curl, fetch, axios, python, go, java, php)
- Field selector modal
- Import/export support

### Configuration
- v2 configuration format
- Button conditions (exists, equals, contains, startsWith, notEquals)
- Field bindings and fallback paths
- URL pattern-based button filtering
- Global field configuration

### Improvements
- Enhanced field auto-detection with configurable `GlobalFieldConfig` (JSON string parsing, max depth)
- Automatic URL placeholder detection (`{userId}`) with field mapping UI
- Modal overlays no longer close on outside click (prevents accidental data loss)
- ESC key now closes modals for improved accessibility
- "Message Detail" renamed to "Detail View" for consistency
- Updated JSON key colors in dark/light themes for better readability

### Technical
- Fast build system with esbuild
- TypeScript strict mode
- React 18 options page
- FontAwesome 7 icon support
- Prettier formatting
- XSS protection (escapeHtml, escapeAttr)

Full Changelog: [v2.0.1...v2.0.2](https://github.com/bozkurtemre/graytool/compare/v2.0.1...v2.0.2)

## v2.0.1

### Maintenance
- Bumped GitHub Actions dependencies (3 updates)

Full Changelog: [v2.0.0...v2.0.1](https://github.com/bozkurtemre/graytool/compare/v2.0.0...v2.0.1)

## v2.0.0

### Major Changes
- Manifest V2 → V3 migration
- Configuration v1 → v2 format
- Service worker architecture
- Optional permission model

### v1 → v2 Migration
- Automatic migration support
- `paramMapping` → `fieldBindings`
- URL template system
- Button-pattern association

Full Changelog: [v2.0.0](https://github.com/bozkurtemre/graytool/commits/v2.0.0)

## v1.x (Legacy)

Initial release. Basic button injection based on Manifest V2.
