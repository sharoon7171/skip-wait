import { totalBypasses, totalDomains } from '@/data/catalog';
import { FREE } from '@/data/constants';
import { Shell } from '@/components/ui/Shell';
import { bandY } from '@/ui-classes/layout';
import { bandGradient } from '@/ui-classes/surfaces';

const stats = [
  { value: String(totalBypasses()), label: 'Bypasses' },
  { value: String(totalDomains()), label: 'Websites Covered' },
  { value: String(FREE.dailyLimit), label: 'Free Bypasses / Day' },
] as const;

export function StatsBand(): React.ReactElement {
  return (
    <section className={bandGradient}>
      <Shell className={bandY}>
        <ul className="m-0 grid list-none grid-cols-1 divide-y divide-white/10 p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center py-5 text-center first:pt-0 last:pb-0 sm:px-6 sm:py-0"
            >
              <span className="block h-1 w-8 rounded-full bg-primary-400" />
              <p className="mt-4 font-display text-metric tabular-nums text-ink-inverse">{stat.value}</p>
              <p className="mt-1.5 text-caption text-ink-inverse-soft">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
