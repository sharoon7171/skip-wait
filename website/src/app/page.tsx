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
import { homeWebPageJsonLd, indexRobots } from '@/data/seo';

const title = SITE.title;
const description = SITE.description;
const keywords = [...SITE.keywords];

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords,
  robots: indexRobots,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title,
    description,
    url: SITE.url,
    images: [
      {
        url: '/icon.png',
        width: 128,
        height: 128,
        alt: `${SITE.name} — skip countdown timers and link shorteners`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: ['/icon.png'],
  },
};

export default function HomePage(): React.ReactElement {
  return (
    <>
      <JsonLd data={homeWebPageJsonLd()} />
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
