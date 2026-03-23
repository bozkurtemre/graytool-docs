// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Graytool",
  tagline: "Graylog Developer Toolkit — Chrome Extension",
  favicon: "img/logo.png",

  url: "https://graytool.dev",
  baseUrl: "/",

  organizationName: "graytool",
  projectName: "graytool",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "tr"],
    localeConfigs: {
      en: { label: "English", direction: "ltr" },
      tr: { label: "Türkçe", direction: "ltr" },
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Graytool",
        logo: {
          alt: "Graytool Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "Documentation",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
          {
            href: "https://github.com/bozkurtemre/graytool",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              { label: "Getting Started", to: "/getting-started/installation" },
              { label: "Configuration", to: "/configuration/url-patterns" },
              { label: "Features", to: "/features/button-injection" },
            ],
          },
          {
            title: "More",
            items: [
              { label: "GitHub", href: "https://github.com" },
              { label: "Contributing", to: "/development/contributing" },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://graytool.dev" target="_blank" rel="noopener noreferrer">Graytool</a>. Built with Docusaurus.`,
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      prism: {
        theme: require("prism-react-renderer").themes.github,
        darkTheme: require("prism-react-renderer").themes.dracula,
        additionalLanguages: ["bash", "json", "typescript"],
      },
    }),
};

module.exports = config;
