import { RenderLater } from '@/components/Motion/RenderLater';
import { Sponsors } from '@/components/Sponsors/Sponsors';
import { site } from '@/config/site';
import { Extensions } from './Extensions';
import { Features } from './Features';
import { FinalCta } from './FinalCta';
import { Hero } from './Hero';
import { Stack } from './Stack';
import { NO_STATS, type HomeStats } from './stats';
import { Templates } from './Templates';
import classes from './Home.module.css';

/**
 * The home page, in the order it argues: which template this is (the hero), what it runs on (the
 * stack, read from package.json), what it gives (the features), its two siblings (the
 * templates), the components it is made to host (the extensions), who supports the work (the
 * sponsors), and the way in again. The same component in the three sibling templates: what
 * differs comes from `config/site.ts`.
 *
 * A server component: only the islands that move or react are client code. The sections under
 * the stack are left out of the first render and handed back once the page has loaded
 * (`RenderLater`): the hero paints sooner on a slow phone. It renders no
 * `<main>` of its own, since one engine's layout already provides it: `app/page.tsx` does.
 *
 * `data-site-paper` is what turns the document to drawing paper, header and footer included, and
 * its value is which paper (`site.paper`: blue, violet or orange): see theme/site.css.
 *
 * `badge` is a slot under the hero's actions, for a launch badge. `stats` are the live numbers
 * (GitHub stars, npm downloads): the page component awaits `getHomeStats()` and passes them in,
 * so this component stays synchronous. Without them, or without one of them, nothing is shown in
 * its place.
 */
export function HomePage({
  badge,
  stats = NO_STATS,
}: {
  badge?: React.ReactNode;
  stats?: HomeStats;
}) {
  return (
    <div className={classes.page} data-site-paper={site.paper}>
      <div className={classes.frame}>
        <Hero badge={badge} stars={stats.stars[site.key]} />
        <Stack />
        <Features />
        <Templates stars={stats.stars} />
        <Extensions downloads={stats.downloads} />
        <Sponsors />
        <FinalCta />
      </div>
      <RenderLater />
    </div>
  );
}
