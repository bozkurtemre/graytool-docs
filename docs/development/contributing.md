---
sidebar_position: 5
title: Contributing
---

# Contributing

Thank you for your interest in contributing to Graytool!

## Getting Started

1. Fork the project
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Set up the development environment:

```bash
git clone https://github.com/<your-username>/graytool.git
cd graytool
npm install
npm run build
```

## Development Process

1. Write your code
2. Run type checks: `npm run typecheck`
3. Format the code: `npm run format`
4. Run lint: `npm run lint`
5. Test in Chrome

## Commit Messages

Use meaningful commit messages:

```
feat: Added code generator to JSON viewer
fix: Fixed empty string issue in field detection
docs: Updated button configuration documentation
refactor: Restructured storage module
```

## Pull Requests

1. Make sure all tests and lint checks pass
2. Open a PR describing your changes
3. Wait for the code review process

## Code Standards

- Follow the [Code Style Guide](/development/code-style) rules
- All storage access must go through `shared/storage.ts`
- All constants must be imported from `shared/constants.ts`
- All utility functions must be imported from `shared/utils.ts`
- Follow the silent failure principle in content scripts
- Use `escapeHtml()` and `escapeAttr()` for XSS protection

## Bug Reports

Via GitHub Issues:

1. Specify your Graylog version
2. Specify your Chrome version
3. Provide reproducible steps
4. Describe the expected vs. actual behavior
5. Include console error logs

## Feature Requests

Via GitHub Issues:

1. Explain what the feature would do
2. Provide a use case
3. Discuss a possible design approach
