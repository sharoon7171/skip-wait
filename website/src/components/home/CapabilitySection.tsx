import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';
import { cardGrid2, cardPad, sectionY } from '@/ui-classes/layout';
import { cardBlueHover, cardGreenHover } from '@/ui-classes/surfaces';

const capabilities: readonly {
  title: string;
  body: string;
  surface: string;
}[] = [
  {
    title: 'Skip the Timer',
    body: 'On supported sites, Skip Wait skips countdown timers, waiting pages, and URL shortener redirects so the destination or download opens right away.',
    surface: cardBlueHover,
  },
  {
    title: 'Click Continue for You',
    body: 'Some sites still need a wait or a Continue click. Skip Wait waits and clicks those steps so you don’t sit on the page.',
    surface: cardGreenHover,
  },
];

export function CapabilitySection(): React.ReactElement {
  return (
    <section className={`bg-surface-muted ${sectionY}`}>
      <Shell>
        <SectionHeader
          title="Skip Countdowns. Click Continue for You."
          description="Skip Wait bypasses timers, skips waiting pages, and bypasses URL shorteners. If a site still needs a short wait or Continue, Skip Wait does those steps."
        />

        <ul className={cardGrid2}>
          {capabilities.map((item) => (
            <li key={item.title} className={`${item.surface} ${cardPad}`}>
              <h3 className="font-display text-title text-ink sm:text-title-lg">{item.title}</h3>
              <p className="mt-2 text-body-sm text-ink-body">{item.body}</p>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
