/**
 * The three sibling templates: the same design on three documentation engines. This file is the
 * same in every one of them; `config/site.ts` says which one a repository is. The home page, the
 * footers and the share links all read it, so a template links to the other two from one place.
 *
 * Text only, no components: client modules import it too.
 */
export type TemplateKey = 'docs' | 'nextra' | 'fumadocs';

/**
 * The paper a template's home page is drawn on, with the ink that goes with it: a blueprint, a
 * violet diazo print, or the orange graph paper of a school drawing desk. Each one is a set of
 * colours in `theme/site.css`; the layout is the same on all three.
 */
export type Paper = 'blue' | 'violet' | 'orange';

export interface Template {
  key: TemplateKey;
  /** The engine's short name: the word the home page's headline carries */
  engine: string;
  /** The template's full name */
  name: string;
  /** The package that is the engine, as `package.json` lists it */
  enginePackage: string;
  /** What that package is called beside its version */
  engineName: string;
  /** One line, for a card and the footer */
  tagline: string;
  /** The home page's opening paragraph */
  lead: string;
  /** What sets it apart from the other two */
  points: string[];
  /** `owner/name` on GitHub */
  repo: string;
  /** The live demo: the repository's own homepage URL */
  demo: string;
  /** Where the live demo is hosted */
  host: { name: string; href: string };
  /** The paper and ink of its home page */
  paper: Paper;
  /** The two colours of the light that runs round a rim (Mantine theme colours) */
  beam: [string, string];
}

/** The Mantine Extensions Hub: every extension, with its docs. */
export const HUB_URL = 'https://mantine-extensions.vercel.app/';

export const templates: Record<TemplateKey, Template> = {
  docs: {
    key: 'docs',
    engine: 'Docs',
    name: 'Mantine Next.js + Docs template',
    enginePackage: '@next/mdx',
    engineName: 'Next.js MDX',
    tagline: 'MDX compiled by Next.js itself and an interface made only of Mantine components.',
    lead: 'A documentation starter with no docs framework in between: Next.js compiles the MDX, and every piece of the interface is a Mantine component you own.',
    points: [
      'No docs framework: @next/mdx only',
      'Reads a Nextra content folder unchanged',
      'Server build or static export',
    ],
    repo: 'gfazioli/next-app-mantine-docs-template',
    demo: 'https://next-app-mantine-docs-template.vercel.app/',
    host: { name: 'Vercel', href: 'https://vercel.com/' },
    paper: 'blue',
    beam: ['blue.5', 'cyan.4'],
  },
  nextra: {
    key: 'nextra',
    engine: 'Nextra',
    name: 'Mantine Next.js + Nextra template',
    enginePackage: 'nextra',
    engineName: 'Nextra',
    tagline: 'Nextra 4 and its docs theme, with Mantine wired in and the two dark modes in sync.',
    lead: 'A documentation starter on Nextra 4 with Mantine wired in: one theme, dark mode in sync, and your own components in every MDX page.',
    points: [
      'Nextra 4 with its docs theme',
      'Mantine and Nextra dark modes in sync',
      'Pagefind search out of the box',
    ],
    repo: 'gfazioli/next-app-nextra-template',
    demo: 'https://next-app-nextra-template.vercel.app/',
    host: { name: 'Vercel', href: 'https://vercel.com/' },
    paper: 'violet',
    beam: ['violet.5', 'pink.4'],
  },
  fumadocs: {
    key: 'fumadocs',
    engine: 'Fumadocs',
    name: 'Mantine Next.js + Fumadocs template',
    enginePackage: 'fumadocs-core',
    engineName: 'Fumadocs',
    tagline: 'The headless Fumadocs engine under a docs UI built 100% with Mantine. No Tailwind.',
    lead: 'A documentation starter on the headless Fumadocs engine, with a docs UI built 100% with Mantine: one design system, no Tailwind.',
    points: [
      'Headless fumadocs-core, no Tailwind',
      'Orama search in a Mantine Spotlight',
      'Static export on GitHub Pages',
    ],
    repo: 'gfazioli/next-app-fumadocs-template',
    demo: 'https://gfazioli.github.io/next-app-fumadocs-template/',
    host: { name: 'GitHub Pages', href: 'https://pages.github.com/' },
    paper: 'orange',
    beam: ['orange.5', 'pink.5'],
  },
};

/** In the order every page lists them. */
export const templateList: Template[] = [templates.docs, templates.nextra, templates.fumadocs];
