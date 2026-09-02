import type { ReactNode } from 'react';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { Shell } from '@/components/ui/Shell';
import { legalSectionY, pageHeroY, pageLead, pageTitle } from '@/ui-classes/layout';

type LegalPageProps = {
  title: string;
  updated: string;
  summary: string;
  children: ReactNode;
};

function formatUpdatedDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year!, month! - 1, day!).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function LegalPage({
  title,
  updated,
  summary,
  children,
}: LegalPageProps): React.ReactElement {
  return (
    <>
      <section className="relative bg-surface-canvas">
        <HeroBackdrop />
        <Shell className={pageHeroY}>
          <div className="max-w-copy">
            <h1 className={pageTitle}>{title}</h1>
            <p className="mt-2 text-caption text-ink-soft">
              Last updated: {formatUpdatedDate(updated)}
            </p>
            <p className={pageLead}>{summary}</p>
          </div>
        </Shell>
      </section>

      <section className="bg-surface-canvas pb-16 lg:pb-20">
        <Shell>
          <div className="divide-y divide-neutral-200 border-t border-neutral-200 text-body-sm leading-relaxed text-ink-body [&_a]:font-medium [&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded-sm [&_code]:bg-surface-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-domain [&_code]:text-ink [&_h3]:mt-5 [&_h3]:font-display [&_h3]:text-ui [&_h3]:font-bold [&_h3]:text-ink [&_h3:first-child]:mt-0 [&_p]:mt-3 [&_p:first-child]:mt-0 [&_section>div>ol]:mt-3 [&_section>div>ol]:list-decimal [&_section>div>ol]:pl-5 [&_section>div>ol>li+li]:mt-2 [&_section>div>ul]:mt-3 [&_section>div>ul]:list-disc [&_section>div>ul]:pl-5 [&_section>div>ul>li+li]:mt-2 [&_strong]:font-semibold [&_strong]:text-ink">
            {children}
          </div>
        </Shell>
      </section>
    </>
  );
}

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export function LegalSection({ title, children }: LegalSectionProps): React.ReactElement {
  return (
    <section className={legalSectionY}>
      <h2 className="font-display text-title text-ink">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

type LegalSubheadingProps = {
  children: ReactNode;
};

export function LegalSubheading({ children }: LegalSubheadingProps): React.ReactElement {
  return <h3>{children}</h3>;
}
