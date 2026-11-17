'use client';

import {
  IconBrandGithub,
  IconBrandMantine,
  IconBrandNextjs,
  IconBrandX,
  IconMailHeart,
} from '@tabler/icons-react';
import { site } from '@/config/site';
import pack from '../../package.json';
import { AnimateBadge } from './AnimateBadge';
import {
  apps,
  highlights,
  mantineComponentCategories,
  resources,
  templateLinks,
  type FooterLink,
} from './links';
import classes from './MantineFooter.module.css';

const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/gfazioli', icon: IconBrandGithub },
  { label: 'X (Twitter)', href: 'https://twitter.com/gfazioli', icon: IconBrandX },
  { label: 'Blog', href: 'https://undolog.com/', icon: IconMailHeart },
];

function Links({ list }: { list: FooterLink[] }) {
  return (
    <ul className={classes.links}>
      {list.map((item) => (
        <li key={item.key}>
          <a
            className={classes.link}
            href={item.href}
            target={item.newWindow ? '_blank' : undefined}
            rel={item.newWindow ? 'noopener noreferrer' : undefined}
            aria-current={item.current ? 'true' : undefined}
          >
            {item.title}
          </a>
          {item.current && <span className={classes.current}>This site</span>}
          {item.new && <AnimateBadge />}
        </li>
      ))}
    </ul>
  );
}

function Column({ title, list }: { title: string; list: FooterLink[] }) {
  return (
    <nav aria-label={title} className={classes.column}>
      <h2 className={classes.title}>{title}</h2>
      <Links list={list} />
    </nav>
  );
}

/**
 * The site footer, the same in the three sibling templates: the project, the three templates
 * (this one marked), the Mantine links and the author's apps; every Mantine extension by
 * category; the colophon.
 *
 * A client component on purpose: it is on every page, and as a server component its hundred
 * links travelled twice in each document, as markup and again in the RSC payload (5.4 KiB
 * gzipped, measured). As client code they travel once more only in a script that is cached.
 */
export const MantineFooter = () => {
  return (
    <footer className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.top}>
          <div className={classes.brand}>
            <span className={classes.logo} aria-hidden="true">
              <IconBrandMantine size={24} stroke={1.6} />
            </span>
            <p className={classes.name}>{site.name}</p>
            <p className={classes.blurb}>
              {site.tagline} Free and open source:{' '}
              <a href={`https://github.com/${site.repo}`}>star it on GitHub</a>,{' '}
              <a href={`https://github.com/${site.repo}/issues`}>report an issue</a> or{' '}
              <a href="https://github.com/sponsors/gfazioli">sponsor the work</a>.
            </p>
            <ul className={classes.social}>
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a href={href} aria-label={label} className={classes.socialLink}>
                    <Icon size={20} stroke={1.6} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Column title="Templates" list={templateLinks} />
          <Column title="Highlights" list={highlights} />
          <Column title="Mantine" list={resources} />
          <Column title="Apps" list={apps} />
        </div>

        <div className={classes.extensions}>
          <h2 className={classes.title}>Mantine Extensions</h2>
          <div className={classes.categories}>
            {mantineComponentCategories.map((category) => (
              <nav key={category.key} aria-label={category.title} className={classes.column}>
                <h3 className={classes.subTitle}>{category.title}</h3>
                <Links list={[...category.links]} />
              </nav>
            ))}
          </div>
        </div>

        <div className={classes.colophon}>
          <p className={classes.credits}>
            Made with ❤️ by <a href="https://gfazioli.github.io/">Undolog</a>
            <span className={classes.dot} aria-hidden="true">
              ·
            </span>
            Hosted on <a href={site.host.href}>{site.host.name}</a>
            <span className={classes.dot} aria-hidden="true">
              ·
            </span>
            Built with{' '}
            <a href="https://nextjs.org/" className={classes.built}>
              <IconBrandNextjs size={15} aria-hidden="true" />
              Next.js
            </a>
            ,{' '}
            <a href="https://mantine.dev/" className={classes.built}>
              <IconBrandMantine size={15} aria-hidden="true" />
              Mantine v{pack.dependencies['@mantine/core']}
            </a>{' '}
            and {site.engineName}
          </p>
          <p className={classes.credits}>
            v{pack.version}
            <span className={classes.dot} aria-hidden="true">
              ·
            </span>
            <a href={`https://github.com/${site.repo}/blob/main/LICENCE`}>MIT licence</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
