import { homeHash } from '@/lib/routes';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';
import { faqs } from '@/data/faqs';
import { faqPageJsonLd } from '@/data/seo';

export function FaqSection(): React.ReactElement {
  return (
    <section id={homeHash.faq} className="scroll-mt-20 bg-surface-canvas py-12 lg:py-16">
      <JsonLd data={faqPageJsonLd()} />
      <Shell>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
          <SectionHeader
            title="Questions Before You Install"
            description="How Skip Wait bypasses countdowns, when it automates waits instead, what’s free, and how to request a site."
          />

          <FaqAccordion items={faqs} />
        </div>
      </Shell>
    </section>
  );
}
