/**
 * Pagefind indexes the built `.html` files, so its result URLs end in `.html`
 * (`/docs/mantine.html#install`), and Next.js serves none of them. Nextra's own
 * search UI strips the suffix before linking; the API does the same, so its URLs
 * open the page instead of a 404. Only the path changes: a query or a fragment
 * (a heading ID can contain `.html`) is kept as it is. `index.html` never reaches
 * here: Pagefind already turns it into its folder's URL.
 */
export function toPageUrl(url: string): string {
  return url.replace(/^[^?#]*/, (path) => path.replace(/\.html$/, ''));
}
