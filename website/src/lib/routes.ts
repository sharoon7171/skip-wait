export const routes = {
  home: '/',
  sites: '/sites',
  guidesAndroid: '/guides/android',
  privacy: '/privacy',
  terms: '/terms',
} as const;

export const homeHash = {
  howItWorks: 'how-it-works',
  pricing: 'pricing',
  faq: 'faq',
} as const;

export const homeSections = {
  howItWorks: `${routes.home}#${homeHash.howItWorks}`,
  pricing: `${routes.home}#${homeHash.pricing}`,
  faq: `${routes.home}#${homeHash.faq}`,
} as const;

export function bypassSitePath(slug: string): string {
  return `${routes.sites}/${slug}`;
}
