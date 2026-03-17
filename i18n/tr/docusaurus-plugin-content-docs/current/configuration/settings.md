---
sidebar_position: 6
title: Ayarlar
---

# Uygulama Ayarları (Settings)

Graytool'un özellik geçişleri ve genel davranış ayarları.

## Yapı

```typescript
interface AppSettings {
  enabled: boolean;                       // Ana açma/kapama
  showMessageDetailButton: boolean;       // Mesaj detay butonu
  jsonViewerEnabled: boolean;             // JSON viewer özelliği
  keyboardShortcutsEnabled: boolean;      // Klavye kısayolları
  searchHistoryEnabled: boolean;          // Arama geçmişi yakalama
}
```

## Ayar Detayları

### Extension Enabled (Ana Anahtar)

Graytool'un tamamını açar/kapatır. Kapatıldığında hiçbir özellik çalışmaz.

| Değer | Davranış |
|-------|----------|
| `true` | Tüm özellikler aktif (varsayılan) |
| `false` | Eklenti tamamen devre dışı |

### Show Message Detail Button

Log satırlarında 🔍 mesaj detay butonunun görünürlüğünü kontrol eder.

| Değer | Davranış |
|-------|----------|
| `true` | Her satırda detay butonu görünür (varsayılan) |
| `false` | Detay butonu gizlenir |

Bu buton tıklandığında JSON viewer açılır.

### JSON Viewer Enabled

JSON viewer modal penceresini aktif/pasif yapar.

| Değer | Davranış |
|-------|----------|
| `true` | JSON viewer açılabilir (varsayılan) |
| `false` | JSON viewer devre dışı |

### Keyboard Shortcuts Enabled

Klavye kısayollarını aktif/pasif yapar.

| Değer | Davranış |
|-------|----------|
| `true` | Kısayollar çalışır (varsayılan) |
| `false` | Kısayollar devre dışı |

Etkilenen kısayollar:
- `Ctrl+H` / `Cmd+H` — Arama geçmişi paneli
- `Esc` — JSON viewer'ı kapat
- `/` — JSON viewer'da arama kutusuna odaklan
- `↑` / `↓` — Arama sonuçlarında gezin

### Search History Enabled

Graylog arama sorgularının otomatik kaydedilmesini kontrol eder.

| Değer | Davranış |
|-------|----------|
| `true` | Aramalar kaydedilir (varsayılan) |
| `false` | Arama kaydı yapılmaz |

## Varsayılan Değerler

```typescript
{
  enabled: true,
  showMessageDetailButton: true,
  jsonViewerEnabled: true,
  keyboardShortcutsEnabled: true,
  searchHistoryEnabled: true,
}
```

## Ayarlar Sayfası

Ayarlar sayfasının **"Settings"** sekmesinden tüm bu geçişleri kontrol edebilirsiniz.

Her ayar değişikliği:
1. Otomatik olarak kaydedilir
2. `chrome.storage.sync` üzerinden senkronize edilir
3. Tüm açık sekmelere `CONFIG_UPDATED` mesajı gönderilir
4. Content script'ler yeni yapılandırmayı yükler
