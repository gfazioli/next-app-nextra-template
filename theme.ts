'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  // Body text keeps Mantine's default system stack; headings use Outfit, as on mantine.dev.
  headings: {
    fontFamily: 'var(--font-outfit), sans-serif',
    fontWeight: '600',
  },
});
