import { templateList, type TemplateKey } from '@/config/templates';
import { mantineComponentCategories } from '../MantineFooter/links';

/**
 * The live numbers the home page shows: each sibling template's GitHub stars, and what npm served
 * of the Mantine extensions in the last month. A number that could not be fetched is simply
 * absent, and the page shows nothing in its place: never a zero, never a placeholder.
 */
export interface HomeStats {
  /** GitHub stars, per template */
  stars: Partial<Record<TemplateKey, number>>;
  /** npm downloads of every listed extension in the last month, summed */
  downloads?: number;
}

/** No numbers at all: what the page is rendered with when nothing was fetched. */
export const NO_STATS: HomeStats = { stars: {} };

/** The npm packages of the extensions the page lists, from the address of each one's docs. */
export const EXTENSION_PACKAGES = mantineComponentCategories.flatMap((category) =>
  category.links.map((link) => `@gfazioli/${link.href.split('/').pop()}`)
);

/**
 * One response, or `undefined` if the request fails or times out. Cached for an hour by Next.js:
 * on a server the page is regenerated with fresh numbers, in a static export they are the build's.
 */
async function request(url: string, headers?: Record<string, string>) {
  try {
    return await fetch(url, {
      headers,
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    return undefined;
  }
}

async function json(response: Response | undefined): Promise<unknown> {
  return response?.ok ? response.json().catch(() => undefined) : undefined;
}

/** A count read from a JSON document: a positive whole number, or nothing. */
function count(data: unknown, key: string): number | undefined {
  const value = (data as Record<string, unknown> | undefined)?.[key];
  return typeof value === 'number' && Number.isInteger(value) && value > 0 ? value : undefined;
}

/**
 * With `GITHUB_TOKEN` when there is one (5000 requests an hour instead of 60), and again without it
 * when GitHub refuses the token, as `/api/github-releases` does: the stars are public, so a revoked
 * token must not hide them. A rate-limited answer is not retried.
 */
async function getStars(repo: string) {
  const url = `https://api.github.com/repos/${repo}`;
  // GitHub requires a User-Agent on unauthenticated requests.
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': repo };
  const token = process.env.GITHUB_TOKEN;
  let response = await request(
    url,
    token ? { ...headers, Authorization: `Bearer ${token}` } : headers
  );
  const refused =
    response?.status === 401 ||
    (response?.status === 403 && response.headers.get('x-ratelimit-remaining') !== '0');
  if (token && refused) {
    response = await request(url, headers);
  }
  return count(await json(response), 'stargazers_count');
}

/** npm's bulk endpoint refuses scoped packages: one request each, all at once. */
async function getDownloads() {
  const counts = await Promise.all(
    EXTENSION_PACKAGES.map(async (name) =>
      count(
        await json(await request(`https://api.npmjs.org/downloads/point/last-month/${name}`)),
        'downloads'
      )
    )
  );
  // A sum with a package missing would be a wrong number: all of them, or none.
  let sum = 0;
  for (const value of counts) {
    if (value === undefined) {
      return undefined;
    }
    sum += value;
  }
  return sum;
}

/**
 * Fetches the numbers, on the server: the page component of each template awaits it and hands the
 * result to `HomePage`, which stays synchronous (and testable without a network).
 */
export async function getHomeStats(): Promise<HomeStats> {
  const [downloads, stars] = await Promise.all([
    getDownloads(),
    Promise.all(
      templateList.map(async (template) => [template.key, await getStars(template.repo)] as const)
    ),
  ]);
  return {
    stars: Object.fromEntries(stars.filter(([, value]) => value !== undefined)),
    downloads,
  };
}

/** A count in few characters, rounded down so it never overstates: 309494 is "309k". */
export function compactCount(value: number) {
  if (value >= 1_000_000) {
    return `${(Math.floor(value / 100_000) / 10).toFixed(1).replace(/\.0$/, '')}M`;
  }
  return value >= 1000 ? `${Math.floor(value / 1000)}k` : String(value);
}
