---
sidebar_position: 4
title: Güvenlik
---

# Güvenlik

Graytool, güvenliği ön planda tutarak tasarlanmıştır.

## XSS Koruması

### HTML Escape

Tüm kullanıcı verileri ve log alanları, DOM'a eklemeden önce escape edilir:

```typescript
// Metin içeriği için
escapeHtml(text: string): string
// DOM API kullanır — tüm HTML karakterlerini güvenli hale getirir

// HTML attribute değerleri için
escapeAttr(text: string): string
// &, ", ', <, > karakterlerini encode eder
```

### Kullanım

```typescript
// ✅ Güvenli
content.innerHTML = `
  <span data-field="${escapeAttr(fieldName)}">
    ${escapeHtml(value)}
  </span>
`;

// ❌ Tehlikeli (asla yapılmaz)
content.innerHTML = `<span>${userInput}</span>`;
```

### innerHTML Kullanımı

Graytool, `innerHTML` kullanıldığı her yerde escape fonksiyonlarını zorunlu tutar. Kullanıcı girdileri asla doğrudan DOM'a eklenmez.

## İzin Modeli

### Minimum İzin İlkesi

Manifest'te yalnızca gerekli izinler talep edilir:

```json
{
  "permissions": [
    "storage",    // Yapılandırma saklama
    "activeTab",  // Mevcut sekme bilgisi
    "scripting",  // Content script enjeksiyonu
    "tabs"        // Sekme listesi ve sorgusu
  ]
}
```

### İsteğe Bağlı İzinler

URL erişimi **isteğe bağlıdır** — manifest'te değil, runtime'da istenir:

```json
{
  "optional_host_permissions": ["<all_urls>"]
}
```

Bu yaklaşımın avantajları:
- Kullanıcı yalnızca kullanacağı URL'lere izin verir
- Chrome Web Store'da daha az uyarı
- Kullanıcı güveni artar

### İzin Akışı

```
1. Kullanıcı URL pattern ekler
2. chrome.permissions.request() çağrılır
3. Chrome kullanıcıya izin diyalogu gösterir
4. Kullanıcı onaylar veya reddeder
5. Onaylanırsa eklenti o URL'de çalışabilir
```

## Veri Depolama

### Chrome Storage

Tüm veriler Chrome'un güvenli depolama mekanizmalarında saklanır:

| Depolama | Kullanım | Şifreleme |
|----------|----------|-----------|
| `chrome.storage.sync` | Yapılandırma | Chrome tarafından |
| `chrome.storage.local` | Arama geçmişi | Yerel |
| `localStorage` | Tema tercihi, tab durumu | Sayfa bazlı |

### Veri Sınırları

- `chrome.storage.sync`: ~100KB toplam
- `chrome.storage.local`: ~5MB toplam
- Arama geçmişi: 50 sorgu/pattern

## Content Script İzolasyonu

Chrome content script'leri, web sayfasının JavaScript bağlamından tamamen izoledir:

- Sayfadaki kötü niyetli kod, content script'e erişemez
- Content script, sayfadaki `window` nesnesine doğrudan erişemez
- İletişim yalnızca DOM üzerinden gerçekleşir

## URL Template Güvenliği

### Placeholder Encoding

URL template'lerindeki değerler `encodeURIComponent()` ile encode edilir:

```
Değer: <script>alert('xss')</script>
Encode: %3Cscript%3Ealert(%27xss%27)%3C%2Fscript%3E
```

Bu, URL injection saldırılarını önler.

### Template Doğrulama

URL template'leri yalnızca `{...}` placeholder'ları çözümler. Diğer özel karakterler veya shell komutları çalıştırılmaz.

## Sessiz Başarısızlık

Content script'lerde hatalar Graylog UI'ını **asla bozmaz**:

```typescript
try {
  processRow(row, config);
} catch (error) {
  // Sessiz başarısızlık — Graylog çalışmaya devam eder
}
```

Bu ilke, eklentinin host uygulamayı bozmamasını garanti eder.

## Güvenlik En İyi Uygulamaları

1. **Asla `eval()` kullanılmaz**
2. **Dinamik `<script>` oluşturulmaz**
3. **`innerHTML` yalnızca escape edilmiş verilerle kullanılır**
4. **Kullanıcı girdileri doğrulanır** (import, form)
5. **Chrome API hataları her zaman kontrol edilir**
6. **Storage erişimi tek bir modül üzerinden yapılır**
