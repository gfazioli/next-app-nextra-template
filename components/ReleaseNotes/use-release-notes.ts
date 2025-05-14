import { useEffect, useState } from 'react';
import { compileMdx } from 'nextra/compile';
import useSWR from 'swr';

export interface Author {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}

export interface Release {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: Author;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: any[];
  tarball_url: string;
  zipball_url: string;
  body: string;
}

export interface TOC {
  value: string;
  depth: string;
  id: string;
}

export function useReleaseNotes() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const [compiledReleases, setCompiledReleases] = useState<Release[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    data,
    error: swrError,
    isLoading,
  } = useSWR<{
    releases: Release[];
  }>('/api/github-releases', fetcher);

  useEffect(() => {
    if (data && !isLoading && !error) {
      if (data.toString() === 'rate limit exceeded') {
        setError('Rate limit exceeded. Please try again later. Or check your API key.');
        return;
      }

      const fetchReleases = async () => {
        const releases = await Promise.all(
          data.releases.map(async (release) => ({
            ...release,
            created_at: new Date(release.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            body: await compileMdx(release.body),
          }))
        );
        setCompiledReleases(releases);
      };
      fetchReleases();
    }
  }, [data, isLoading, error]); // Add isLoading and error to the dependency array

  return { data: compiledReleases, error: error || swrError, isLoading } as const;
}
