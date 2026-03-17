---
sidebar_position: 3
title: Alan Keşfi
---

# Alan Keşfi (Field Detection)

Graytool, log satırlarından alanları otomatik olarak keşfetmek için birden fazla strateji kullanır.

## Keşif Stratejileri

### Öncelik Sırası

```
1. Data Attributes (en yüksek) — data-field, data-testid
2. JSON Message Parsing         — Clipboard, full_message, pre tags
3. DOM Patterns (en düşük)     — dt/dd, field-name class
```

Her strateji bağımsız çalışır ve bulunan alanlar birleştirilip tekilleştirilir.

## Strateji 1: Data Attributes

En güvenilir yöntem. Graylog'un DOM yapısındaki data attribute'larını okur.

### Legacy Format

```html
<td data-field="userId">12345</td>
<td data-field="source">api-gateway</td>
```

### Modern Format (Graylog 5.x+)

```html
<td data-testid="message-summary-field-userId">12345</td>
<td data-testid="message-summary-field-source">api-gateway</td>
```

### Kaynak Tipi

```typescript
source: "data-field"  // Öncelik: 4 (en yüksek)
```

## Strateji 2: JSON Message Parsing

Log satırındaki JSON içeriğini bulur ve alanlarını çıkarır.

### JSON Kaynakları (öncelik sırasıyla)

1. **Clipboard butonu** — Kopyalama butonu JSON içeriyorsa:
```html
<button data-clipboard-text='{"userId":"12345","level":"ERROR"}'>Copy</button>
```

2. **full_message alanı** — Genişletilmiş mesaj JSON içeriyorsa:
```html
<td data-field="full_message">{"userId":"12345","request":{...}}</td>
```

3. **Pre tags** — Kod blokları JSON içeriyorsa:
```html
<pre>{"userId":"12345","level":"ERROR"}</pre>
```

### JSON Düzleştirme (Flatten)

İç içe JSON nesneleri düzleştirilir:

```json
// Orijinal
{
  "userId": "12345",
  "context": {
    "user": {
      "name": "John",
      "role": "admin"
    }
  },
  "tags": ["api", "auth"]
}

// Düzleştirilmiş
{
  "userId": "12345",
  "context.user.name": "John",
  "context.user.role": "admin",
  "tags.0": "api",
  "tags.1": "auth"
}
```

### Derinlik Limiti

`jsonParseMaxDepth` ayarı ile kontrol edilir (varsayılan: 5):

```
Derinlik 0: { "a": { "b": { "c": "value" } } }
Derinlik 1: a → obje (devam)
Derinlik 2: a.b → obje (devam)
Derinlik 3: a.b.c → "value" (string, durdur)
```

### JSON String Parsing

`parseJsonStrings: true` olduğunda, string değerlerde gömülü JSON aranır:

```json
// Orijinal
{ "details": "{\"userId\": \"123\"}" }

// Parse sonucu
{ "details.userId": "123" }
```

### Kaynak Tipi

```typescript
source: "json-parse"  // Öncelik: 2
```

## Strateji 3: DOM Patterns

Yapısal HTML elementlerinden alan keşfi yapar.

### Description List (dt/dd)

Graylog'un genişletilmiş görünümünde:

```html
<dl>
  <dt>userId</dt>
  <dd>12345</dd>
  <dt>source</dt>
  <dd>api-gateway</dd>
</dl>
```

### Field Name Classes

```html
<span class="field-name">userId</span>
<span class="field-value">12345</span>
```

### Kaynak Tipi

```typescript
source: "text-pattern"  // Öncelik: 1 (en düşük)
```

## Tekilleştirme (Deduplication)

Aynı alan birden fazla strateji tarafından keşfedildiğinde, en yüksek öncelikli kaynak korunur:

```
Öncelik sırası:
  data-field    → 4 (en yüksek)
  dom-attribute → 3
  json-parse    → 2
  text-pattern  → 1 (en düşük)
```

### Örnek

```
"userId" bulundu:
  - data-field: "12345" (öncelik 4)     ← Seçilir ✅
  - json-parse: "12345" (öncelik 2)     ← Atlanır
  - text-pattern: "12345" (öncelik 1)   ← Atlanır
```

## DiscoveredField Yapısı

```typescript
interface DiscoveredField {
  name: string;         // Alan adı: "userId"
  value: string;        // Alan değeri: "12345"
  source: FieldSource;  // Keşif yöntemi: "data-field"
  element?: Element;    // DOM referansı (opsiyonel)
}

type FieldSource = "data-field" | "json-parse" | "text-pattern" | "dom-attribute";
```

## Row Field Prefixes

Bazı Graylog yapılandırmaları alanlara prefix ekler. Graytool, yapılandırılmış prefix'leri arayarak eşleşme yapar:

```
Prefix'ler: ["msg.", "context.", ""]

Aranan alan: "userId"
Tarama sırası:
  1. "msg.userId"     → { source: "data-field", value: "12345" } ✅
  2. "context.userId"  → Bulunamadı
  3. "userId"          → Bulunamadı (zaten bulundu)
```

## Sorun Giderme

### Alanlar keşfedilmiyor

1. Sayfada gerçekten log satırları var mı kontrol edin
2. Graylog versiyonunuzun desteklendiğinden emin olun
3. `Row Field Prefixes` ayarını kontrol edin
4. Tarayıcı konsolunda hata olup olmadığını kontrol edin

### Yanlış alan değerleri

1. `parseJsonStrings` ayarını kontrol edin
2. `jsonParseMaxDepth` değerini artırmayı deneyin
3. JSON viewer ile ham verileri inceleyin
