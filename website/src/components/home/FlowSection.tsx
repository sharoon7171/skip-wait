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
    title: 'Open Any Supported Link',
    body: 'Click link shorteners, safelinks, file hosts, and download countdown pages the same way you always do.',
    tone: 'bg-warning-100 text-warning-700',
  },
  {
    number: '03',
    title: 'Bypass or Automate',
    body: 'Skip Wait bypasses the timer when possible, or automates the wait and continue steps when the site still requires them—then lands you on the destination.',
    tone: 'bg-success-100 text-success-700',
  },
];

export function FlowSection(): React.ReactElement {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-surface-canvas py-12 lg:py-16">
      <Shell>
        <SectionHeader
          title="How to Skip Countdown Timers and Waiting Pages"
          description="Skip Wait stays idle everywhere else—it only runs on countdown, short-link, and delay pages it recognizes, then bypasses or automates the flow."
        />

        <ol className="mt-8 grid list-none gap-5 p-0 lg:grid-cols-3">
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
              <h3 className="mt-5 font-display text-title-lg text-ink">{step.title}</h3>
              <p className="mt-3 text-body-sm text-ink-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </Shell>
    </section>
  );
}
