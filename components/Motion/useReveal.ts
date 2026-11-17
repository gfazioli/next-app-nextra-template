'use client';

import { useEffect, useRef, useState } from 'react';

type RevealState = 'rest' | 'armed' | 'revealed';

/**
 * A scroll reveal in three states, and nothing is hidden in the first. At REST the element is
 * where the layout put it: that is the served HTML, what the first paint shows and what stays if
 * the scripts never run. Once mounted, an element entirely off screen is ARMED, parked in its
 * starting pose where nobody sees it park, and REVEALED the first time it comes into view. What
 * is on screen when the page mounts is never armed, so nothing above the fold ever blinks.
 *
 * It never measures: an IntersectionObserver says whether the element is on screen when the page
 * mounts (its first report, against the whole viewport), and a second one, with the bottom edge
 * pulled in by `rootMargin`, says when it arrives. No scroll listener, no forced layout, one
 * state change per step. Reading the element's box instead would make the browser lay out the
 * sections it is skipping (`content-visibility: auto` in Home.module.css), which is the work
 * that rule saves the first paint.
 *
 * One-shot: scrolling back up never replays. Without IntersectionObserver (very old browsers)
 * nothing is ever armed.
 */
export function useReveal<T extends Element>(rootMargin = '0px 0px -8% 0px') {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>('rest');

  useEffect(() => {
    const el = ref.current;
    if (!el || state === 'revealed' || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }
    const observer =
      state === 'rest'
        ? // On screen at mount: left at rest for good. Off screen: armed.
          new IntersectionObserver((entries) => {
            observer.disconnect();
            if (!entries.some((entry) => entry.isIntersecting)) {
              setState('armed');
            }
          })
        : new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) {
                observer.disconnect();
                setState('revealed');
              }
            },
            { threshold: 0, rootMargin }
          );
    observer.observe(el);
    return () => observer.disconnect();
  }, [state, rootMargin]);

  return { ref, armed: state !== 'rest', revealed: state === 'revealed' };
}
