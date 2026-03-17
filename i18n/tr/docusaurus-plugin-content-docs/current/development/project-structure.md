---
sidebar_position: 3
title: Proje Yapısı
---

# Proje Yapısı

## Dizin Ağacı

```
graytool/
├── src/                          # Extension kaynak kodu ve çıktı dizini
│   ├── manifest.json             # Chrome extension manifest (V3)
│   ├── background.ts             # Service worker kaynak kodu
│   ├── background.js             # Derlenmiş service worker
│   ├── inject/                   # Content script (Graylog'a enjekte edilir)
│   │   ├── index.ts              # Giriş noktası, aktivasyon koord.
│   │   ├── index.js              # Derlenmiş content script
│   │   ├── button-injector.ts    # Buton oluşturma ve URL çözümleme
│   │   ├── field-detector.ts     # Alan keşif stratejileri
│   │   ├── observer.ts           # MutationObserver (DOM değişiklikleri)
│   │   ├── row-processor.ts      # Log satırı işleme
│   │   └── ui/                   # Content script UI bileşenleri
│   │       ├── styles.ts         # Tema algılama ve CSS
│   │       ├── json-viewer.ts    # JSON görüntüleyici panel
│   │       ├── field-selector.ts # Alan seçici modal
│   │       └── search-history.ts # Arama geçmişi paneli
│   ├── options/                  # Ayarlar sayfası (React)
│   │   ├── options.tsx           # React giriş noktası
│   │   ├── options.js            # Derlenmiş options page
│   │   ├── options.html          # HTML kabuk
│   │   ├── options.css           # Tailwind CSS
│   │   └── OptionsPage.tsx       # Ana bileşen
│   ├── shared/                   # Paylaşılan modüller
│   │   ├── types.ts              # Tüm TypeScript tip tanımları
│   │   ├── storage.ts            # Chrome storage soyutlaması
│   │   ├── constants.ts          # Sabitler (timing, keys, attrs)
│   │   └── utils.ts              # Yardımcı fonksiyonlar
│   ├── css/                      # İşlenmiş CSS dosyaları
│   │   └── fontawesome.css       # FontAwesome stilleri
│   ├── icons/                    # Extension ikonları
│   ├── webfonts/                 # FontAwesome font dosyaları
│   └── logo.svg                  # Options sayfasında kullanılan logo
├── tasks/                        # Build scriptleri
│   ├── build.js                  # esbuild yapılandırması
│   ├── clean.js                  # Temizleme scripti
│   └── release.js                # Release paketleme scripti
├── docs/                         # Bu dokümantasyon sitesi
├── package.json                  # Bağımlılıklar ve scriptler
├── tsconfig.json                 # TypeScript yapılandırması
├── AGENTS.md                     # AI kodlama agent'ları için rehber
├── README.md                     # Proje tanıtımı
├── CONTRIBUTING.md               # Katkı rehberi
├── SECURITY.md                   # Güvenlik politikası
├── CODE_OF_CONDUCT.md            # Davranış kuralları
└── LICENSE                       # Lisans
```

## Modül Sorumlulukları

### src/shared/ — Paylaşılan Katman

Tüm diğer modüller tarafından kullanılan ortak kod. Bu katmana bağımlılık tek yönlüdür — shared diğer katmanlara bağımlı değildir.

| Dosya | Sorumluluk |
|-------|------------|
| `types.ts` | Tüm TypeScript interface ve type tanımları |
| `storage.ts` | Chrome storage.sync ve storage.local soyutlaması |
| `constants.ts` | Magic string'ler, timing değerleri, DOM attribute isimleri |
| `utils.ts` | XSS koruması (escape), clipboard erişimi |

### src/inject/ — Content Script

Graylog sayfalarına enjekte edilen kod. DOM erişimi vardır.

| Dosya | Sorumluluk |
|-------|------------|
| `index.ts` | Aktivasyon/deaktivasyon koordinasyonu |
| `button-injector.ts` | Buton DOM elementleri oluşturma, URL çözümleme |
| `field-detector.ts` | Üç strateji ile alan keşfi |
| `observer.ts` | Yeni satır tespiti (MutationObserver) |
| `row-processor.ts` | Tekil satır işleme orkestrasyon |
| `ui/styles.ts` | Tema algılama, CSS enjeksiyonu |
| `ui/json-viewer.ts` | JSON görüntüleyici tüm özellikleri |
| `ui/field-selector.ts` | Varsayılan alan seçici modal |
| `ui/search-history.ts` | Arama yakalama ve geçmiş paneli |

### src/background.ts — Service Worker

Chrome'un arka plan sürecinde çalışır. DOM erişimi yoktur.

### src/options/ — Ayarlar Sayfası

React ile yazılmış bağımsız SPA. `chrome://extensions/` → Options ile açılır.

## Bağımlılık Grafiği

```
shared/types.ts ←── Her modül
shared/constants.ts ←── Her modül
shared/storage.ts ←── background.ts, inject/index.ts, options/OptionsPage.tsx
shared/utils.ts ←── inject/button-injector.ts, inject/ui/json-viewer.ts

inject/index.ts
  ├── inject/row-processor.ts
  │     ├── inject/field-detector.ts
  │     └── inject/button-injector.ts
  ├── inject/observer.ts
  ├── inject/ui/styles.ts
  ├── inject/ui/json-viewer.ts
  ├── inject/ui/field-selector.ts
  └── inject/ui/search-history.ts
```
