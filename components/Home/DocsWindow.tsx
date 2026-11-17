import { BorderAnimate } from '@gfazioli/mantine-border-animate';
import { IconBrandMantine, IconMarkdown, IconSearch } from '@tabler/icons-react';
import { site } from '@/config/site';
import classes from './DocsWindow.module.css';

const NAV = ['Getting started', 'Markdown', 'Mantine', 'Components', 'Guides', 'Release notes'];
const TOC = ['Install', 'Write a page', 'Add a component', 'Deploy'];

/* A light that runs round the window's rim: a conic gradient the extension turns with a
   transform, so the only thing animated is a rotation on the compositor. */
const BEAM = [
  { color: 'transparent', position: 0 },
  { color: 'transparent', position: 62 },
  { color: 'blue.5', position: 82 },
  { color: 'cyan.4', position: 94 },
  { color: 'transparent', position: 100 },
];

/**
 * What the template gives you, drawn rather than photographed: a docs page (sidebar, article,
 * code, table of contents) tilted in space, made of markup and CSS. No image to download, and it
 * follows the colour scheme. Decorative, so hidden from assistive tech.
 */
export function DocsWindow() {
  return (
    <div className={classes.stage} aria-hidden="true">
      <div className={classes.tilt}>
        <BorderAnimate
          variant="beam"
          beamMode="wedge"
          colorStops={BEAM}
          borderWidth={2}
          blur={0}
          duration={7}
          radius={14}
          trigger="inView"
          classNames={{ border: classes.beam }}
        >
          <div className={classes.window}>
            <div className={classes.chrome}>
              <span className={classes.dots}>
                <i />
                <i />
                <i />
              </span>
              <span className={classes.address}>localhost:3000/docs</span>
            </div>
            <div className={classes.body}>
              <div className={classes.sidebar}>
                <span className={classes.search}>
                  <IconSearch size={10} />
                  Search
                  <kbd>⌘K</kbd>
                </span>
                {NAV.map((label, i) => (
                  <span key={label} className={classes.navItem} data-active={i === 0 || undefined}>
                    {label}
                  </span>
                ))}
              </div>
              <div className={classes.article}>
                <span className={classes.crumbs}>Docs / Getting started</span>
                <span className={classes.heading}>Getting started</span>
                <span className={classes.text} style={{ width: '96%' }} />
                <span className={classes.text} style={{ width: '88%' }} />
                <span className={classes.text} style={{ width: '54%' }} />
                <span className={classes.code}>
                  <span>
                    <b>import</b> {'{ Button }'} <b>from</b> <em>&apos;@mantine/core&apos;</em>;
                  </span>
                  <span>&nbsp;</span>
                  <span>
                    {'<'}
                    <u>Button</u> variant=<em>&quot;gradient&quot;</em>
                    {'>'}Hello{'</'}
                    <u>Button</u>
                    {'>'}
                  </span>
                </span>
                <span className={classes.callout}>
                  <span className={classes.text} style={{ width: '82%' }} />
                  <span className={classes.text} style={{ width: '46%' }} />
                </span>
                <span className={classes.text} style={{ width: '92%' }} />
                <span className={classes.text} style={{ width: '70%' }} />
              </div>
              <div className={classes.toc}>
                <span className={classes.tocTitle}>On this page</span>
                {TOC.map((label, i) => (
                  <span key={label} className={classes.tocItem} data-active={i === 1 || undefined}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </BorderAnimate>
      </div>
      <span className={classes.chip} data-chip="mantine">
        <IconBrandMantine size={16} />
        100% Mantine
      </span>
      <span className={classes.chip} data-chip="engine">
        <IconMarkdown size={16} />
        {site.enginePackage}
      </span>
    </div>
  );
}
