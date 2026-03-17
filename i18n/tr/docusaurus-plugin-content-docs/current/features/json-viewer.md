---
sidebar_position: 2
title: JSON Viewer
---

# JSON Viewer

Graytool'un JSON Viewer'ı, log mesajlarını yapılandırılmış görünümde incelemenizi, aramanızı ve kopyalamanızı sağlar.

## Açılış

JSON Viewer'ı açmanın yolu:

1. Log satırındaki 🔍 **mesaj detay butonuna** tıklayın
2. İlk açılışta **alan seçici** gösterilir (defaultMessageField yoksa)
3. Alan seçildikten sonra JSON Viewer paneli açılır

## Panel Yapısı

```
┌─────────────────────────────────────────────┐
│  Title                              [✕] [□] │  ← Header
├─────────────────────────────────────────────┤
│  [Field Selector ▼] [🔍 Search...] [📋 Copy]│  ← Toolbar
├─────────────────────────────────────────────┤
│  {                                          │
│    "userId": "12345",              [⊞] [📋] │  ← JSON Tree
│    "request": {                    [⊞] [📋] │
│      "method": "POST",            [⊞] [📋] │
│      "path": "/api/login"         [⊞] [📋] │
│    },                                       │
│    "level": "ERROR"                [⊞] [📋] │
│  }                                          │
├─────────────────────────────────────────────┤
│  [Raw] [DevTools] [Code]                    │  ← Tabs
│  ─────────────────────────────────          │
│  Tab içeriği                                │
└─────────────────────────────────────────────┘
```

## Özellikler

### Syntax Highlighting

JSON verileri renk kodlamasıyla görüntülenir:

| Element | Koyu Tema | Açık Tema |
|---------|-----------|-----------|
| Anahtar (key) | `#56B6C2` (cyan) | `#0066CC` (mavi) |
| String | `#98C379` (yeşil) | `#22863A` (koyu yeşil) |
| Sayı | `#D19A66` (turuncu) | `#B08800` (altın) |
| Boolean | `#D19A66` | `#B08800` |
| Null | `#A0A0A0` (gri) | `#6A737D` (gri) |

### Arama ve Filtreleme

- Toolbar'daki arama kutusuna metin yazın
- Eşleşen anahtarlar ve değerler vurgulanır
- `↑` / `↓` ok tuşları ile sonuçlar arasında gezin
- Mevcut sonuç birincil renkle vurgulanır

### Satır Aksiyonları

Her JSON satırının üzerine geldiğinizde iki buton görünür:

| Buton | İşlev |
|-------|-------|
| **⊞ Filter** | Alan:değer çiftini Graylog arama kutusuna uygular |
| **📋 Copy** | Değeri panoya kopyalar |

**Filter butonu:**
- Graylog'un arama editörünü bulur
- `field:value` formatında sorgu ekler
- Arama butonuna tıklayarak sonuçları günceller

### Kopyalama

- **📋 Copy All** (toolbar) — Tüm JSON'u panoya kopyalar
- **📋 Copy** (satır) — Tek bir değeri kopyalar
- Kopyalama sonrası `✓ Kopyalandı` bildirimi gösterilir

### Tam Ekran / Küçültme

- **□ Maximize** — Panel tam genişliğe uzanır
- **✕ Close** — Paneli kapatır

## Sekmeler (Tabs)

### Raw Sekmesi

Ham JSON metnini monospace font ile görüntüler. Doğrudan kopyalamak için idealdir.

### DevTools Sekmesi

JSON metni üzerinde dönüşüm araçları:

- **Escape** — JSON string'ini escape eder
- **Unescape** — Escape edilmiş metni orijinal haline döndürür

Bu araçlar, log mesajlarında gömülü JSON string'lerini hızlıca düzeltmek için kullanışlıdır.

### Code Sekmesi

JSON verisinden çeşitli dillerde kod parçacıkları üretir:

| Dil/Araç | Açıklama |
|-----------|----------|
| `curl` | cURL komutu |
| `fetch` | JavaScript Fetch API |
| `axios` | Axios HTTP istemcisi |
| `http` | Ham HTTP isteği |
| `php` | PHP kodu |
| `python` | Python requests |
| `go` | Go net/http |
| `java` | Java HttpClient |

### Sekme Davranışları

- **Çift tıklama** — Sekme alanını daralt/genişlet
- **Sürükleme** — Sekme yüksekliğini ayarla
- **Daraltma eşiği** — 30px altına inerse otomatik daraltılır
- **Durum saklanır** — `localStorage` ile daraltma durumu kalıcıdır

## Alan Seçici (Field Selector)

`defaultMessageField` ayarlanmadığında, JSON viewer açılmadan önce bir alan seçici modal gösterilir:

- Bulunan alanlar radyo butonlarıyla listelenir
- Her alanın değer önizlemesi gösterilir (80 karaktere kırpılır)
- **"Save as default"** seçeneği işaretlenebilir
- Tek alan varsa otomatik seçilir

## Klavye Kısayolları

| Kısayol | İşlev |
|---------|-------|
| `Esc` | JSON viewer'ı kapat |
| `/` | Arama kutusuna odaklan |
| `↑` | Önceki arama sonucu |
| `↓` | Sonraki arama sonucu |

## Bildirimler

Kopyalama, filtreleme gibi işlemler sonrası ekranın sağ alt köşesinde bildirim görünür:

- **Yeşil** — Başarılı işlem (kopyalama, filtreleme)
- **Kırmızı** — Hata
- **Mavi** — Bilgi
- **Sarı** — Uyarı

Bildirimler **3.2 saniye** sonra otomatik olarak kaybolur.
