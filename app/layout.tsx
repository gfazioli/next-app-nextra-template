import '@mantine/core/styles.css';
// !! The order of these imports is important !!
import '@gfazioli/mantine-border-animate/styles.css';
import '@gfazioli/mantine-marquee/styles.css';
import '@gfazioli/mantine-text-animate/styles.css';
// Mantine theme overrides (page background, heading font)
import '@/theme/global.css';

import { Analytics } from '@vercel/analytics/react';
import { Outfit } from 'next/font/google';
import { Layout } from 'nextra-theme-docs';
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
// !! End of important imports !!

import { MantineFooter, MantineNavBar } from '@/components';
import config from '@/config';
import pack from '../package.json';
import { theme } from '../theme';

import './global.css';

export const metadata = config.metadata;

// The type of mantine.dev: Outfit for headings (self-hosted and preloaded by Next), the system
// stack for everything else, which is Mantine's default and costs no download at all.
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap();
  const { nextraLayout, head } = config;

  return (
    <html lang="en" dir="ltr" className={outfit.variable} {...mantineHtmlProps}>
      {/* Page background and primary colour of the Nextra theme, set to Mantine's: body
          #fff / #242424 and blue.6 (#228be6) / blue.4 (#4dabf7), as on mantine.dev. */}
      <Head
        backgroundColor={{ light: '#ffffff', dark: '#242424' }}
        color={{
          hue: { light: 208, dark: 207 },
          saturation: { light: 80, dark: 91 },
          lightness: { light: 52, dark: 64 },
        }}
      >
        <ColorSchemeScript
          nonce={head.mantine.nonce}
          defaultColorScheme={head.mantine.defaultColorScheme}
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme={head.mantine.defaultColorScheme}>
          <Layout
            banner={
              <Banner storageKey={`release-notes-${pack.version}`}>
                ✨ v{pack.version} Released -{' '}
                <a href="/docs/release-notes">See the release notes</a>
              </Banner>
            }
            navbar={<MantineNavBar />}
            pageMap={pageMap}
            docsRepositoryBase={nextraLayout.docsRepositoryBase}
            footer={<MantineFooter />}
            sidebar={nextraLayout.sidebar}
            nextThemes={nextraLayout.nextThemes}
          >
            {children}
          </Layout>
        </MantineProvider>
        <Analytics />
      </body>
    </html>
  );
}
