---
sidebar_position: 7
title: Import/Export
---

# Import/Export

Share Graytool configuration across environments and team members.

## Export

### How To

1. Go to **Settings** → Click **"Export"**
2. Configuration downloads as a JSON file
3. Filename: `graytool-config.json`

### Exported Content

The export includes the full configuration:

```json
{
  "version": 2,
  "urlPatterns": [...],
  "buttons": [...],
  "globalFieldConfig": {...},
  "settings": {...}
}
```

:::info
Search history is **not included** in exports. Only configuration data is exported.
:::

## Import

### Import from File

1. Go to **Settings** → **"Import"** section
2. Click **"Choose File"** and select a previously exported JSON file
3. Click **"Import"**

### Import from Text

1. Go to **Settings** → **"Import"** section
2. Paste JSON configuration into the text area
3. Click **"Import"**

### Import Behavior

- Existing configuration is **completely replaced** (overwritten)
- Invalid JSON is rejected
- Success/failure status message is displayed

:::warning
Import **deletes** your current configuration. We recommend exporting your current configuration as a backup first.
:::

## Sharing Configuration

### Team Sharing

1. Team lead creates configuration and exports it
2. Shares the JSON file with the team (Slack, email, Git repo)
3. Team members import the file
4. Everyone uses the same buttons and settings

### Environment-Based Configuration

You can create separate configuration files for different environments:

```
graytool-config-production.json
graytool-config-staging.json
graytool-config-development.json
```

## V1 → V2 Migration

Old format (v1) configuration files are automatically converted to v2 format during import:

- `paramMapping` → `fieldBindings` conversion
- URL structure (`baseUrl` + `route`) → URL template conversion
- All buttons set to "show on all patterns" mode
- Button names and conditions are preserved
