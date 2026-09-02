import { AppLink } from '@/components/nav/AppLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion, type FaqAccordionItem } from '@/components/ui/FaqAccordion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';
import { totalBypasses, totalDomains } from '@/data/catalog';
import { CHROME_WEB_STORE_URL, FREE, LICENSE, PRICE } from '@/data/constants';
import { faqs } from '@/data/faqs';
import { faqPageJsonLd } from '@/data/seo';
import { homeHash, homeSections, routes } from '@/lib/routes';
import { sectionY } from '@/ui-classes/layout';

const storeLinkClass =
  'font-medium text-primary-700 underline decoration-primary-200 underline-offset-2 hover:decoration-primary-500';

function homeFaqItems(): readonly FaqAccordionItem[] {
  return faqs.map((item) => {
    if (item.question === 'How do I use Skip Wait?') {
      return {
        question: item.question,
        answer: (
          <>
            Install Skip Wait from the{' '}
            <a
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={storeLinkClass}
            >
              Chrome Web Store
            </a>
            . You get {FREE.dailyLimit} free bypasses each day with no key. Open supported links as
            usual. Skip Wait skips the countdown when it can, or waits and clicks Continue for you.
            For unlimited use, get a 30-minute trial or {PRICE.summary} license on EAS Store, paste the
            key in the popup, and tap Activate. See{' '}
            <AppLink href={homeSections.pricing}>Pricing</AppLink>.
          </>
        ),
      };
    }
    if (item.question === 'Do I need a license?') {
      return {
        question: item.question,
        answer: (
          <>
            No. After you install, you get {FREE.dailyLimit} free bypasses each day with no key. For
            unlimited use, get a 30-minute trial or monthly license on EAS Store and activate the key
            in the popup. See <AppLink href={homeSections.pricing}>Pricing</AppLink>.
          </>
        ),
      };
    }
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
    if (item.question === 'How much does Skip Wait cost?') {
      return {
        question: item.question,
        answer: (
          <>
            {FREE.dailyLimit} free bypasses each day with no key. A short link that uses a few pages
            still counts as one use. EAS Store also offers a 30-minute{' '}
            {LICENSE.trialLabel.toLowerCase()} and a {PRICE.summary} plan with no daily limit. See{' '}
            <AppLink href={homeSections.pricing}>Pricing</AppLink> for the buy link. Paste a key in
            the popup and tap Activate. {LICENSE.deviceLimit} A live license does not use the daily
            free count.
          </>
        ),
      };
    }
    if (item.question === 'What sites are supported?') {
      return {
        question: item.question,
        answer: (
          <>
            Skip Wait works on {totalBypasses()} bypasses across {totalDomains()} websites—URL
            shorteners like Linkvertise, GPLinks, and Ouo, plus waiting pages, safelinks, file-host
            timers, content lockers, and direct downloads. Open{' '}
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
    <section id={homeHash.faq} className={`scroll-mt-20 bg-surface-canvas ${sectionY}`}>
      <JsonLd data={faqPageJsonLd()} />
      <Shell>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <SectionHeader
            title="Questions Before You Install"
            description={`How Skip Wait skips countdown timers, ${FREE.dailyLimit} free bypasses a day, FastForward and Universal Bypass as alternatives, Android with Quetta, and how to request a site.`}
          />

          <FaqAccordion items={homeFaqItems()} />
        </div>
      </Shell>
    </section>
  );
}
