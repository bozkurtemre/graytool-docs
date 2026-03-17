---
sidebar_position: 1
title: Kurulum
---

# Kurulum

Graytool'u Chrome tarayıcınıza yüklemenin iki yolu vardır.

## Geliştirici Modunda Yükleme (Önerilen)

### Ön gereksinimler

- Google Chrome (veya Chromium tabanlı bir tarayıcı)
- Node.js (v18+) ve npm

### Adımlar

1. **Projeyi klonlayın:**

```bash
git clone https://github.com/graytool/graytool.git
cd graytool
```

2. **Bağımlılıkları yükleyin:**

```bash
npm install
```

3. **Projeyi derleyin:**

```bash
npm run build
```

4. **Chrome'a yükleyin:**
   - Chrome'da `chrome://extensions/` adresine gidin
   - Sağ üstten **"Developer mode"** (Geliştirici modu) seçeneğini açın
   - **"Load unpacked"** (Paketlenmemiş yükle) butonuna tıklayın
   - Projedeki `src` klasörünü seçin

5. **Hazır!** Toolbar'da Graytool ikonu görünecektir.

### Güncelleme

Kod değişikliklerinden sonra:

```bash
npm run build
```

Ardından `chrome://extensions/` sayfasındaki Graytool kartındaki **yenile** (🔄) butonuna tıklayın.

## Production Build

Dağıtım için optimize edilmiş build:

```bash
npm run build:prod
```

Bu komut kaynak haritaları olmadan küçültülmüş (minified) dosyalar üretir.

## Watch Mode (Geliştirme)

Dosya değişikliklerinde otomatik yeniden derleme:

```bash
npm run dev
```

:::tip
Watch modunda her değişiklikte Chrome eklentisini yeniden yüklemeniz gerekir. `chrome://extensions/` sayfasındaki yenile butonunu kullanın.
:::

## Sorun Giderme

### Eklenti yüklenmiyor

- `src` klasörünün seçildiğinden emin olun (proje kök dizini değil)
- `npm run build` komutunun başarılı olduğunu doğrulayın
- Chrome'un güncel olduğundan emin olun

### İzin hataları

Graytool, her URL pattern için ayrı izin ister. İlk URL pattern'i eklediğinizde Chrome izin diyalogu gösterecektir. "İzin ver" demeniz gerekir.
