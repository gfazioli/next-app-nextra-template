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
- `ColorSchemeControl` / `ColorSchemeToggle` — dark mode toggle
- `ReleaseNotes` — fetches GitHub releases via `/api/github-releases`
- `Logo`, `Welcome`, `Content` — branding and landing page components

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
