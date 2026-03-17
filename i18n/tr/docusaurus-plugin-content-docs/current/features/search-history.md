---
sidebar_position: 4
title: Arama Geçmişi
---

# Arama Geçmişi (Search History)

Graytool, Graylog'da çalıştırdığınız arama sorgularını otomatik olarak kaydeder ve hızlıca tekrar kullanmanızı sağlar.

## Nasıl Çalışır?

### Sorgu Yakalama

Graytool, Graylog'un Ace Editor bileşenini dinler:

1. **Enter tuşu** — Arama çubuğunda Enter'a basıldığında
2. **Arama butonu** — Graylog'un arama butonuna tıklandığında

Sorgu üç farklı kaynaktan çıkarılır:
- `.ace_line` elementleri (görünür metin satırları)
- `textarea.ace_text-input` (Ace Editor giriş alanı)
- `.ace_scroller` metin içeriği

### Depolama

- Her URL pattern için **ayrı** geçmiş tutulur
- Maksimum **50 sorgu** saklanır (FIFO)
- Aynı sorgu tekrar çalıştırılırsa güncellenir (tekrarlanmaz)
- `chrome.storage.local` kullanılır (sync değil)

## Geçmiş Panelini Açma

### Klavye Kısayolu

| Platform | Kısayol |
|----------|---------|
| Windows/Linux | `Ctrl + H` |
| macOS | `Cmd + H` |

:::info
Kısayol, bir metin alanında yazarken tetiklenmez (Ace Editor hariç). Bu, Graylog'un kendi arama kutusunu kullanırken yanlışlıkla paneli açmanızı önler.
:::

### Panel Özellikleri

```
┌──────────────────────────────────────┐
│  Search History           [🔍] [🗑️] │
├──────────────────────────────────────┤
│  [Filter queries...]                  │
├──────────────────────────────────────┤
│  source:"api-gateway" AND level:ERROR │
│  2 dakika önce                  [📋] │
├──────────────────────────────────────┤
│  userId:"12345"                       │
│  15 dakika önce                 [📋] │
├──────────────────────────────────────┤
│  exception AND source:"payment-*"     │
│  1 saat önce                    [📋] │
└──────────────────────────────────────┘
```

### Panel İşlevleri

| İşlev | Açıklama |
|-------|----------|
| **Tıklama** | Sorguyu Graylog arama çubuğuna uygular ve çalıştırır |
| **📋 Kopyala** | Sorgu metnini panoya kopyalar |
| **Filtre** | Geçmişteki sorgular arasında arama yapar |
| **🗑️ Temizle** | Tüm geçmişi siler (onay diyalogu ile) |

## Sorgu Uygulama

Geçmiş panelinden bir sorguya tıklandığında:

1. Graylog'un Ace Editor textarea'sı bulunur
2. Sorgu metni textarea'ya yazılır
3. `input` ve `change` olayları dispatch edilir
4. Graylog arama butonu bulunur ve otomatik tıklanır
5. Panel kapanır

## URL Pattern Bazlı Geçmiş

Her URL pattern'in **kendi** arama geçmişi vardır:

```
Production Graylog  → 50 sorgu geçmişi
Staging Graylog     → 50 sorgu geçmişi
Development Graylog → 50 sorgu geçmişi
```

Bu sayede farklı ortamlardaki aramalar birbirini karıştırmaz.

## Limtler

| Limit | Değer |
|-------|-------|
| Maksimum sorgu sayısı | 50 / pattern |
| Depolama | `chrome.storage.local` |
| Dışa aktarım | Dahil değil |

## Ayarlar

- **Settings** → **Search History Enabled**: `true` / `false`
- Kapatıldığında sorgu yakalama durur
- Mevcut geçmiş silinmez, yalnızca yeni kayıt yapılmaz
- `Ctrl+H` kısayolu da devre dışı kalır

## Silme

Geçmiş panelindeki 🗑️ butonuna tıklayarak tüm geçmişi silebilirsiniz. Onay diyalogu gösterilir.

:::warning
Silme işlemi geri alınamaz. Yalnızca aktif URL pattern'in geçmişi silinir.
:::
