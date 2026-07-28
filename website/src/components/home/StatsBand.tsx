import { totalBypasses, totalDomains } from '@/data/catalog-queries';
import { Shell } from '@/components/ui/Shell';

const stats = [
  { value: String(totalBypasses()), label: 'Supported Sites' },
  { value: String(totalDomains()), label: 'Websites Covered' },
  { value: 'Free', label: 'Chrome Extension, No Account' },
] as const;

export function StatsBand(): React.ReactElement {
  return (
    <section className="bg-primary-950">
      <Shell className="py-10 sm:py-12 lg:py-14">
        <ul className="m-0 grid list-none grid-cols-1 divide-y divide-white/10 p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center py-6 text-center first:pt-0 last:pb-0 sm:px-8 sm:py-0"
            >
              <span className="block h-1 w-8 rounded-full bg-primary-400" />
              <p className="mt-5 font-display text-metric text-ink-inverse">{stat.value}</p>
              <p className="mt-2 text-caption text-ink-inverse-soft">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
