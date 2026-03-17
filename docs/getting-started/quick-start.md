---
sidebar_position: 2
title: Quick Start
---

# Quick Start

This guide will get Graytool up and running in 5 minutes from installation.

## 1. Open the Settings Page

Right-click the Graytool toolbar icon and select **"Options"**.

Alternative: `chrome://extensions/` → Graytool → **"Details"** → **"Extension options"**

## 2. Add a URL Pattern

Go to the **"URL Patterns"** tab and click **"Add Pattern"**.

| Field | Description | Example |
|-------|-------------|---------|
| **Label** | Descriptive name for the pattern | `Production Graylog` |
| **Pattern** | URL matching pattern (`*` wildcard) | `https://graylog.company.com/*` |

Click **Save**. Chrome will show a permission dialog — click **"Allow"**.

### Pattern Examples

```
https://graylog.company.com/*          → Single instance
https://graylog-*.company.com/*        → Staging/Production separation
https://*/search*                      → Search pages on all domains
```

:::info
The `*` wildcard matches any text. You can add multiple patterns.
:::

## 3. Test the Extension

Visit the Graylog URL you configured. If everything is set up correctly:

- Graytool activates automatically when the page loads
- You won't see buttons yet (because you haven't defined any)
- However, if the **Message Detail** feature is enabled, you'll see a 🔍 button on log rows

## 4. Next Steps

- [Create your first button →](/getting-started/first-button)
- [Learn about button configuration →](/configuration/buttons)
- [How field detection works →](/features/field-detection)
