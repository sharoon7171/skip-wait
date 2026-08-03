'use client';

import Link from 'next/link';
import { LuArrowLeft, LuChevronRight } from 'react-icons/lu';
import type { SupportedBypass } from '@/types/catalog';
import { CHROME_WEB_STORE_URL } from '@/data/constants';
import { trackChromeWebStoreClick } from '@/lib/analytics';
import { routes } from '@/lib/routes';
import { BypassArticleToc, type BypassTocItem } from '@/components/sites/BypassArticleToc';
import { SupportCta } from '@/components/home/SupportCta';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { ChromeIcon } from '@/components/ui/ChromeIcon';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { Shell } from '@/components/ui/Shell';

type BypassDetailPageProps = {
  entry: SupportedBypass;
};

const sectionClassName = 'scroll-mt-24 border-b border-neutral-200 py-8 sm:py-9';

export function BypassDetailPage({ entry }: BypassDetailPageProps): React.ReactElement {
  const { article } = entry;
  const showWhatItDoes = Boolean(article.problem) || article.skips.length > 0;
  const toc: BypassTocItem[] = [
    showWhatItDoes ? { id: 'what-it-does', label: `What ${entry.name} does` } : null,
    { id: 'how-we-bypass', label: 'How Skip Wait bypasses it' },
    { id: 'supported-websites', label: 'Supported websites' },
    article.steps && article.steps.length > 0 ? { id: 'how-to-use', label: 'How to use' } : null,
    { id: 'faq', label: 'FAQ' },
  ].filter((item): item is BypassTocItem => item !== null);

  return (
    <>
      <section className="relative bg-surface-canvas">
        <HeroBackdrop />
        <Shell className="relative py-8 sm:py-10 lg:py-12">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="m-0 flex list-none flex-wrap items-center gap-1 p-0 text-caption text-ink-soft">
              <li>
                <Link
                  href={routes.home}
                  className="rounded-sm px-1 py-0.5 no-underline transition-colors hover:text-ink"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="flex items-center text-neutral-300">
                <LuChevronRight className="size-3.5" />
              </li>
              <li>
                <Link
                  href={routes.sites}
                  className="rounded-sm px-1 py-0.5 no-underline transition-colors hover:text-ink"
                >
                  Supported Sites
                </Link>
              </li>
              <li aria-hidden className="flex items-center text-neutral-300">
                <LuChevronRight className="size-3.5" />
              </li>
              <li className="truncate px-1 py-0.5 text-ink" aria-current="page">
                {entry.name}
              </li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <h1 className="font-display text-title-lg text-ink sm:text-headline">
                {entry.name} Bypass
              </h1>
              <p className="rounded-full bg-primary-50 px-2.5 py-0.5 text-caption font-semibold text-primary-700 ring-1 ring-primary-100">
                {entry.bypass}
              </p>
            </div>
            <p className="mt-4 text-body text-ink-body">{article.intro}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonAnchor
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackChromeWebStoreClick('bypass_detail')}
            >
              <ChromeIcon className="size-5" />
              Add to Chrome — Free
            </ButtonAnchor>
            <ButtonLink href={routes.sites} variant="ghost">
              <LuArrowLeft className="size-4" aria-hidden />
              All Supported Sites
            </ButtonLink>
          </div>

          <div className="mt-8 max-w-xs lg:hidden">
            <BypassArticleToc items={toc} />
          </div>
        </Shell>
      </section>

      <section className="border-t border-neutral-200 bg-surface-canvas">
        <Shell className="grid gap-x-10 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-x-12 xl:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            {showWhatItDoes ? (
              <section id="what-it-does" className={sectionClassName}>
                <h2 className="font-display text-title text-ink">What {entry.name} does</h2>
                {article.problem ? (
                  <p className="mt-4 max-w-prose text-body-sm leading-relaxed text-ink-body">
                    {article.problem}
                  </p>
                ) : null}
                {article.skips.length > 0 ? (
                  <>
                    <h3
                      className={`font-display text-body font-semibold text-ink ${article.problem ? 'mt-6' : 'mt-4'}`}
                    >
                      Delays and gates you hit
                    </h3>
                    <ul className="m-0 mt-3 max-w-prose list-disc space-y-2 pl-5 text-body-sm text-ink-body">
                      {article.skips.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </section>
            ) : null}

            <section id="how-we-bypass" className={sectionClassName}>
              <h2 className="font-display text-title text-ink">
                How Skip Wait bypasses {entry.name}
              </h2>
              <p className="mt-4 max-w-prose text-body-sm leading-relaxed text-ink-body">
                {article.howItWorks}
              </p>
            </section>

            <section id="supported-websites" className={sectionClassName}>
              <h2 className="font-display text-title text-ink">Supported websites</h2>
              <p className="mt-4 max-w-prose text-body-sm leading-relaxed text-ink-body">
                This {entry.name} bypass runs on the hosts below when Skip Wait is enabled in Chrome.
              </p>
              <ul
                className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0"
                aria-label={`Websites supported for ${entry.name}`}
              >
                {entry.domains.map((domain) => (
                  <li
                    key={domain}
                    className="rounded-chip bg-neutral-100 px-3 py-1.5 font-mono text-caption font-medium text-ink ring-1 ring-neutral-300"
                  >
                    {domain}
                  </li>
                ))}
              </ul>
            </section>

            {article.steps && article.steps.length > 0 ? (
              <section id="how-to-use" className={sectionClassName}>
                <h2 className="font-display text-title text-ink">How to use</h2>
                <p className="mt-4 max-w-prose text-body-sm leading-relaxed text-ink-body">
                  Install once, then open {entry.name} links the same way you already do. Skip Wait
                  handles the rest on supported pages.
                </p>
                <ol className="m-0 mt-5 max-w-prose list-none space-y-5 p-0">
                  {article.steps.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span
                        aria-hidden
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-50 font-display text-caption font-semibold text-primary-700 ring-1 ring-primary-100"
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <h3 className="font-display text-body font-semibold text-ink">{step.title}</h3>
                        <p className="mt-1.5 text-body-sm leading-relaxed text-ink-body">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8">
                  <ButtonAnchor
                    href={CHROME_WEB_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackChromeWebStoreClick('bypass_detail')}
                  >
                    <ChromeIcon className="size-5" />
                    Add Skip Wait to Chrome
                  </ButtonAnchor>
                </div>
              </section>
            ) : null}

            <section id="faq" className="scroll-mt-24 pb-12 pt-12 lg:pb-0 lg:pt-16">
              <h2 className="font-display text-title text-ink">FAQ</h2>
              <div className="mt-5">
                <FaqAccordion
                  items={article.faq}
                  questionClassName="font-display text-body font-semibold text-ink sm:text-title"
                />
              </div>
            </section>
          </div>

          <aside className="hidden min-w-0 lg:col-start-2 lg:row-start-1 lg:block">
            <div className="sticky top-24 pt-12 lg:pt-16">
              <BypassArticleToc items={toc} />
            </div>
          </aside>

          <div className="hidden pb-12 lg:col-start-1 lg:row-start-2 lg:block lg:pb-16" aria-hidden />
        </Shell>
      </section>

      <SupportCta />
    </>
  );
}
