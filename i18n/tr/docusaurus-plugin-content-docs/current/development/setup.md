---
sidebar_position: 1
title: Geliştirme Ortamı
---

# Geliştirme Ortamı Kurulumu

## Ön Gereksinimler

- **Node.js** v18 veya üzeri
- **npm** v9 veya üzeri
- **Google Chrome** (veya Chromium tabanlı tarayıcı)
- **Git**

## Kurulum

```bash
git clone https://github.com/bozkurtemre/graytool.git
cd graytool
npm install
```

## Geliştirme Komutları

| Komut | Açıklama |
|-------|----------|
| `npm run build` | Geliştirme build (source map'ler dahil) |
| `npm run build:prod` | Production build (küçültülmüş, source map yok) |
| `npm run dev` | Watch mode — dosya değişikliğinde otomatik build |
| `npm run typecheck` | TypeScript tip kontrolü (emit yok) |
| `npm run format` | Prettier ile tüm dosyaları formatla |
| `npm run format:check` | Formatlama kontrolü (CI için) |
| `npm run lint` | typecheck + format:check |
| `npm run clean` | Build artefaktlarını temizle |
| `npm run release` | Release zip paketi oluştur |

## Chrome'a Yükleme

1. `npm run build` komutunu çalıştırın
2. Chrome'da `chrome://extensions/` adresine gidin
3. **"Developer mode"** seçeneğini etkinleştirin
4. **"Load unpacked"** tıklayın
5. Projedeki **`src`** klasörünü seçin

## Geliştirme İş Akışı

```
1. Kod değişikliği yapın
2. npm run build (veya dev modunda otomatik)
3. chrome://extensions/ → Graytool yenile butonu
4. Graylog sayfasını yenileyin
5. Test edin
```

:::tip
`npm run dev` komutu dosya değişikliklerinde otomatik build yapar, ancak Chrome eklentisini yeniden yüklemeniz gerekir.
:::

## Bağımlılıklar

### Runtime

| Paket | Versiyon | Açıklama |
|-------|---------|----------|
| `react` | 18.2.0 | UI framework |
| `react-dom` | 18.2.0 | React DOM renderer |
| `@fortawesome/fontawesome-free` | 7.2.0 | İkon kütüphanesi |

### Development

| Paket | Versiyon | Açıklama |
|-------|---------|----------|
| `typescript` | 5.0.0 | TypeScript derleyici |
| `esbuild` | 0.27.3 | Hızlı JavaScript bundler |
| `prettier` | 3.8.1 | Kod formatlayıcı |
| `@types/chrome` | 0.0.260 | Chrome API tipleri |

## TypeScript Yapılandırması

Proje **strict mode** ile yapılandırılmıştır:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx"
  }
}
```
