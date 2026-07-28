import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';

const capabilities: readonly { title: string; body: string }[] = [
  {
    title: 'Bypass When Possible',
    body: 'Skip countdown timers, waiting pages, and link shortener redirects. On supported sites Skip Wait jumps straight to the destination or download as soon as the page loads.',
  },
  {
    title: 'Automate When Required',
    body: 'When a site still needs a timed unlock, Skip Wait automates the wait, continue clicks, and unlock steps so you don’t babysit the page—and still get there faster.',
  },
];

export function CapabilitySection(): React.ReactElement {
  return (
    <section className="bg-surface-muted py-12 lg:py-16">
      <Shell>
        <SectionHeader
          title="Bypass Countdowns or Automate the Wait"
          description="People search for timer skips and link shortener bypasses—and for tools that finish “please wait” flows when a full skip isn’t allowed. Skip Wait does both."
        />

        <ul className="mt-8 m-0 grid list-none gap-5 p-0 lg:grid-cols-2">
          {capabilities.map((item) => (
            <li
              key={item.title}
              className="rounded-panel bg-surface-canvas p-8 shadow-sm ring-1 ring-neutral-200"
            >
              <h3 className="font-display text-title-lg text-ink">{item.title}</h3>
              <p className="mt-3 text-body-sm text-ink-body">{item.body}</p>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
