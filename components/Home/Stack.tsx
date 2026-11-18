import {
  IconBrandMantine,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandStorybook,
  IconBrandTypescript,
  IconMarkdown,
} from '@tabler/icons-react';
import { revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import { RollingNumber } from '@/components/Motion/RollingNumber';
import { site } from '@/config/site';
import pack from '../../package.json';
import home from './Home.module.css';
import classes from './Stack.module.css';

const dependencies: Record<string, string> = pack.dependencies;
const devDependencies: Record<string, string> = pack.devDependencies;

/** The six the template stands on, each with the name `package.json` knows it by. */
const CORE = [
  { label: 'Next.js', name: 'next', icon: IconBrandNextjs },
  { label: 'React', name: 'react', icon: IconBrandReact },
  { label: 'Mantine', name: '@mantine/core', icon: IconBrandMantine },
  { label: site.engineName, name: site.enginePackage, icon: IconMarkdown },
  { label: 'TypeScript', name: 'typescript', icon: IconBrandTypescript },
  { label: 'Storybook', name: 'storybook', icon: IconBrandStorybook },
];

/** A declared range as the number it starts from: "^10.6.7" is shown as "10.6.7". */
export function plainVersion(range: string) {
  return range.replace(/^[\^~>=<\s]+/, '');
}

/**
 * The versions the template runs on. Nothing here is typed by hand: every number is read from
 * `package.json` when the site is built, so the page cannot fall behind the code it ships with.
 * The six it stands on get a figure each, which rolls up like an odometer as it scrolls into
 * view; every other dependency follows as a tag, with the range exactly as declared.
 */
export function Stack() {
  const core = CORE.map((item) => ({
    ...item,
    version: plainVersion(dependencies[item.name] ?? devDependencies[item.name] ?? ''),
  }));
  const coreNames = new Set(CORE.map((item) => item.name));
  const rest = Object.entries(dependencies).filter(([name]) => !coreNames.has(name));

  return (
    <RevealScope
      as="section"
      className={`${home.marks} ${classes.stack}`}
      aria-labelledby="stack-title"
    >
      <div className={classes.belt}>
        <div className={classes.label}>
          <h2 id="stack-title" className={classes.title}>
            The stack
          </h2>
          <p className={classes.note}>
            Read from <code>package.json</code> at build time: what you see is what ships.
          </p>
        </div>
        <ul className={classes.core}>
          {core.map(({ label, name, version, icon: Icon }, i) => (
            <li key={name} className={classes.cell}>
              <div {...revealItem('pop', 70 * i, classes.cellInner)}>
                <span className={classes.cellHead}>
                  <Icon size={18} stroke={1.6} aria-hidden="true" />
                  {label}
                </span>
                <RollingNumber value={version} className={classes.version} />
                <span className={classes.package}>{name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.rest}>
        <p className={classes.restLabel}>And {rest.length} more dependencies</p>
        <ul className={classes.tags}>
          {rest.map(([name, range]) => (
            <li
              key={name}
              className={classes.tag}
              data-own={name.startsWith('@gfazioli/') || undefined}
            >
              <span className={classes.tagName}>{name}</span>
              <span className={classes.tagVersion}>{range}</span>
            </li>
          ))}
        </ul>
      </div>
    </RevealScope>
  );
}
