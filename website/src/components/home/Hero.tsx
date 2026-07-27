import { LuArrowDown, LuArrowRight } from 'react-icons/lu';
import { totalBypasses, totalDomains } from '@/data/catalog-queries';
import { CHROME_WEB_STORE_URL, SITE } from '@/data/constants';
import { routes } from '@/lib/routes';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { ChromeIcon } from '@/components/ui/ChromeIcon';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { Shell } from '@/components/ui/Shell';

function HeroVisual(): React.ReactElement {
  return (
    <div className="w-full min-w-0">
      <div className="overflow-hidden rounded-panel bg-surface-canvas shadow-xl shadow-primary-950/10 ring-1 ring-neutral-200">
        <div className="flex items-center gap-2 border-b border-neutral-200 bg-surface-muted px-3 py-2.5 sm:px-4 sm:py-3">
          <span className="flex shrink-0 gap-1.5">
            <span className="size-2 rounded-full bg-[#ff5f57] sm:size-2.5" />
            <span className="size-2 rounded-full bg-[#febc2e] sm:size-2.5" />
            <span className="size-2 rounded-full bg-[#28c840] sm:size-2.5" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-full bg-surface-canvas px-3 py-1 font-mono text-domain text-ink-soft ring-1 ring-neutral-200">
            short.link/wait
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 p-3 sm:gap-4 sm:p-5 lg:grid-cols-1 lg:gap-0">
          <div className="rounded-card bg-surface-muted px-3 py-4 ring-1 ring-neutral-200 sm:px-4 sm:py-5">
            <p className="text-overline uppercase text-ink-soft">Without</p>
            <p className="mt-2 font-mono text-[1.75rem] font-semibold leading-none tracking-tight text-neutral-300 line-through decoration-primary-500 decoration-2 sm:mt-3 sm:text-[2.25rem]">
              00:47
            </p>
            <p className="mt-2 text-caption text-ink-soft sm:mt-3">Countdown, ads, clicks</p>
          </div>

          <div
            className="hidden items-center justify-center py-3 text-primary-500 lg:flex"
            aria-hidden
          >
            <LuArrowDown className="size-5" />
          </div>

          <div className="rounded-card bg-primary-600 px-3 py-4 sm:px-4 sm:py-5">
            <p className="text-overline uppercase text-primary-100">With {SITE.name}</p>
            <p className="mt-2 font-display text-title text-white sm:mt-3 sm:text-title-lg">
              Redirected
            </p>
            <p className="mt-2 truncate rounded-full bg-white/15 px-2.5 py-1 font-mono text-domain text-white sm:mt-3 sm:px-3 sm:py-1.5">
              destination.example/file
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success-100 px-2.5 py-1 text-caption font-semibold text-success-700 sm:mt-4 sm:px-3 sm:py-1.5">
              <span className="size-1.5 rounded-full bg-success-600" />
              Timer Skipped
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero(): React.ReactElement {
  return (
    <section className="relative bg-surface-canvas">
      <HeroBackdrop />
      <Shell className="relative grid items-center gap-10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="min-w-0 text-center lg:text-left">
          <h1 className="font-display text-display text-ink">
            {SITE.name}
            <span className="mt-1 block text-primary-600 sm:mt-2">
              Bypass Countdown Timers.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-[40ch] text-body text-ink-body sm:mt-6 sm:max-w-[44ch] sm:text-lead lg:mx-0">
            Free Chrome extension that skips waiting pages and link shortener redirects on{' '}
            {totalBypasses()} supported bypasses across {totalDomains()} domains — as soon as the
            page loads.
          </p>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
            <ButtonAnchor
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <ChromeIcon className="size-5" />
              Add to Chrome
            </ButtonAnchor>
            <ButtonLink href={routes.sites} variant="ghost" className="w-full sm:w-auto">
              Browse Supported Sites
              <LuArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>

        <div className="mx-auto min-w-0 w-full max-w-lg lg:mx-0 lg:max-w-none">
          <HeroVisual />
        </div>
      </Shell>
    </section>
  );
}
