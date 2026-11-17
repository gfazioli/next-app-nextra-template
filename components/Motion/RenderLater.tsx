'use client';

import { useEffect } from 'react';

/** What marks an element once it has been handed back: Home.module.css reads it. */
const RENDERED = 'data-rendered';

/**
 * Lets the first paint skip what is below the fold, then gives it back.
 *
 * An element carrying `RENDER_LATER` (reveal-props.ts) is `content-visibility: auto` in the stylesheet: off screen,
 * the browser leaves its style, layout and paint out of the first render, which is where a long
 * page pays for sections nobody has reached. Left like that it would stay skipped whenever it is
 * off screen, and a full-page capture would show it blank. So once the page has loaded, this
 * marks the elements rendered, one per idle period (never a long task), and the rule lets go.
 *
 * Renders nothing. Without scripts the sections simply stay `content-visibility: auto`.
 */
export function RenderLater() {
  useEffect(() => {
    const pending = Array.from(
      document.querySelectorAll(`[data-render="later"]:not([${RENDERED}])`)
    );
    const idle: (callback: () => void) => number =
      window.requestIdleCallback ?? ((callback) => window.setTimeout(callback, 200));
    const cancel: (handle: number) => void = window.cancelIdleCallback ?? window.clearTimeout;
    let handle = 0;
    const next = () => {
      const element = pending.shift();
      if (element) {
        element.setAttribute(RENDERED, '');
        handle = idle(next);
      }
    };
    const start = () => {
      handle = idle(next);
    };
    if (document.readyState === 'complete') {
      start();
    } else {
      window.addEventListener('load', start, { once: true });
    }
    return () => {
      cancel(handle);
      window.removeEventListener('load', start);
    };
  }, []);

  return null;
}
