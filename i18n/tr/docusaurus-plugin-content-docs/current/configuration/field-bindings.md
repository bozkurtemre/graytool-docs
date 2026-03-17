---
sidebar_position: 3
title: Alan Bağlamaları
---

# Alan Bağlamaları (Field Bindings)

Alan bağlamaları, URL template'indeki placeholder'ları log satırındaki gerçek alan değerleriyle eşleştirir.

## Yapı

```typescript
interface FieldBinding {
  placeholder: string;        // URL'deki placeholder adı
  fieldPath: string;          // Birincil alan yolu
  fallbackPaths?: string[];   // Alternatif alan yolları
}
```

## Otomatik Oluşturma

URL template'e `{userId}` yazdığınızda, Graytool otomatik olarak bir alan bağlaması oluşturur:

```
URL: https://admin.com/users/{userId}
                              ↓
Otomatik binding: { placeholder: "userId", fieldPath: "userId" }
```

## Alan Yolu (Field Path)

Alan yolu, log satırındaki JSON verisi içinde alan adını belirtir.

### Düz Alanlar

```
userId          → { "userId": "12345" }
request_id      → { "request_id": "abc-123" }
```

### İç İçe (Nested) Alanlar

Nokta notasyonu ile iç içe alanlara erişilir:

```
context.user.id        → { "context": { "user": { "id": "12345" } } }
metadata.request.trace → { "metadata": { "request": { "trace": "xyz" } } }
```

:::info
İç içe alanlar, JSON parse işlemi sırasında düzleştirilir (flatten). Yani `context.user.id` doğrudan alan adı olarak kullanılabilir.
:::

## Fallback Paths (Yedek Yollar)

Birincil alan bulunamazsa Graytool sırasıyla fallback yollarını dener:

```typescript
{
  placeholder: "userId",
  fieldPath: "userId",
  fallbackPaths: ["context.userId", "user_id", "msg.userId"]
}
```

### Çözüm Sırası

```
1. fields["userId"]          → Bulunamadı ❌
2. fields["context.userId"]  → Bulunamadı ❌
3. fields["user_id"]         → "12345" bulundu ✅
   → URL'de {userId} yerine "12345" yerleştirilir
```

## Çözüm Başarısızlığı

Bir placeholder için **hiçbir** alan bulunamazsa (birincil + tüm fallback'ler başarısız), buton o log satırında **görünmez**.

Bu davranış tasarım gereğidir — kırık URL'ler oluşturmak yerine butonu gizlemek daha güvenlidir.

## Alan Keşfi ve Prefix'ler

Graytool, alanları çeşitli stratejilerle keşfeder. Bazı Graylog yapılandırmalarında alanlar prefix ile gelir:

```
msg.userId
context.userId
full_message.userId
```

**Row Field Prefixes** ayarı ile bu prefix'ler tanımlanır:

```
["msg.", "context.", ""]
```

Graytool hem prefix'li hem prefix'siz versiyonları arar.

## URL Encoding

Tüm alan değerleri otomatik olarak `encodeURIComponent()` ile encode edilir:

```
Alan değeri: "hello world"
URL sonucu: https://example.com/search?q=hello%20world
```

## Pratik Örnekler

### Kullanıcı ve Sipariş

```typescript
// URL: https://admin.com/users/{userId}/orders/{orderId}
fieldBindings: [
  {
    placeholder: "userId",
    fieldPath: "userId",
    fallbackPaths: ["user_id", "context.user_id"]
  },
  {
    placeholder: "orderId",
    fieldPath: "orderId",
    fallbackPaths: ["order_id", "metadata.orderId"]
  }
]
```

### Trace ID ile İzleme

```typescript
// URL: https://jaeger.company.com/trace/{traceId}
fieldBindings: [
  {
    placeholder: "traceId",
    fieldPath: "trace_id",
    fallbackPaths: ["traceId", "x-trace-id", "context.traceId"]
  }
]
```
