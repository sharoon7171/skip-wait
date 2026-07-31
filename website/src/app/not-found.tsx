import type { Metadata } from 'next';
import { routes } from '@/lib/routes';
import { ButtonLink } from '@/components/ui/Button';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { Shell } from '@/components/ui/Shell';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound(): React.ReactElement {
  return (
    <section className="relative bg-surface-canvas">
      <HeroBackdrop />
      <Shell className="relative flex flex-col items-center py-20 text-center sm:py-28 lg:py-32">
        <p className="text-overline uppercase text-primary-600">404</p>
        <h1 className="mt-3 font-display text-headline text-ink">Page Not Found</h1>
        <p className="mt-4 max-w-md text-body-sm text-ink-body">
          That URL isn’t part of Skip Wait. Head home or browse the supported countdown and
          short-link flows.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={routes.home}>Back to Home</ButtonLink>
          <ButtonLink href={routes.sites} variant="ghost">
            Supported Sites
          </ButtonLink>
        </div>
      </Shell>
    </section>
  );
}
