import { HomePage } from '@/components/Home/HomePage';
import { ProductHunt } from '@/components/ProductHunt/ProductHunt';

export default function Page() {
  return (
    <main>
      <HomePage badge={<ProductHunt />} />
    </main>
  );
}
