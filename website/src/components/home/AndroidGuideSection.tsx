import { routes } from '@/lib/routes';
import { ButtonLink } from '@/components/ui/Button';
import { IconArrowRight } from '@/components/ui/icons';
import { Shell } from '@/components/ui/Shell';

export function AndroidGuideSection(): React.ReactElement {
  return (
    <section className="bg-primary-950">
      <Shell className="flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:gap-10 lg:py-14">
        <div className="max-w-xl">
          <p className="text-overline uppercase text-primary-300">Android</p>
          <h2 className="mt-2 font-display text-title-lg text-ink-inverse sm:text-headline">
            Also works on Android
          </h2>
          <p className="mt-3 text-body-sm text-ink-inverse-body">
            Chrome for Android cannot run store extensions. Install Skip Wait in Quetta Browser
            instead—Android only.
          </p>
        </div>
        <ButtonLink href={routes.guidesAndroid} variant="light" className="shrink-0">
          Android install guide
          <IconArrowRight className="size-4" />
        </ButtonLink>
      </Shell>
    </section>
  );
}
