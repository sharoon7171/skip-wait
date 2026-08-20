import type { Metadata } from 'next';
import { CHROME_WEB_STORE_URL, CONTACT, DEVELOPER, PRICE, SITE } from '@/data/constants';
import { faqs } from '@/data/faqs';
import { homeSections } from '@/lib/routes';

export const indexRobots: NonNullable<Metadata['robots']> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/icon.png`,
    },
    sameAs: [DEVELOPER.url, CONTACT.github, CHROME_WEB_STORE_URL],
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT.email,
      contactType: 'customer support',
    },
  };
}

export function softwareApplicationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE.name,
    alternateName: [
      'Skip Wait — Bypass Timers & Countdowns',
      'Skip Wait Chrome Extension',
    ],
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}/icon.png`,
    applicationCategory: 'BrowserApplication',
    applicationSubCategory: 'Chrome Extension',
    operatingSystem: 'Chrome',
    downloadUrl: CHROME_WEB_STORE_URL,
    installUrl: CHROME_WEB_STORE_URL,
    offers: {
      '@type': 'Offer',
      price: PRICE.amount,
      priceCurrency: PRICE.currency,
      availability: 'https://schema.org/InStock',
      description: PRICE.label,
    },
    author: {
      '@type': 'Person',
      name: DEVELOPER.name,
      email: CONTACT.email,
      url: DEVELOPER.url,
    },
    publisher: {
      '@type': 'Person',
      name: DEVELOPER.name,
      url: DEVELOPER.url,
    },
    featureList: [
      'Bypass countdown timers on supported download and link pages',
      'Skip waiting pages and link shortener redirects',
      'Automate waits and continue clicks when a full bypass is not possible',
      'Instant redirect to the destination when the site allows it',
      `${PRICE.label} Chrome extension. Activate a license in the popup`,
    ],
    keywords: SITE.keywords.join(', '),
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    alternateName: 'Skip Wait Chrome Extension',
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/icon.png`,
      },
    },
  };
}

export function homeWebPageJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE.url}/#webpage`,
    name: SITE.title,
    description: SITE.description,
    url: SITE.url,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
    },
    about: {
      '@type': 'SoftwareApplication',
      name: SITE.name,
      applicationCategory: 'BrowserApplication',
      operatingSystem: 'Chrome',
      downloadUrl: CHROME_WEB_STORE_URL,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE.url}/icon.png`,
    },
  };
}

export function faqPageJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE.url}${homeSections.faq}`,
    url: SITE.url,
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
      item: `${SITE.url}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

export function legalWebPageJsonLd(input: {
  title: string;
  description: string;
  path: string;
  dateModified: string;
}): Record<string, unknown> {
  const url = `${SITE.url}${input.path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${input.title} | ${SITE.name}`,
    description: input.description,
    url,
    inLanguage: 'en',
    dateModified: input.dateModified,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
    },
    about: {
      '@type': 'SoftwareApplication',
      name: SITE.name,
      applicationCategory: 'BrowserApplication',
      operatingSystem: 'Chrome',
      downloadUrl: CHROME_WEB_STORE_URL,
    },
  };
}
