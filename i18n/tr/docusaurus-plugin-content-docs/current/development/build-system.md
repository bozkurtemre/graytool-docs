---
sidebar_position: 2
title: Build Sistemi
---

# Build Sistemi

Graytool, **esbuild** kullanarak hızlı derleme yapan özel bir build sistemi kullanır.

## Build Süreci

```
1. Build artefaktları temizlenir
2. TypeScript/TSX dosyaları IIFE formatında bundle edilir
3. TailwindCSS PostCSS ile işlenir
4. FontAwesome asset'leri src/webfonts/ konumuna kopyalanır
5. CSS'teki font yolları Chrome eklentisi uyumluluğu için düzeltilir
```

## Giriş Noktaları (Entry Points)

| Kaynak | Çıktı |
|--------|-------|
| `src/background.ts` | `src/background.js` |
| `src/inject/index.ts` | `src/inject/index.js` |
| `src/options/options.tsx` | `src/options/options.js` |

## Bundle Formatı

**IIFE (Immediately Invoked Function Expression)** — Chrome extension content script'ler için en uygun format:

```javascript
(() => {
  // Tüm kod burada kapsüllenir
  // Global scope'u kirletmez
})();
```

## Build Modları

### Development Build

```bash
npm run build
```

- Source map'ler dahildir
- Küçültme (minification) yok
- Hata ayıklama kolaylığı

### Production Build

```bash
npm run build:prod
```

- Source map'ler dahil değil
- Kod küçültülür (minified)
- Daha küçük dosya boyutu

### Watch Mode

```bash
npm run dev
```

- Dosya değişikliklerinde otomatik yeniden build
- Development build ayarları kullanılır

## FontAwesome İşleme

Build süreci FontAwesome font dosyalarını özel olarak işler:

1. Font dosyaları `node_modules/@fortawesome/fontawesome-free/webfonts/` konumundan kopyalanır
2. `src/webfonts/` klasörüne yerleştirilir
3. CSS'teki font yolları `../webfonts/` şeklinde güncellenir

Bu, Chrome extension'ın font dosyalarını doğru konumdan yükleyebilmesini sağlar.

## Çıktı Yapısı

Build sonrası `src/` dizini:

```
src/
├── background.js        ← Derlenmiş service worker
├── inject/
│   └── index.js         ← Derlenmiş content script
├── options/
│   └── options.js       ← Derlenmiş options page
├── css/
│   └── fontawesome.css  ← İşlenmiş CSS
├── webfonts/            ← Font dosyaları
└── manifest.json        ← Değişmez
```

:::info
Çıktı `src/` klasörüne yazılır çünkü Chrome extension doğrudan `src/` klasöründen yüklenir (`Load unpacked`). Ayrı bir `dist/` klasörü kullanılmaz.
:::

## Release

```bash
npm run release
```

`src/` klasörünü bir zip dosyası olarak paketler. Bu dosya Chrome Web Store'a yüklenebilir.

## Build Yapılandırması

Build yapılandırması `tasks/build.js` dosyasındadır. esbuild API'si kullanılır:

```javascript
// Temel yapılandırma (kavramsal)
esbuild.build({
  entryPoints: ["src/background.ts", "src/inject/index.ts", "src/options/options.tsx"],
  bundle: true,
  format: "iife",
  outdir: "src",
  sourcemap: isDev,
  minify: !isDev,
});
```
