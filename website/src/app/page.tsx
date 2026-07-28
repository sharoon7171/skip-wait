import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { DomainTicker } from '@/components/home/DomainTicker';
import { StatsBand } from '@/components/home/StatsBand';
import { CapabilitySection } from '@/components/home/CapabilitySection';
import { FlowSection } from '@/components/home/FlowSection';
import { ShowcaseSection } from '@/components/home/ShowcaseSection';
import { FaqSection } from '@/components/home/FaqSection';
import { SupportCta } from '@/components/home/SupportCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE } from '@/data/constants';
import { breadcrumbJsonLd } from '@/data/seo';

export const metadata: Metadata = {
  title: {
    absolute: SITE.title,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    images: [
      {
        url: '/icon.png',
        width: 128,
        height: 128,
        alt: `${SITE.name} Chrome extension`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: SITE.title,
    description: SITE.description,
    images: ['/icon.png'],
  },
};

export default function HomePage(): React.ReactElement {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: 'Home', path: '/' }])}
      />
      <Hero />
      <DomainTicker />
      <StatsBand />
      <CapabilitySection />
      <FlowSection />
      <ShowcaseSection />
      <FaqSection />
      <SupportCta />
    </>
  );
}
