---
sidebar_position: 7
title: İçe/Dışa Aktarım
---

# İçe/Dışa Aktarım (Import/Export)

Graytool yapılandırmasını ortamlar ve takım üyeleri arasında paylaşmanızı sağlar.

## Dışa Aktarım (Export)

### Nasıl Yapılır

1. **Settings** → **"Export"** butonuna tıklayın
2. Yapılandırma JSON dosyası olarak indirilir
3. Dosya adı: `graytool-config.json`

### Dışa Aktarılan İçerik

Dışa aktarım, tüm yapılandırmayı içerir:

```json
{
  "version": 2,
  "urlPatterns": [...],
  "buttons": [...],
  "globalFieldConfig": {...},
  "settings": {...}
}
```

:::info
Arama geçmişi dışa aktarıma **dahil edilmez**. Yalnızca yapılandırma verileri aktarılır.
:::

## İçe Aktarım (Import)

### Dosyadan İçe Aktarım

1. **Settings** → **"Import"** bölümüne gidin
2. **"Choose File"** ile daha önce dışa aktarılmış JSON dosyasını seçin
3. **"Import"** butonuna tıklayın

### Metin ile İçe Aktarım

1. **Settings** → **"Import"** bölümüne gidin
2. Metin alanına JSON yapılandırmayı yapıştırın
3. **"Import"** butonuna tıklayın

### İçe Aktarım Davranışı

- Mevcut yapılandırma **tamamen değiştirilir** (üzerine yazılır)
- Geçersiz JSON reddedilir
- Başarılı/başarısız durum mesajı gösterilir

:::warning
İçe aktarım mevcut yapılandırmanızı **siler**. Önce mevcut yapılandırmanızı dışa aktararak yedeklemenizi öneririz.
:::

## Yapılandırma Paylaşımı

### Takım İçi Paylaşım

1. Takım lideri yapılandırmayı oluşturur ve dışa aktarır
2. JSON dosyasını takım ile paylaşır (Slack, e-posta, Git repo)
3. Takım üyeleri dosyayı içe aktarır
4. Herkes aynı butonları ve ayarları kullanır

### Ortam Bazlı Yapılandırma

Farklı ortamlar için ayrı yapılandırma dosyaları oluşturabilirsiniz:

```
graytool-config-production.json
graytool-config-staging.json
graytool-config-development.json
```

## V1 → V2 Migrasyon

Eski formattaki (v1) yapılandırma dosyaları, içe aktarım sırasında otomatik olarak v2 formatına dönüştürülür:

- `paramMapping` → `fieldBindings` dönüşümü
- URL yapısı (`baseUrl` + `route`) → URL template dönüşümü
- Tüm butonlar "tüm pattern'lerde göster" moduna ayarlanır
- Buton isimleri ve koşulları korunur
