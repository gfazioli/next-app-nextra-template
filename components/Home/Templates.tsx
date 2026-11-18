import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconBrandGithub,
  IconCheck,
  IconStar,
} from '@tabler/icons-react';
import { Link } from '@/components/Link/Link';
import { RENDER_LATER, revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import { site } from '@/config/site';
import { templateList, type Template } from '@/config/templates';
import home from './Home.module.css';
import classes from './Templates.module.css';
import { SectionHeader } from './SectionHeader';
import { compactCount } from './stats';
import { Sketch } from './Sketch';
import type { HomeStats } from './stats';

function Card({
  template,
  current,
  stars,
}: {
  template: Template;
  current: boolean;
  /** The repository's GitHub stars: left out when the count could not be fetched */
  stars?: number;
}) {
  return (
    <article
      className={classes.card}
      data-engine={template.key}
      data-current={current || undefined}
    >
      <header className={classes.head}>
        <span className={classes.mark} aria-hidden="true">
          {template.engine[0]}
        </span>
        <div className={classes.names}>
          <h3 className={classes.name}>{template.engine}</h3>
          <span className={classes.package}>{template.enginePackage}</span>
        </div>
        {current && <span className={classes.here}>You are here</span>}
      </header>
      <p className={classes.tagline}>{template.tagline}</p>
      <ul className={classes.points}>
        {template.points.map((point) => (
          <li key={point}>
            <IconCheck size={16} stroke={2} aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
      <div className={classes.links}>
        {current ? (
          <Link className={home.more} href="/docs">
            Read the docs
            <IconArrowRight size={15} aria-hidden="true" />
          </Link>
        ) : (
          <a className={home.more} href={template.demo}>
            Live demo
            <span className={home.hidden}> of the {template.engine} template</span>
            <IconArrowUpRight size={15} aria-hidden="true" />
          </a>
        )}
        <a className={classes.git} href={`https://github.com/${template.repo}`}>
          <IconBrandGithub size={15} aria-hidden="true" />
          GitHub
          <span className={home.hidden}>: the {template.engine} template</span>
        </a>
        {stars !== undefined && (
          <span className={classes.stars}>
            <IconStar size={14} aria-hidden="true" />
            {compactCount(stars)}
            <span className={home.hidden}> {stars === 1 ? 'star' : 'stars'} on GitHub</span>
          </span>
        )}
      </div>
    </article>
  );
}

/**
 * The three sibling templates side by side: the same design on three engines, the one you are
 * looking at marked and lit, the other two a click away. Two arcs struck beside the heading, as
 * with a compass, are the section's construction lines. Each card carries its repository's GitHub
 * stars, when they could be fetched.
 */
export function Templates({ stars = {} }: { stars?: HomeStats['stars'] }) {
  return (
    <section
      className={`${home.section} ${classes.section}`}
      aria-labelledby="templates-title"
      {...RENDER_LATER}
    >
      <Sketch name="compass" className={classes.arc} />
      <Sketch name="compass" className={classes.arc} />
      <RevealScope className={home.center}>
        <SectionHeader
          eyebrow="One look, three engines"
          id="templates-title"
          title={
            <>
              Pick the engine, <span className={home.gradient}>keep the design</span>
            </>
          }
        >
          The same Mantine starter comes on three documentation engines. This is the {site.engine}{' '}
          one; the other two look the same and work the way their engine does.
        </SectionHeader>
      </RevealScope>
      <RevealScope as="ul" className={`${home.marks} ${classes.grid}`}>
        {templateList.map((template, i) => {
          const current = template.key === site.key;
          // The light on the current card's rim, in that engine's colours: a conic gradient
          // the extension turns with a transform.
          const [from, to] = template.beam;
          return (
            <li key={template.key} {...revealItem('card', 90 * i)}>
              {current ? (
                <BorderAnimate
                  variant="beam"
                  beamMode="wedge"
                  colorStops={[
                    { color: 'transparent', position: 0 },
                    { color: 'transparent', position: 58 },
                    { color: from, position: 80 },
                    { color: to, position: 94 },
                    { color: 'transparent', position: 100 },
                  ]}
                  borderWidth={2}
                  blur={0}
                  duration={6}
                  radius={16}
                  trigger="inView"
                  h="100%"
                  classNames={{ border: home.beam }}
                >
                  <Card template={template} current stars={stars[template.key]} />
                </BorderAnimate>
              ) : (
                <Card template={template} current={false} stars={stars[template.key]} />
              )}
            </li>
          );
        })}
      </RevealScope>
    </section>
  );
}
