---
sidebar_position: 1
title: Buton Enjeksiyonu
---

# Buton Enjeksiyonu (Button Injection)

Graytool'un çekirdek özelliği, Graylog log satırlarına dinamik butonlar enjekte etmesidir.

## Nasıl Çalışır?

### Enjeksiyon Akışı

```
Log satırı DOM'da tespit edilir
    ↓
discoverRowFields() → Satırdaki alanlar keşfedilir
    ↓
Her buton için:
  ├─ isButtonAllowedForPattern() → URL pattern kontrolü
  ├─ evaluateConditions() → Koşul kontrolü
  ├─ resolveUrl() → URL template çözümleme
  └─ DOM'a buton elementi eklenir
    ↓
Message detail butonu eklenir (aktifse)
```

### Satır Tespit Stratejileri

Graytool, Graylog'un farklı versiyonlarına uyum sağlamak için çoklu tespit stratejisi kullanır:

| Strateji | Selector | Graylog Versiyonu |
|----------|----------|-------------------|
| Modern | `tbody[data-testid^='message-summary-field-']` | 5.x+ |
| Modern TR | `tr[data-testid^='message-summary-field-']` | 5.x+ |
| Legacy | `tr` with `[data-field]` children | 3.x, 4.x |
| Custom | `[class*='log-row']` | Özel temalar |
| Custom | `[class*='message-group']` | Özel temalar |
| Custom | `[class*='MessageTableEntry']` | Bazı 4.x versiyonları |

### Yerleştirme Noktası

Butonlar log satırının uygun bir bölümüne yerleştirilir. Strateji sırasıyla:

1. **Tablo satırındaki son `<td>`** — En yaygın durum
2. **Mesaj içerik alanı** — `[data-field="message"]` veya `.message-body`
3. **"message" sınıfı olan element** — Genel fallback
4. **Satır elementi** — Son çare

### Tekrar İşleme Koruması

Her satır yalnızca **bir kez** işlenir. `data-graytool-processed` özniteliği ile işaretlenir:

```html
<tr data-graytool-processed="true">
  <!-- Log satırı içeriği -->
  <td>
    <span class="gt-btn-container">
      <button class="gt-btn gt-btn-primary">View User</button>
    </span>
  </td>
</tr>
```

## URL Template Çözümleme

### Placeholder Değiştirme

```
Template: https://admin.com/users/{userId}/orders/{orderId}
Alanlar:  { userId: "12345", orderId: "ORD-789" }
Sonuç:    https://admin.com/users/12345/orders/ORD-789
```

### Çözüm Sırası

Her placeholder için:
1. **Doğrudan eşleşme:** `fields["userId"]`
2. **Binding fieldPath:** `button.fieldBindings[i].fieldPath`
3. **Fallback paths:** `button.fieldBindings[i].fallbackPaths[]`

### Başarısız Çözüm

Herhangi bir placeholder çözülemezse, `resolveUrl()` `null` döner ve buton **o satırda görünmez**.

## Periyodik İşleme

MutationObserver'ın yanı sıra, Graytool her **2 saniyede** bir mevcut satırları tarar:

```
Neden?
- Graylog SPA navigasyonu sırasında bazı satırlar observer'dan kaçabilir
- Pagination değişiklikleri yeni satırlar ekleyebilir
- Yavaş yüklenen içerik gecikmeli olarak görünebilir
```

### Retry Mekanizması

İlk taramada satır bulunamazsa, Graytool artan gecikmelerle tekrar dener:

```
Deneme 1: 100ms sonra
Deneme 2: 300ms sonra
Deneme 3: 600ms sonra
Deneme 4: 1000ms sonra
Deneme 5: 2000ms sonra
Toplam: ~10 saniye
```

5 denemeden sonra vazgeçer (sayfa muhtemelen log görüntülemiyor).

## Message Detail Butonu

`showMessageDetailButton: true` olduğunda, her satıra ek bir 🔍 butonu eklenir:

- Yalnızca satırda en az 1 alan keşfedilirse görünür
- Tıklandığında `graytool:open-detail` özel olayı dispatch eder
- JSON viewer bu olayı dinler ve paneli açar

## Stil ve Görünüm

Butonlar Graylog'un tasarım diline uyum sağlar:

```css
.gt-btn {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.15s;
}
```

Renk varyantları: `primary`, `default`, `danger`, `warning`, `success`

Her variant, Graylog'un açık ve koyu temasına göre otomatik olarak ayarlanır.
