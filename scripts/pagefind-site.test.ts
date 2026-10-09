/**
 * @jest-environment node
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const SCRIPT = join(process.cwd(), 'scripts/pagefind-site.mjs');

/**
 * Runs the script in a scratch project whose `.next/server` holds `files`
 * (path → HTML), the way `build:pagefind` runs it after `next build`.
 */
function run(files: Record<string, string>) {
  const dir = mkdtempSync(join(tmpdir(), 'pagefind-site-'));
  for (const [path, html] of Object.entries(files)) {
    const file = join(dir, '.next/server', path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
  }
  const result = spawnSync(process.execPath, [SCRIPT], { cwd: dir, encoding: 'utf8' });
  const site = (path: string) => {
    const file = join(dir, '.next/pagefind-site', path);
    return existsSync(file) ? readFileSync(file, 'utf8') : undefined;
  };
  return { status: result.status, stdout: result.stdout, stderr: result.stderr, site, dir };
}

const ROUTE =
  'route-cache/APP_PAGE/4d0c9eea1a3490362bc2cb7fdc73c12419dec3981d63e5359752a8bb5f8af1e4';

describe('pagefind-site', () => {
  const dirs: string[] = [];
  afterEach(() => {
    for (const dir of dirs.splice(0)) {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('keeps the layout of a build without an adapter', () => {
    const r = run({
      'app/index.html': 'home',
      'app/docs.html': 'docs',
      'app/docs/faq.html': 'faq',
    });
    dirs.push(r.dir);
    expect(r.status).toBe(0);
    expect([r.site('index.html'), r.site('docs.html'), r.site('docs/faq.html')]).toEqual([
      'home',
      'docs',
      'faq',
    ]);
  });

  it('lays the route cache of an adapter build out as the site, not under its hashes', () => {
    // Next 16.3.8 with an adapter (Vercel): nothing in server/app at all.
    const r = run({
      [`${ROUTE}/$/docs.html`]: 'docs',
      [`${ROUTE}/$/docs/tools/wifi.html`]: 'wifi',
      'route-cache/APP_PAGE/c6377dd9ce6a1c2cd100eb4344e843eb4639b9ed26f84643f77680e9eb454c4b/$/index.html':
        'home',
    });
    dirs.push(r.dir);
    expect(r.status).toBe(0);
    expect([r.site('index.html'), r.site('docs.html'), r.site('docs/tools/wifi.html')]).toEqual([
      'home',
      'docs',
      'wifi',
    ]);
    expect(r.stdout).toContain('3 pages');
  });

  it('takes each page from whichever layout holds it, and counts both', () => {
    const r = run({ 'app/index.html': 'home', [`${ROUTE}/$/docs.html`]: 'docs' });
    dirs.push(r.dir);
    expect(r.status).toBe(0);
    expect([r.site('index.html'), r.site('docs.html')]).toEqual(['home', 'docs']);
    expect(r.stdout).toContain('1 from .next/server/app, 1 from .next/server/route-cache');
  });

  it('refuses a route-cache file without the "$" that marks where its path starts', () => {
    const r = run({ [`${ROUTE}/docs.html`]: 'docs' });
    dirs.push(r.dir);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toContain('no "$" segment');
  });

  it('refuses a page found in both layouts instead of picking one', () => {
    const r = run({ 'app/docs.html': 'old', [`${ROUTE}/$/docs.html`]: 'new' });
    dirs.push(r.dir);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toContain('docs.html is in both');
  });

  it('fails when there is nothing to index, before Pagefind does', () => {
    const r = run({ 'app/data.json': '{}' });
    dirs.push(r.dir);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain('no prerendered HTML');
  });
});
