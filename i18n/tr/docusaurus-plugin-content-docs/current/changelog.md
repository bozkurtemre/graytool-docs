---
sidebar_position: 101
title: Değişiklik Geçmişi
---

# Değişiklik Geçmişi (Changelog)

## v2.0.2 (Güncel)

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

### Teknik
- esbuild ile hızlı build sistemi
- TypeScript strict mode
- React 18 options sayfası
- FontAwesome 7 ikon desteği
- Prettier formatlama
- XSS koruması (escapeHtml, escapeAttr)

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

## v1.x (Legacy)

İlk sürüm. Manifest V2 tabanlı temel buton enjeksiyonu.
