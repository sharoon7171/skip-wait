import type { SupportedBypass } from '@/types/catalog';
import { CHROME_WEB_STORE_URL } from '@/data/constants';
import { tocFromMarkdown, type BypassTocItem } from '@/components/sites/markdown-toc';
import { routes } from '@/lib/routes';
import { AppLink } from '@/components/nav/AppLink';
import { BypassArticleMarkdown } from '@/components/sites/BypassArticleMarkdown';
import { BypassArticleToc } from '@/components/sites/BypassArticleToc';
import { BypassHowToUse } from '@/components/sites/BypassHowToUse';
import { SupportCta } from '@/components/layout/SupportCta';
import { ButtonLink } from '@/components/ui/Button';
import { ChromeIcon, IconArrowLeft, IconChevronRight } from '@/components/ui/icons';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { Shell } from '@/components/ui/Shell';
import { TrackedAnchor } from '@/components/ui/TrackedAnchor';
import {
  actionsRow,
  articleSectionY,
  chip,
  pageHeroY,
  pageTitle,
} from '@/ui-classes/layout';

type BypassDetailPageProps = {
  entry: SupportedBypass;
};

export function BypassDetailPage({ entry }: BypassDetailPageProps): React.ReactElement {
  const { article } = entry;
  const toc: BypassTocItem[] = [
    ...tocFromMarkdown(article.body),
    { id: 'faq', label: 'FAQ' },
    { id: 'supported-websites', label: 'Supported websites' },
    { id: 'how-to-use', label: 'How to use' },
  ];

  return (
    <>
      <section className="relative bg-surface-canvas">
        <HeroBackdrop />
        <Shell className={pageHeroY}>
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="m-0 flex list-none flex-wrap items-center gap-1 p-0 text-caption text-ink-soft">
              <li>
                <AppLink
                  href={routes.home}
                  className="rounded-sm px-1 py-0.5 no-underline transition-colors hover:text-ink"
                >
                  Home
                </AppLink>
              </li>
              <li aria-hidden className="flex items-center text-neutral-300">
                <IconChevronRight className="size-3.5" />
              </li>
              <li>
                <AppLink
                  href={routes.sites}
                  className="rounded-sm px-1 py-0.5 no-underline transition-colors hover:text-ink"
                >
                  Supported Sites
                </AppLink>
              </li>
              <li aria-hidden className="flex items-center text-neutral-300">
                <IconChevronRight className="size-3.5" />
              </li>
              <li className="truncate px-1 py-0.5 text-ink" aria-current="page">
                {entry.name}
              </li>
            </ol>
          </nav>

          <div className="max-w-measure">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <h1 className={pageTitle}>{entry.name} Bypass</h1>
              <p className="rounded-full bg-primary-50 px-2.5 py-0.5 text-caption font-semibold text-primary-700 ring-1 ring-primary-100">
                {entry.bypass}
              </p>
            </div>
            <p className="mt-3 text-body-sm text-ink-body sm:text-body">{article.intro}</p>
          </div>

          <div className={actionsRow}>
            <TrackedAnchor
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              button
              addToChrome="bypass_detail"
            >
              <ChromeIcon className="size-5" />
              Add to Chrome
            </TrackedAnchor>
            <ButtonLink href={routes.sites} variant="ghost">
              <IconArrowLeft className="size-4" />
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
            <BypassArticleMarkdown markdown={article.body} />

            <section id="faq" className={articleSectionY}>
              <h2 className="font-display text-title text-ink">FAQ</h2>
              <div className="mt-5">
                <FaqAccordion items={article.faq} />
              </div>
            </section>

            <section id="supported-websites" className={articleSectionY}>
              <h2 className="font-display text-title text-ink">Supported websites</h2>
              <p className="mt-3 max-w-prose text-body-sm leading-relaxed text-ink-body">
                This {entry.name} bypass runs on the hosts below when Skip Wait is enabled in Chrome.
              </p>
              <ul
                className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0"
                aria-label={`Websites supported for ${entry.name}`}
              >
                {entry.domains.map((domain) => (
                  <li
                    key={domain}
                    className={`${chip} bg-neutral-100 text-ink ring-1 ring-neutral-300`}
                  >
                    {domain}
                  </li>
                ))}
              </ul>
            </section>

            <BypassHowToUse />
          </div>

          <aside className="hidden min-w-0 lg:col-start-2 lg:row-start-1 lg:block">
            <div className="sticky top-24 pt-10 lg:pt-12">
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
