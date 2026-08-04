'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  searchCatalog,
  totalBypasses,
  totalDomains,
} from '@/data/catalog-queries';
import { SupportCta } from '@/components/home/SupportCta';
import { BypassRow } from '@/components/sites/BypassRow';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { IconSearch } from '@/components/ui/Icons';
import { Shell } from '@/components/ui/Shell';
import { trackSearch } from '@/lib/analytics';

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
        { value: String(totalBypasses()), label: 'Sites' },
        { value: String(totalDomains()), label: 'Websites' },
      ];

  return (
    <>
      <section className="relative bg-surface-canvas">
        <HeroBackdrop />
        <Shell className="relative py-8 sm:py-10 lg:py-12">
          <div className="max-w-xl">
            <h1 className="font-display text-title-lg text-ink sm:text-headline">
              Supported Sites — Bypass & Automate Countdowns
            </h1>
            <p className="mt-2 text-body-sm text-ink-body">
              Looking for a Linkvertise bypass, GPLinks bypass, Ouo bypass, or another short-link /
              download countdown skip? Search by site name or website address—Skip Wait bypasses the
              timer when it can, or finishes the wait for you when it can’t.
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
                className="h-12 w-full rounded-full bg-surface-muted pr-4 pl-10 text-body-sm text-ink ring-1 ring-neutral-300 outline-none placeholder:text-ink-soft focus:ring-2 focus:ring-primary-500"
              />
            </label>

            <dl className="m-0 flex shrink-0 overflow-hidden rounded-full bg-surface-canvas shadow-sm ring-1 ring-neutral-200">
              {countStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline gap-2 border-r border-neutral-200 px-5 py-3 last:border-r-0"
                >
                  <dd className="m-0 font-display text-title text-primary-700">{stat.value}</dd>
                  <dt className="text-caption text-ink-soft">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Shell>
      </section>

      <section className="bg-surface-canvas py-10 lg:py-14">
        <Shell>
          <div className="overflow-hidden rounded-panel bg-surface-canvas shadow-sm ring-1 ring-neutral-200">
            {results.length > 0 ? (
              <ul className="m-0 list-none divide-y divide-neutral-200 p-0">
                {results.map((entry) => (
                  <li key={entry.name}>
                    <BypassRow entry={entry} linked className="px-6 py-5 sm:px-8" />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center px-6 py-16 text-center">
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
