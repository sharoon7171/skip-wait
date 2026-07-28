import type { Metadata } from 'next';
import { SupportedSitesPage } from '@/components/sites/SupportedSitesPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { totalBypasses, totalDomains } from '@/data/catalog-queries';
import { SITE } from '@/data/constants';
import { breadcrumbJsonLd, sitesCanonical, supportedSitesJsonLd } from '@/data/seo';
import { routes } from '@/lib/routes';

const title = 'Supported Sites — Bypass & Automate Countdowns';
const description = `Find a Linkvertise bypass, GPLinks bypass, Ouo bypass, ShrinkMe bypass, and more. ${SITE.name} supports ${totalBypasses()} sites across ${totalDomains()} websites—skip countdowns and short-link waits, or finish them for you.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    ...SITE.keywords,
    'supported sites',
    'Linkvertise bypass',
    'GPLinks bypass',
    'Ouo bypass',
    'ShrinkMe bypass',
    'AdFocus bypass',
    'Filecrypt bypass',
    'link shortener bypass list',
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
