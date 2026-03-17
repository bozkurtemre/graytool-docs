---
sidebar_position: 3
title: Mesaj Geçişi
---

# Mesaj Geçişi (Message Passing)

Graytool'un katmanları arası iletişim, Chrome'un mesaj geçişi mekanizması üzerinden gerçekleşir.

## Mesaj Tipleri

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

Eklentinin aktif olması gereken bir sayfaya girildiğinde gönderilir.

```typescript
interface ActivateMessage {
  type: "ACTIVATE";
  matchedPatternId?: string;  // Eşleşen URL pattern'in ID'si
}
```

**Tetikleyici:** `tabs.onUpdated` — sayfa yüklendiğinde
**Alıcı:** `inject/index.ts`
**Sonuç:** Content script aktif olur, satır işleme başlar

### DEACTIVATE

Eklentinin devre dışı kalması gereken durumlarda gönderilir.

```typescript
interface DeactivateMessage {
  type: "DEACTIVATE";
}
```

**Tetikleyici:** URL artık pattern ile eşleşmediğinde
**Alıcı:** `inject/index.ts`
**Sonuç:** Observer durur, stiller kaldırılır

### CONFIG_UPDATED

Yapılandırma değiştiğinde tüm sekmelere broadcast edilir.

```typescript
interface ConfigUpdatedMessage {
  type: "CONFIG_UPDATED";
}
```

**Tetikleyici:** `chrome.storage.onChanged` — ayarlar değiştiğinde
**Alıcı:** Tüm sekmelerdeki content script'ler
**Sonuç:** Content script'ler yapılandırmayı yeniden yükler

## Content Script → Background

### CHECK_URL

Content script, mevcut URL'nin bir pattern ile eşleşip eşleşmediğini sorar.

```typescript
interface CheckUrlMessage {
  type: "CHECK_URL";
}
```

**Yanıt:** `{ isMatch: boolean, matchedPatternId?: string }`

### GET_CONFIG

Content script, tam yapılandırmayı ister.

```typescript
interface GetConfigMessage {
  type: "GET_CONFIG";
}
```

**Yanıt:** `GrayToolConfig` nesnesi

### PING

Bağlantı kontrolü.

```typescript
interface PingMessage {
  type: "PING";
}
```

**Yanıt:** `{ pong: true }`

### REQUEST_PERMISSION

URL pattern için izin isteği.

```typescript
interface RequestPermissionMessage {
  type: "REQUEST_PERMISSION";
  pattern: string;
}
```

**Yanıt:** `boolean` — izin verildi mi

### HAS_PERMISSION

Belirli URL için izin sorgusu.

```typescript
interface HasPermissionMessage {
  type: "HAS_PERMISSION";
  url: string;
}
```

**Yanıt:** `boolean` — izin var mı

### GET_CONFIGURED_ORIGINS

Tüm yapılandırılmış URL pattern'lerini ister.

```typescript
interface GetConfiguredOriginsMessage {
  type: "GET_CONFIGURED_ORIGINS";
}
```

**Yanıt:** `string[]` — URL pattern listesi

## Özel Olaylar (Custom Events)

Content script içi iletişim için `CustomEvent` kullanılır:

### graytool:open-detail

Mesaj detay butonundan JSON viewer'a iletişim:

```typescript
document.dispatchEvent(new CustomEvent("graytool:open-detail", {
  detail: {
    fields: DiscoveredField[],
    config: GrayToolConfig,
    row: Element
  }
}));
```

## İletişim Diyagramı

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

## Hata Yönetimi

### Bağlantı kopması

Content script, background ile bağlantısını kaybedebilir (service worker uyudu):

```typescript
try {
  const response = await chrome.runtime.sendMessage({ type: "GET_CONFIG" });
} catch (error) {
  // Service worker uyanmadı — sessiz başarısızlık
  console.log("Graytool: Connection error:", error);
}
```

### Yanıt bekleme

Mesajlar asenkron olarak işlenir. Background handler'lar `sendResponse` veya Promise döner.
