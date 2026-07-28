import { CHROME_WEB_STORE_URL, CONTACT, ORGANIZATION, SITE } from '@/data/constants';
import { bypasses } from '@/data/catalog';
import { totalBypasses, totalDomains } from '@/data/catalog-queries';
import { faqs } from '@/data/faqs';
import { routes } from '@/lib/routes';

export function softwareApplicationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE.name,
    alternateName: 'Skip Wait — Bypass Timers & Countdowns',
    description: SITE.description,
    url: SITE.url,
    applicationCategory: 'BrowserApplication',
    applicationSubCategory: 'Chrome Extension',
    operatingSystem: 'Chrome',
    downloadUrl: CHROME_WEB_STORE_URL,
    installUrl: CHROME_WEB_STORE_URL,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      ratingCount: '18',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: 'Sharoon',
      email: CONTACT.email,
      url: CONTACT.github,
    },
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
      logo: `${SITE.url}/icon.png`,
      sameAs: [CONTACT.github, CHROME_WEB_STORE_URL, ORGANIZATION.url],
    },
    featureList: [
      'Bypass countdown timers on supported download and link pages',
      'Skip waiting pages and link shortener redirects',
      'Automate waits and continue clicks when a full bypass is not possible',
      'Instant redirect to the destination when the site allows it',
      'Free Chrome extension with no account required',
    ],
    keywords: SITE.keywords.join(', '),
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
    },
  };
}

export function faqPageJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function supportedSitesJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Supported Sites | ${SITE.name}`,
    description: `Link shortener bypasses, countdown skips, and wait automations across ${totalDomains()} domains.`,
    url: `${SITE.url}${routes.sites}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: totalBypasses(),
      itemListElement: bypasses.slice(0, 50).map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: entry.name,
        description: entry.description,
      })),
    },
  };
}

export const homeCanonical = SITE.url;
export const sitesCanonical = `${SITE.url}${routes.sites}`;
export const privacyCanonical = `${SITE.url}${routes.privacy}`;
export const termsCanonical = `${SITE.url}${routes.terms}`;
