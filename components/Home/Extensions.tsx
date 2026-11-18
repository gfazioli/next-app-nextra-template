import { Marquee } from '@gfazioli/mantine-marquee';
import { IconArrowUpRight, IconDownload } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { RENDER_LATER, revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import { HUB_URL } from '@/config/templates';
import { mantineComponentCategories } from '../MantineFooter/links';
import classes from './Extensions.module.css';
import home from './Home.module.css';
import { SectionHeader } from './SectionHeader';
import { compactCount } from './stats';

/** Every extension the footer lists, with the category it is filed under. */
const EXTENSIONS = mantineComponentCategories.flatMap((category) =>
  category.links.map((link) => ({ key: link.key, title: link.title, category: category.key }))
);

/** Five rows, dealt like cards, so each one mixes the categories. */
const ROWS = [0, 1, 2, 3, 4].map((row) => EXTENSIONS.filter((_, i) => i % 5 === row));

/**
 * The Mantine Extensions Hub: the components these templates are made to host. Their names run
 * by in five rows on the Marquee extension, on a wall tilted like the hero's window. Marquee
 * moves by transform alone, stops under the pointer and stands still with Reduce Motion. The rows
 * are decoration (the footer links every extension by name), so they are hidden from assistive
 * tech; the count is the list's own. `downloads` is what npm served of them in the last month,
 * shown beside the button when it could be fetched.
 */
export function Extensions({ downloads }: { downloads?: number }) {
  return (
    <section
      className={`${home.section} ${classes.section}`}
      aria-labelledby="extensions-title"
      {...RENDER_LATER}
    >
      <RevealScope className={classes.copy}>
        <SectionHeader
          eyebrow="Mantine Extensions"
          id="extensions-title"
          title={
            <>
              {EXTENSIONS.length} extensions,{' '}
              <span className={home.gradient}>ready to drop in</span>
            </>
          }
        >
          Split panes, onboarding tours, audio and video players, parallax, marquees and more: the
          same author&apos;s open-source components for Mantine, each with its own docs. Two are at
          work on this page: Border Animate lights the rims, Marquee runs this wall.
        </SectionHeader>
        <div {...revealItem('rise', 180, classes.action)}>
          <Button
            component="a"
            href={HUB_URL}
            size="md"
            radius="md"
            variant="default"
            className={`${home.button} ${home.secondary}`}
            rightSection={<IconArrowUpRight size={18} aria-hidden="true" />}
          >
            Explore the Mantine Extensions Hub
          </Button>
          {downloads !== undefined && (
            <p className={classes.stat}>
              <IconDownload size={16} aria-hidden="true" />
              <span>
                <b>{compactCount(downloads)}</b> downloads last month
              </span>
            </p>
          )}
        </div>
      </RevealScope>
      <div className={classes.rows} aria-hidden="true">
        {ROWS.map((row, i) => (
          <Marquee key={i} duration={34 + i * 7} gap="sm" reverse={i % 2 === 1} pauseOnHover>
            {row.map((extension) => (
              <span key={extension.key} className={classes.chip} data-category={extension.category}>
                <i />
                {extension.title}
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
