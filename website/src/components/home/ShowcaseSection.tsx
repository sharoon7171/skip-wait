'use client';

import { useEffect, useState } from 'react';
import { LuArrowRight } from 'react-icons/lu';
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
    <section className="bg-surface-muted py-12 lg:py-16">
      <Shell>
        <SectionHeader
          title="Link Shortener Bypasses and Wait Automations"
          description={`${totalBypasses()} sites across ${totalDomains()} websites—Linkvertise, GPLinks, Ouo, file hosts, and more. Bypass the timer when possible, or finish the wait for you. Full list on Supported Sites.`}
        />

        <div className="mt-8 overflow-hidden rounded-panel bg-surface-canvas shadow-sm ring-1 ring-neutral-200">
          <ul className="m-0 list-none divide-y divide-neutral-200 p-0">
            {sample.map((entry) => (
              <li key={entry.name}>
                <BypassRow
                  entry={entry}
                  domains="summary"
                  titleAs="h3"
                  linked
                  className="px-6 py-5 sm:px-8"
                />
              </li>
            ))}
          </ul>

          <Link
            href={routes.sites}
            className="flex items-center justify-between gap-4 border-t border-neutral-200 px-6 py-5 text-ui text-primary-700 no-underline transition-colors hover:bg-primary-50/60 sm:px-8"
          >
            View All {totalBypasses()} Sites Across {totalDomains()} Websites
            <LuArrowRight className="size-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </Shell>
    </section>
  );
}
