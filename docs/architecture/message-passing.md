---
sidebar_position: 3
title: Message Passing
---

# Message Passing

Communication between Graytool's layers is handled through Chrome's message passing mechanism.

## Message Types

```typescript
type GrayToolMessage =
  | ActivateMessage
  | DeactivateMessage
  | ConfigUpdatedMessage
  | CheckUrlMessage
  | GetConfigMessage
  | PingMessage
  | RequestPermissionMessage
  | HasPermissionMessage
  | GetConfiguredOriginsMessage;
```

## Background → Content Script

### ACTIVATE

Sent when the user navigates to a page where the extension should be active.

```typescript
interface ActivateMessage {
  type: "ACTIVATE";
  matchedPatternId?: string;  // ID of the matched URL pattern
}
```

**Trigger:** `tabs.onUpdated` — when a page loads
**Receiver:** `inject/index.ts`
**Result:** Content script activates, row processing begins

### DEACTIVATE

Sent when the extension should be deactivated.

```typescript
interface DeactivateMessage {
  type: "DEACTIVATE";
}
```

**Trigger:** URL no longer matches any pattern
**Receiver:** `inject/index.ts`
**Result:** Observer stops, styles removed

### CONFIG_UPDATED

Broadcast to all tabs when configuration changes.

```typescript
interface ConfigUpdatedMessage {
  type: "CONFIG_UPDATED";
}
```

**Trigger:** `chrome.storage.onChanged` — when settings change
**Receiver:** Content scripts in all tabs
**Result:** Content scripts reload configuration

## Content Script → Background

### CHECK_URL

Content script asks whether the current URL matches a pattern.

```typescript
interface CheckUrlMessage {
  type: "CHECK_URL";
}
```

**Response:** `{ isMatch: boolean, matchedPatternId?: string }`

### GET_CONFIG

Content script requests the full configuration.

```typescript
interface GetConfigMessage {
  type: "GET_CONFIG";
}
```

**Response:** `GrayToolConfig` object

### PING

Connection health check.

```typescript
interface PingMessage {
  type: "PING";
}
```

**Response:** `{ pong: true }`

### REQUEST_PERMISSION

Permission request for a URL pattern.

```typescript
interface RequestPermissionMessage {
  type: "REQUEST_PERMISSION";
  pattern: string;
}
```

**Response:** `boolean` — whether permission was granted

### HAS_PERMISSION

Permission query for a specific URL.

```typescript
interface HasPermissionMessage {
  type: "HAS_PERMISSION";
  url: string;
}
```

**Response:** `boolean` — whether permission exists

### GET_CONFIGURED_ORIGINS

Requests all configured URL patterns.

```typescript
interface GetConfiguredOriginsMessage {
  type: "GET_CONFIGURED_ORIGINS";
}
```

**Response:** `string[]` — list of URL patterns

## Custom Events

`CustomEvent` is used for intra-content-script communication:

### graytool:open-detail

Communication from the message detail button to the JSON viewer:

```typescript
document.dispatchEvent(new CustomEvent("graytool:open-detail", {
  detail: {
    fields: DiscoveredField[],
    config: GrayToolConfig,
    row: Element
  }
}));
```

## Communication Diagram

```
┌─────────────┐              ┌─────────────┐
│  Background │              │   Content   │
│   Service   │  ACTIVATE →  │   Script    │
│   Worker    │  DEACTIVATE →│  (inject)   │
│             │  CONFIG_UPD →│             │
│             │              │             │
│             │ ← CHECK_URL  │             │
│             │ ← GET_CONFIG │             │
│             │ ← PING       │             │
│             │ ← REQ_PERM   │             │
│             │ ← HAS_PERM   │             │
│             │ ← GET_ORIGINS│             │
└─────────────┘              └──────┬──────┘
                                    │
                            CustomEvent
                                    │
                             ┌──────▼──────┐
                             │  JSON Viewer │
                             │  Search Hist │
                             └─────────────┘


┌─────────────┐
│   Options   │  saveConfig() → chrome.storage.sync
│    Page     │
│   (React)   │  → storage.onChanged → background broadcasts
└─────────────┘
```

## Error Handling

### Connection Loss

Content scripts may lose connection to the background (service worker sleeps):

```typescript
try {
  const response = await chrome.runtime.sendMessage(message);
} catch (error) {
  // Service worker is sleeping or extension was updated
  // Silent failure — don't break Graylog
}
```
