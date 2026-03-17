# Graytool Documentation

The official documentation site for **Graytool** — a Chrome extension (Manifest V3) that enhances Graylog log management interfaces.

🌐 **Live site:** [graytool.dev](https://graytool.dev)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The site will be available at `http://localhost:3000`.

## Commands

| Command           | Description                        |
|-------------------|------------------------------------|
| `npm start`       | Start dev server with hot reload   |
| `npm run build`   | Create production build            |
| `npm run serve`   | Serve production build locally     |
| `npm run clear`   | Clear Docusaurus cache             |

## Project Structure

```
docs/                # English documentation (Markdown)
i18n/tr/             # Turkish translations
src/css/custom.css   # Theme customization
static/img/          # Static assets
sidebars.js          # Sidebar navigation
docusaurus.config.js # Site configuration
```

## Localization

The site supports English (default) and Turkish. Turkish translations are located in `i18n/tr/docusaurus-plugin-content-docs/current/`.

To start the dev server in Turkish:

```bash
npm start -- --locale tr
```

## Build

```bash
npm run build
```

The output is generated in the `build/` directory. The build will fail on broken links (`onBrokenLinks: "throw"`), so fix any link issues before deploying.

## Contributing

See the [Contributing Guide](https://graytool.dev/development/contributing) for details.

## License

Copyright © Graytool. Built with [Docusaurus](https://docusaurus.io/).
