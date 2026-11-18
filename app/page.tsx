import { HomePage } from '@/components/Home/HomePage';
import { getHomeStats } from '@/components/Home/stats';
import { ProductHunt } from '@/components/ProductHunt/ProductHunt';

// The live numbers (GitHub stars, npm downloads) are fetched here, on the server, and cached for
// an hour: the page is regenerated with them.
export default async function Page() {
  return (
    <main>
      <HomePage badge={<ProductHunt />} stats={await getHomeStats()} />
    </main>
  );
}
