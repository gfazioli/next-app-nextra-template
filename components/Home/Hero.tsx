import { IconArrowRight, IconBook, IconBrandGithub } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { Link } from '@/components/Link/Link';
import { site } from '@/config/site';
import pack from '../../package.json';
import { DocsWindow } from './DocsWindow';
import { InstallLine } from './InstallLine';
import classes from './Hero.module.css';
import home from './Home.module.css';

/**
 * The hero: which template this is in one line (the engine is the word in colour), what it gives
 * in one paragraph, the two ways in (the docs, or the repository to start from, with the version
 * it is at), the command that clones it, and a docs page drawn as the thing you get.
 *
 * The headline is the page's largest paint: it is plain text, on screen from the first frame,
 * and nothing in this column animates in.
 */
export function Hero({ badge }: { badge?: React.ReactNode }) {
  return (
    <section className={classes.hero} data-engine={site.key}>
      <div className={classes.copy}>
        <Link className={classes.pill} href="/docs/release-notes">
          <span className={classes.pillTag}>v{pack.version}</span>
          See what&apos;s new
          <IconArrowRight size={14} aria-hidden="true" />
        </Link>
        <h1 className={classes.title}>
          Mantine Next.js <span className={classes.engine}>+&nbsp;{site.engine}</span> template
        </h1>
        <p className={classes.lead}>{site.lead}</p>
        <div className={classes.actions}>
          <Button
            component={Link}
            href="/docs"
            size="lg"
            radius="md"
            className={`${home.button} ${home.primary}`}
            leftSection={<IconBook size={20} aria-hidden="true" />}
          >
            Read the docs
          </Button>
          <Button
            component="a"
            href={`https://github.com/${site.repo}`}
            size="lg"
            radius="md"
            variant="default"
            className={`${home.button} ${home.secondary}`}
            leftSection={<IconBrandGithub size={20} aria-hidden="true" />}
          >
            Use template v{pack.version}
          </Button>
        </div>
        <div className={classes.install}>
          <InstallLine />
        </div>
        {badge && <div className={classes.badge}>{badge}</div>}
      </div>
      <div className={classes.visual}>
        <DocsWindow />
      </div>
    </section>
  );
}
