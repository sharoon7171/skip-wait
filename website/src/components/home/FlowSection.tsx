import { FREE } from '@/data/constants';
import { homeHash } from '@/lib/routes';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';
import { cardGrid3, cardPad, sectionY } from '@/ui-classes/layout';
import { cardNeutralHover, stepBadgeSolid } from '@/ui-classes/surfaces';

const steps: readonly { number: string; title: string; body: string; tone: string }[] = [
  {
    number: '01',
    title: 'Install Once',
    body: `Add Skip Wait from the Chrome Web Store. ${FREE.dailyLimit} free bypasses each day start with no key. Tap Refresh in the popup when we add new sites—no reinstall.`,
    tone: 'bg-primary-600',
  },
  {
    number: '02',
    title: 'Open Any Supported Link',
    body: 'Open URL shorteners, safelinks, file hosts, waiting pages, and download countdown pages the same way you always do.',
    tone: 'bg-warning-600',
  },
  {
    number: '03',
    title: 'Skip or Continue for You',
    body: 'Skip Wait skips the timer when it can. If the site still needs a wait or Continue, Skip Wait handles those clicks, then opens the destination.',
    tone: 'bg-success-600',
  },
];

export function FlowSection(): React.ReactElement {
  return (
    <section id={homeHash.howItWorks} className={`scroll-mt-20 bg-surface-canvas ${sectionY}`}>
      <Shell>
        <SectionHeader
          title="How to Skip Countdown Timers and Waiting Pages"
          description="Skip Wait only runs on supported countdown, URL shortener, and waiting pages. Other sites stay unchanged."
        />

        <ol className={cardGrid3}>
          {steps.map((step) => (
            <li key={step.number} className={`${cardNeutralHover} ${cardPad}`}>
              <span className={`${stepBadgeSolid} ${step.tone}`}>{step.number}</span>
              <h3 className="mt-4 font-display text-title text-ink sm:text-title-lg">{step.title}</h3>
              <p className="mt-2 text-body-sm text-ink-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </Shell>
    </section>
  );
}
