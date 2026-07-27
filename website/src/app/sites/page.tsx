import type { Metadata } from 'next';
import { SupportedSitesPage } from '@/components/sites/SupportedSitesPage';
import { totalBypasses, totalDomains } from '@/data/catalog-queries';
import { SITE } from '@/data/constants';

export const metadata: Metadata = {
  title: 'Supported Sites — Link Shortener & Countdown Bypasses',
  description: `Browse ${totalBypasses()} link shortener and countdown timer bypasses across ${totalDomains()} domains supported by ${SITE.name}. Search by site name or domain.`,
  openGraph: {
    title: `Supported Sites | ${SITE.name}`,
    description: `Browse ${totalBypasses()} link shortener and countdown timer bypasses across ${totalDomains()} domains.`,
  },
};

export default function SitesPage(): React.ReactElement {
  return <SupportedSitesPage />;
}
