'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { useReveal } from './useReveal';
import classes from './Motion.module.css';

type RevealScopeProps = HTMLAttributes<HTMLDivElement> & {
  /** The element to render */
  as?: 'div' | 'section' | 'ul';
  children: ReactNode;
};

/**
 * A scope a server component can use: the element the observer watches, whose children (rendered
 * on the server, carrying `revealItem` props) move when it comes into view.
 */
export function RevealScope({ as = 'div', className, children, ...rest }: RevealScopeProps) {
  const { ref, armed, revealed } = useReveal<HTMLDivElement>();
  // Typed as a div: the props are a div's, and every tag here takes them.
  const Tag = as as 'div';
  return (
    <Tag
      ref={ref}
      {...rest}
      data-armed={armed ? '' : undefined}
      data-revealed={revealed ? '' : undefined}
      className={className ? `${classes.scope} ${className}` : classes.scope}
    >
      {children}
    </Tag>
  );
}
