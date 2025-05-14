import config from '@/config';
import type { Release, TOC } from './use-release-notes';

export async function releaseNotesToc() {
  const fetcher = (url: string, options?: RequestInit) =>
    fetch(url, options).then((res) => res.json());

  try {
    const releases = await fetcher(
      `${config.gitHub.releasesUrl}?per_page=${config.releaseNotes.maxReleases}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      //   },
      // }
    ).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error fetching releases:', error);
      throw error;
    });

    if (Array.isArray(releases) === false) {
      // eslint-disable-next-line no-console
      console.error('Invalid response format:', releases);
      return '[]';
    }

    const toc: TOC[] = releases.map((release: Release) => ({
      value: `${release.tag_name} - ${new Date(release.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).replace(' ', ', ')}`,
      depth: '3',
      id: release.tag_name,
    }));
    return toc;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching release notes:', error);
    return JSON.stringify(error);
  }
}
