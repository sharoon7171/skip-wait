import type { Metadata } from 'next';
import { SupportedSitesPage } from '@/components/sites/SupportedSitesPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { bypasses } from '@/data/catalog';
import { totalBypasses, totalDomains } from '@/data/catalog-queries';
import { SITE } from '@/data/constants';
import { breadcrumbJsonLd, indexRobots } from '@/data/seo';
import { bypassSlug } from '@/lib/catalog-slug';
import { bypassSitePath, routes } from '@/lib/routes';

const title = 'Supported Sites — Link Shortener & Countdown Bypasses';
const description = `Browse ${totalBypasses()} bypasses across ${totalDomains()} websites. Search by site name or domain for countdown skips, waiting-page bypasses, and link shortener support with Skip Wait.`;
const keywords = [
  'supported sites',
  'skip wait supported sites',
  'link shortener bypass list',
  'countdown bypass list',
  'waiting page bypass sites',
  'download timer bypass sites',
  'safelink bypass list',
  'ad link bypass list',
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
