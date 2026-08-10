import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'PRMovies';

const bypassType = 'Skip Waiting Page';

const description =
  'PRMovies bypass skips the landing wait screen and opens the main streaming site automatically so you are not stuck on please-wait before browsing.';

const domains = ['prmovies.mba'] as const;

const keywords = [
  'prmovies bypass',
  'PRMovies bypass extension',
  'prmovies timer bypass',
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
  'A PRMovies bypass search usually means a shared entry link parked you on a landing wait instead of the streaming catalog. Skip Wait is the free Chrome extension that clears that gate so a skip waiting page path opens the main site without click-to-continue busywork.';

const body = `## Entry hops that stall before the catalog

Shared PRMovies links often dump you on a please-wait or continue screen before the real homepage. You watch a timer, hunt a buried control through ads, or refresh when the landing hop freezes—then start over. That loop is what people mean by prmovies timer bypass, waiting page bypass, and skip click to continue.

The landing page is not the catalog. It is a delay layer whose only job is to hold you until Continue unlocks and the streaming URL finally loads.

### Stages that waste the first visit

- Please-wait strips on the entry hop
- Click-to-continue gates before titles appear
- Countdown delays that reset if you leave the tab
- Stalled landings that need a manual reload

## Clearing the gate inside Chrome

Skip Wait’s PRMovies support runs when the landing page loads. It advances the same continue path the entry flow already uses, then sends you to the main streaming URL the page was going to open anyway.

No paste decoder, no userscript per profile—just a PRMovies bypass extension that treats the wait as automation. Client chrome gets out of the way; any hold the entry still enforces finishes honestly.

Bookmarking a “final” homepage fails when entry paths rotate. The extension follows live landing behavior, so a skip wait extension install keeps working as long as the wait pattern stays the same.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a PRMovies bypass actually skip?',
    answer:
      'It skips the landing wait before the main streaming site—please-wait strips and click-to-continue busywork—so the catalog opens without babysitting the entry hop.',
  },
  {
    question: 'Does Skip Wait open the streaming site automatically?',
    answer:
      'Yes on supported entry pages. After the wait layer is handled, you are sent to the main site the landing hop already targeted.',
  },
  {
    question: 'Do I still need to press Continue?',
    answer:
      'On supported hops, no. Skip Wait completes the continue flow so ads do not hide the control you were meant to press.',
  },
  {
    question: 'Is this a paste-a-link decoder?',
    answer:
      'No. The extension runs on the page you opened. That is a waiting page bypass in Chrome, not a third-party paste site.',
  },
  {
    question: 'Is the PRMovies bypass free?',
    answer:
      'Yes. Skip Wait is free on the Chrome Web Store. The PRMovies path runs on supported pages with no paid plan.',
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
