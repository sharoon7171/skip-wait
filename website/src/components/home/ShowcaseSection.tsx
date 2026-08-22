import { sampleBypasses, totalBypasses, totalDomains } from '@/data/catalog';
import { routes } from '@/lib/routes';
import { AppLink } from '@/components/nav/AppLink';
import { BypassRow } from '@/components/sites/BypassRow';
import { IconArrowRight } from '@/components/ui/icons';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';

const SAMPLE_SIZE = 5;

export function ShowcaseSection(): React.ReactElement {
  const sample = sampleBypasses(SAMPLE_SIZE);

  return (
    <section className="bg-surface-canvas py-12 lg:py-16">
      <Shell>
        <SectionHeader
          title="Link Shortener Bypasses and Wait Automations"
          description={`${totalBypasses()} bypasses across ${totalDomains()} websites—Linkvertise, GPLinks, Ouo, file hosts, and more. Bypass the timer when possible, or finish the wait for you. Full list on Supported Sites.`}
        />

        <div className="mt-8 overflow-hidden rounded-panel bg-surface-muted shadow-sm ring-1 ring-neutral-200">
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

          <AppLink
            href={routes.sites}
            className="flex items-center justify-between gap-4 border-t border-neutral-200 px-6 py-5 text-ui text-primary-700 no-underline transition-colors hover:bg-primary-50/60 sm:px-8"
          >
            View All {totalBypasses()} Bypasses Across {totalDomains()} Websites
            <IconArrowRight className="size-4 shrink-0" />
          </AppLink>
        </div>
      </Shell>
    </section>
  );
}
