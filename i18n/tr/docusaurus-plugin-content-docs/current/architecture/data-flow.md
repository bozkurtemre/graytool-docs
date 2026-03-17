---
sidebar_position: 2
title: Veri Akışı
---

# Veri Akışı (Data Flow)

Bu bölüm, Graytool'un ana veri akışlarını açıklar.

## Aktivasyon Akışı

```
Kullanıcı URL'yi ziyaret eder
        ↓
background.ts → tabs.onUpdated dinleyicisi tetiklenir
        ↓
hasPermissionForUrl() → İzin kontrol edilir
        ↓ (izin varsa)
checkUrlMatch() → URL, pattern listesiyle karşılaştırılır
        ↓ (eşleşme varsa)
injectContentScript() → Content script enjekte edilir
        ↓
chrome.tabs.sendMessage({ type: "ACTIVATE", matchedPatternId })
        ↓
inject/index.ts → ACTIVATE mesajını alır
        ↓
activate(matchedPatternId)
  ├─ getConfig() → Yapılandırma yüklenir
  ├─ injectStyles() → Stiller enjekte edilir
  ├─ setupJsonViewerListener() → JSON viewer hazırlanır
  ├─ setupSearchHistory() → Arama geçmişi hazırlanır
  ├─ processExistingRows() → Mevcut satırlar işlenir
  ├─ startObserver() → MutationObserver başlatılır
  └─ startPeriodicProcessing() → 2sn'de bir tarama başlar
```

## Buton Enjeksiyon Akışı

```
Satır tespit edilir (observer / periodic / initial)
        ↓
processRow(row, config, matchedPatternId)
        ↓
PROCESSED_ATTR kontrolü → Zaten işlenmiş mi?
        ↓ (hayır)
discoverRowFields(row) → Alanlar keşfedilir
  ├─ Strateji 1: Data attributes
  ├─ Strateji 2: JSON parse
  └─ Strateji 3: DOM patterns
        ↓
deduplicateFields() → Tekrar edenler elenir
        ↓
Satır işaretlenir: data-graytool-processed="true"
        ↓
fieldMap oluşturulur: { name → value }
        ↓
injectButtons(row, config, fieldMap, fields, matchedPatternId)
  ├─ Her buton için:
  │   ├─ Buton enabled mı?
  │   ├─ isButtonAllowedForPattern() → URL pattern kontrolü
  │   ├─ evaluateConditions() → Koşullar geçerli mi?
  │   ├─ resolveUrl() → URL template çözümlenir
  │   └─ Buton DOM'a eklenir
  └─ Message detail butonu eklenir
```

## JSON Viewer Akışı

```
Kullanıcı 🔍 mesaj detay butonuna tıklar
        ↓
CustomEvent dispatch: "graytool:open-detail"
  payload: { fields, config, row }
        ↓
json-viewer.ts dinleyicisi tetiklenir
        ↓
defaultMessageField ayarlanmış mı?
  ├─ EVET → Doğrudan o alanın JSON'u parse edilir
  └─ HAYIR → showFieldSelector() çağrılır
              ├─ Tek alan → Otomatik seçilir
              └─ Birden fazla → Modal gösterilir
                  ├─ Kullanıcı seçer
                  └─ "Save as default" → saveConfig()
        ↓
JSON viewer paneli açılır
  ├─ JSON ağaç görünümü oluşturulur
  ├─ Arama, filtre, kopyalama hazırlanır
  └─ Sekmeler (Raw, DevTools, Code) yüklenir
```

## Yapılandırma Güncelleme Akışı

```
Kullanıcı ayarlar sayfasında değişiklik yapar
        ↓
saveConfig(partial) → chrome.storage.sync.set()
        ↓
chrome.storage.onChanged dinleyicisi tetiklenir (background.ts)
        ↓
Tüm sekmelere CONFIG_UPDATED mesajı gönderilir
        ↓
Her content script:
  ├─ Mevcut observer durdurulur
  ├─ İşlenmiş işaretler temizlenir
  ├─ Yeni yapılandırma yüklenir
  └─ activate() tekrar çalıştırılır
```

## Arama Geçmişi Akışı

```
Kullanıcı Graylog'da arama yapar (Enter / Ara butonu)
        ↓
search-history.ts → Ace Editor dinleyicisi tetiklenir
        ↓
extractAceEditorValue() → Sorgu metni çıkarılır
        ↓
saveSearchQuery(patternId, query)
  ├─ Aynı sorgu varsa güncellenir
  ├─ 50 limit kontrol edilir
  └─ chrome.storage.local'e kaydedilir
        ↓
Kullanıcı Ctrl+H'a basar
        ↓
openHistoryPanel() → Geçmiş yüklenir ve gösterilir
        ↓
Kullanıcı sorguya tıklar
        ↓
applySearchQuery(query)
  ├─ Ace Editor textarea'sına yazılır
  ├─ Input/change olayları dispatch edilir
  ├─ Arama butonu tıklanır
  └─ Panel kapanır
```

## Deaktivasyon Akışı

```
background.ts → URL artık eşleşmiyor / eklenti devre dışı
        ↓
DEACTIVATE mesajı gönderilir
        ↓
inject/index.ts → deactivate()
  ├─ MutationObserver durdurulur
  ├─ Periyodik tarama durdurulur
  ├─ Enjekte edilen stiller kaldırılır
  └─ İşlenmiş işaretler temizlenir
```
