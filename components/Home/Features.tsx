import { IconSunMoon } from '@tabler/icons-react';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { RENDER_LATER, revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import { site } from '@/config/site';
import { features } from './feature-list';
import classes from './Features.module.css';
import home from './Home.module.css';

/**
 * What this template gives: five cells of its own (feature-list.ts) and a sixth every sibling
 * shares, the colour scheme, with the three buttons that switch it live.
 */
export function Features() {
  return (
    <section className={home.section} aria-labelledby="features-title" {...RENDER_LATER}>
      <RevealScope className={home.center}>
        <span {...revealItem('rise', 0, home.eyebrow)}>What you get</span>
        <h2 id="features-title" {...revealItem('rise', 60, home.h2)}>
          A docs site, <span className={home.gradient}>already wired</span>
        </h2>
        <p {...revealItem('rise', 120, home.lead)}>
          Sidebar, table of contents, search, code blocks and release notes are in place. You write
          the pages.
        </p>
      </RevealScope>
      <RevealScope as="ul" className={classes.cells}>
        {features[site.key].map(({ icon: Icon, title, body }, i) => (
          <li key={title} className={classes.cell}>
            <div {...revealItem('rise', 70 * i)}>
              <span className={classes.icon}>
                <Icon size={22} stroke={1.6} aria-hidden="true" />
              </span>
              <h3 className={classes.title}>{title}</h3>
              <p className={classes.body}>{body}</p>
            </div>
          </li>
        ))}
        <li className={classes.cell}>
          <div {...revealItem('rise', 350)}>
            <span className={classes.icon}>
              <IconSunMoon size={22} stroke={1.6} aria-hidden="true" />
            </span>
            <h3 className={classes.title}>Light and dark, both designed</h3>
            <p className={classes.body}>
              Mantine&apos;s colour scheme, light by default and remembered per visitor. Try it
              here:
            </p>
            <ColorSchemeToggle />
          </div>
        </li>
      </RevealScope>
    </section>
  );
}
