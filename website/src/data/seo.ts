import type { Metadata } from 'next';
import {
  CHROME_WEB_STORE_URL,
  CONTACT,
  DEVELOPER,
  FREE,
  LICENSE,
  PRICE,
  SITE,
} from '@/data/constants';
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
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: PRICE.amount,
      priceCurrency: PRICE.currency,
      offerCount: 2,
      availability: 'https://schema.org/InStock',
      url: CHROME_WEB_STORE_URL,
      description: LICENSE.pricingLine,
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
      'Skip wait, bypass timers, and countdown bypass on supported pages',
      'Bypass URL shorteners, waiting pages, and download timers',
      'If a site still needs a wait or Continue, Skip Wait does that step',
      'Opens the destination when the page is ready',
      `${FREE.dailyLimit} free bypasses each day with no key`,
      `30-minute trial and ${PRICE.summary} for unlimited use`,
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
