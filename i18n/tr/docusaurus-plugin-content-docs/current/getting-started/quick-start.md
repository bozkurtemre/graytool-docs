---
sidebar_position: 2
title: Hızlı Başlangıç
---

# Hızlı Başlangıç

Bu rehber, Graytool'u kurulumdan itibaren 5 dakikada aktif hale getirmenizi sağlar.

## 1. Ayarlar Sayfasını Açın

Graytool'un toolbar ikonuna sağ tıklayıp **"Options"** (Seçenekler) seçeneğini tıklayın.

Alternatif: `chrome://extensions/` → Graytool → **"Details"** → **"Extension options"**

## 2. URL Pattern Ekleyin

**"URL Patterns"** sekmesine gidin ve **"Add Pattern"** butonuna tıklayın.

| Alan | Açıklama | Örnek |
|------|----------|-------|
| **Label** | Pattern için tanımlayıcı isim | `Production Graylog` |
| **Pattern** | URL eşleştirme deseni (`*` joker karakter) | `https://graylog.company.com/*` |

**Kaydet** butonuna tıklayın. Chrome bir izin diyalogu gösterecektir — **"İzin ver"** deyin.

### Pattern Örnekleri

```
https://graylog.company.com/*          → Tek instance
https://graylog-*.company.com/*        → Staging/Production ayrımı
https://*/search*                      → Tüm domainlerde arama sayfaları
```

:::info
`*` joker karakteri herhangi bir metin ile eşleşir. Birden fazla pattern ekleyebilirsiniz.
:::

## 3. Eklentiyi Test Edin

Yapılandırdığınız Graylog URL'sini ziyaret edin. Eğer her şey doğru yapılandırıldıysa:

- Sayfa yüklendiğinde Graytool otomatik olarak aktif olur
- Log satırlarında henüz buton görmezsiniz (çünkü buton tanımlamadınız)
- Ancak eğer **Message Detail** özelliği açıksa, log satırlarında 🔍 butonu görürsünüz

## 4. Sonraki Adımlar

- [İlk butonunuzu oluşturun →](/getting-started/first-button)
- [Buton yapılandırmasını öğrenin →](/configuration/buttons)
- [Alan keşfi nasıl çalışır →](/features/field-detection)
