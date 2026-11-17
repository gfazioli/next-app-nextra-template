'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { revealScope } from './reveal-props';
import { useReveal } from './useReveal';

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
  const reveal = useReveal<HTMLDivElement>();
  const scope = revealScope(reveal);
  // Typed as a div: the props are a div's, and every tag here takes them.
  const Tag = as as 'div';
  return (
    <Tag
      ref={reveal.ref}
      {...rest}
      data-armed={scope['data-armed']}
      data-revealed={scope['data-revealed']}
      className={[scope.className, className].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  );
}
