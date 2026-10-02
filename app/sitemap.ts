import type { MetadataRoute } from 'next';
import config from '@/config';
import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE_URL = config.metadata.metadataBase.href;
const CONTENT_DIR = join(process.cwd(), 'content');

// Every MDX page under content/ is served at /docs/<path> (index.mdx at /docs itself).
function docsRoutes(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return docsRoutes(path);
    }
    if (!entry.name.endsWith('.mdx')) {
      return [];
    }
    const route = relative(CONTENT_DIR, path)
      .replace(/\.mdx$/, '')
      .replace(/(^|\/)index$/, '');
    return [route ? `/docs/${route}` : '/docs'];
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', ...docsRoutes(CONTENT_DIR)].map((route) => ({
    url: new URL(route, SITE_URL).href,
  }));
}
