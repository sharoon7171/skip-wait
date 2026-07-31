'use client';

import { useId, useState } from 'react';

type FaqAccordionItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: readonly FaqAccordionItem[];
  questionClassName?: string;
};

export function FaqAccordion({
  items,
  questionClassName = 'font-display text-title text-ink',
}: FaqAccordionProps): React.ReactElement {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <li key={item.question}>
            <div
              className={`rounded-panel bg-surface-muted shadow-sm ring-1 ${
                open ? 'ring-primary-200' : 'ring-neutral-200'
              }`}
            >
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              >
                <span className={questionClassName}>{item.question}</span>
                <span
                  aria-hidden
                  className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-caption font-bold text-primary-700 transition-transform ${
                    open ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {open ? (
                <div id={panelId} role="region" aria-labelledby={buttonId} className="px-5 pb-4 sm:px-6 sm:pb-5">
                  <p className="m-0 max-w-prose text-body-sm text-ink-body">{item.answer}</p>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
