import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { IconArrowRight, IconArrowUpRight, IconBrandGithub, IconCheck } from '@tabler/icons-react';
import { Link } from '@/components/Link/Link';
import { RENDER_LATER, revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import { site } from '@/config/site';
import { templateList, type Template, type TemplateKey } from '@/config/templates';
import home from './Home.module.css';
import classes from './Templates.module.css';

/* The light on the current card's rim, in that engine's colours: a conic gradient the extension
   turns with a transform. */
const BEAMS: Record<TemplateKey, [string, string]> = {
  docs: ['blue.5', 'cyan.4'],
  nextra: ['violet.5', 'pink.4'],
  fumadocs: ['orange.5', 'pink.5'],
};

function Card({ template, current }: { template: Template; current: boolean }) {
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
      </div>
    </article>
  );
}

/**
 * The three sibling templates side by side: the same design on three engines, the one you are
 * looking at marked and lit, the other two a click away.
 */
export function Templates() {
  return (
    <section className={home.section} aria-labelledby="templates-title" {...RENDER_LATER}>
      <RevealScope className={home.center}>
        <span {...revealItem('rise', 0, home.eyebrow)}>One look, three engines</span>
        <h2 id="templates-title" {...revealItem('rise', 60, home.h2)}>
          Pick the engine, <span className={home.gradient}>keep the design</span>
        </h2>
        <p {...revealItem('rise', 120, home.lead)}>
          The same Mantine starter comes on three documentation engines. This is the {site.engine}{' '}
          one; the other two look the same and work the way their engine does.
        </p>
      </RevealScope>
      <RevealScope as="ul" className={classes.grid}>
        {templateList.map((template, i) => {
          const current = template.key === site.key;
          const [from, to] = BEAMS[template.key];
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
                  classNames={{ border: classes.beam }}
                >
                  <Card template={template} current />
                </BorderAnimate>
              ) : (
                <Card template={template} current={false} />
              )}
            </li>
          );
        })}
      </RevealScope>
    </section>
  );
}
