---
sidebar_position: 4
title: Kod Stili
---

# Kod Stili Rehberi

Bu rehber, Graytool projesindeki kodlama kurallarını açıklar.

## Formatlama

Formatlama **Prettier** ile zorunlu kılınır. Kurallar:

| Kural | Değer |
|-------|-------|
| Girinti | 2 boşluk |
| Noktalı virgül | Zorunlu |
| Tırnak işareti | Çift tırnak (`"`) |
| Trailing comma | Çoklu satırlarda zorunlu |
| Print width | 100 karakter |
| Satır sonu | LF |

```bash
# Tüm dosyaları formatla
npm run format

# Formatlama kontrolü (CI)
npm run format:check
```

## İsimlendirme Kuralları

| Element | Kural | Örnek |
|---------|-------|-------|
| Değişkenler | camelCase | `fieldMap`, `resolvedUrl` |
| Fonksiyonlar | camelCase | `getConfig()`, `processRow()` |
| Sabitler | SCREAMING_SNAKE_CASE | `DEBOUNCE_MS`, `STORAGE_KEY` |
| Tipler/Interface | PascalCase | `ButtonConfig`, `GrayToolConfig` |
| Type union | PascalCase | `ButtonColor`, `FieldSource` |
| React bileşenleri | PascalCase | `ButtonsPage`, `ButtonCard` |
| CSS sınıfları | kebab-case + `gt-` | `gt-btn`, `gt-btn-primary` |
| Data attribute | kebab-case + `graytool-` | `data-graytool-btn-id` |

## Import Sırası

```typescript
// 1. External paketler
import React, { useState, useEffect } from "react";

// 2. Shared (constants, utils, storage)
import { PROCESS_INTERVAL_MS } from "../shared/constants";
import { escapeHtml } from "../shared/utils";
import { getConfig } from "../shared/storage";

// 3. Internal modüller
import { processRow } from "./row-processor";

// 4. Type-only import'lar
import type { GrayToolConfig } from "../shared/types";
```

### Type-Only Import

Yalnızca tip olarak kullanılan import'lar `import type` ile yapılır:

```typescript
// ✅ Doğru
import type { GrayToolConfig, ButtonConfig } from "../shared/types";

// ❌ Yanlış
import { GrayToolConfig } from "../shared/types";
```

## Dosya Başlıkları

Her dosyada açıklayıcı başlık yorumu bulunur:

```typescript
// inject/button-injector.ts — Button injection into Graylog log rows
// Resolves URL templates, evaluates conditions, and injects styled buttons.
```

## Bölüm Ayırıcıları

Dosya içi mantıksal gruplamalar için:

```typescript
// ─── Section Name ─────────────────────────────────────────
```

## TypeScript Kuralları

### Strict Mode

Proje strict mode ile çalışır. Bu şu demektir:

- `noImplicitAny` — `any` tipi açıkça belirtilmeli
- `strictNullChecks` — null/undefined kontrolleri zorunlu
- `strictFunctionTypes` — Fonksiyon parametre tipleri katı

### Explicit Return Types

Dışa aktarılan fonksiyonlarda dönüş tipi zorunludur:

```typescript
// ✅ Doğru
export async function getConfig(): Promise<GrayToolConfig> {
  // ...
}

// ❌ Yanlış
export async function getConfig() {
  // ...
}
```

### `any` Kullanımı

`any` yerine `unknown` tercih edilir:

```typescript
// ✅ Doğru
function parse(data: unknown): GrayToolConfig {
  // ...
}

// ❌ Yanlış
function parse(data: any) {
  return data;
}
```

## Hata Yönetimi

### Chrome API Hataları

```typescript
// ✅ Her zaman kontrol et
return new Promise((resolve, reject) => {
  chrome.storage.sync.set({ [STORAGE_KEY]: updated }, () => {
    if (chrome.runtime.lastError) {
      reject(new Error(chrome.runtime.lastError.message));
    } else {
      resolve();
    }
  });
});
```

### Content Script'te Sessiz Başarısızlık

```typescript
// ✅ Graylog'u bozma
try {
  processRow(row, config);
} catch (error) {
  // Sessiz başarısızlık
}
```

### Loglama

```typescript
// ✅ Prefix ile
console.log("Graytool: Error loading config:", error);
```

## Zorunlu Import Kuralları

### Storage Erişimi

**Tüm** storage erişimi `shared/storage.ts` üzerinden yapılmalıdır:

```typescript
// ✅ Doğru
import { getConfig, saveConfig } from "../shared/storage";

// ❌ Asla
chrome.storage.sync.get(["graytool_config"], (result) => { ... });
```

### Sabitler

**Tüm** sabitler `shared/constants.ts`'ten import edilmelidir:

```typescript
// ✅ Doğru
import { STORAGE_KEY, PROCESSED_ATTR } from "../shared/constants";

// ❌ Asla
const STORAGE_KEY = "graytool_config";
```

### Yardımcı Fonksiyonlar

**Tüm** yardımcı fonksiyonlar `shared/utils.ts`'ten import edilmelidir:

```typescript
// ✅ Doğru
import { escapeHtml, escapeAttr, copyToClipboard } from "../shared/utils";

// ❌ Asla (yerel tanımlama)
function escapeHtml(text: string) { ... }
```

## React Kuralları

### Fonksiyonel Bileşenler

```typescript
interface Props {
  config: GrayToolConfig;
  onSave: (updates: Partial<GrayToolConfig>) => Promise<void>;
}

export const ButtonsPage: React.FC<Props> = ({ config, onSave }) => {
  const [editing, setEditing] = useState<ButtonConfig | null>(null);
  // ...
};
```

### CSS

- Options sayfasında: **TailwindCSS** utility sınıfları
- Content script'te: **Özel CSS** `gt-` prefix ile
