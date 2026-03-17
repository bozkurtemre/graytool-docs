---
slug: /
sidebar_position: 1
title: Introduction
---

# Graytool — Graylog Developer Toolkit

**Graytool**, Graylog log yönetim arayüzlerini geliştiren bir Chrome eklentisidir (Manifest V3). Log satırlarına özelleştirilebilir aksiyon butonları enjekte ederek, geliştiricilerin log girişlerinden ilgili admin panellerine, kullanıcı detaylarına veya diğer dahili araçlara hızlıca gitmesini sağlar.

## Temel Özellikler

- 🎯 **URL Pattern Eşleştirme** — Yalnızca yapılandırılmış Graylog instance'larında aktif olur
- 🔘 **Özelleştirilebilir Butonlar** — URL şablonları ve alan bağlamaları ile dinamik butonlar
- 🔍 **Otomatik Alan Keşfi** — Log satırlarından alanları otomatik olarak bulur (data attribute, JSON parse, DOM pattern)
- 🎛️ **Koşullu Görünürlük** — Alan değerlerine göre butonları göster/gizle
- 📋 **JSON Viewer** — Log mesajlarını detaylı görüntüle, ara, filtrele
- 🕐 **Arama Geçmişi** — Graylog aramaları kaydedilir ve tekrar kullanılabilir
- 📦 **İçe/Dışa Aktarım** — Konfigürasyonu ortamlar arasında paylaşın
- 🎨 **Tema Desteği** — Graylog'un açık/koyu temasıyla otomatik uyum

## Nasıl Çalışır?

```
Kullanıcı URL'yi ziyaret eder
    → background.ts URL pattern'ini kontrol eder
    → Eşleşme bulunursa → Content script enjekte edilir
    → Log satırları işlenir → Butonlar eklenir
    → Kullanıcı butona tıklar → Yeni sekmede URL açılır
```

## Hızlı Başlangıç

1. [Eklentiyi yükleyin](/getting-started/installation)
2. [İlk URL Pattern'inizi ekleyin](/getting-started/quick-start)
3. [İlk butonunuzu oluşturun](/getting-started/first-button)

## Kimler İçin?

Graytool özellikle şu geliştiriciler için tasarlanmıştır:

- **Backend geliştiricileri** — Log'lardan hızlıca kullanıcı/sipariş detaylarına gitmek isteyenler
- **DevOps mühendisleri** — Birden fazla Graylog instance'ı yönetenler
- **Takım liderleri** — Standart navigasyon butonlarını tüm takım ile paylaşmak isteyenler

## Versiyon

Mevcut sürüm: **v2.0.2** — Chrome Manifest V3
