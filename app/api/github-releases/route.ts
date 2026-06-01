import config from '@/config';

export async function GET(request: Request) {
  try {
    const userAgent = request.headers.get('user-agent');

    if (!userAgent) {
      return Response.json({ error: 'User agent not found' }, { status: 400 });
    }

    const isBot = /bot|crawl|slurp|spider/i.test(userAgent);

    if (isBot) {
      return Response.json({ error: 'Bots are not allowed' }, { status: 403 });
    }

    const url = `${config.gitHub.releasesUrl}?per_page=${config.releaseNotes.maxReleases}`;
    const baseHeaders: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      // GitHub requires a User-Agent on unauthenticated requests.
      'User-Agent': config.gitHub.repo,
    };

    // Try authenticated first if a token is configured (5000 req/hour vs 60/hour).
    // If the token is invalid (401) or rejected by org policy (403 *not* due to
    // rate limiting), retry unauthenticated — public releases are readable
    // without auth. We do NOT fall back on a rate-limited 403, since that just
    // consumes another quota slot and amplifies throttling.
    const FETCH_TIMEOUT_MS = 10_000;
    const fetchOptions = {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    };
    let response: Response;
    if (process.env.GITHUB_TOKEN) {
      response = await fetch(url, {
        ...fetchOptions,
        headers: { ...baseHeaders, Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
      });
      const rateRemaining = response.headers.get('x-ratelimit-remaining');
      const shouldFallback =
        response.status === 401 || (response.status === 403 && rateRemaining !== '0');
      if (shouldFallback) {
        // Drain the body to release the undici connection before refetching.
        await response.text();
        // eslint-disable-next-line no-console
        console.warn(
          `GITHUB_TOKEN returned ${response.status} — falling back to unauthenticated fetch`
        );
        response = await fetch(url, {
          ...fetchOptions,
          signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
          headers: baseHeaders,
        });
      }
    } else {
      response = await fetch(url, { ...fetchOptions, headers: baseHeaders });
    }

    if (!response.ok) {
      const bodyText = await response.text();
      const rateRemaining = response.headers.get('x-ratelimit-remaining');
      const rateReset = response.headers.get('x-ratelimit-reset');
      // eslint-disable-next-line no-console
      console.error('[github-releases] non-OK response', {
        status: response.status,
        statusText: response.statusText,
        rateRemaining,
        rateReset,
        body: bodyText.slice(0, 300),
      });
      return Response.json(
        { error: response.statusText || 'GitHub releases fetch failed' },
        { status: response.status }
      );
    }

    const releases = await response.json();

    return Response.json(
      { releases, status: 'ok' },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          Vary: 'User-Agent',
        },
      }
    );
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error checking user agent:', error);
    return Response.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
