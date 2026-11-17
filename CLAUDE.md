# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 16 + Mantine 9 + Nextra 4** template used as the documentation site foundation for the Mantine Extensions ecosystem. It serves as a reusable starter for building docs sites with integrated Mantine components.

## Commands

| Command | Purpose |
|---------|---------|
| `yarn dev` | Start Next.js dev server |
| `yarn build` | Production build (Next.js + pagefind search index) |
| `yarn test` | Full suite: typegen, oxfmt, lint, typecheck, jest |
| `yarn jest` | Run Jest tests only |
| `yarn jest:watch` | Jest in watch mode |
| `yarn jest -- path/to/file` | Run a single test file |
| `yarn typecheck` | TypeScript type checking (`tsc --noEmit`) |
| `yarn lint` | oxlint + Stylelint |
| `yarn format:write` | Auto-format all TS/TSX/CSS files (oxfmt) |
| `yarn format:test` | Check formatting (oxfmt) |
| `yarn storybook` | Storybook dev server on port 6006 |
| `yarn analyze` | Bundle analysis with `@next/bundle-analyzer` |

## Architecture

### Routing & Content

- **App Router** (`app/`): Next.js 16 app router with Nextra integration
- **Docs content** (`content/`): MDX files rendered via Nextra at `/docs/[[...mdxPath]]`
- Nextra is configured with `contentDirBasePath: '/docs'` — all MDX content is served under `/docs`
- `content/_meta.ts` controls sidebar navigation order and labels

### Layout & Theme Integration

- `app/layout.tsx` wraps the entire app in both `MantineProvider` and Nextra's `Layout`
- Dark mode sync between Mantine and Nextra is handled by `MantineNextraThemeObserver`
- Mantine theme overrides go in `theme.ts` (client-side `createTheme`)
- Global site configuration (metadata, GitHub API, search, Nextra layout) lives in `config/index.ts`
- **The mantine.dev look** (since 2026-10-01, the same as the Mantine Extensions hub): Outfit for headings through `next/font` (`--font-outfit`, used by `theme.ts` and by the `h1..h6` rule in `theme/global.css` for Nextra's MDX headings), Mantine's system stack for text, the page on Mantine's body colours (`#fff` / `#242424`), set on Nextra's `<Head backgroundColor color>` too, and the active sidebar link in `--mantine-color-blue-light`. Do not bring back an `--x-color-nextra-bg` override: it keeps the navbar and sticky panels off the page colour
- **No global Button override**: `theme/global.css` used to turn every `.mantine-Button-root` into a pill with a hover scale, beating the `radius` prop. Buttons now render with Mantine's own radius and variants
- **Two colour-scheme systems, both light by default**: Mantine (`head.mantine.defaultColorScheme`, key `mantine-color-scheme-value`) and Nextra's next-themes (`nextraLayout.nextThemes.defaultTheme`, key `theme`), side by side in `config/index.ts` because nothing reconciles them on load. Change both or neither. `MantineNextraThemeObserver` mirrors Nextra into Mantine with `useDidUpdate`, never on mount, which would write the default into every visitor's storage. A stored choice beats the default, so check a default in a private window

### Key Components (`components/`)

- `MantineNavBar` / `MantineFooter` — custom Nextra layout replacements
- `ColorSchemeControl` (header) / `ColorSchemeToggle` (the home page's three buttons, which set Mantine's scheme and Nextra's theme together) — dark mode
- `ReleaseNotes` — fetches GitHub releases via `/api/github-releases`
- `Logo` — branding
- `Link` — `next/link` as a client reference, for `component={Link}` in server components

### The home page and the site footer (shared with the sibling templates)

- **The same files in the three templates** (`next-app-mantine-docs-template`, `next-app-nextra-template`, `next-app-fumadocs-template`): `components/Home/`, `components/Motion/`, `components/Sponsors/`, `components/MantineFooter/`, `components/Link/`, `config/templates.ts` and `theme/site.css`. Change them in all three together and compare with `diff -r`. `config/site.ts` is the one line that says which template a repository is; everything that differs (engine name, its colours, repository and demo links, the features) is read from it.
- **`HomePage`** is a server component and renders no `<main>`: `app/page.tsx` or the engine's layout provides it. Its sections: `Hero` (with `DocsWindow`, a docs page drawn in CSS), `Stack`, `Features`, `Templates`, `Extensions`, `Sponsors`, `FinalCta`. The look is a blueprint: dashed lines at the container's edges, a rule with registration marks between sections (`Home.module.css`), colours from `theme/site.css` (`--site-*`, on `body` because of `light-dark()`). `Sponsors` and `MantineFooter` are client components on purpose: as server components their links and icon paths were sent twice in every document, as markup and again in the RSC payload (7 KiB gzipped on the home page, 5 on every docs page).
- **`Stack` is the versions block**: every number is read from `package.json` at build time, never typed. Six packages get a figure (`RollingNumber`, an odometer), the other dependencies a tag with the declared range.
- **Motion rules**: only `transform` and `opacity` move. A hover's colour fade (background, border or text colour, 200 ms at most, on hover only) is not motion and stays, with or without Reduce Motion. The hero's `h1` is the page's largest paint: it has no entrance, and nothing in its column does. Scroll reveals (`components/Motion`) hide nothing in the served HTML: a scope is armed by script only when it is off screen, then revealed once, both by an IntersectionObserver (`useReveal` never measures an element, which would force the layout of skipped sections). Everything stands still under `prefers-reduced-motion`.
- **First render**: the sections under the stack carry `RENDER_LATER` and are `content-visibility: auto` until `RenderLater` hands them back, one per idle period after the load. The first paint skips their style and layout (about 80 ms on a throttled phone), and a full-page capture taken after the load still shows them.
- **Text contrast**: `--site-text` and `--site-accent` hold 4.5:1 on the page, a card and the footer in both schemes; filled buttons use `blue.8` / `red.8` (white on Mantine's default `blue.6` is 3.5:1).
- **BorderAnimate** (the rim of the hero window and of the current template's card) uses `beamMode="wedge"` with `colorStops`, the one beam that animates a rotation and not a custom property. Its `trigger="inView"` leaves the border at opacity 0 in 3.0.11 (the rule that hides an idle border outweighs the one that shows an active one), hence `--border-animate-active: 1 !important` on `.beam`; it also ignores Reduce Motion unless the theme sets `respectReducedMotion`, hence the media query beside it.

### API Routes (`app/api/`)

- `version/` — returns current package version
- `github-releases/` — proxies GitHub releases API (configured in `config/index.ts`)
- `search/` — pagefind-based search endpoint

### Search

Search uses [pagefind](https://pagefind.app/). The index is built post-build (`yarn build:pagefind`) into `public/_pagefind/`. The search API route reads this index.

### CSS Import Order

In `app/layout.tsx`, CSS imports must follow this order:
1. `@mantine/core/styles.css`
2. Mantine extension styles (e.g., marquee, text-animate)
3. Global styles

### Build Pipeline

Next.js config (`next.config.mjs`) chains: `nextra()` → `bundleAnalyzer()`. Turbopack is configured with inline SVG loader for SVGs under ~4KB.

## Tooling

- **Formatter**: oxfmt (`.oxfmtrc.json`)
- **Linter**: oxlint + stylelint
- **TypeScript**: 6.x
- **Package Manager**: Yarn 4 (Berry). Do not use npm or pnpm.
