'use client';

import type { CSSProperties } from 'react';
import { useReveal } from './useReveal';
import classes from './Motion.module.css';

/**
 * A figure whose digits roll up from zero the first time it scrolls into view: a version number
 * read like an odometer. Whatever is not a digit (the dots of "9.8.1") stands still.
 *
 * The element's text is only ever `value`: the rolling digits are generated content, so crawlers,
 * screen readers and copy-paste never see the strip of 0-9 behind each one. On screen when the
 * page mounts, or without scripts, it simply shows the value.
 */
export function RollingNumber({ value, className }: { value: string; className?: string }) {
  const { ref, armed, revealed } = useReveal<HTMLSpanElement>('0px 0px -12% 0px');

  if (!/\d/.test(value)) {
    return <span className={className}>{value}</span>;
  }

  // Each digit on its own, and whatever sits between digits as one run.
  const runs = value.match(/\d|\D+/g) ?? [];
  let digit = 0;
  return (
    <span
      ref={ref}
      className={[classes.number, className].filter(Boolean).join(' ')}
      data-armed={armed ? '' : undefined}
      data-revealed={revealed ? '' : undefined}
    >
      <span className={classes.srOnly}>{value}</span>
      <span className={classes.odometer} aria-hidden="true">
        {runs.map((run, i) =>
          /\d/.test(run) ? (
            <span key={i} className={classes.digit}>
              <span
                className={classes.strip}
                style={{ '--d': run, '--i': digit++ } as CSSProperties}
              />
            </span>
          ) : (
            <span key={i} className={classes.glyph} data-ch={run} />
          )
        )}
      </span>
    </span>
  );
}
