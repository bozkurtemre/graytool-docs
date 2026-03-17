---
sidebar_position: 5
title: Katkıda Bulunma
---

# Katkıda Bulunma

Graytool'a katkıda bulunmak istediğiniz için teşekkür ederiz!

## Başlarken

1. Projeyi fork'layın
2. Feature branch oluşturun: `git checkout -b feature/yeni-ozellik`
3. Geliştirme ortamını kurun:

```bash
git clone https://github.com/<your-username>/graytool.git
cd graytool
npm install
npm run build
```

## Geliştirme Süreci

1. Kodu yazın
2. Tip kontrolü yapın: `npm run typecheck`
3. Formatlayın: `npm run format`
4. Lint çalıştırın: `npm run lint`
5. Chrome'da test edin

## Commit Mesajları

Anlamlı commit mesajları kullanın:

```
feat: JSON viewer'a kod üretici eklendi
fix: Alan keşfinde boş string sorunu düzeltildi
docs: Buton yapılandırma dokümantasyonu güncellendi
refactor: Storage modülü yeniden yapılandırıldı
```

## Pull Request

1. Tüm testlerin ve lint kontrollerinin geçtiğinden emin olun
2. Değişikliklerinizi açıklayan bir PR açın
3. Code review sürecini bekleyin

## Kod Standartları

- [Kod Stili Rehberi](/development/code-style) kurallarına uyun
- Tüm storage erişimi `shared/storage.ts` üzerinden yapılmalı
- Tüm sabitler `shared/constants.ts`'ten import edilmeli  
- Tüm yardımcı fonksiyonlar `shared/utils.ts`'ten import edilmeli
- Content script'lerde sessiz başarısızlık ilkesine uyun
- XSS koruması için `escapeHtml()` ve `escapeAttr()` kullanın

## Bug Bildirimi

GitHub Issues üzerinden:

1. Graylog versiyonunuzu belirtin
2. Chrome versiyonunuzu belirtin
3. Tekrarlanabilir adımlar verin
4. Beklenen ve gerçekleşen davranışı açıklayın
5. Console hata loglarını ekleyin

## Özellik Talebi

GitHub Issues üzerinden:

1. Özelliğin ne işe yarayacağını açıklayın
2. Kullanım senaryosu verin
3. Olası tasarım yaklaşımını tartışın
