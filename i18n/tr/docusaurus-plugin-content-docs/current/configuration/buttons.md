---
sidebar_position: 2
title: Butonlar
---

# Buton Yapılandırması

Butonlar, Graytool'un çekirdek özelliğidir. Her buton, log satırındaki alanları kullanarak dinamik URL'ler oluşturur ve kullanıcıyı ilgili sayfaya yönlendirir.

## Buton Yapısı

```typescript
interface ButtonConfig {
  id: string;                    // Benzersiz kimlik (otomatik)
  label: string;                 // Buton üzerindeki metin
  url: string;                   // URL şablonu: "https://admin.com/users/{userId}"
  fieldBindings: FieldBinding[]; // Alan bağlamaları
  conditions: ButtonCondition[]; // Görünürlük koşulları
  openInNewTab: boolean;         // Yeni sekmede aç
  enabled: boolean;              // Aktif/pasif
  color: ButtonColor;            // Renk
  icon?: string;                 // Opsiyonel SVG ikon
  urlPatternIds?: string[];      // Hangi pattern'lerde görüneceği
}
```

## Buton Renkleri

| Renk | Kullanım Alanı | Görünüm |
|------|----------------|---------|
| `primary` | Ana aksiyon (mavi) | Graylog birincil renk |
| `default` | Genel amaçlı (gri) | Nötr |
| `success` | Başarılı işlem (yeşil) | Onay/doğrulama |
| `warning` | Dikkat gerektiren (sarı) | Uyarı |
| `danger` | Tehlikeli işlem (kırmızı) | Silme/risk |

## URL Template Sözdizimi

URL template'leri süslü parantez (`{...}`) ile placeholder tanımlar:

```
https://admin.company.com/users/{userId}
https://dashboard.company.com/orders/{orderId}?tab=details
https://kibana.company.com/app/discover#/{index}?q={searchQuery}
```

### Çoklu Placeholder

```
https://admin.com/users/{userId}/orders/{orderId}
```

### URL Encoding

Placeholder değerleri otomatik olarak URL encode edilir:

```
userId = "john doe"
→ https://admin.com/users/john%20doe
```

## Buton Görünürlüğü

Bir butonu görmek için **tüm** koşulların sağlanması gerekir:

1. ✅ Buton `enabled: true` olmalı
2. ✅ URL pattern filtresi geçmeli (veya tüm pattern'lere atanmış olmalı)
3. ✅ Tüm `conditions` doğru olmalı (AND mantığı)
4. ✅ URL template'deki tüm placeholder'lar çözülmeli

Herhangi biri başarısız olursa buton o satırda **görünmez**.

## URL Pattern Atama

Butonlar belirli Graylog instance'larına atanabilir:

- **Boş bırakılırsa** → Tüm pattern'lerde görünür
- **Seçim yapılırsa** → Yalnızca seçilen pattern'lerde görünür

Bu özellik, farklı ortamlar (production, staging) için farklı butonlar tanımlamak istediğinizde kullanışlıdır.

### Örnek

| Buton | URL Patterns |
|-------|-------------|
| View User | Production, Staging |
| Debug Panel | Yalnızca Staging |
| Admin Console | Yalnızca Production |
| View Logs | Tümü (boş) |

## Yeni Sekmede Açma

`openInNewTab: true` ayarlandığında, buton tıklandığında URL yeni bir sekmede açılır. Varsayılan olarak `true`'dur.

## İkon Desteği

Butonlara opsiyonel SVG ikon eklenebilir. İkon, buton metninin solunda görünür.

## Buton Sırası

Butonlar, yapılandırma dosyasındaki sıraya göre log satırlarında gösterilir. Ayarlar sayfasında butonların sırasını değiştirebilirsiniz.

## Örnekler

### Basit Kullanıcı Butonu

```json
{
  "label": "View User",
  "url": "https://admin.company.com/users/{userId}",
  "color": "primary",
  "fieldBindings": [
    { "placeholder": "userId", "fieldPath": "userId" }
  ],
  "conditions": [
    { "field": "userId", "operator": "exists" }
  ]
}
```

### Koşullu Hata Paneli Butonu

```json
{
  "label": "Error Details",
  "url": "https://sentry.company.com/issues/{errorId}",
  "color": "danger",
  "fieldBindings": [
    { "placeholder": "errorId", "fieldPath": "exception.id" }
  ],
  "conditions": [
    { "field": "level", "operator": "equals", "value": "ERROR" },
    { "field": "exception.id", "operator": "exists" }
  ]
}
```

### Çoklu Ortam Butonu

```json
{
  "label": "Kibana Logs",
  "url": "https://kibana-{env}.company.com/app/discover?q={traceId}",
  "color": "default",
  "fieldBindings": [
    { "placeholder": "env", "fieldPath": "environment" },
    { "placeholder": "traceId", "fieldPath": "trace_id" }
  ],
  "conditions": [
    { "field": "trace_id", "operator": "exists" }
  ]
}
```
