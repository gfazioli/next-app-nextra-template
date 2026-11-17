import type { ReactNode } from 'react';
import { revealItem } from '@/components/Motion/reveal-props';
import home from './Home.module.css';

/**
 * A section's eyebrow, title and lead, arriving one after another: the stagger every section of
 * the home page shares. It goes inside the section's `RevealScope`.
 */
export function SectionHeader({
  eyebrow,
  id,
  title,
  children,
}: {
  eyebrow: string;
  /** The title's id, which the section's `aria-labelledby` names */
  id: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <span {...revealItem('rise', 0, home.eyebrow)}>{eyebrow}</span>
      <h2 id={id} {...revealItem('rise', 60, home.h2)}>
        {title}
      </h2>
      <p {...revealItem('rise', 120, home.lead)}>{children}</p>
    </>
  );
}
