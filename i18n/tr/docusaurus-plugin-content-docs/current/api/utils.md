---
sidebar_position: 4
title: Yardımcı Fonksiyonlar
---

# Yardımcı Fonksiyonlar (Utils)

`src/shared/utils.ts` — Paylaşılan güvenlik ve yardımcı fonksiyonlar.

:::danger Önemli Kural
Bu fonksiyonlar asla yerel olarak yeniden tanımlanmaz. Tüm kullanım `shared/utils.ts`'ten import edilmelidir.
:::

## escapeHtml()

HTML metin içeriğini güvenli hale getirir. XSS saldırılarını önler.

```typescript
export function escapeHtml(text: string): string
```

**Parametreler:**
- `text` — Escape edilecek metin

**Dönüş:** Güvenli HTML metin

**Yöntem:** DOM API kullanır — `document.createTextNode()` ile güvenli metin oluşturur.

**Koruduğu Karakterler:**

| Girdi | Çıktı |
|-------|-------|
| `<` | `&lt;` |
| `>` | `&gt;` |
| `&` | `&amp;` |
| `"` | `&quot;` |
| `'` | `&#039;` |

**Kullanım:**

```typescript
import { escapeHtml } from "../shared/utils";

// ✅ Güvenli DOM ekleme
element.innerHTML = `<span>${escapeHtml(userValue)}</span>`;

// ❌ Tehlikeli
element.innerHTML = `<span>${userValue}</span>`;
```

## escapeAttr()

HTML attribute değerlerini güvenli hale getirir.

```typescript
export function escapeAttr(text: string): string
```

**Parametreler:**
- `text` — Escape edilecek attribute değeri

**Dönüş:** Güvenli attribute string

**Koruduğu Karakterler:**

| Karakter | Dönüşüm |
|----------|---------|
| `&` | `&amp;` |
| `"` | `&quot;` |
| `'` | `&#039;` |
| `<` | `&lt;` |
| `>` | `&gt;` |

**Kullanım:**

```typescript
import { escapeAttr } from "../shared/utils";

// ✅ Güvenli attribute
html = `<div data-value="${escapeAttr(fieldValue)}">...</div>`;

// ❌ Tehlikeli
html = `<div data-value="${fieldValue}">...</div>`;
```

## copyToClipboard()

Metni panoya kopyalar. Modern ve fallback yöntemlerini destekler.

```typescript
export function copyToClipboard(text: string): Promise<void>
```

**Parametreler:**
- `text` — Panoya kopyalanacak metin

**Yöntemler:**

1. **Modern (tercih edilir):** `navigator.clipboard.writeText()`
   - HTTPS gerektirir
   - Kullanıcı izni gerekebilir

2. **Fallback (HTTP ortamlar için):** `document.execCommand('copy')`
   - Geçici textarea oluşturur
   - `execCommand()` ile kopyalar
   - Textarea'yı temizler

**Kullanım:**

```typescript
import { copyToClipboard } from "../shared/utils";

try {
  await copyToClipboard(jsonText);
  showNotification("Kopyalandı!", "success");
} catch (error) {
  showNotification("Kopyalama başarısız", "error");
}
```

## Güvenlik Notu

Bu fonksiyonlar, Graytool'un **XSS (Cross-Site Scripting)** saldırılarına karşı birincil savunma hattıdır:

```
Log verisi (güvenilmeyen) → escapeHtml/escapeAttr → DOM'a güvenli ekleme
```

Log verileri Graylog kullanıcıları tarafından üretilir ve potansiyel olarak zararlı içerik barındırabilir. Bu nedenle tüm log verileri DOM'a eklenmeden önce escape edilmelidir.
