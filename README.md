# Mantine Next.js + Nextra template

<div align="center">
  <p><img src="https://raw.githubusercontent.com/gfazioli/gfazioli/master/glancecard/next-app-nextra-template.svg" width="880" alt="next-app-nextra-template at a glance, refreshed daily: commits, releases, stars, issues and pull requests, a year of commit activity, the weekly rhythm, languages, latest commits and releases, contributors" /><br>
  <sub>Made with <a href="https://github.com/gfazioli/glancecard">glancecard</a> · refreshed daily</sub></p>
</div>

A [Next.js](https://nextjs.org/) App Router template for documentation sites, on [Mantine](https://mantine.dev/) and [Nextra](https://nextra.site/).

**The engine is Nextra 4**: its docs theme renders the MDX pages, the sidebar and the table of contents, and Mantine is wired into it, with one theme, the two dark modes kept in sync, and your own components available in every page.

**[Live demo](https://next-app-nextra-template.vercel.app/)** · [Documentation](https://next-app-nextra-template.vercel.app/docs) · [Release notes](https://github.com/gfazioli/next-app-nextra-template/releases) · [Mantine Extensions Hub](https://mantine-extensions.vercel.app/)

<div align="center">

[<kbd> <br/> ❤️ If this template has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

## One design, three engines

The same Mantine starter comes on three documentation engines: the same landing page, the same footer and the same Mantine look. What changes is what compiles and serves the docs.

[▶ The three templates in 30 seconds](https://www.youtube.com/watch?v=puZmwwggO-k)

| Template | Engine | Live demo |
| --- | --- | --- |
| [Mantine Next.js + Docs](https://github.com/gfazioli/next-app-mantine-docs-template) | [`@next/mdx`](https://nextjs.org/docs/app/guides/mdx): no docs framework, every piece of the interface a Mantine component | [next-app-mantine-docs-template.vercel.app](https://next-app-mantine-docs-template.vercel.app/) |
| **Mantine Next.js + Nextra** (this one) | [Nextra 4](https://nextra.site/) and its docs theme, with Mantine wired in | [next-app-nextra-template.vercel.app](https://next-app-nextra-template.vercel.app/) |
| [Mantine Next.js + Fumadocs](https://github.com/gfazioli/next-app-fumadocs-template) | headless [`fumadocs-core`](https://www.fumadocs.dev/) under a docs UI built 100% with Mantine | [next-app-fumadocs-template.vercel.app](https://next-app-fumadocs-template.vercel.app/) |

Looking for components to put in your docs? The [Mantine Extensions Hub](https://mantine-extensions.vercel.app/) lists the same author's open-source extensions for Mantine.

## Quick start

```bash
git clone https://github.com/gfazioli/next-app-nextra-template.git my-docs
cd my-docs
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000): the landing page is at `/`, the documentation at `/docs`. Add `.mdx` pages in `content` and order them in the `_meta.ts` files.

**Requirements**: Node.js 24 (see `.nvmrc`) and Yarn 4, which the repository pins: do not use npm or pnpm.

## Features

- [Next.js 16](https://nextjs.org/) with App Router and Turbopack
- [Mantine 9](https://mantine.dev/) UI component library
- [Nextra 4](https://nextra.site/) documentation framework with Mantine theme sync
- Dark mode in sync between the documentation and the application (Mantine and Nextra)
- Custom navbar and footer for the Nextra docs theme, made of Mantine components
- [Pagefind](https://pagefind.app/) search index and a server-side search API
- GitHub release notes through a small API proxy
- A landing page and a footer shared with the two sibling templates, with the versions of the stack read from `package.json` at build time
- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript 6](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [oxlint](https://oxc.rs/docs/guide/usage/linter) for linting and [oxfmt](https://oxc.rs/docs/guide/usage/formatter) for formatting
- Turbopack inline SVG loader [turbopack-inline-svg-loader](https://github.com/vitalets/turbopack-inline-svg-loader)

## Folder structure

- `app` – Next.js App Router pages, layouts, and API routes
- `components` – shared components (usable in both documentation and application)
- `components/Home` – the landing page, section by section
- `content` – the docs: `.mdx` pages and `_meta.ts` files
- `config` – centralized site configuration (metadata, GitHub API, search); `config/site.ts` says which of the three templates this is

## Scripts

- `dev` – the dev server
- `build` – the production build, then the Pagefind index
- `analyze` – bundle analysis with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- `test` – typegen, formatting, lint, types and Jest
- `typecheck`, `lint`, `jest`, `jest:watch`, `format:test`, `format:write`
- `storybook`, `storybook:build`

## Deploy

- **Vercel** (how the live demo is hosted): import the repository and deploy, no configuration needed. `yarn build` writes the Pagefind index after the Next.js build.
- **Any Node host**: `yarn build`, then `yarn start`.
- Set `GITHUB_TOKEN` to lift the GitHub releases proxy above GitHub's anonymous rate limit.

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this template has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

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
