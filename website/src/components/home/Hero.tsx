import { totalBypasses, totalDomains } from '@/data/catalog';
import { CHROME_WEB_STORE_URL, FREE, PRICE, SITE } from '@/data/constants';
import { routes } from '@/lib/routes';
import { ButtonLink } from '@/components/ui/Button';
import { ChromeIcon, IconArrowDown, IconArrowRight } from '@/components/ui/icons';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { Shell } from '@/components/ui/Shell';
import { TrackedAnchor } from '@/components/ui/TrackedAnchor';
import { chip, homeHeroShell } from '@/ui-classes/layout';

function HeroVisual(): React.ReactElement {
  return (
    <div className="w-full min-w-0">
      <div className="overflow-hidden rounded-panel bg-surface-canvas shadow-card ring-1 ring-neutral-200/70">
        <div className="flex items-center gap-2 border-b border-neutral-200 bg-surface-muted px-4 py-2.5">
          <span className="flex shrink-0 gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span
            className={`min-w-0 flex-1 truncate rounded-full bg-surface-canvas text-ink-soft ring-1 ring-neutral-200/90 ${chip}`}
          >
            short.link/wait
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 lg:grid-cols-1 lg:gap-0">
          <div className="rounded-card bg-surface-muted px-4 py-4 ring-1 ring-neutral-200/70">
            <p className="text-overline uppercase text-ink-soft">Without</p>
            <p className="mt-2 font-mono text-timer tabular-nums text-neutral-300 line-through decoration-primary-500 decoration-2">
              00:47
            </p>
            <p className="mt-2 text-caption text-ink-soft">Countdown, ads, clicks</p>
          </div>

          <div
            className="hidden items-center justify-center py-3 text-primary-500 lg:flex"
            aria-hidden
          >
            <IconArrowDown className="size-5" />
          </div>

          <div className="relative overflow-hidden rounded-card bg-[linear-gradient(135deg,oklch(0.52_0.24_255)_0%,oklch(0.4_0.2_255)_100%)] px-4 py-4 shadow-button">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-8 size-28 rounded-full bg-[radial-gradient(circle,oklch(1_0_0/0.2)_0%,transparent_70%)]"
            />
            <div className="relative">
              <p className="text-overline uppercase text-primary-200">With {SITE.name}</p>
              <p className="mt-2 font-display text-title text-white sm:text-title-lg">Done for you</p>
              <p className={`mt-2 truncate rounded-full bg-white/15 text-white ring-1 ring-white/20 ${chip}`}>
                destination.example/file
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success-100 px-2.5 py-1 text-caption font-semibold text-success-700">
                <span className="size-1.5 rounded-full bg-success-600" />
                Ready
              </p>
            </div>
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
      <Shell className={homeHeroShell}>
        <div className="min-w-0 text-center lg:text-left">
          <h1 className="font-display text-display text-ink">
            {SITE.name}
            <span className="mt-1.5 block text-primary-600">Bypass Timers. Skip Countdowns.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[42ch] text-body text-ink-body sm:max-w-[46ch] sm:text-lead lg:mx-0">
            Skip Wait skips countdown timers on URL shorteners, waiting pages, and downloads. If a
            site still asks you to wait or click Continue, Skip Wait does that for you.{' '}
            {FREE.dailyLimit} free bypasses each day with no key. A 30-minute trial or {PRICE.summary}{' '}
            removes the daily limit. Works on {totalBypasses()} bypasses across {totalDomains()}{' '}
            websites.
          </p>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
            <TrackedAnchor
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              button
              className="w-full sm:w-auto"
              addToChrome="hero"
            >
              <ChromeIcon className="size-5" />
              Add to Chrome
            </TrackedAnchor>
            <ButtonLink href={routes.sites} variant="ghost" className="w-full sm:w-auto">
              Browse Supported Sites
              <IconArrowRight className="size-4" />
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
