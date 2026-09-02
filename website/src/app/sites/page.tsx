import type { Metadata } from 'next';
import { SupportedSitesPage } from '@/components/sites/SupportedSitesPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { bypasses, bypassSlug, totalBypasses, totalDomains } from '@/data/catalog';
import { FREE, SITE } from '@/data/constants';
import { breadcrumbJsonLd, indexRobots } from '@/data/seo';
import { bypassSitePath, routes } from '@/lib/routes';

const title = 'Supported Sites — Countdown Bypass & URL Shorteners';
const description = `Browse ${totalBypasses()} bypasses across ${totalDomains()} websites. Skip countdown timers, bypass URL shorteners, waiting pages, and download timers. ${FREE.dailyLimit} free bypasses per day.`;
const keywords = [
  'supported sites',
  'skip wait supported sites',
  'countdown bypass list',
  'bypass url shorteners',
  'bypass timers',
  'link shortener bypass list',
  'waiting page bypass sites',
  'download timer bypass sites',
  'safelink bypass list',
  'ad link bypass list',
  'fastforward alternative',
  'universal bypass alternative',
] as const;
const path = routes.sites;
const url = `${SITE.url}${path}`;

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title,
  description,
  keywords: [...keywords],
  robots: indexRobots,
  alternates: {
    canonical: path,
  },
  openGraph: {
    type: 'website',
    title: `${title} | ${SITE.name}`,
    description,
    url,
    images: [
      {
        url: '/icon.png',
        width: 128,
        height: 128,
        alt: `${SITE.name} supported bypass sites`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: `${title} | ${SITE.name}`,
    description,
    images: ['/icon.png'],
  },
};

function supportedSitesJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${title} | ${SITE.name}`,
    description,
    url,
    inLanguage: 'en',
    keywords: keywords.join(', '),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
    },
    mainEntity: {
      '@type': 'ItemList',
      name: `${SITE.name} supported bypasses`,
      numberOfItems: totalBypasses(),
      itemListElement: bypasses.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${entry.name} Bypass`,
        description: entry.description,
        url: `${SITE.url}${bypassSitePath(bypassSlug(entry))}`,
      })),
    },
  };
}

export default function SitesPage(): React.ReactElement {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Supported Sites', path },
          ]),
          supportedSitesJsonLd(),
        ]}
      />
      <SupportedSitesPage />
    </>
  );
}
