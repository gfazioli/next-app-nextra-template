/**
 * @jest-environment node
 */
import { templateList } from '@/config/templates';
import { compactCount, EXTENSION_PACKAGES, getHomeStats } from './stats';

/** A `fetch` that answers from a table of handlers, and never reaches the network. */
function mockFetch(answer: (url: string) => Response | Promise<Response>) {
  const mock = jest.fn(async (input: RequestInfo | URL, _init?: RequestInit) =>
    answer(String(input))
  );
  global.fetch = mock as unknown as typeof fetch;
  return mock;
}

const realFetch = global.fetch;
const realToken = process.env.GITHUB_TOKEN;

// Every test starts without a token, whatever the shell running the suite exports.
beforeEach(() => {
  delete process.env.GITHUB_TOKEN;
});

afterEach(() => {
  global.fetch = realFetch;
  if (realToken === undefined) {
    delete process.env.GITHUB_TOKEN;
  } else {
    process.env.GITHUB_TOKEN = realToken;
  }
});

describe('getHomeStats', () => {
  it('reads the stars of each template and sums the downloads of every extension', async () => {
    const fetched = mockFetch((url) =>
      url.startsWith('https://api.github.com/repos/')
        ? Response.json({ stargazers_count: url.endsWith('next-app-nextra-template') ? 38 : 5 })
        : Response.json({ downloads: 100 })
    );

    const stats = await getHomeStats();

    expect(stats.stars).toEqual({ docs: 5, nextra: 38, fumadocs: 5 });
    expect(stats.downloads).toBe(100 * EXTENSION_PACKAGES.length);
    const urls = fetched.mock.calls.map(([url]) => String(url));
    for (const template of templateList) {
      expect(urls).toContain(`https://api.github.com/repos/${template.repo}`);
    }
    // One request per scoped package: npm's bulk endpoint refuses them
    expect(urls).toContain(
      'https://api.npmjs.org/downloads/point/last-month/@gfazioli/mantine-marquee'
    );
    expect(urls).toHaveLength(templateList.length + EXTENSION_PACKAGES.length);
  });

  it('leaves out a number it could not fetch, and never answers zero', async () => {
    mockFetch((url) => {
      if (url.endsWith('next-app-nextra-template')) {
        // Rate limited
        return Response.json({ message: 'API rate limit exceeded' }, { status: 403 });
      }
      if (url.endsWith('next-app-fumadocs-template')) {
        throw new Error('network down');
      }
      if (url.endsWith('@gfazioli/mantine-led')) {
        return Response.json({ error: 'not found' }, { status: 404 });
      }
      return url.startsWith('https://api.github.com/')
        ? Response.json({ stargazers_count: 0 })
        : Response.json({ downloads: 100 });
    });

    const stats = await getHomeStats();

    // 403, a thrown error and a count of zero: all three are absent
    expect(stats.stars).toEqual({});
    // One package missing would make the sum a wrong number
    expect(stats.downloads).toBeUndefined();
  });

  it('sends the GitHub token only when there is one', async () => {
    const fetched = mockFetch(() => Response.json({ stargazers_count: 1, downloads: 1 }));
    const authorization = () =>
      fetched.mock.calls
        .filter(([url]) => String(url).startsWith('https://api.github.com/'))
        .map(([, init]) => new Headers(init?.headers).get('Authorization'));

    await getHomeStats();
    expect(authorization()).toEqual([null, null, null]);

    fetched.mockClear();
    process.env.GITHUB_TOKEN = 'test-token';
    await getHomeStats();
    expect(authorization()).toEqual(Array(3).fill('Bearer test-token'));
  });

  it('asks again without the token when GitHub refuses it, but not when rate limited', async () => {
    process.env.GITHUB_TOKEN = 'revoked-token';
    const fetched = mockFetch((url) => {
      if (!url.startsWith('https://api.github.com/')) {
        return Response.json({ downloads: 1 });
      }
      const call = fetched.mock.calls.findLast(([called]) => String(called) === url);
      const withToken = new Headers(call?.[1]?.headers).has('Authorization');
      if (withToken && url.endsWith('next-app-nextra-template')) {
        return Response.json(
          { message: 'API rate limit exceeded' },
          { status: 403, headers: { 'x-ratelimit-remaining': '0' } }
        );
      }
      return withToken
        ? Response.json({ message: 'Bad credentials' }, { status: 401 })
        : Response.json({ stargazers_count: 7 });
    });

    const stats = await getHomeStats();

    // docs and fumadocs refused the token and answered without it; nextra was rate limited
    expect(stats.stars).toEqual({ docs: 7, fumadocs: 7 });
    const github = fetched.mock.calls.filter(([url]) =>
      String(url).startsWith('https://api.github.com/')
    );
    expect(github).toHaveLength(5);
  });
});

describe('EXTENSION_PACKAGES', () => {
  it('names the npm package of every listed extension', () => {
    expect(EXTENSION_PACKAGES).toContain('@gfazioli/mantine-border-animate');
    for (const name of EXTENSION_PACKAGES) {
      expect(name).toMatch(/^@gfazioli\/mantine-[a-z-]+$/);
    }
    expect(new Set(EXTENSION_PACKAGES).size).toBe(EXTENSION_PACKAGES.length);
  });
});

describe('compactCount', () => {
  it('shortens a count, rounding down', () => {
    expect(compactCount(38)).toBe('38');
    expect(compactCount(999)).toBe('999');
    expect(compactCount(309_494)).toBe('309k');
    expect(compactCount(309_999)).toBe('309k');
    expect(compactCount(1_000_000)).toBe('1M');
    expect(compactCount(1_260_000)).toBe('1.2M');
  });
});
