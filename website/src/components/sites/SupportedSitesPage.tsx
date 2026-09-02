'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  searchCatalog,
  totalBypasses,
  totalDomains,
} from '@/data/catalog';
import { SupportCta } from '@/components/layout/SupportCta';
import { BypassRow } from '@/components/sites/BypassRow';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { IconSearch } from '@/components/ui/icons';
import { Shell } from '@/components/ui/Shell';
import { trackSearch } from '@/lib/analytics';
import {
  emptyStateY,
  listRowPad,
  pageHeroY,
  pageLead,
  pageTitle,
  sectionY,
} from '@/ui-classes/layout';

export function SupportedSitesPage(): React.ReactElement {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const term = query.trim();
    if (!term) return;
    const id = window.setTimeout(() => trackSearch(term), 500);
    return () => window.clearTimeout(id);
  }, [query]);

  const results = useMemo(() => searchCatalog(query), [query]);
  const visibleDomains = results.reduce((total, entry) => total + entry.domains.length, 0);
  const filtering = query.trim().length > 0;
  const countStats = filtering
    ? [
        { value: String(results.length), label: results.length === 1 ? 'Match' : 'Matches' },
        {
          value: String(visibleDomains),
          label: visibleDomains === 1 ? 'Website' : 'Websites',
        },
      ]
    : [
        { value: String(totalBypasses()), label: 'Bypasses' },
        { value: String(totalDomains()), label: 'Websites' },
      ];

  return (
    <>
      <section className="relative bg-surface-canvas">
        <HeroBackdrop />
        <Shell className={pageHeroY}>
          <div className="max-w-copy">
            <h1 className={pageTitle}>Supported Sites — Countdown Bypass & URL Shorteners</h1>
            <p className={pageLead}>
              Search Linkvertise, GPLinks, Ouo, or another countdown, waiting page, or URL
              shortener. Skip Wait skips the timer when it can. If the site still needs Continue, it
              clicks that for you.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block min-w-0 w-full sm:max-w-md sm:flex-1">
              <IconSearch
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-soft"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Linkvertise bypass, gplinks.co, ouo.io…"
                className="h-11 w-full rounded-full bg-surface-muted pr-4 pl-10 text-body-sm text-ink shadow-buttonSoft ring-1 ring-neutral-200/90 outline-none placeholder:text-ink-soft transition-all focus:bg-white focus:ring-2 focus:ring-primary-500/35"
              />
            </label>

            <dl className="m-0 flex shrink-0 overflow-hidden rounded-full bg-surface-canvas shadow-buttonSoft ring-1 ring-neutral-200/70">
              {countStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline gap-2 border-r border-neutral-200 px-5 py-2.5 last:border-r-0"
                >
                  <dd className="m-0 font-display text-title tabular-nums text-primary-700">
                    {stat.value}
                  </dd>
                  <dt className="text-caption text-ink-soft">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Shell>
      </section>

      <section className={`bg-surface-canvas ${sectionY}`}>
        <Shell>
          <div className="overflow-hidden rounded-panel bg-surface-canvas shadow-card ring-1 ring-neutral-200/70">
            {results.length > 0 ? (
              <ul className="m-0 list-none divide-y divide-neutral-200 p-0">
                {results.map((entry) => (
                  <li key={entry.name}>
                    <BypassRow entry={entry} linked className={listRowPad} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className={`flex flex-col items-center text-center ${emptyStateY}`}>
                <p className="font-display text-title text-ink">
                  No Matches for “{query.trim()}”.
                </p>
                <p className="mt-2 text-body-sm text-ink-body">
                  Try another site name or website address—or request support if we don’t have it yet.
                </p>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-primary-600 px-5 text-ui text-white transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </Shell>
      </section>

      <SupportCta />
    </>
  );
}
