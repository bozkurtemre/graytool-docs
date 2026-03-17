---
slug: /
sidebar_position: 1
title: Introduction
---

# Graytool — Graylog Developer Toolkit

**Graytool** is a Chrome extension (Manifest V3) that enhances Graylog log management interfaces by injecting customizable action buttons into log rows. These buttons allow developers to quickly navigate from log entries to related admin panels, user details, or other internal tools.

## Key Features

- 🎯 **URL Pattern Matching** — Only activates on configured Graylog instances
- 🔘 **Customizable Buttons** — Dynamic buttons with URL templates and field bindings
- 🔍 **Automatic Field Discovery** — Discovers fields from log rows automatically (data attributes, JSON parsing, DOM patterns)
- 🎛️ **Conditional Visibility** — Show/hide buttons based on field values
- 📋 **JSON Viewer** — View, search, and filter log message details
- 🕐 **Search History** — Graylog searches are saved and reusable
- 📦 **Import/Export** — Share configuration across environments
- 🎨 **Theme Support** — Automatic adaptation to Graylog's light/dark theme

## How It Works

```
User visits URL
    → background.ts checks URL pattern
    → Match found → Content script is injected
    → Log rows are processed → Buttons are injected
    → User clicks button → URL opens in new tab
```

## Quick Start

1. [Install the extension](/getting-started/installation)
2. [Add your first URL Pattern](/getting-started/quick-start)
3. [Create your first button](/getting-started/first-button)

## Who Is It For?

Graytool is designed especially for:

- **Backend developers** — Quickly navigate from logs to user/order details
- **DevOps engineers** — Manage multiple Graylog instances
- **Team leads** — Share standard navigation buttons with the entire team

## Version

Current version: **v2.0.2** — Chrome Manifest V3
