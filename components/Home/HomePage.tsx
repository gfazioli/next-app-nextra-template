import { RenderLater } from '@/components/Motion/RenderLater';
import { Sponsors } from '@/components/Sponsors/Sponsors';
import { Extensions } from './Extensions';
import { Features } from './Features';
import { FinalCta } from './FinalCta';
import { Hero } from './Hero';
import { Stack } from './Stack';
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
 * `badge` is a slot under the hero's actions, for a launch badge.
 */
export function HomePage({ badge }: { badge?: React.ReactNode }) {
  return (
    <div className={classes.page}>
      <div className={classes.frame}>
        <Hero badge={badge} />
        <Stack />
        <Features />
        <div className={classes.rule} />
        <Templates />
        <div className={classes.rule} />
        <Extensions />
        <div className={classes.rule} />
        <Sponsors />
        <div className={classes.rule} />
        <FinalCta />
      </div>
      <RenderLater />
    </div>
  );
}
