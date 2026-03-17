---
sidebar_position: 1
title: URL Patterns
---

# URL Patterns (URL Desenleri)

URL pattern'leri, Graytool'un hangi sayfalarda aktif olacağını belirler. Yalnızca eşleşen URL'lerde eklenti çalışır.

## Pattern Yapısı

Her URL pattern bir nesne olarak saklanır:

```typescript
interface UrlPattern {
  id: string;       // Otomatik oluşturulan benzersiz kimlik
  pattern: string;  // Glob pattern: "https://graylog.company.com/*"
  label: string;    // Görünen isim: "Production Graylog"
  enabled: boolean; // Aktif/pasif durumu
}
```

## Joker Karakter (Wildcard) Kullanımı

`*` karakteri herhangi bir metin ile eşleşir:

| Pattern | Eşleşen URL'ler |
|---------|-----------------|
| `https://graylog.company.com/*` | `https://graylog.company.com/search` ✅ |
| | `https://graylog.company.com/dashboards/abc` ✅ |
| `https://graylog-*.company.com/*` | `https://graylog-prod.company.com/search` ✅ |
| | `https://graylog-staging.company.com/search` ✅ |
| `https://*/search*` | `https://any-domain.com/search?q=test` ✅ |

## Birden Fazla Pattern

Farklı Graylog instance'ları için birden fazla pattern ekleyebilirsiniz:

```
Pattern 1: "Production"    → https://graylog.company.com/*
Pattern 2: "Staging"       → https://graylog-staging.company.com/*
Pattern 3: "Local Dev"     → http://localhost:9000/*
```

Her pattern bağımsız olarak açılıp kapatılabilir.

## İzin Yönetimi

Graytool, Chrome'un **optional host permissions** mekanizmasını kullanır. Bu, eklentinin tüm sitelere erişmek yerine yalnızca belirtilen URL'lere erişim istemesi anlamına gelir.

### İzin Akışı

1. **Pattern eklenir** → `chrome.permissions.request()` çağrılır
2. **Chrome diyalog gösterir** → Kullanıcı onaylar veya reddeder
3. **Onaylanırsa** → Eklenti o URL'de çalışabilir
4. **Reddedilirse** → Pattern kaydedilir ama çalışmaz

:::warning
Chrome izin diyalogunu yalnızca kullanıcı etkileşimi sırasında gösterebilir. Bu nedenle pattern ekleme işlemi mutlaka ayarlar sayfasından yapılmalıdır.
:::

## Pattern ve Buton İlişkisi

Butonlar belirli pattern'lere atanabilir. Örneğin:

- **"View User"** butonu → Yalnızca Production Graylog'da
- **"Debug Info"** butonu → Yalnızca Staging Graylog'da
- **"View Logs"** butonu → Tüm pattern'lerde

Bu yapılandırma, buton ayarlarındaki **URL Pattern Visibility** bölümünden yapılır.

## Pattern Düzenleme

Ayarlar sayfasından:
- **Toggle** ile pattern'i geçici olarak devre dışı bırakabilirsiniz
- **Edit** ile label veya pattern'i değiştirebilirsiniz
- **Delete** ile pattern'i tamamen kaldırabilirsiniz

:::tip
Pattern'i devre dışı bırakmak, o URL'de Graytool'un hiçbir özelliğinin çalışmamasına neden olur — butonlar, JSON viewer ve arama geçmişi dahil.
:::
