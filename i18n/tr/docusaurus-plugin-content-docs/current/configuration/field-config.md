---
sidebar_position: 5
title: Alan Yapılandırması
---

# Alan Yapılandırması (Field Config)

Global alan yapılandırması, Graytool'un log satırlarından alanları nasıl keşfedeceğini ve JSON parsing davranışını kontrol eder.

## Yapı

```typescript
interface GlobalFieldConfig {
  defaultMessageField?: string | null;  // JSON viewer varsayılan alan
  rowFieldPrefixes: string[];           // Aranacak alan prefix'leri
  searchPrefixes?: string[];            // Yapılandırma UI alias'ı
  parseJsonStrings?: boolean;           // JSON string'leri parse et
  jsonParseMaxDepth?: number;           // Maksimum parse derinliği
}
```

## Ayarlar

### Default Message Field

JSON viewer açıldığında hangi alanın otomatik seçileceğini belirler.

| Değer | Davranış |
|-------|----------|
| `null` / `undefined` | Alan seçici diyalogu gösterilir |
| `"full_message"` | Doğrudan `full_message` alanı açılır |
| `"message"` | Doğrudan `message` alanı açılır |

:::tip
İlk kez JSON viewer kullandığınızda, "Save as default" seçeneğini işaretleyerek varsayılan alanı kolayca ayarlayabilirsiniz.
:::

### Row Field Prefixes

Graylog'un farklı yapılandırmaları, alanları farklı prefix'lerle saklar. Bu ayar, hangi prefix'lerin aranacağını belirler.

**Varsayılan:** `["msg.", "context.", ""]`

```
Log verisi: { "msg.userId": "123", "context.env": "prod" }

Arama sırası:
  "msg.userId"     → ✅ Bulundu ("msg." prefix'i)
  "context.env"    → ✅ Bulundu ("context." prefix'i)
  "userId"         → ✅ Bulundu ("" boş prefix)
```

#### Özelleştirme

Kendi Graylog yapılandırmanıza göre prefix'leri ayarlayın:

```
Graylog yapılandırmanız "app." prefix'i kullanıyorsa:
  → ["app.", "msg.", "context.", ""]
```

### Parse JSON Strings

JSON alanlarının string değerlerinde gömülü JSON'u parse eder.

**Varsayılan:** `true`

```json
// parseJsonStrings: true
{
  "details": "{\"userId\": \"123\", \"action\": \"login\"}"
}
// ↓ Parse edilir:
{
  "details.userId": "123",
  "details.action": "login"
}
```

```json
// parseJsonStrings: false
{
  "details": "{\"userId\": \"123\", \"action\": \"login\"}"
}
// ↓ String olarak kalır (parse edilmez)
```

:::info
Bu özellik, iç içe JSON string'leri olan log yapılarında çok kullanışlıdır. Ancak performans sorunları yaşarsanız kapatabilirsiniz.
:::

### JSON Parse Max Depth

Maksimum JSON parse derinliğini belirler. Derin iç içe yapıları sınırlandırır.

**Varsayılan:** `5`
**Aralık:** `1` - `10`

```
Derinlik 1: { "a": "..." }
Derinlik 2: { "a": { "b": "..." } }
Derinlik 3: { "a": { "b": { "c": "..." } } }
...
Derinlik 5: a.b.c.d.e → Bu noktadan sonra düzleştirme durur
```

:::warning
Çok yüksek derinlik değerleri (8-10), büyük JSON nesnelerinde performans sorunlarına neden olabilir. Çoğu kullanım durumu için `5` yeterlidir.
:::

## Varsayılan Yapılandırma

```typescript
{
  defaultMessageField: null,       // Otomatik algıla
  rowFieldPrefixes: ["msg.", "context.", ""],
  parseJsonStrings: true,
  jsonParseMaxDepth: 5,
}
```

## Ayarlar Sayfasından Yapılandırma

1. **Options** → **"Field Config"** sekmesine gidin
2. Her ayar için ilgili alanı düzenleyin:
   - **Default Message Field**: Metin kutusu (boş bırakılabilir)
   - **Row Field Prefixes**: Virgülle ayrılmış liste
   - **Parse JSON Strings**: Onay kutusu
   - **JSON Parse Max Depth**: 1-10 arası sayı
