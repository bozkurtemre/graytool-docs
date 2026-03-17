---
sidebar_position: 1
title: Tip Tanımları
---

# Tip Tanımları (Types)

`src/shared/types.ts` dosyasındaki tüm TypeScript tip tanımları.

## Ana Yapılandırma

### GrayToolConfig

Eklentinin tüm yapılandırmasını kapsayan ana interface.

```typescript
interface GrayToolConfig {
  version: 2;
  urlPatterns: UrlPattern[];
  buttons: ButtonConfig[];
  globalFieldConfig: GlobalFieldConfig;
  settings: AppSettings;
}
```

| Alan | Tip | Açıklama |
|------|-----|----------|
| `version` | `2` (literal) | Yapılandırma format versiyonu |
| `urlPatterns` | `UrlPattern[]` | Aktif URL desenleri listesi |
| `buttons` | `ButtonConfig[]` | Tanımlı butonlar listesi |
| `globalFieldConfig` | `GlobalFieldConfig` | Alan keşfi ve JSON parse ayarları |
| `settings` | `AppSettings` | Özellik açma/kapama ayarları |

## URL Pattern

### UrlPattern

```typescript
interface UrlPattern {
  id: string;
  pattern: string;
  label: string;
  enabled: boolean;
}
```

| Alan | Tip | Açıklama |
|------|-----|----------|
| `id` | `string` | Benzersiz kimlik (otomatik oluşturulur) |
| `pattern` | `string` | Glob pattern (`*` joker karakteri) |
| `label` | `string` | Görünen isim |
| `enabled` | `boolean` | Aktif/pasif durumu |

## Buton Yapılandırması

### ButtonConfig

```typescript
interface ButtonConfig {
  id: string;
  label: string;
  url: string;
  fieldBindings: FieldBinding[];
  conditions: ButtonCondition[];
  openInNewTab: boolean;
  enabled: boolean;
  color: ButtonColor;
  icon?: string;
  urlPatternIds?: string[];
}
```

| Alan | Tip | Açıklama |
|------|-----|----------|
| `id` | `string` | Benzersiz kimlik |
| `label` | `string` | Buton üzerindeki metin |
| `url` | `string` | URL şablonu `{placeholder}` |
| `fieldBindings` | `FieldBinding[]` | Alan bağlamaları |
| `conditions` | `ButtonCondition[]` | Görünürlük koşulları |
| `openInNewTab` | `boolean` | Yeni sekmede aç |
| `enabled` | `boolean` | Aktif/pasif |
| `color` | `ButtonColor` | Buton rengi |
| `icon` | `string?` | Opsiyonel SVG ikon string |
| `urlPatternIds` | `string[]?` | Belirli pattern'lerde göster (boş=tümü) |

### ButtonColor

```typescript
type ButtonColor = "primary" | "default" | "danger" | "warning" | "success";
```

### FieldBinding

```typescript
interface FieldBinding {
  placeholder: string;
  fieldPath: string;
  fallbackPaths?: string[];
}
```

| Alan | Tip | Açıklama |
|------|-----|----------|
| `placeholder` | `string` | URL'deki `{name}` |
| `fieldPath` | `string` | Birincil alan yolu |
| `fallbackPaths` | `string[]?` | Alternatif alan yolları |

### ButtonCondition

```typescript
interface ButtonCondition {
  field: string;
  operator: ButtonConditionOperator;
  value?: string;
}
```

### ButtonConditionOperator

```typescript
type ButtonConditionOperator =
  | "exists"
  | "equals"
  | "contains"
  | "startsWith"
  | "notEquals";
```

## Alan Yapılandırması

### GlobalFieldConfig

```typescript
interface GlobalFieldConfig {
  defaultMessageField?: string | null;
  rowFieldPrefixes: string[];
  searchPrefixes?: string[];
  parseJsonStrings?: boolean;
  jsonParseMaxDepth?: number;
}
```

| Alan | Tip | Varsayılan | Açıklama |
|------|-----|-----------|----------|
| `defaultMessageField` | `string \| null?` | `null` | JSON viewer varsayılan alanı |
| `rowFieldPrefixes` | `string[]` | `["msg.", "context.", ""]` | Aranacak prefix'ler |
| `searchPrefixes` | `string[]?` | — | UI alias'ı |
| `parseJsonStrings` | `boolean?` | `true` | JSON string'leri parse et |
| `jsonParseMaxDepth` | `number?` | `5` | Maks parse derinliği |

## Uygulama Ayarları

### AppSettings

```typescript
interface AppSettings {
  enabled: boolean;
  showMessageDetailButton: boolean;
  jsonViewerEnabled: boolean;
  keyboardShortcutsEnabled: boolean;
  searchHistoryEnabled: boolean;
}
```

| Alan | Tip | Varsayılan | Açıklama |
|------|-----|-----------|----------|
| `enabled` | `boolean` | `true` | Ana açma/kapama |
| `showMessageDetailButton` | `boolean` | `true` | Mesaj detay butonu |
| `jsonViewerEnabled` | `boolean` | `true` | JSON viewer |
| `keyboardShortcutsEnabled` | `boolean` | `true` | Klavye kısayolları |
| `searchHistoryEnabled` | `boolean` | `true` | Arama geçmişi |

## Alan Keşfi

### DiscoveredField

```typescript
interface DiscoveredField {
  name: string;
  value: string;
  source: FieldSource;
  element?: Element;
}
```

### FieldSource

```typescript
type FieldSource = "data-field" | "json-parse" | "text-pattern" | "dom-attribute";
```

| Kaynak | Öncelik | Açıklama |
|--------|---------|----------|
| `data-field` | 4 (en yüksek) | HTML data attribute |
| `dom-attribute` | 3 | DOM yapısal element |
| `json-parse` | 2 | JSON parse sonucu |
| `text-pattern` | 1 (en düşük) | Metin deseni |

## Arama Geçmişi

### SearchHistoryEntry

```typescript
interface SearchHistoryEntry {
  query: string;
  timestamp: number;
}
```

## Mesaj Tipleri

### GrayToolMessage

```typescript
type GrayToolMessage =
  | ActivateMessage
  | DeactivateMessage
  | ConfigUpdatedMessage
  | CheckUrlMessage
  | GetConfigMessage
  | PingMessage
  | RequestPermissionMessage
  | HasPermissionMessage
  | GetConfiguredOriginsMessage;
```

### ActivateMessage

```typescript
interface ActivateMessage {
  type: "ACTIVATE";
  matchedPatternId?: string;
}
```

### DeactivateMessage

```typescript
interface DeactivateMessage {
  type: "DEACTIVATE";
}
```

### ConfigUpdatedMessage

```typescript
interface ConfigUpdatedMessage {
  type: "CONFIG_UPDATED";
}
```

### İstek Mesajları

```typescript
interface CheckUrlMessage { type: "CHECK_URL"; }
interface GetConfigMessage { type: "GET_CONFIG"; }
interface PingMessage { type: "PING"; }

interface RequestPermissionMessage {
  type: "REQUEST_PERMISSION";
  pattern: string;
}

interface HasPermissionMessage {
  type: "HAS_PERMISSION";
  url: string;
}

interface GetConfiguredOriginsMessage {
  type: "GET_CONFIGURED_ORIGINS";
}
```
