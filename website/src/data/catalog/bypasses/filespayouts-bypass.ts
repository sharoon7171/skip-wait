import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'FilesPayouts';

const bypassType = 'Direct Download';

const description =
  'FilesPayouts bypass skips free download waits and mediator pages on this file host so Free Download starts the file immediately.';

const domains = ['filespayouts.com'] as const;

const keywords = [
  'filespayouts bypass',
  'FilesPayouts bypass extension',
  'filespayouts timer bypass',
  'direct download',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'direct download bypass',
  'download timer skip',
  'file host bypass',
] as const;

const intro =
  'A FilesPayouts bypass search usually means Free Download still forced a countdown or mediator page before the archive. Skip Wait is the $1/month Chrome extension that posts through to the download step on that click so the free path does not stall on wait chrome.';

const body = `## Free Download that still forces a countdown

FilesPayouts monetizes free traffic with a Free Download control that normally opens a countdown page, Create Download Link delay, or intermediary screen before the real file link. Premium may skip the line; free users babysit the clock.

That free-path stall is why filespayouts timer bypass, direct download bypass, and download timer skip sit next to FilesPayouts bypass extension queries.

## Posting straight through to the file step

Skip Wait labels and watches Free Download on supported pages. When you click it, the extension posts through to the download step the finished free path would reach, so the countdown and mediator page never get in the way. You stay on the host; no paste tool.

Client wait theater stops owning the tab. Required holds the host still enforces are waited honestly so the session does not die with a fake zero-second cheat.

## Mediator pages after the free button

Some shares bounce free users through an extra interstitial after Free Download. On supported paths Skip Wait skips that hop so the file path opens when the host allows it. A skip wait extension keeps that file host bypass in one install without a userscript per button.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What free download waits does Skip Wait skip?',
    answer:
      'Free download countdown timers, Create Download Link busywork, and mediator pages after Free Download on supported pages.',
  },
  {
    question: 'Does Free Download start in one click?',
    answer:
      'On supported pages, yes—Skip Wait resolves the download behind Free Download so the countdown page does not block you.',
  },
  {
    question: 'Do I need a paid FilesPayouts plan?',
    answer:
      'No. Skip Wait automates the free path. Premium is unrelated to the extension.',
  },
  {
    question: 'How much does the FilesPayouts bypass cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup.',
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
