import type { CSSProperties } from 'react';
import classes from './Motion.module.css';

/*
 * The props that make an element a scope or an item, in a module of their own WITHOUT
 * `'use client'`: the home page's sections are server components, and a function exported from a
 * client module reaches the server only as a reference it cannot call.
 */

/** How an item arrives: see Motion.module.css for each starting pose. */
export type RevealVariant = 'rise' | 'card' | 'pop';

/** Props that make an element a scope: the thing the observer watches. */
export function revealScope({ armed, revealed }: { armed: boolean; revealed: boolean }) {
  return {
    className: classes.scope,
    'data-armed': armed ? '' : undefined,
    'data-revealed': revealed ? '' : undefined,
  };
}

/**
 * Props that make an element an item: the thing that moves, `delay` ms after its scope. The
 * element's own class goes in `className`: a spread's `className` replaces the element's.
 */
export function revealItem(variant: RevealVariant, delay = 0, className?: string) {
  return {
    className: className ? `${classes.item} ${className}` : classes.item,
    'data-reveal': variant,
    style: { '--reveal-delay': `${delay}ms` } as CSSProperties,
  };
}

/**
 * Props that let the first render skip an element below the fold: see `RenderLater`, which hands
 * it back once the page has loaded. Here, not in that client module, for the reason above.
 */
export const RENDER_LATER = { 'data-render': 'later' } as const;
