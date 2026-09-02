import { sampleBypasses, totalBypasses, totalDomains } from '@/data/catalog';
import { routes } from '@/lib/routes';
import { AppLink } from '@/components/nav/AppLink';
import { BypassRow } from '@/components/sites/BypassRow';
import { IconArrowRight } from '@/components/ui/icons';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';
import { listRowPad, sectionY, stackAfterHeader } from '@/ui-classes/layout';

const SAMPLE_SIZE = 5;

export function ShowcaseSection(): React.ReactElement {
  const sample = sampleBypasses(SAMPLE_SIZE);

  return (
    <section className={`bg-surface-canvas ${sectionY}`}>
      <Shell>
        <SectionHeader
          title="URL Shortener Bypasses and Countdown Skips"
          description={`${totalBypasses()} bypasses across ${totalDomains()} websites—Linkvertise, GPLinks, Ouo, file hosts, safelinks, and more. Skip Wait skips the countdown when it can. If the site still needs Continue, it clicks that for you.`}
        />

        <div
          className={`${stackAfterHeader} overflow-hidden rounded-panel bg-surface-canvas shadow-card ring-1 ring-neutral-200/70`}
        >
          <ul className="m-0 list-none divide-y divide-neutral-200 p-0">
            {sample.map((entry) => (
              <li key={entry.name}>
                <BypassRow
                  entry={entry}
                  domains="summary"
                  titleAs="h3"
                  linked
                  className={listRowPad}
                />
              </li>
            ))}
          </ul>

          <AppLink
            href={routes.sites}
            className={`flex items-center justify-between gap-4 border-t border-neutral-200 text-ui text-primary-700 no-underline transition-colors hover:bg-primary-50/70 ${listRowPad}`}
          >
            View All {totalBypasses()} Bypasses Across {totalDomains()} Websites
            <IconArrowRight className="size-4 shrink-0" />
          </AppLink>
        </div>
      </Shell>
    </section>
  );
}
