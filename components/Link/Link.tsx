'use client';

import NextLink from 'next/link';

/**
 * `next/link` as a client reference.
 *
 * A server component may pass a client reference as a prop (`<Anchor component={Link}>`), but not
 * a plain function, and `next/link` itself is not marked `'use client'`. Re-exporting it from a
 * client module is what makes `component={Link}` work in server components such as the MDX
 * elements and the docs pages.
 */
export const Link = NextLink;
