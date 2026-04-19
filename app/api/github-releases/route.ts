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
    // If the token is rejected (401 invalid/expired, 403 blocked by org policy
    // like fine-grained PATs with lifetime > 366 days), retry unauthenticated —
    // public releases are readable without auth.
    let response: Response;
    if (process.env.GITHUB_TOKEN) {
      response = await fetch(url, {
        headers: { ...baseHeaders, Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
      });
      if (response.status === 401 || response.status === 403) {
        // eslint-disable-next-line no-console
        console.warn(
          `GITHUB_TOKEN returned ${response.status} — falling back to unauthenticated fetch`
        );
        response = await fetch(url, { headers: baseHeaders });
      }
    } else {
      response = await fetch(url, { headers: baseHeaders });
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
      return Response.json(response.statusText, { status: response.status });
    }

    const releases = await response.json();

    return Response.json({ releases, status: 'ok' });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error checking user agent:', error);
    return Response.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
