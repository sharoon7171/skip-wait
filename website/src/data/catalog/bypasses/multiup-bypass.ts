import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'MultiUp';

const bypassType = 'Skip Waiting Page';

const description =
  'MultiUp bypass for download waiting pages on this multi-host aggregator: Skip Wait opens the mirror list so you pick a host without sitting through please-wait continue loops.';

const domains = ['multiup.io'] as const;

const keywords = [
  'multiup bypass',
  'MultiUp bypass extension',
  'multiup timer bypass',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
  'please wait bypass',
  'waiting page bypass',
  'skip click to continue',
] as const;

const intro =
  'A MultiUp bypass or waiting page bypass search usually means the aggregator parked you on please-wait before any mirror host appeared. Skip Wait is the free Chrome extension that skips that download waiting page and surfaces the mirror list.';

const body = `## Aggregator waits before the mirror grid

MultiUp exists to show many host buttons for one file. The useful screen is that mirror download list—but a waiting page or continue gate often sits in front of it. You open the share, click through please-wait, then finally choose Rapidgator, Mega, or whichever mirror is alive. Leave mid-gate and you restart—fuel for multiup timer bypass, please wait bypass, and skip click to continue queries.

### Waiting page vs choosing a host

Skip Wait’s job on MultiUp is the gate before the list, not picking a CDN for you. Once mirrors appear, you still choose the host. The extension only removes the interstitial babysitting that delayed the grid.

## Opening the mirror list automatically

When a supported waiting page loads, Skip Wait runs in the background inside Chrome, clears the delay layer the page uses to stall free visitors, and advances to the mirror download list. No paste decoder; the aggregator already knows the hosts.

That is skip waiting page for a multi-host file aggregator in one MultiUp bypass extension install—less continue hunting, same mirror choices afterward.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What waiting page does MultiUp bypass clear?',
    answer:
      'The download please-wait or continue gate before the mirror list. Skip Wait advances to host buttons without the usual interstitial loop.',
  },
  {
    question: 'Does the extension open the mirror list automatically?',
    answer:
      'Yes on supported flows. Instead of sitting on a gate, you reach the grid where you pick a file host.',
  },
  {
    question: 'Does Skip Wait choose a mirror for me?',
    answer:
      'No. It unlocks the list. You still click the host you want.',
  },
  {
    question: 'Is every delay removed instantly?',
    answer:
      'Client waiting-page busywork goes away. Required holds still finish—so the multiup timer bypass stays reliable.',
  },
  {
    question: 'Is this free?',
    answer:
      'Yes. Skip Wait is free with no paid plan for supported pages.',
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
