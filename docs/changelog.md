---
sidebar_position: 101
title: Changelog
---

# Changelog

## v2.0.2 (Current)

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

### Technical
- Fast build system with esbuild
- TypeScript strict mode
- React 18 options page
- FontAwesome 7 icon support
- Prettier formatting
- XSS protection (escapeHtml, escapeAttr)

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

## v1.x (Legacy)

Initial release. Basic button injection based on Manifest V2.
