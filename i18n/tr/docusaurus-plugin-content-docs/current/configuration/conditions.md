---
sidebar_position: 4
title: Koşullar
---

# Koşullar (Conditions)

Koşullar, butonların hangi log satırlarında görüneceğini kontrol eder. Tüm koşullar **AND** mantığıyla değerlendirilir — hepsinin doğru olması gerekir.

## Yapı

```typescript
interface ButtonCondition {
  field: string;                      // Kontrol edilecek alan adı
  operator: ButtonConditionOperator;  // Karşılaştırma operatörü
  value?: string;                     // Karşılaştırma değeri
}

type ButtonConditionOperator =
  | "exists"      // Alan mevcut ve boş değil
  | "equals"      // Alan değeri tam eşleşir
  | "notEquals"   // Alan değeri eşleşmez
  | "contains"    // Alan değeri metni içerir
  | "startsWith"; // Alan değeri metin ile başlar
```

## Operatörler

### `exists` — Alan Mevcuttur

Alan tanımlı ve boş değilse koşul geçer. `value` parametresi gerekmez.

```json
{ "field": "userId", "operator": "exists" }
```

| Alan Değeri | Sonuç |
|-------------|-------|
| `"12345"` | ✅ Geçer |
| `""` | ❌ Geçmez |
| `undefined` | ❌ Geçmez |

### `equals` — Tam Eşleşme

Alan değeri verilen değerle birebir eşleşir.

```json
{ "field": "level", "operator": "equals", "value": "ERROR" }
```

| Alan Değeri | Sonuç |
|-------------|-------|
| `"ERROR"` | ✅ Geçer |
| `"error"` | ❌ Geçmez (büyük/küçük harf duyarlı) |
| `"WARNING"` | ❌ Geçmez |

### `notEquals` — Eşleşmeme

Alan değeri verilen değerden farklıdır.

```json
{ "field": "environment", "operator": "notEquals", "value": "production" }
```

| Alan Değeri | Sonuç |
|-------------|-------|
| `"staging"` | ✅ Geçer |
| `"development"` | ✅ Geçer |
| `"production"` | ❌ Geçmez |

### `contains` — İçerme

Alan değeri verilen metni içerir.

```json
{ "field": "source", "operator": "contains", "value": "api-gateway" }
```

| Alan Değeri | Sonuç |
|-------------|-------|
| `"service-api-gateway-01"` | ✅ Geçer |
| `"api-gateway"` | ✅ Geçer |
| `"web-server"` | ❌ Geçmez |

### `startsWith` — Başlangıç

Alan değeri verilen metin ile başlar.

```json
{ "field": "source", "operator": "startsWith", "value": "api-" }
```

| Alan Değeri | Sonuç |
|-------------|-------|
| `"api-gateway"` | ✅ Geçer |
| `"api-auth-service"` | ✅ Geçer |
| `"web-api-service"` | ❌ Geçmez |

## Çoklu Koşullar (AND Mantığı)

Tüm koşullar **aynı anda** doğru olmalıdır:

```json
{
  "conditions": [
    { "field": "level", "operator": "equals", "value": "ERROR" },
    { "field": "userId", "operator": "exists" },
    { "field": "source", "operator": "contains", "value": "payment" }
  ]
}
```

Bu buton yalnızca şu durumda görünür:
- Log seviyesi `ERROR` **VE**
- `userId` alanı mevcut **VE**
- Kaynak `payment` kelimesini içeriyor

## Koşul Olmadan

Bir butona hiç koşul eklenmezse, URL template'deki tüm placeholder'lar çözülebildiği sürece buton **her satırda** görünür.

## Pratik Örnekler

### Yalnızca Hata Loglarında

```json
[{ "field": "level", "operator": "equals", "value": "ERROR" }]
```

### Belirli Servis

```json
[
  { "field": "source", "operator": "startsWith", "value": "payment-" },
  { "field": "trace_id", "operator": "exists" }
]
```

### Production Dışı Ortamlar

```json
[{ "field": "environment", "operator": "notEquals", "value": "production" }]
```

### Kullanıcı ve Oturum Bilgisi Varsa

```json
[
  { "field": "userId", "operator": "exists" },
  { "field": "sessionId", "operator": "exists" }
]
```
