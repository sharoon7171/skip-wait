import type { ReactNode } from 'react';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { Shell } from '@/components/ui/Shell';

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
        <Shell className="relative py-8 sm:py-10 lg:py-12">
          <div className="max-w-xl">
            <h1 className="font-display text-title-lg text-ink sm:text-headline">{title}</h1>
            <p className="mt-2 text-caption text-ink-soft">Last updated: {formatUpdatedDate(updated)}</p>
            <p className="mt-4 text-body-sm text-ink-body">{summary}</p>
          </div>
        </Shell>
      </section>

      <section className="bg-surface-canvas pb-16 lg:pb-20">
        <Shell>
          <div className="divide-y divide-neutral-200 border-t border-neutral-200 text-body-sm leading-relaxed text-ink-body [&_a]:font-medium [&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded-sm [&_code]:bg-surface-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-caption [&_code]:text-ink [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-ui [&_h3]:font-bold [&_h3]:text-ink [&_h3:first-child]:mt-0 [&_li+li]:mt-2 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-3 [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
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
    <section className="py-8 sm:py-9">
      <h2 className="font-display text-title text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

type LegalSubheadingProps = {
  children: ReactNode;
};

export function LegalSubheading({ children }: LegalSubheadingProps): React.ReactElement {
  return <h3>{children}</h3>;
}
