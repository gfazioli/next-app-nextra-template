import { IconBook, IconBrandGithub, IconBrandMantine } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { Link } from '@/components/Link/Link';
import { RENDER_LATER, revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import { site } from '@/config/site';
import pack from '../../package.json';
import { InstallLine } from './InstallLine';
import classes from './FinalCta.module.css';
import home from './Home.module.css';

/** The closing call, on graph paper: the repository to start from, the docs, the command. */
export function FinalCta() {
  return (
    <section
      className={`${home.section} ${classes.cta}`}
      aria-labelledby="start-title"
      {...RENDER_LATER}
    >
      <RevealScope className={classes.inner}>
        <span {...revealItem('pop', 0, classes.logo)} aria-hidden="true">
          <IconBrandMantine size={34} stroke={1.6} />
        </span>
        <h2 id="start-title" {...revealItem('rise', 80, classes.title)}>
          Your docs, <span className={home.gradient}>live this afternoon</span>
        </h2>
        <p {...revealItem('rise', 140, home.lead)}>
          Start from the template, write your pages in MDX, deploy. Everything else on this page is
          already in the repository.
        </p>
        <div {...revealItem('rise', 200, classes.actions)}>
          <Button
            component="a"
            href={`https://github.com/${site.repo}`}
            size="lg"
            radius="md"
            className={`${home.button} ${home.primary}`}
            leftSection={<IconBrandGithub size={20} aria-hidden="true" />}
          >
            Use template v{pack.version}
          </Button>
          <Button
            component={Link}
            href="/docs"
            size="lg"
            radius="md"
            variant="default"
            className={`${home.button} ${home.secondary}`}
            leftSection={<IconBook size={20} aria-hidden="true" />}
          >
            Read the docs
          </Button>
        </div>
        <div {...revealItem('rise', 260, classes.install)}>
          <InstallLine />
        </div>
      </RevealScope>
    </section>
  );
}
