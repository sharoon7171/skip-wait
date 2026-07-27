import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { DomainTicker } from '@/components/home/DomainTicker';
import { StatsBand } from '@/components/home/StatsBand';
import { FlowSection } from '@/components/home/FlowSection';
import { ShowcaseSection } from '@/components/home/ShowcaseSection';
import { SupportCta } from '@/components/home/SupportCta';
import { SITE } from '@/data/constants';

export const metadata: Metadata = {
  title: {
    absolute: SITE.title,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
  },
};

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Hero />
      <DomainTicker />
      <StatsBand />
      <FlowSection />
      <ShowcaseSection />
      <SupportCta />
    </>
  );
}
