import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';

const steps: readonly { number: string; title: string; body: string; tone: string }[] = [
  {
    number: '01',
    title: 'Install Once',
    body: 'Add Skip Wait from the Chrome Web Store. No account, no settings, nothing to configure.',
    tone: 'bg-primary-100 text-primary-700',
  },
  {
    number: '02',
    title: 'Open Any Short Link',
    body: 'Click link shorteners, file hosts, and download pages the same way you always do.',
    tone: 'bg-warning-100 text-warning-700',
  },
  {
    number: '03',
    title: 'Skip the Countdown',
    body: 'On supported pages, Skip Wait bypasses the timer, skips the waiting page, and lands you on the destination.',
    tone: 'bg-success-100 text-success-700',
  },
];

export function FlowSection(): React.ReactElement {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-surface-canvas py-20 lg:py-28">
      <Shell>
        <SectionHeader
          title="How to Bypass Link Shorteners in Three Steps"
          description="Skip Wait stays idle everywhere else — it only runs on countdown and short-link pages it recognizes."
        />

        <ol className="mt-14 grid list-none gap-5 p-0 lg:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="rounded-panel bg-surface-muted p-8 shadow-sm ring-1 ring-neutral-200"
            >
              <span
                className={`inline-flex size-11 items-center justify-center rounded-full text-caption font-bold ${step.tone}`}
              >
                {step.number}
              </span>
              <h3 className="mt-8 font-display text-title-lg text-ink">{step.title}</h3>
              <p className="mt-3 text-body-sm text-ink-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </Shell>
    </section>
  );
}
