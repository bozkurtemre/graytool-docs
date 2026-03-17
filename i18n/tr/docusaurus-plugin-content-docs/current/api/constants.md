---
sidebar_position: 3
title: Sabitler
---

# Sabitler (Constants)

`src/shared/constants.ts` — Tüm magic string'ler ve paylaşılan değerler.

:::danger Önemli Kural
Magic string'ler asla doğrudan kullanılmaz. Tüm sabitler bu modülden import edilmelidir.
:::

## Storage Anahtarları

### STORAGE_KEY

Ana yapılandırma storage anahtarı.

```typescript
export const STORAGE_KEY = "graytool_config";
```

**Kullanım:** `chrome.storage.sync` üzerinde yapılandırma kaydetme/okuma

### SEARCH_HISTORY_PREFIX

Arama geçmişi storage anahtarı prefix'i.

```typescript
export const SEARCH_HISTORY_PREFIX = "graytool_search_history_";
```

**Kullanım:** `chrome.storage.local` üzerinde `${SEARCH_HISTORY_PREFIX}${patternId}` formatında

### TAB_COLLAPSED_KEY

JSON viewer tab daraltma durumu anahtarı.

```typescript
export const TAB_COLLAPSED_KEY = "graytool_tabs_collapsed";
```

**Kullanım:** `localStorage` üzerinde boolean değer

## Limitler

### MAX_HISTORY_ITEMS

Her URL pattern için saklanacak maksimum arama sorgusu sayısı.

```typescript
export const MAX_HISTORY_ITEMS = 50;
```

## DOM Attribute'ları

### PROCESSED_ATTR

Satırın işlenip işlenmediğini belirten attribute.

```typescript
export const PROCESSED_ATTR = "data-graytool-processed";
```

**Kullanım:** Log satırlarına `setAttribute(PROCESSED_ATTR, "true")` ile eklenir.

### BTN_ID_ATTR

Buton tekrarını önleme attribute'u.

```typescript
export const BTN_ID_ATTR = "data-graytool-btn-id";
```

**Kullanım:** Her enjekte edilen butonda `setAttribute(BTN_ID_ATTR, buttonId)` ile set edilir.

## Zamanlama Değerleri

### OBSERVER_DEBOUNCE_MS

MutationObserver mutation olaylarını bekleme süresi.

```typescript
export const OBSERVER_DEBOUNCE_MS = 50; // 50ms
```

**Amaç:** Aşırı mutation olaylarının toplu işlenmesi

### PROCESS_INTERVAL_MS

Periyodik satır tarama aralığı.

```typescript
export const PROCESS_INTERVAL_MS = 2000; // 2 saniye
```

**Amaç:** Observer'ın kaçırabileceği yeni satırları yakalamak, SPA pagination geçişlerini ele almak

### THEME_CHECK_INTERVAL_MS

Tema değişikliği kontrol aralığı.

```typescript
export const THEME_CHECK_INTERVAL_MS = 500; // 500ms
```

**Amaç:** Graylog tema değişikliklerini algılamak (açık ↔ koyu)

## Kullanım Örnekleri

```typescript
import {
  STORAGE_KEY,
  PROCESSED_ATTR,
  BTN_ID_ATTR,
  OBSERVER_DEBOUNCE_MS,
  PROCESS_INTERVAL_MS,
  THEME_CHECK_INTERVAL_MS,
  MAX_HISTORY_ITEMS,
  SEARCH_HISTORY_PREFIX,
} from "../shared/constants";

// Satır işlenmiş mi kontrol et
if (row.hasAttribute(PROCESSED_ATTR)) return;

// Periyodik tarama başlat
setInterval(() => processExistingRows(config), PROCESS_INTERVAL_MS);

// Tema watcher
setInterval(() => checkTheme(), THEME_CHECK_INTERVAL_MS);
```
