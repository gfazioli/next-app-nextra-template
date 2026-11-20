import type { Metadata } from 'next';
import { HomePage } from '@/components/Home/HomePage';
import { getHomeStats } from '@/components/Home/stats';
import { ProductHunt } from '@/components/ProductHunt/ProductHunt';
import config from '@/config';

// Vercel renders a page regenerated on a timer as `/index`, so the layout's `./` canonical and
// og:url would name `/index`: the home page names `/`, which is joined to `metadataBase` (base
// path included). A page's `openGraph` replaces the layout's instead of merging, hence the spread.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { ...config.metadata.openGraph, url: '/' },
};

// The live numbers (GitHub stars, npm downloads) are fetched here, on the server, and cached for
// an hour: the page is regenerated with them.
export default async function Page() {
  return (
    <main>
      <HomePage badge={<ProductHunt />} stats={await getHomeStats()} />
    </main>
  );
}
