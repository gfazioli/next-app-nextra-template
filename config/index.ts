export default {
  /**
   * Nextra metadata configuration
   * @see https://nextra.vercel.app/docs/metadata
   */
  metadata: {
    title: {
      default: 'Mantine Next.js and Nextra template',
      template: '%s | Mantine Next.js and Nextra template',
    },
    description: 'I am using Mantine with Next.js and Nextra!',
    metadataBase: new URL('https://next-app-nextra-template.vercel.app/'),
    keywords: [
      'Mantine',
      'Nextra',
      'Next.js',
      'React',
      'JavaScript',
      'MDX',
      'Markdown',
      'Static Site Generator',
    ],
    generator: 'Next.js',
    applicationName: 'Mantine',
    appleWebApp: {
      title: 'Mantine',
    },
    openGraph: {
      // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
      url: './',
      siteName: 'Mantine',
      locale: 'en_US',
      type: 'website',
    },
    other: {
      'msapplication-TileColor': '#fff',
    },
    twitter: {
      site: 'https://next-app-nextra-template.vercel.app/',
    },
    alternates: {
      // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
      canonical: './',
    },
  },
  /**
   * Nextra Layout component configuration
   */
  nextraLayout: {
    docsRepositoryBase: 'https://github.com/gfazioli/next-app-nextra-template/tree/main/app/docs/',
    sidebar: {
      defaultMenuCollapseLevel: 1,
    },
  },
  /**
   * Main Layout head configuration
   */
  head: {
    mantine: {
      defaultColorScheme: 'dark',
      nonce: '8IBTHwOdqNKAWeKl7plt8g==',
    },
  },
  /**
   * GitHub API configuration
   * @see https://docs.github.com/en/rest/reference/repos#releases
   *
   * The GitHub API token is optional for rate limiting.
   * If you want to use it, create a personal access token with the `repo` scope.
   *
   * This information is used to fetch the releases from the GitHub API.
   */
  gitHub: {
    repo: 'gfazioli/next-app-nextra-template',
    apiUrl: 'https://api.github.com',
    releasesUrl: 'https://api.github.com/repos/gfazioli/next-app-nextra-template/releases',
  },

  /**
   * Release notes configuration
   * This is used to link the release notes in the app.
   */
  releaseNotes: {
    url: 'https://github.com/gfazioli/next-app-nextra-template/releases',
    maxReleases: 10,
  },

  /**
   * Search configuration (for pagefind)
   * This is used to configure the search engine API.
   * @see /app/api/search/route.ts
   */
  search: {
    queryKeyword: 'q',
    minQueryLength: 3,
    limitKeyword: 'limit',
    defaultMaxResults: 5,
    excerptLengthKeyword: 'excerptLength',
    defaultExcerptLength: 30,
    defaultLanguage: 'en',
  },
} as const;
