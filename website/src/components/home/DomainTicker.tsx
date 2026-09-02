import { shuffledDomains } from '@/data/catalog';

export function DomainTicker(): React.ReactElement {
  const domains = shuffledDomains();
  const marqueeSeconds = Math.round(domains.length * 0.95);

  return (
    <div aria-hidden className="overflow-hidden border-y border-primary-800 bg-[linear-gradient(90deg,oklch(0.48_0.24_255)_0%,oklch(0.42_0.22_255)_55%,oklch(0.36_0.18_255)_100%)] py-3">
      <div
        className="flex w-max animate-marquee motion-reduce:animate-none"
        style={{ animationDuration: `${marqueeSeconds}s` }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 list-none items-center p-0">
            {domains.map((domain) => (
              <li
                key={`${copy}-${domain}`}
                className="flex items-center gap-6 pr-6 font-mono text-domain font-semibold tracking-[0.1em] whitespace-nowrap text-white uppercase"
              >
                {domain}
                <span className="text-white/45">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
