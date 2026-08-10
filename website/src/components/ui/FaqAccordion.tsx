'use client';

import type { ReactNode } from 'react';
import { useId, useState } from 'react';
import { IconChevronRight } from '@/components/ui/icons';

export type FaqAccordionItem = {
  question: string;
  answer: ReactNode;
};

type FaqAccordionProps = {
  items: readonly FaqAccordionItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps): React.ReactElement {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <li key={item.question} className="overflow-hidden rounded-card">
            <button
              type="button"
              id={buttonId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
              className={`flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left outline-none transition-colors sm:px-6 sm:py-5 ${
                open
                  ? 'bg-neutral-200'
                  : 'bg-neutral-100 hover:bg-neutral-200/70'
              }`}
            >
              <span className="min-w-0 flex-1 font-display text-body font-semibold text-ink sm:text-title">
                {item.question}
              </span>
              <IconChevronRight
                className={`size-5 shrink-0 transition-transform ${
                  open ? 'rotate-90 text-ink' : 'text-neutral-400'
                }`}
              />
            </button>
            {open ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="bg-white px-5 py-4 ring-1 ring-neutral-200 ring-inset sm:px-6 sm:py-5"
              >
                <p className="m-0 max-w-prose text-body-sm leading-relaxed text-ink [&_a]:font-medium [&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary-800">
                  {item.answer}
                </p>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
