import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'FC.LC';

const bypassType = 'Skip Short Link';

const description =
  'FC.LC bypass skips short link verification steps, captcha gates, and countdown timers on this monetized URL shortener platform right away for you.';

const domains = ['fc-lc.xyz', 'fc.lc', 'oii.io', 'jobzhub.store'] as const;

const keywords = [
  'fc.lc bypass',
  'FC.LC bypass extension',
  'fc.lc timer bypass',
  'skip short link',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'ad link bypass',
  'short link bypass',
  'monetized link bypass',
] as const;

const intro =
  'An FC.LC bypass search usually starts after a monetized short URL chained verification pages, captcha gates, and unlock timers before the destination. Skip Wait is the Chrome extension that walks that short link path so you are not clicking through every hop by hand.';

const body = `## Verification hops stacked on monetized aliases

FC.LC-network shares rarely end in one redirect. You hit short-link verification, ad countdown chrome, go-page unlocks, and sometimes a captcha pin before the real URL appears. Leave mid-chain or miss a continue control and the same monetized link bypass loop restarts.

That sequence is why skip short link, ad link bypass, and FC.LC timer bypass sit next to FC.LC bypass extension queries—the product is the stack of gates, not a single interstitial.

### Go pages and unlock redirects in sequence

After verification you often land on a go or unlock surface with another timer. Manual babysitting means hunting buttons under ads on each step. Skip Wait treats those surfaces as one continuous short link bypass inside Chrome.

## Automating the short-link chain in Chrome

On supported network hosts the extension detects matching pages, advances verification and unlock steps the site already expects, and continues until the destination is ready. Client countdown theater stops owning the tab; holds the shortener still enforces are waited honestly.

Captcha, when required, stays visible once. After the token exists, unlock continues—so short link bypass stays a browser session, not a paste API that dies when intermediate hosts rotate.

## When the network rotates intermediate hosts

Publisher blogs and go hosts change. A skip wait extension keyed to the live unlock pattern stays useful without re-copying the alias into a third-party tool each week.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Which FC.LC-network hosts does Skip Wait cover?',
    answer:
      'Supported pages across the listed FC.LC network domains. Unlock steps are automated until the destination URL is ready.',
  },
  {
    question: 'What verification steps get skipped?',
    answer:
      'Short-link verification busywork, ad countdown chrome, go-page redirect hops, and client timer theater. Required captcha still needs a human once.',
  },
  {
    question: 'Do I click every continue gate myself?',
    answer:
      'On supported pages, no. Skip Wait continues through gates without manual clicking at each step.',
  },
  {
    question: 'Will timers always vanish instantly?',
    answer:
      'Client-only delays go away. If the shortener still enforces a real wait, Skip Wait stays on that step until unlock is allowed.',
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
