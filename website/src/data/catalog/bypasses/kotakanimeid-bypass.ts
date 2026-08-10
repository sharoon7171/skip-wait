import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'KotakAnimeID';

const bypassType = 'Skip Waiting Page';

const description =
  'KotakAnimeID bypass that clears the out-page countdown so episode download links by resolution appear without sitting through the please-wait gate.';

const domains = ['kotakanimeid.link'] as const;

const keywords = [
  'kotakanimeid bypass',
  'kotakanimeid bypass chrome',
  'kotakanimeid bypass extension',
  'bypass kotakanimeid',
  'skip kotakanimeid',
  'kotakanimeid timer bypass',
  'kotakanimeid out page',
  'anime download bypass',
  'skip waiting page',
  'please wait bypass',
  'waiting page bypass',
  'skip click to continue',
  'skip countdown timer',
  'bypass countdown timer',
  'skip wait extension',
] as const;

const intro =
  'Looking for a KotakAnimeID bypass or kotakanimeid out page skip usually means an episode share parked you on a countdown before any 1080p or 720p link appears. Skip Wait is the free Chrome extension that clears that waiting gate so resolution links show without babysitting Continue.';

const body = `## Out pages that hide episode mirrors behind a clock

KotakAnimeID download flows often insert an out-page wait between the episode post and the host list. You sit through a please-wait or continue loop, then finally see links sorted by resolution. Refresh mid-wait and the gate restarts.

That is why anime download bypass and skip waiting page searches pair with kotakanimeid timer bypass—the mirrors are ready; the out page is the choke point.

### What blocks the resolution list

- Out-page countdowns before any host appears
- Please wait and click-to-continue screens
- Gate pages that hold 1080p / 720p links behind UI
- Manual continue loops under ads

## Revealing the episode links on the live gate

Skip Wait detects the out-page pattern, bypasses the filler wait when the destination links are already present, and surfaces the resolution list without asking you to click continue repeatedly.

You open the episode hop the same way as always—no paste tool. Client-only delay chrome gets out of the way so 1080p, 720p, and other mirrors become usable once the page holds them.

## Episode posts vs inventing a new download site

Userscripts that hardcode one out-page host break when the gate rotates. A KotakAnimeID bypass extension that follows live waiting-page behavior keeps the same episode flow working on supported pages without relearning Continue each season.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a KotakAnimeID bypass skip?',
    answer:
      'The out-page countdown and continue gate so episode download links by resolution appear without the filler wait.',
  },
  {
    question: 'Do 1080p and 720p links show after the bypass?',
    answer:
      'Yes when the page already holds them. Skip Wait clears the waiting UI so those resolution mirrors become usable.',
  },
  {
    question: 'Do I still click Continue myself?',
    answer:
      'On supported out pages, no. Skip Wait advances past please wait and continue screens.',
  },
  {
    question: 'Is every timer removed instantly?',
    answer:
      'Filler wait chrome goes away when the links are present. Required holds still finish before mirrors unlock if the page enforces them.',
  },
  {
    question: 'Is this free?',
    answer:
      'Yes. Skip Wait is free. The KotakAnimeID path runs on supported pages with no paid plan.',
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
