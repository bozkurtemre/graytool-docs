---
sidebar_position: 101
title: Değişiklik Geçmişi
---

# Değişiklik Geçmişi (Changelog)

## v2.0.4 (Güncel)

### Özellikler
- JSON görüntüleyicide anahtar/öğe sayılarını açıp kapatan yeni `showJsonViewerCounts` ayarı
- Seçenekler sayfasında eklenti sürümü artık gezinme çubuğunda gösteriliyor

### İyileştirmeler
- JSON görüntüleyici, kullanıcı ayarına göre anahtar/öğe sayılarını koşullu olarak gösterecek şekilde güncellendi
- JSON görüntüleyicideki girintileme mantığı tutarlı görünüm için düzenlendi (sabit 16px dolgu)

### Yerelleştirme
- "JSON görüntüleyicide anahtar/öğe sayılarını göster" seçeneği için İngilizce ve Türkçe çeviriler eklendi

Tüm Değişiklikler: [v2.0.3...v2.0.4](https://github.com/bozkurtemre/graytool/compare/v2.0.3...v2.0.4)

## v2.0.3

### Özellikler
- İngilizce ve Türkçe ile çoklu dil (i18n) desteği
- Seçenekler sayfasından anında etkili dil değiştirme
- Graylog satırlarından güçlü alan çıkarımı için yeni `collectSelectableFields` fonksiyonu
- JSON görüntüleyicide zengin JSON içeriğinin otomatik algılanması, gereksiz açılır pencerelerin azaltılması
- Ham ve ayrıştırılmış görünümler arasında geçiş için araç çubuğu alan seçicisinde "Varsayılan" seçeneği

### İyileştirmeler
- Tüm sabit kodlanmış UI metinleri `t()` çeviri fonksiyonu çağrılarıyla değiştirildi
- DOM özellikleri, komşu satırlar ve JSON yük desteğiyle JSON alan çıkarım mantığı geliştirildi
- Güvenilir JSON ayrıştırma için yardımcı fonksiyonlar eklendi (`resolveViewerData`, `parseObjectLike`, `tryParseObject`, `extractJsonObjectCandidate`)
- Görsel kalite için ikon varlıkları güncellendi
- Birden fazla dosyada okunabilirlik için kod formatlama yeniden düzenlendi

### Yerelleştirme
- `en/messages.json` ve `tr/messages.json` ile `_locales/` dizini eklendi
- Alan seçici başlıkları ve JSON görüntüleyici etiketleri için i18n metinleri güncellendi
- Sürüm betiği artık paketlemeye `_locales` dizinini dahil ediyor

Tüm Değişiklikler: [v2.0.2...v2.0.3](https://github.com/bozkurtemre/graytool/compare/v2.0.2...v2.0.3)

## v2.0.2

### Özellikler
- Chrome Manifest V3 tam uyumluluk
- Dinamik izin yönetimi (optional host permissions)
- JSON viewer ile log detayları görüntüleme
- Arama geçmişi yakalama ve yeniden kullanma (Ctrl+H)
- Açık/koyu tema otomatik algılama
- Kod üretici (curl, fetch, axios, python, go, java, php)
- Alan seçici modal
- İçe/Dışa aktarım desteği

### Yapılandırma
- v2 yapılandırma formatı
- Buton koşulları (exists, equals, contains, startsWith, notEquals)
- Alan bağlamaları ve fallback paths
- URL pattern bazlı buton filtreleme
- Global alan yapılandırması

### İyileştirmeler
- Yapılandırılabilir `GlobalFieldConfig` ile geliştirilmiş alan otomatik algılama (JSON string ayrıştırma, maksimum derinlik)
- Otomatik URL yer tutucu algılama (`{userId}`) ve alan eşleme arayüzü
- Modal örtüleri artık dışarı tıklayınca kapanmıyor (yanlışlıkla veri kaybını önler)
- ESC tuşu artık modalları kapatıyor (erişilebilirlik iyileştirmesi)
- "Message Detail" tutarlılık için "Detail View" olarak yeniden adlandırıldı
- Daha iyi okunabilirlik için açık/koyu temalarda JSON anahtar renkleri güncellendi

### Teknik
- esbuild ile hızlı build sistemi
- TypeScript strict mode
- React 18 options sayfası
- FontAwesome 7 ikon desteği
- Prettier formatlama
- XSS koruması (escapeHtml, escapeAttr)

Tüm Değişiklikler: [v2.0.1...v2.0.2](https://github.com/bozkurtemre/graytool/compare/v2.0.1...v2.0.2)

## v2.0.1

### Bakım
- GitHub Actions bağımlılıkları güncellendi (3 güncelleme)

Tüm Değişiklikler: [v2.0.0...v2.0.1](https://github.com/bozkurtemre/graytool/compare/v2.0.0...v2.0.1)

## v2.0.0

### Büyük Değişiklikler
- Manifest V2 → V3 geçişi
- Yapılandırma v1 → v2 formatı
- Service worker mimarisi
- İsteğe bağlı izin modeli

### v1 → v2 Migrasyon
- Otomatik migrasyon desteği
- `paramMapping` → `fieldBindings`
- URL template sistemi
- Buton-pattern ilişkilendirme

Tüm Değişiklikler: [v2.0.0](https://github.com/bozkurtemre/graytool/commits/v2.0.0)

## v1.x (Legacy)

İlk sürüm. Manifest V2 tabanlı temel buton enjeksiyonu.
