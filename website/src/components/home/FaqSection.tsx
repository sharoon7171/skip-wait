import { JsonLd } from '@/components/seo/JsonLd';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';
import { faqs } from '@/data/faqs';
import { faqPageJsonLd } from '@/data/seo';

export function FaqSection(): React.ReactElement {
  return (
    <section id="faq" className="scroll-mt-20 bg-surface-canvas py-12 lg:py-16">
      <JsonLd data={faqPageJsonLd()} />
      <Shell>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
          <SectionHeader
            title="Questions Before You Install"
            description="How Skip Wait bypasses countdowns, when it automates waits instead, what’s free, and how to request a site."
          />

          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {faqs.map((item) => (
              <li key={item.question}>
                <details className="group rounded-panel bg-surface-muted px-5 py-4 shadow-sm ring-1 ring-neutral-200 open:ring-primary-200 sm:px-6 sm:py-5">
                  <summary className="cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      <span className="font-display text-title text-ink">{item.question}</span>
                      <span
                        aria-hidden
                        className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-caption font-bold text-primary-700 transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 max-w-prose text-body-sm text-ink-body">{item.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Shell>
    </section>
  );
}
