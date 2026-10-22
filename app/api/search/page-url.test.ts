import { toPageUrl } from './page-url';

describe('toPageUrl', () => {
  it.each([
    ['https://site.dev/docs/mantine.html', 'https://site.dev/docs/mantine'],
    [
      'https://site.dev/docs/mantine.html#third-party-components',
      'https://site.dev/docs/mantine#third-party-components',
    ],
    ['https://site.dev/docs.html#features', 'https://site.dev/docs#features'],
    ['https://site.dev/docs/html-in-markdown.html', 'https://site.dev/docs/html-in-markdown'],
    ['https://site.dev/guide/', 'https://site.dev/guide/'],
    ['https://site.dev/docs/mantine', 'https://site.dev/docs/mantine'],
    ['https://site.dev/docs/page#file.html', 'https://site.dev/docs/page#file.html'],
    ['https://site.dev/docs/page.html#file.html', 'https://site.dev/docs/page#file.html'],
    ['https://site.dev/docs/page.html?q=1#intro', 'https://site.dev/docs/page?q=1#intro'],
  ])('%s → %s', (from, to) => {
    expect(toPageUrl(from)).toBe(to);
  });
});
