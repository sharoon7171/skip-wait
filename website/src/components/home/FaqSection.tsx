import { AppLink } from '@/components/nav/AppLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion, type FaqAccordionItem } from '@/components/ui/FaqAccordion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';
import { totalBypasses, totalDomains } from '@/data/catalog';
import { PRICE } from '@/data/constants';
import { faqs } from '@/data/faqs';
import { faqPageJsonLd } from '@/data/seo';
import { homeHash, routes } from '@/lib/routes';

function homeFaqItems(): readonly FaqAccordionItem[] {
  return faqs.map((item) => {
    if (item.question === 'Can I use Skip Wait on Android?') {
      return {
        question: item.question,
        answer: (
          <>
            Yes on Android with Quetta Browser, which installs Chrome Web Store extensions. Chrome
            for Android itself does not. Follow the{' '}
            <AppLink href={routes.guidesAndroid}>Install on Android</AppLink> guide for Quetta’s
            official install steps. Quetta’s iOS app does not document Chrome extension support, so
            Skip Wait is not offered there.
          </>
        ),
      };
    }
    if (item.question === 'What sites are supported?') {
      return {
        question: item.question,
        answer: (
          <>
            Skip Wait works on {totalBypasses()} bypasses across {totalDomains()} websites—link
            shorteners like Linkvertise, GPLinks, and Ouo, plus safelinks, file hosts, and download
            countdown pages. Open{' '}
            <AppLink href={routes.sites}>Supported Sites</AppLink> and search by name or website
            address.
          </>
        ),
      };
    }
    return item;
  });
}

export function FaqSection(): React.ReactElement {
  return (
    <section id={homeHash.faq} className="scroll-mt-20 bg-surface-canvas py-12 lg:py-16">
      <JsonLd data={faqPageJsonLd()} />
      <Shell>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
          <SectionHeader
            title="Questions Before You Install"
            description={`How Skip Wait bypasses countdowns, when it automates waits, Android with Quetta, ${PRICE.label} pricing, and how to request a site.`}
          />

          <FaqAccordion items={homeFaqItems()} />
        </div>
      </Shell>
    </section>
  );
}
