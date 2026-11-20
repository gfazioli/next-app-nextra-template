import config from '@/config';
import { metadata } from './page';

// On Vercel the home page, regenerated on a timer, is rendered as `/index`: the layout's `./`
// would name that address, so the page names the site root itself.
it('names the site root and keeps the layout Open Graph settings', () => {
  expect(metadata.alternates?.canonical).toBe('/');
  expect(metadata.openGraph).toMatchObject({ ...config.metadata.openGraph, url: '/' });
});
