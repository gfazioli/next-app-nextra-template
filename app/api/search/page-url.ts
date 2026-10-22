/**
 * Pagefind indexes the built `.html` files, so its result URLs end in `.html`
 * (`/docs/mantine.html#install`), and Next.js serves none of them. Nextra's own
 * search UI strips the suffix before linking; the API does the same, so its URLs
 * open the page instead of a 404.
 */
export function toPageUrl(url: string): string {
  return url.replace(/\/index\.html(?=#|$)/, '/').replace(/\.html(?=#|$)/, '');
}
