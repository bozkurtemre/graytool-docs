---
sidebar_position: 3
title: İlk Butonunuzu Oluşturun
---

# İlk Butonunuzu Oluşturun

Bu rehberde, Graylog log satırlarında görünecek özelleştirilmiş bir buton oluşturacağız.

## Senaryo

Log satırlarında `userId` alanı bulunduğunda, kullanıcı admin paneline yönlendiren bir buton oluşturalım.

## Adım 1: Buton Oluşturun

1. **Ayarlar** sayfasını açın
2. **"Buttons"** sekmesine gidin
3. **"Add Button"** butonuna tıklayın

## Adım 2: Buton Bilgilerini Doldurun

### Temel Bilgiler

| Alan | Değer |
|------|-------|
| **Label** | `View User` |
| **URL Template** | `https://admin.company.com/users/{userId}` |
| **Color** | `primary` (mavi) |

### URL Template Sözdizimi

URL template'inde `{placeholder}` sözdizimi kullanılır. Süslü parantez içindeki metin, log satırındaki alan adıyla eşleştirilir.

```
https://admin.company.com/users/{userId}
                                ^^^^^^^^
                                Log satırındaki "userId" alanının değeri
```

Birden fazla placeholder kullanabilirsiniz:

```
https://admin.company.com/orders/{orderId}?user={userId}&env={environment}
```

## Adım 3: Alan Bağlamaları (Field Bindings)

URL template'e `{userId}` yazdığınızda, Graytool otomatik olarak bir alan bağlaması oluşturur:

| Placeholder | Field Path | Fallback Paths |
|-------------|-----------|----------------|
| `userId` | `userId` | `context.userId`, `user_id` |

**Field Path**, log satırındaki JSON verisinde aranacak alan adıdır. **Fallback Paths**, birincil alan bulunamazsa denenecek alternatif alan yollarıdır.

### Nested (İç İçe) Alanlar

JSON verisinde iç içe alanlar için nokta notasyonu kullanılır:

```
{context.user.id}     → JSON'daki context.user.id değeri
{metadata.requestId}  → JSON'daki metadata.requestId değeri
```

## Adım 4: Koşullar (Opsiyonel)

Butonun yalnızca belirli durumlarda görünmesini isteyebilirsiniz:

| Alan | Operatör | Değer |
|------|----------|-------|
| `userId` | `exists` | — |

Bu durumda buton yalnızca `userId` alanı dolu olan satırlarda görünür.

Daha fazla koşul örneği:

```
level equals "ERROR"           → Yalnızca hata loglarında
source contains "api-gateway"  → API gateway loglarında
env notEquals "production"     → Production dışı ortamlarda
```

## Adım 5: Kaydet ve Test Et

1. **"Save"** butonuna tıklayın
2. Graylog sayfasını yenileyin
3. `userId` içeren log satırlarında **"View User"** butonunu görmelisiniz!

## Sonuç

```
Log satırı: { userId: "12345", message: "Login failed", ... }
                 ↓
Graytool buton enjekte eder: [View User]
                 ↓
Tıklandığında açılır: https://admin.company.com/users/12345
```

## Sonraki Adımlar

- [Koşulları detaylı öğrenin →](/configuration/conditions)
- [Alan bağlamalarının detayları →](/configuration/field-bindings)
- [Birden fazla URL pattern ile çalışın →](/configuration/url-patterns)
