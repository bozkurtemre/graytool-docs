---
sidebar_position: 100
title: SSS (FAQ)
---

# Sık Sorulan Sorular

## Genel

### Graytool hangi Graylog versiyonlarını destekler?

Graytool, çeşitli Graylog versiyonlarını destekler:
- **Graylog 5.x+** — Modern data-testid attribute'ları ile tam destek
- **Graylog 3.x - 4.x** — Legacy data-field attribute'ları ile destek
- **Özel temalar** — log-row, message-group, MessageTableEntry sınıflarıyla

### Graytool verilerimi topluyor mu?

Hayır. Graytool hiçbir veriyi dış sunuculara göndermez. Tüm veriler yerel olarak Chrome storage'da saklanır ve yalnızca cihazınızda kalır.

### Birden fazla Graylog instance'ı kullanabilir miyim?

Evet! URL Patterns özelliği tam olarak bunun için tasarlandı. Her instance için ayrı pattern ekleyin ve butonları istediğiniz pattern'lere atayın.

## Kurulum

### Eklenti Chrome Web Store'da var mı?

Şu an geliştirici modunda yükleme gerekmektedir. Detaylar için [Kurulum](/getting-started/installation) sayfasına bakın.

### Firefox'ta çalışır mı?

Şu an yalnızca Chrome (ve Chromium tabanlı tarayıcılar: Edge, Brave, Opera) desteklenmektedir.

## Yapılandırma

### Butonlarım neden görünmüyor?

Birkaç olası neden:

1. **Eklenti devre dışı** — Settings → Extension Enabled kontrol edin
2. **URL pattern eşleşmiyor** — Doğru pattern tanımlandığından emin olun
3. **İzin verilmemiş** — Pattern eklerken Chrome izin diyalogunu onayladınız mı?
4. **Koşullar karşılanmıyor** — Buton koşullarını kontrol edin
5. **Alan bulunamıyor** — URL template'deki placeholder'ların log alanlarıyla eşleştiğinden emin olun
6. **Buton disabled** — Butonun enabled durumunu kontrol edin
7. **URL pattern ataması** — Buton belirli pattern'lere mi atanmış?

### JSON Viewer açılmıyor

1. **jsonViewerEnabled** ayarının `true` olduğunu kontrol edin
2. **showMessageDetailButton** ayarının `true` olduğunu kontrol edin
3. Log satırında en az 1 alan keşfedilebildiğini doğrulayın

### Arama geçmişi kaydetmiyor

1. **searchHistoryEnabled** ayarını kontrol edin
2. Graylog'un Ace Editor kullandığını doğrulayın (QueryEditor ID'si)
3. Enter tuşu veya arama butonu ile arama yapıyor olduğunuzdan emin olun

### Import çalışmıyor

- JSON formatının geçerli olduğundan emin olun
- `version: 2` olmalıdır (veya v1 formatı otomatik migrate edilir)
- Dosya boyutunun `chrome.storage.sync` limitini (~100KB) aşmadığından emin olun

## Teknik

### Chrome sayfa performansını etkiler mi?

Graytool minimal performans etkisi için tasarlandı:
- MutationObserver 50ms debounce ile çalışır
- Satırlar yalnızca bir kez işlenir
- JSON parse yalnızca gerektiğinde yapılır
- Stiller tek bir `<style>` elementi ile enjekte edilir

### Sayfa yenilendiğinde butonlar kayboluyor

Normal davranış — butonlar dinamik olarak enjekte edilir. Sayfa yenilendiğinde Graytool otomatik olarak tekrar aktif olur ve butonları yeniden enjekte eder.

### Content script neden 2 saniyede bir çalışıyor?

Periyodik tarama, Graylog'un SPA (Single Page Application) yapısı nedeniyle gereklidir:
- Pagination değişikliklerinde yeni satırlar gelir
- MutationObserver bazı geç yüklenen satırları kaçırabilir
- İlk yüklemede Graylog'un DOM'u henüz hazır olmayabilir

### localStorage erişimi ne için?

Yalnızca şu veriler için:
- Graylog tema modu (`themeMode`)
- JSON viewer tab daraltma durumu (`graytool_tabs_collapsed`)
