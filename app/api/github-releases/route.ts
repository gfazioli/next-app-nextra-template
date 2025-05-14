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

    const response = await fetch(
      `${config.gitHub.releasesUrl}?per_page=${config.releaseNotes.maxReleases}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // Optional for rate limit
        },
      }
    );

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error('Error fetching releases:', response.statusText);
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
