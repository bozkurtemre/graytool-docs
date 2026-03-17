---
sidebar_position: 5
title: Klavye Kısayolları
---

# Klavye Kısayolları

Graytool, verimli kullanım için çeşitli klavye kısayolları sunar.

## Genel Kısayollar

| Kısayol | Platform | İşlev |
|---------|----------|-------|
| `Ctrl + H` | Windows/Linux | Arama geçmişi panelini aç/kapat |
| `Cmd + H` | macOS | Arama geçmişi panelini aç/kapat |

## JSON Viewer Kısayolları

JSON viewer açıkken kullanılabilir:

| Kısayol | İşlev |
|---------|-------|
| `Esc` | JSON viewer'ı kapat |
| `/` | Arama kutusuna odaklan |
| `↑` (Yukarı ok) | Önceki arama sonucuna git |
| `↓` (Aşağı ok) | Sonraki arama sonucuna git |

## Kısayol Güvenliği

Kısayollar, kullanıcının metin girişi yaparken yanlışlıkla tetiklememesi için kontrol edilir:

### Tetiklenmeme Durumları

- **Input alanında** yazarken (`<input>`, `<textarea>`)
- **contentEditable** elementte yazarken
- **Ace Editor** hariç — `Ctrl+H` Ace Editor'de tetiklenir

### Neden?

Graylog'un kendi kısayollarıyla çakışmamak ve kullanıcı deneyimini bozmamak için bu kontrol gereklidir.

## Kısayolları Kapatma

**Settings** → **Keyboard Shortcuts Enabled** → `false`

Bu durumda tüm kısayollar devre dışı kalır.

:::tip
Eğer yalnızca arama geçmişi kısayolunu kapatmak istiyorsanız, **Search History Enabled** ayarını kapatmanız yeterlidir.
:::
