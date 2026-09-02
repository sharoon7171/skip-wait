import { bypassHowToSteps } from '@/data/catalog';
import { CHROME_WEB_STORE_URL, EAS_STORE_URL, FREE, LICENSE } from '@/data/constants';
import { routes } from '@/lib/routes';
import { AppLink } from '@/components/nav/AppLink';
import { ButtonLink } from '@/components/ui/Button';
import { ChromeIcon, IconArrowRight } from '@/components/ui/icons';
import { TrackedAnchor } from '@/components/ui/TrackedAnchor';
import { actionsRow, articleSectionY, stackAfterHeader } from '@/ui-classes/layout';

const linkClassName =
  'font-medium text-primary-700 underline decoration-primary-200 underline-offset-2 transition-colors hover:text-primary-800 hover:decoration-primary-500';

function stepBody(index: number, fallback: string): React.ReactNode {
  if (index === 0) {
    return (
      <>
        Add Skip Wait from the{' '}
        <a
          href={CHROME_WEB_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          Chrome Web Store
        </a>
        . You get {FREE.dailyLimit} free bypasses each day with no key. Skip Wait then runs on matching
        pages. For unlimited use, get a {LICENSE.trialLabel.toLowerCase()} or monthly license on{' '}
        <a
          href={EAS_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          EAS Store
        </a>
        , paste the key in the popup, and tap Activate.
      </>
    );
  }
  if (index === 2) {
    return (
      <>
        Use the same shared URL from chat, a download page, or a site. No paste tool. See all hosts
        on{' '}
        <AppLink href={routes.sites} className={linkClassName}>
          supported sites
        </AppLink>
        .
      </>
    );
  }
  return fallback;
}

export function BypassHowToUse(): React.ReactElement {
  return (
    <section
      id="how-to-use"
      className={`${articleSectionY} lg:border-b-0 lg:pb-0`}
    >
      <h2 className="font-display text-title text-ink">How to use</h2>
      <p className="mt-3 max-w-prose text-body-sm leading-relaxed text-ink-body">
        Same steps for every bypass. Install once—{FREE.dailyLimit} free bypasses per day with no
        key—then open links the way you already do.
      </p>

      <ol className={`m-0 list-none space-y-6 p-0 ${stackAfterHeader}`}>
        {bypassHowToSteps.map((step, index) => (
          <li
            key={step.title}
            className="grid max-w-prose grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 sm:gap-x-5"
          >
            <span
              aria-hidden
              className="font-display text-metric font-extrabold text-neutral-300 tabular-nums"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 pt-1">
              <h3 className="font-display text-title text-ink">{step.title}</h3>
              <p className="mt-1.5 text-body-sm leading-relaxed text-ink">
                {stepBody(index, step.body)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className={actionsRow}>
        <TrackedAnchor
          href={CHROME_WEB_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          button
          addToChrome="bypass_detail"
        >
          <ChromeIcon className="size-5" />
          Add to Chrome
        </TrackedAnchor>
        <ButtonLink href={routes.sites} variant="ghost">
          All supported sites
          <IconArrowRight className="size-4" />
        </ButtonLink>
      </div>
    </section>
  );
}
