---
sidebar_position: 6
title: Tema Desteği
---

# Tema Desteği (Theming)

Graytool, Graylog'un açık ve koyu temalarına otomatik olarak uyum sağlar.

## Tema Algılama

Graytool, Graylog'un tema ayarını `localStorage.themeMode` üzerinden okur:

```typescript
function detectGraylogTheme(): "light" | "dark" {
  // localStorage'dan tema modunu oku
  // JSON-encoded değerleri çöz
  // Varsayılan: "dark"
}
```

### Algılama Zamanlaması

- Sayfa yüklendiğinde tema algılanır
- **500ms** aralıklarla tema değişikliği kontrol edilir
- Tema değişirse stiller otomatik güncellenir

## Renk Paleti

### Koyu Tema (Dark)

| Değişken | Değer | Kullanım |
|----------|-------|----------|
| `--gt-primary` | `rgb(98, 157, 226)` | Ana renk (Graylog Blue) |
| `--gt-danger` | `#AD0707` | Tehlike/hata |
| `--gt-warning` | `#C69B00` | Uyarı |
| `--gt-success` | `#00AE42` | Başarı |
| `--gt-text-primary` | `#ECECEC` | Ana metin |
| `--gt-text-secondary` | `#A0A0A0` | İkincil metin |
| `--gt-bg` | `#1a1a2e` | Arka plan |

**JSON Syntax Renkleri (Koyu):**

| Element | Renk |
|---------|------|
| Anahtarlar | `#56B6C2` (cyan) |
| String'ler | `#98C379` (yeşil) |
| Sayılar | `#D19A66` (turuncu) |
| Boolean | `#D19A66` |
| Null | `#A0A0A0` (gri) |

### Açık Tema (Light)

| Değişken | Değer | Kullanım |
|----------|-------|----------|
| `--gt-primary` | `rgb(87, 141, 204)` | Ana renk |
| `--gt-text-primary` | `#1F1F1F` | Ana metin |

**JSON Syntax Renkleri (Açık):**

| Element | Renk |
|---------|------|
| Anahtarlar | `#0066CC` (mavi) |
| String'ler | `#22863A` (koyu yeşil) |
| Sayılar | `#B08800` (altın) |

## CSS Sınıfları

Tüm Graytool elementleri `gt-` prefix'i ile adlandırılır:

```css
.gt-btn          /* Temel buton */
.gt-btn-primary  /* Mavi buton */
.gt-btn-default  /* Gri buton */
.gt-btn-danger   /* Kırmızı buton */
.gt-btn-warning  /* Sarı buton */
.gt-btn-success  /* Yeşil buton */

.gt-json-panel   /* JSON viewer paneli */
.gt-notification /* Bildirim */
```

### Neden `gt-` Prefix?

Graylog'un kendi CSS sınıflarıyla çakışmamak için tüm Graytool stilleri `gt-` prefix'i kullanır. Bu, eklentinin sayfanın görünümünü bozmamasını sağlar.

## Stil Enjeksiyonu

Tüm stiller tek bir `<style>` elementi olarak sayfaya enjekte edilir:

1. `inject/index.ts` aktivasyon sırasında `injectStyles()` çağırır
2. `ui/styles.ts` mevcut temayı algılar
3. CSS custom properties tema değerlerine göre ayarlanır
4. `<style id="graytool-styles">` olarak `<head>`'e eklenir
5. Deaktivasyon sırasında kaldırılır

## Tema Değişikliği

Kullanıcı Graylog'da temayı değiştirdiğinde:

1. Graytool 500ms aralıklarla kontrol eder
2. Tema değişikliği algılanır
3. Mevcut stiller kaldırılır
4. Yeni temaya uygun stiller enjekte edilir
5. Butonlar ve JSON viewer otomatik güncellenir

:::info
Tema geçişi anlık değildir — 500ms'ye kadar gecikme olabilir.
:::
