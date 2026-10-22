import { toPageUrl } from './page-url';

describe('toPageUrl', () => {
  it.each([
    ['https://site.dev/docs/mantine.html', 'https://site.dev/docs/mantine'],
    [
      'https://site.dev/docs/mantine.html#third-party-components',
      'https://site.dev/docs/mantine#third-party-components',
    ],
    ['https://site.dev/docs.html#features', 'https://site.dev/docs#features'],
    ['https://site.dev/index.html', 'https://site.dev/'],
    ['https://site.dev/guide/index.html#setup', 'https://site.dev/guide/#setup'],
    ['https://site.dev/docs/html-in-markdown.html', 'https://site.dev/docs/html-in-markdown'],
    ['https://site.dev/docs/mantine', 'https://site.dev/docs/mantine'],
  ])('%s → %s', (from, to) => {
    expect(toPageUrl(from)).toBe(to);
  });
});
