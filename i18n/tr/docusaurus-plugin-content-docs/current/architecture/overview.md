---
sidebar_position: 1
title: Mimari Genel Bakış
---

# Mimari Genel Bakış

Graytool, Chrome Extension Manifest V3 mimarisi üzerine kurulmuştur. Üç ana katmandan oluşur: Background Service Worker, Content Script (Inject) ve Options Page.

## Bileşen Haritası

```
┌──────────────────────────────────────────────────────────────┐
│                    Chrome Extension                          │
├──────────────────────────────────────────────────────────────┤
│  src/background.ts      │ Service worker: URL eşleştirme    │
│  src/inject/            │ Eşleşen sayfalara enjekte edilen  │
│    index.ts             │   Giriş noktası, aktivasyon       │
│    button-injector.ts   │   Buton oluşturma, URL çözümleme  │
│    field-detector.ts    │   Alan keşif stratejileri          │
│    observer.ts          │   MutationObserver (DOM değişiklik)│
│    row-processor.ts     │   Log satırı işleme               │
│    ui/                  │   UI bileşenleri                   │
│      styles.ts          │     Tema ve stiller                │
│      json-viewer.ts     │     JSON görüntüleyici             │
│      field-selector.ts  │     Alan seçici modal              │
│      search-history.ts  │     Arama geçmişi paneli           │
│  src/options/           │ Eklenti ayarları UI (React)        │
│    options.tsx          │   Giriş noktası                    │
│    OptionsPage.tsx      │   Ana sayfa bileşeni               │
│  src/shared/            │ Paylaşılan kod                     │
│    types.ts             │   TypeScript tip tanımları         │
│    storage.ts           │   Chrome storage soyutlaması       │
│    constants.ts         │   Sabitler ve magic string'ler     │
│    utils.ts             │   Yardımcı fonksiyonlar            │
└──────────────────────────────────────────────────────────────┘
```

## Katmanlar

### 1. Background Service Worker

Chrome'un service worker mekanizması ile çalışır. **Sayfa içeriğine erişimi yoktur**, yalnızca Chrome API'lerine erişir.

**Sorumlulukları:**
- URL pattern eşleştirme
- Content script enjeksiyonu
- İzin yönetimi
- Yapılandırma değişikliği bildirimi

### 2. Content Script (Inject)

Eşleşen sayfalara enjekte edilir. **Sayfanın DOM'una erişebilir** ancak sayfanın JavaScript bağlamına erişemez.

**Sorumlulukları:**
- Log satırlarını tespit etme
- Alanları keşfetme
- Butonları enjekte etme
- JSON viewer, arama geçmişi gibi UI sağlama

### 3. Options Page

React ile yazılmış bağımsız bir sayfa. Chrome'un extension options mekanizmasını kullanır.

**Sorumlulukları:**
- Yapılandırma yönetimi
- URL pattern ekleme/düzenleme
- Buton tanımlama
- İçe/dışa aktarım

### 4. Shared Layer

Tüm katmanlar tarafından kullanılan ortak kod:

| Modül | İşlev |
|-------|-------|
| `types.ts` | Tüm tip tanımları |
| `storage.ts` | Tek storage erişim noktası |
| `constants.ts` | Sabitler (timing, DOM attr, keys) |
| `utils.ts` | XSS koruması, clipboard |

## İzolasyon

### Content Script İzolasyonu

Chrome content script'leri, web sayfasının JavaScript bağlamından **izole** çalışır:

- Sayfadaki `window` nesnesine doğrudan erişemez
- Kendi global scope'u vardır
- DOM'a erişebilir ama sayfa JS'ine erişemez
- Chrome API'lerine (`chrome.runtime`, `chrome.storage`) erişebilir

### CSS İzolasyonu

Graytool stilleri `gt-` prefix'i ile izole edilir:
- Graylog'un stillerini bozmaz
- Graylog'un stilleri Graytool'u etkilemez

## Manifest V3

Graytool, Chrome'un modern Manifest V3 sistemini kullanır:

```json
{
  "manifest_version": 3,
  "permissions": ["storage", "activeTab", "scripting", "tabs"],
  "optional_host_permissions": ["<all_urls>"],
  "background": {
    "service_worker": "background.js"
  }
}
```

### Temel Farklar (V2'den V3'e)

| Özellik | V2 | V3 |
|---------|----|----|
| Background | Persistent page | Service worker |
| Host permissions | Manifest'te | İsteğe bağlı (runtime) |
| Content script injection | Manifest'te | `chrome.scripting` API |
| CSP | Esnek | Daha katı |
