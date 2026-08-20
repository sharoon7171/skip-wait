import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Bitcotasks';

const bypassType = 'Skip Article Wait';

const description =
  'Bitcotasks bypass that clears earn-to-click read article timers so the unlocked destination appears without forcing a filler scroll.';

const domains = ['bitcotasks.com'] as const;

const keywords = [
  'bitcotasks bypass',
  'Bitcotasks bypass extension',
  'bitcotasks bypass chrome',
  'bypass bitcotasks',
  'skip bitcotasks',
  'bitcotasks timer bypass',
  'bitcotasks article wait',
  'earn to click bypass',
  'earn to click article skip',
  'skip article wait',
  'read article bypass',
  'article unlock bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
] as const;

const intro =
  'A Bitcotasks bypass search usually means an earn-to-click shortener still forces a read article timer before the unlock. Skip Wait is the $1/month Chrome extension that clears that article gate so the destination is available without scrolling filler for the clock.';

const body = `## Earn-to-click pages that force a read timer

Bitcotasks-style shares send you to an article first. The unlock stays locked until a read article wait finishes, even when you already know the destination exists. That is the whole product: dwell time on filler, then a link. Searches for bitcotasks article wait, earn to click article skip, and skip article wait describe that stall—not a missing URL.

### What the article gate demands

- Forced read timers before unlock
- Scroll or dwell checks on earn-to-click pages
- Unlock buttons that stay disabled until the clock ends
- Restarts when you leave the tab early

## Unlocking the destination without the filler scroll

Skip Wait activates on recognized skip article wait flows and clears or automates the forced read so the unlocked link is available as soon as the page allows. You open the shared Bitcotasks URL as usual; the Bitcotasks bypass extension handles the article busywork in Chrome without a paste box.

You are not decoding anything by hand. The extension keys off the article unlock pattern already on the page, then continues to the destination when that step is done.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Can I skip the read article screen on Bitcotasks?',
    answer:
      'Yes on supported pages. Skip Wait bypasses the read article wait so you reach the unlocked link from this earn-to-click shortener without sitting through the filler.',
  },
  {
    question: 'What article gate does Skip Wait clear?',
    answer:
      'The earn-to-click article timer that forces you to stay on a page before the link unlocks.',
  },
  {
    question: 'How quickly can I reach the unlocked link?',
    answer:
      'As soon as the Bitcotasks page allows unlock after the article flow is handled. Skip Wait removes the babysitting, not a fake destination invent.',
  },
  {
    question: 'Do I still need to scroll the whole article?',
    answer:
      'On supported flows, no. The extension automates the wait pattern so you are not performing the dwell ritual by hand.',
  },
  {
    question: 'How much does the Bitcotasks path cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup. The Bitcotasks bypass runs on supported pages.',
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
