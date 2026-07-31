export const routes = {
  home: '/',
  sites: '/sites',
  privacy: '/privacy',
  terms: '/terms',
} as const;

export function bypassSitePath(slug: string): string {
  return `${routes.sites}/${slug}`;
}
