'use client';

import { useEffect, useState } from 'react';
import { allDomains, shuffledDomains } from '@/data/catalog-queries';

export function DomainTicker(): React.ReactElement {
  const [domains, setDomains] = useState(allDomains);

  useEffect(() => {
    setDomains(shuffledDomains());
  }, []);

  const marqueeSeconds = Math.round(domains.length * 0.95);

  return (
    <div aria-hidden className="overflow-hidden border-y border-primary-700 bg-primary-600 py-3.5">
      <div
        className="flex w-max animate-marquee motion-reduce:animate-none"
        style={{ animationDuration: `${marqueeSeconds}s` }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 list-none items-center p-0">
            {domains.map((domain) => (
              <li
                key={`${copy}-${domain}`}
                className="flex items-center gap-7 pr-7 font-mono text-caption font-medium tracking-[0.06em] whitespace-nowrap text-white uppercase"
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
