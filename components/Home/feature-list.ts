import {
  IconBrandGithub,
  IconBrandMantine,
  IconCode,
  IconLayoutNavbar,
  IconMarkdown,
  IconNotes,
  IconReplace,
  IconSearch,
  type Icon,
} from '@tabler/icons-react';
import type { TemplateKey } from '@/config/templates';

export interface Feature {
  icon: Icon;
  title: string;
  body: string;
}

/**
 * What each template gives, five to a template: the home page shows the current one's, and adds
 * the colour scheme as a sixth. The same file in the three siblings, like `config/templates.ts`.
 */
export const features: Record<TemplateKey, Feature[]> = {
  docs: [
    {
      icon: IconBrandMantine,
      title: 'Mantine all the way',
      body: 'AppShell for the frame, NavLink for the sidebar, TableOfContents, Spotlight and CodeHighlight: every piece of the interface is a Mantine component.',
    },
    {
      icon: IconMarkdown,
      title: 'MDX by Next.js itself',
      body: 'Pages are compiled by @next/mdx, the loader Next.js maintains. There is no docs framework to wait for at the next major.',
    },
    {
      icon: IconSearch,
      title: 'Search with Pagefind',
      body: 'A static index over the prerendered pages, opened with ⌘K in a Mantine Spotlight, and the same index behind a server search API.',
    },
    {
      icon: IconCode,
      title: 'Code highlighted at build',
      body: 'Shiki runs on the server, in light and dark, and hands the result to CodeHighlight: no highlighter is downloaded by the browser.',
    },
    {
      icon: IconReplace,
      title: 'Nextra-compatible content',
      body: 'The same content folder and _meta files, and Callout, Cards, Steps, Tabs and FileTree with the props Nextra gives them.',
    },
  ],
  nextra: [
    {
      icon: IconBrandMantine,
      title: 'Mantine inside Nextra',
      body: 'Nextra 4 and its docs theme with Mantine wired in: one provider, one theme, and your own components in every MDX page.',
    },
    {
      icon: IconMarkdown,
      title: 'Content in MDX',
      body: 'Pages live in the content folder and _meta files order the sidebar, exactly as the Nextra documentation describes.',
    },
    {
      icon: IconSearch,
      title: 'Search with Pagefind',
      body: 'A static index written after every build, for the search box in the navbar and for a server search API.',
    },
    {
      icon: IconLayoutNavbar,
      title: 'Your navbar and footer',
      body: 'The navbar and the footer of the docs theme are replaced by Mantine components that live in your repository.',
    },
    {
      icon: IconNotes,
      title: 'Release notes from GitHub',
      body: 'A page that lists your GitHub releases through a small API proxy, with an optional token against rate limits.',
    },
  ],
  fumadocs: [
    {
      icon: IconBrandMantine,
      title: '100% Mantine UI',
      body: 'Sidebar, table of contents, search and MDX components are plain React and Mantine in your repository. No Tailwind, no fumadocs-ui.',
    },
    {
      icon: IconMarkdown,
      title: 'Headless Fumadocs',
      body: 'fumadocs-core and fumadocs-mdx do the engine work: the content collections, the page tree, the scroll-spy of the table of contents.',
    },
    {
      icon: IconSearch,
      title: 'Search with Orama',
      body: 'Full-text search in a Mantine Spotlight, opened with ⌘K: an API route on a server, a prebuilt index on a static host.',
    },
    {
      icon: IconCode,
      title: 'Code highlighted at build',
      body: 'Shiki in light and dark themes that follow the Mantine colour scheme, with titles, line numbers and line highlighting.',
    },
    {
      icon: IconBrandGithub,
      title: 'Static export ready',
      body: 'One script writes a fully static site, and the bundled workflow publishes it to GitHub Pages on every push.',
    },
  ],
};
