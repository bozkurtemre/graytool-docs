---
sidebar_position: 2
title: Storage API
---

# Storage API

`src/shared/storage.ts` — Tüm Chrome storage erişimi bu modül üzerinden yapılmalıdır.

:::danger Önemli Kural
`chrome.storage` API'sine doğrudan erişim **yasaktır**. Tüm storage işlemleri bu modül üzerinden yapılmalıdır.
:::

## Yapılandırma Fonksiyonları

### getConfig()

Mevcut yapılandırmayı yükler.

```typescript
async function getConfig(): Promise<GrayToolConfig>
```

**Davranış:**
- `chrome.storage.sync` üzerinden yapılandırmayı okur
- Yapılandırma bulunamazsa varsayılan değerleri döner
- v1 format algılanırsa otomatik olarak v2'ye taşır (migrate)

**Kullanım:**

```typescript
import { getConfig } from "../shared/storage";

const config = await getConfig();
console.log(config.version); // 2
console.log(config.buttons); // ButtonConfig[]
```

### saveConfig()

Yapılandırmayı kısmi güncelleme ile kaydeder.

```typescript
async function saveConfig(partial: Partial<GrayToolConfig>): Promise<void>
```

**Davranış:**
- Mevcut yapılandırmayı okur
- Verilen kısmi güncellemeyi mevcut yapılandırmayla birleştirir
- `chrome.storage.sync` üzerine yazar
- `chrome.runtime.lastError` kontrolü yapar

**Kullanım:**

```typescript
import { saveConfig } from "../shared/storage";

// Yalnızca settings'i güncelle
await saveConfig({
  settings: {
    ...config.settings,
    enabled: false,
  },
});

// Buton ekle
await saveConfig({
  buttons: [...config.buttons, newButton],
});
```

### getDefaultConfig()

Varsayılan v2 yapılandırma şablonunu döner.

```typescript
function getDefaultConfig(): GrayToolConfig
```

**Dönen Değer:**

```typescript
{
  version: 2,
  urlPatterns: [],
  buttons: [],
  globalFieldConfig: {
    defaultMessageField: null,
    rowFieldPrefixes: ["msg.", "context.", ""],
    parseJsonStrings: true,
    jsonParseMaxDepth: 5,
  },
  settings: {
    enabled: true,
    showMessageDetailButton: true,
    jsonViewerEnabled: true,
    keyboardShortcutsEnabled: true,
    searchHistoryEnabled: true,
  },
}
```

## Arama Geçmişi Fonksiyonları

### getSearchHistory()

Belirli URL pattern için arama geçmişini getirir.

```typescript
async function getSearchHistory(patternId: string): Promise<SearchHistoryEntry[]>
```

**Parametreler:**
- `patternId` — URL pattern'in benzersiz kimliği

**Davranış:**
- `chrome.storage.local` üzerinden okur
- Boş veya tanımsız ise boş dizi döner
- Maksimum 50 giriş saklanır

### saveSearchQuery()

Bir arama sorgusunu geçmişe kaydeder.

```typescript
async function saveSearchQuery(patternId: string, query: string): Promise<void>
```

**Parametreler:**
- `patternId` — URL pattern'in benzersiz kimliği
- `query` — Kaydedilecek arama sorgusu

**Davranış:**
- Aynı sorgu zaten mevcutsa günceller (tekrar zaman damgası)
- 50 sınırını aşarsa en eski girişi siler
- `chrome.storage.local` üzerine yazar

### clearSearchHistory()

Belirli URL pattern için tüm arama geçmişini temizler.

```typescript
async function clearSearchHistory(patternId: string): Promise<void>
```

## V1 → V2 Migrasyon

`getConfig()` çağrıldığında v1 format algılanırsa otomatik migrasyon yapılır:

### Dönüştürülen Özellikler

| V1 | V2 |
|----|----|
| `paramMapping` | `fieldBindings` |
| `baseUrl` + `route` | `url` (template) |
| — | `urlPatternIds: []` (tümü) |
| Button `name` | Button `label` |
| Route `conditions` | Button `conditions` |

### Migrasyon Akışı

```
v1 config algılandı
    ↓
Her buton için:
  ├─ paramMapping → fieldBindings dönüşümü
  ├─ URL template oluşturma
  ├─ Koşulları koruma
  └─ urlPatternIds boş (tüm pattern'ler)
    ↓
v2 config oluşturuldu
    ↓
chrome.storage.sync'e kaydet
    ↓
v2 config döndür
```

## Storage Anahtarları

| Anahtar | Depolama | Açıklama |
|---------|----------|----------|
| `graytool_config` | `sync` | Ana yapılandırma |
| `graytool_search_history_{patternId}` | `local` | Arama geçmişi |
| `graytool_tabs_collapsed` | `localStorage` | Tab daraltma durumu |
