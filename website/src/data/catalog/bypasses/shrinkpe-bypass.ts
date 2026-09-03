import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'ShrinkPe';

const bypassType = 'Skip Short Link';

const description =
  'ShrinkPe bypass clears Step One / Step Two blog hops and Your Link Is Almost Ready so Skip Wait opens the destination without babysitting article tabs.';

const domains = ['aii.sh', 'lnbz.la', 'shrink.pe'] as const;

const keywords = [
  'shrinkpe bypass',
  'shrink.pe bypass',
  'loanbuzz bypass',
  'lnbz bypass',
  'shrinkbixby bypass',
  'aii.sh bypass',
  'step one step two shortlink',
  'your link is almost ready bypass',
  'almost ready seconds bypass',
  'get link countdown bypass',
  'shrinkpe get link skip',
  'shrinkpe timer bypass',
  'shrinkpe countdown bypass',
  'please wait shortlink bypass',
  'skip waiting page shrinkpe',
  'monetized short link bypass',
  'ad shortener bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'short link bypass',
  'skip wait chrome extension',
  'chrome extension shortlink bypass',
] as const;

const intro =
  'ShrinkPe short links on shrink.pe, LoanBuzz, and ShrinkBixby aliases often send you through Step One and Step Two article tabs before Your Link Is Almost Ready. Skip Wait is the Chrome extension that keeps you on the short link, clears those blog hops, and finishes the Almost Ready Get Link wait on the same tab.';

const body = `## Step One and Step Two eat the click

ShrinkPe shares rarely land on the file or video in one jump. The alias can show human verification first, then push Step One on a blog host, then Step Two on another article before the shortener is willing to show Your Link Is Almost Ready. Leave during a hop, close the wrong tab, or reload and the shrinkpe timer bypass loop starts again on a fresh article.

That tour is monetization, not the destination. The real unlock still lives back on the short link with a seconds counter and a Get Link control that stays disabled until the wait is honest.

### Screens you actually see

- Captcha or verification on some aliases before hops begin
- Step One / Step Two article pages with Continue-style gates
- Your Link Is Almost Ready with a seconds readout and Get Link
- Download or Get a link tiles around the page that are ads—not unlock

## Same tab, live progress, then unlock

Skip Wait runs on the live ShrinkPe alias in Chrome—you do not walk every Step One article by hand. The Skip Wait screen tells you what stage is running: clearing wait pages, skipping each blog hop, then showing the Almost Ready countdown while Get Link is still locked. When unlock is allowed, Skip Wait finishes Get Link and opens the destination.

Client chrome gets out of the way; server-side holds still finish honestly. That is a shrinkpe get link skip and shrinkpe countdown bypass without babysitting rotating blog tabs on the short URL you opened.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a ShrinkPe bypass skip?',
    answer:
      'It skips babysitting Step One and Step Two blog tabs, hunting Continue on article pages, and watching the Almost Ready timer by hand. Required checks still complete before the destination opens.',
  },
  {
    question: 'Do I still open Step One and Step Two articles?',
    answer:
      'No on supported aliases. Skip Wait clears those blog hops while you stay on the short link tab instead of clicking through each article.',
  },
  {
    question: 'Why does Skip Wait show its own countdown on Almost Ready?',
    answer:
      'The shortener rejects an early Get Link. Skip Wait mirrors the published seconds wait on the Skip Wait screen, then unlocks when that delay has actually passed.',
  },
  {
    question: 'Will the status text change while it works?',
    answer:
      'Yes. You see when wait pages are being skipped, when each hop clears, when Almost Ready is counting down, and when the destination is opening—without tapping Continue on blog tabs.',
  },
  {
    question: 'Do I need a license?',
    answer:
      'Yes. Get a free trial or monthly license on EAS Store and activate your key in the extension popup.',
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
