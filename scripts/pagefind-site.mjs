#!/usr/bin/env node
/**
 * Gathers the prerendered HTML into `.next/pagefind-site`, laid out the way the
 * site is served, for `build:pagefind` to index.
 *
 * Next writes a prerendered page to one of two places. Without an adapter (a
 * local `next build`) it is `.next/server/app/<path>.html`. With one, which
 * Vercel always configures, Next 16.3.8 and later write it to
 * `.next/server/route-cache/<kind>/<sha256 of the route>/$/<path>.html`
 * instead, and `.next/server/app` holds no HTML at all: Pagefind then indexed
 * nothing and failed the deploy. Pointing Pagefind at `.next/server`
 * would not do, because it takes each result's URL from the file's path under
 * the folder it indexes, and every result would link to a `/route-cache/...`
 * 404. The part after `$/` is the page's own path, and that is where the file
 * goes here, so the index holds the same URLs from either layout.
 *
 * A local build takes the adapter layout with an adapter that changes nothing:
 * `NEXT_ADAPTER_PATH=<module exporting { name: 'noop' }> next build`.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, sep } from 'node:path';

const SERVER = '.next/server';
const SITE = '.next/pagefind-site';

function htmlUnder(dir) {
  return existsSync(dir)
    ? readdirSync(dir, { recursive: true }).filter((file) => file.endsWith('.html'))
    : [];
}

// Each page's path in the site, and the file it came from: one page found in
// both layouts means a stale build, and guessing which one is current would
// index the wrong copy.
const placed = new Map();

function place(path, from) {
  if (placed.has(path)) {
    throw new Error(`${path} is in both ${placed.get(path)} and ${from}`);
  }
  placed.set(path, from);
}

for (const file of htmlUnder(join(SERVER, 'app'))) {
  place(file.split(sep).join('/'), join(SERVER, 'app', file));
}
const fromApp = placed.size;

const routeCache = join(SERVER, 'route-cache');
for (const file of htmlUnder(routeCache)) {
  // <kind>/<sha256>/$/<path>.html
  const parts = file.split(sep);
  const dollar = parts.indexOf('$');
  if (dollar < 0) {
    throw new Error(`no "$" segment in ${join(routeCache, file)}`);
  }
  place(parts.slice(dollar + 1).join('/'), join(routeCache, file));
}

if (placed.size === 0) {
  console.error(`pagefind-site: no prerendered HTML under ${SERVER}/app or ${routeCache}`);
  process.exit(1);
}

rmSync(SITE, { recursive: true, force: true });
for (const [path, from] of placed) {
  mkdirSync(dirname(join(SITE, path)), { recursive: true });
  cpSync(from, join(SITE, path));
}
console.log(
  `pagefind-site: ${placed.size} pages into ${SITE} (${fromApp} from ${SERVER}/app, ${placed.size - fromApp} from ${routeCache})`
);
