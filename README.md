# Mantine Next.js + Nextra template

<img width="1536" height="2044" alt="image" src="https://github.com/user-attachments/assets/008eb9b9-ba86-42b6-a5c6-72db3c21bc61" />


<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

This is a template for [Next.js](https://nextjs.org/) app router + [Mantine](https://mantine.dev/) + [Nextra](https://nextra.site/) documentation site.

## Features

This template comes with the following features:

- [Next.js 16](https://nextjs.org/) with App Router and Turbopack
- [Mantine 9](https://mantine.dev/) UI component library
- [Nextra 4](https://nextra.site/) documentation framework with Mantine theme sync
- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript 6](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [oxlint](https://oxc.rs/docs/guide/usage/linter) for linting
- [oxfmt](https://oxc.rs/docs/guide/usage/formatter) for formatting
- [Pagefind](https://pagefind.app/) server-side search API
- Turbopack inline SVG loader [turbopack-inline-svg-loader](https://github.com/vitalets/turbopack-inline-svg-loader)

## Nextra Features

- [Nextra](https://nextra.site/) documentation site with Mantine theme
- Sync Dark mode between documentation and application (Mantine/Nextra)
- Customizable components in `components` folder
- Custom Navigation and Footer components for Nextra documentation site
- GitHub Release Notes integration via API

## Folder structure

- `app` – Next.js App Router pages, layouts, and API routes
- `components` – shared components (usable in both documentation and application)
- `content` – Nextra documentation site (`.mdx` and `_meta.ts` files)
- `config` – centralized site configuration (metadata, GitHub API, search)

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production (includes pagefind search index)
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs oxlint and Stylelint
- `format:test` – checks files with oxfmt
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `format:test`, `lint`, `typecheck` and `jest` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `format:write` – formats all files with oxfmt

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates
- Add new features, improve performance, and refine the developer experience
- Expand test coverage and documentation for smoother adoption
- Ensure long‑term sustainability without relying on ad hoc free time
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up‑to‑date, and growing for everyone.

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/next-app-nextra-template&type=Timeline)](https://www.star-history.com/#gfazioli/next-app-nextra-template&Timeline)

</div>
