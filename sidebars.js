/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    "intro",
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/installation",
        "getting-started/quick-start",
        "getting-started/first-button",
      ],
    },
    {
      type: "category",
      label: "Configuration",
      items: [
        "configuration/url-patterns",
        "configuration/buttons",
        "configuration/field-bindings",
        "configuration/conditions",
        "configuration/field-config",
        "configuration/settings",
        "configuration/import-export",
      ],
    },
    {
      type: "category",
      label: "Features",
      items: [
        "features/button-injection",
        "features/json-viewer",
        "features/field-detection",
        "features/search-history",
        "features/keyboard-shortcuts",
        "features/theming",
      ],
    },
    {
      type: "category",
      label: "Architecture",
      items: [
        "architecture/overview",
        "architecture/data-flow",
        "architecture/message-passing",
        "architecture/security",
      ],
    },
    {
      type: "category",
      label: "Development",
      items: [
        "development/setup",
        "development/build-system",
        "development/project-structure",
        "development/code-style",
        "development/contributing",
      ],
    },
    {
      type: "category",
      label: "API Reference",
      items: [
        "api/types",
        "api/storage",
        "api/constants",
        "api/utils",
      ],
    },
    "faq",
    "changelog",
  ],
};

module.exports = sidebars;
