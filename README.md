# Mantine Next.js + Nextra template

<img width="1536" height="2626" alt="image" src="https://github.com/user-attachments/assets/35ec064c-5f3f-495a-b2a3-5de82f19bdab" />


<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

This is a template for [Next.js](https://nextjs.org/) app router + [Mantine](https://mantine.dev/) + [Nextra](https://nextra.site/) documentation site.

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)
- Provides API example in `/api/version`
- Turbopack inline SVG loader [turbopack-inline-svg-loader](https://github.com/vitalets/turbopack-inline-svg-loader)

## Nextra Features

- [Nextra](https://nextra.site/) documentation site with Mantine theme
- Sync Dark mode between documentation and application (Mantine/Nextra)
- Customizable components in `components` folder
- Provides new Navigation and Footer components for Nextra documentation site

## Folder structure

- `components` – shared components 
    - you can use them in both documentation and application
    - you may customize them to fit your needs
- `content` – Nextra documentation site (.mdx and _meta.json files)

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

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
