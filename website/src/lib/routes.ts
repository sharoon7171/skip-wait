export const routes = {
  home: '/',
  sites: '/sites',
  privacy: '/privacy',
  terms: '/terms',
} as const;

export const homeHash = {
  howItWorks: 'how-it-works',
  faq: 'faq',
} as const;

export const homeSections = {
  howItWorks: `${routes.home}#${homeHash.howItWorks}`,
  faq: `${routes.home}#${homeHash.faq}`,
} as const;

export function bypassSitePath(slug: string): string {
  return `${routes.sites}/${slug}`;
}
