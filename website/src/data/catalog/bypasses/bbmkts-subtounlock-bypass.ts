import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'BBMKTS Sub to Unlock';

const bypassType = 'Skip Waiting Page';

const description =
  'BBMKTS Sub to Unlock bypass clears SUB TO UNLOCK subscribe waits and unlocks so Skip Wait opens the destination without Sub + Like + Cmt delays.';

const domains = ['bbmkts.com'] as const;

const keywords = [
  'bbmkts subtounlock bypass',
  'bbmkts sub to unlock bypass',
  'sub to unlock bypass',
  'subtounlock bypass',
  'bbmkts unlock bypass',
  'sub + like + cmt bypass',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'skip wait extension',
  'please wait bypass',
  'waiting page bypass',
  'social unlock bypass',
] as const;

const intro =
  'BBMKTS Sub to Unlock pages open with a SUB TO UNLOCK card, Join Discord / Sub + Like + Cmt rows, and a locked UNLOCK control. Skip Wait is the $1.50/month Chrome extension that clears those waits on supported subtounlock links.';

const body = `## Subscribe rows that only delay UNLOCK

[BBMKTS](https://bbmkts.com/) Sub to Unlock shares land on Unlock 1 with fake checking timers on Join Discord and Sub + Like + Cmt. After those delays the page enables UNLOCK, which usually opens Unlock 2 for another wait before the real destination.

None of those rows verify a subscription in the browser. They burn ten-plus seconds of theater, then continue. That checklist is the pain—not a captcha wall.

### What sits on the locker

- SUB TO UNLOCK title and step buttons
- Join Discord and Sub + Like + Cmt “Đang kiểm tra…” delays
- Locked UNLOCK until the client timers finish
- A second Unlock 2 wait before the destination

## Opening the destination from the locker

Skip Wait runs on supported BBMKTS subtounlock pages, skips the subscribe busywork, and opens the destination the locker already holds for that id. You stay on the tab with an overlay until the link loads.

No paste tool and no social checklist—just the Sub to Unlock path at $1.50/month after license activation.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does BBMKTS Sub to Unlock bypass clear?',
    answer:
      'The SUB TO UNLOCK subscribe rows and unlock waits so you are not stuck on Sub + Like + Cmt checking delays.',
  },
  {
    question: 'Do I still Join Discord or Sub + Like + Cmt?',
    answer:
      'No on supported pages. Skip Wait unlocks without completing those social steps.',
  },
  {
    question: 'Does Unlock 2 still appear?',
    answer:
      'Skip Wait targets the destination from the locker id, so you are not babysitting Unlock 2 timers.',
  },
  {
    question: 'How much does this path cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. BBMKTS Sub to Unlock runs on supported subtounlock links.',
  },
];

export const bypass = {
  name,
  bypass: bypassType,
  description,
  domains,
  keywords,
  article: {
    intro,
    body,
    faq,
  },
} satisfies SupportedBypass;
