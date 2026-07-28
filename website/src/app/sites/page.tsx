import type { Metadata } from 'next';
import { SupportedSitesPage } from '@/components/sites/SupportedSitesPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { totalBypasses, totalDomains } from '@/data/catalog-queries';
import { SITE } from '@/data/constants';
import { breadcrumbJsonLd, sitesCanonical, supportedSitesJsonLd } from '@/data/seo';
import { routes } from '@/lib/routes';

const title = 'Supported Sites — Bypass & Automate Countdowns';
const description = `Browse ${totalBypasses()} link shortener bypasses, countdown skips, and wait automations across ${totalDomains()} domains supported by ${SITE.name}. Search by site name or domain.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    ...SITE.keywords,
    'supported sites',
    'link shortener list',
    'countdown bypass list',
  ],
  alternates: {
    canonical: routes.sites,
  },
  openGraph: {
    title: `Supported Sites | ${SITE.name}`,
    description,
    url: sitesCanonical,
    images: [
      {
        url: '/icon.png',
        width: 128,
        height: 128,
        alt: `${SITE.name} supported sites`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: `Supported Sites | ${SITE.name}`,
    description,
    images: ['/icon.png'],
  },
};

export default function SitesPage(): React.ReactElement {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Supported Sites', path: routes.sites },
          ]),
          supportedSitesJsonLd(),
        ]}
      />
      <SupportedSitesPage />
    </>
  );
}
