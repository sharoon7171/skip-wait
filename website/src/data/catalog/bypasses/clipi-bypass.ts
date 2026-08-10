import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Clipi';

const bypassType = 'Skip Waiting Page';

const description =
  'Clipi bypass that clears the short link waiting page on this URL shortener and sends you to the long destination without continue loops.';

const domains = ['clipi.cc'] as const;

const keywords = [
  'clipi bypass',
  'Clipi bypass extension',
  'clipi bypass chrome',
  'bypass clipi',
  'skip clipi',
  'clipi timer bypass',
  'clipi waiting page',
  'clipi short link bypass',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
  'please wait bypass',
  'waiting page bypass',
  'skip click to continue',
  'url shortener waiting page',
] as const;

const intro =
  'A Clipi bypass search usually means a compact short URL still parks you on a waiting page before the long destination. Skip Wait is the free Chrome extension that clears that gate and redirects when unlock is ready—without continue hunting.';

const body = `## Compact short URLs with a stall screen

Clipi shares look tiny in a chat, then open a please-wait or click-to-continue screen instead of the long URL. Refresh too soon and the same waiting page bypass hunt starts over. That single stall is why clipi waiting page, clipi timer bypass, and url shortener waiting page queries stay common even for a simple alias.

### What sits on the gate

- Please-wait chrome before the long URL
- Skip click to continue controls under ads
- Gate pages between the short alias and the destination
- Manual continue loops when the button hides

## Jumping to the long URL from the gate

Skip Wait detects the Clipi gate in Chrome, advances the continue flow the page expects, and redirects to the long destination without asking you to babysit the timer. One Clipi bypass extension install covers matching pages—no paste tool and no userscript manager.

Client-only delay theater clears; required holds still finish honestly. That keeps a clipi short link bypass reliable instead of inventing a broken zero-second cheat.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What waiting page does Skip Wait clear on Clipi?',
    answer:
      'The short link waiting page that sits between the alias and the long URL—please-wait and click-to-continue chrome included.',
  },
  {
    question: 'Do I need to manually continue past gate screens?',
    answer:
      'No on supported pages. Skip Wait detects the gate and bypasses manual continue button loops.',
  },
  {
    question: 'How fast is the redirect to the long URL?',
    answer:
      'As soon as unlock is allowed after the gate flow is handled. Cosmetic timers go away; enforced holds finish once.',
  },
  {
    question: 'Is every timer removed instantly?',
    answer:
      'Client busywork is skipped. When a real hold is still required, Skip Wait waits that step, then continues—a stable clipi timer bypass.',
  },
  {
    question: 'Is the Clipi path free?',
    answer:
      'Yes. Skip Wait is free. The Clipi bypass runs on supported pages with no account or paid plan.',
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
