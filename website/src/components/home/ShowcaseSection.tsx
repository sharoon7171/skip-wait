'use client';

import { useEffect, useState } from 'react';
import { LuArrowRight, LuArrowUpRight } from 'react-icons/lu';
import Link from 'next/link';
import { firstBypasses, sampleBypasses, totalBypasses, totalDomains } from '@/data/catalog-queries';
import { routes } from '@/lib/routes';
import { BypassRow } from '@/components/sites/BypassRow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';

const SAMPLE_SIZE = 5;

export function ShowcaseSection(): React.ReactElement {
  const [sample, setSample] = useState(() => firstBypasses(SAMPLE_SIZE));

  useEffect(() => {
    setSample(sampleBypasses(SAMPLE_SIZE));
  }, []);

  return (
    <section className="bg-surface-muted py-20 lg:py-28">
      <Shell>
        <SectionHeader
          title="Link Shortener and Countdown Bypasses from the Catalog"
          description={`${totalBypasses()} bypasses across ${totalDomains()} domains — a random sample below, full list on Supported Sites.`}
        />

        <div className="mt-14 overflow-hidden rounded-panel bg-surface-canvas shadow-sm ring-1 ring-neutral-200">
          <ul className="m-0 list-none divide-y divide-neutral-200 p-0">
            {sample.map((entry) => (
              <li key={entry.name}>
                <Link
                  href={routes.sites}
                  className="group flex items-center gap-4 px-6 py-5 no-underline transition-colors hover:bg-primary-50/60 sm:px-8"
                >
                  <div className="min-w-0 flex-1 [&_h3]:transition-colors group-hover:[&_h3]:text-primary-700">
                    <BypassRow entry={entry} domains="summary" titleAs="h3" />
                  </div>
                  <LuArrowUpRight
                    className="size-4 shrink-0 text-ink-soft transition-colors group-hover:text-primary-600"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={routes.sites}
            className="flex items-center justify-between gap-4 border-t border-neutral-200 px-6 py-5 text-ui text-primary-700 no-underline transition-colors hover:bg-primary-50/60 sm:px-8"
          >
            View All {totalBypasses()} Bypasses Across {totalDomains()} Domains
            <LuArrowRight className="size-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </Shell>
    </section>
  );
}
