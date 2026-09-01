import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'AdFocus';

const bypassType = 'Skip Waiting Page';

const description =
  'AdFocus bypass for monetized download interstitials: Skip Wait clears the ad waiting page and continue busywork so the file destination opens when unlock is ready.';

const domains = ['adfoc.us'] as const;

const keywords = [
  'adfocus bypass',
  'AdFocus bypass extension',
  'adfocus bypass chrome',
  'bypass adfocus',
  'skip adfocus',
  'adfocus timer bypass',
  'adfocus countdown bypass',
  'adfocus waiting page',
  'adfocus continue skip',
  'monetized download bypass',
  'ad interstitial bypass',
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
  'An AdFocus bypass search usually begins after a monetized download link opens an ad interstitial instead of the file. Skip Wait is the Chrome extension that clears that waiting page so you are not repeating continue clicks on a single gate.';

const body = `## Download shares that open an ad interstitial

AdFocus-style links put paid creative between the click and the real URL. You stare at an adfocus waiting page, hunt skip click to continue, and still risk a reset if the gate reloads. That single-hop tax is why adfocus timer bypass and monetized download bypass searches stay common next to generic please wait bypass queries.

Unlike multi-blog shorteners, the product here is usually one interstitial: burn time, show ads, then release.

### What the interstitial demands

- Ad waiting chrome before the file destination
- Please-wait strips that re-enable Continue on a client clock
- Gate pages that exist only to pad the hop
- Manual continue loops when the button hides under creatives

## One gate, then the file

Skip Wait detects the AdFocus gate in Chrome, advances past continue busywork when the flow allows, and redirects to the destination already tied to the share. You stay on the tab you opened—an AdFocus bypass extension install is enough, with no paste site in the middle.

Cosmetic delay theater clears; required checks still complete honestly.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does an AdFocus bypass remove?',
    answer:
      'It clears the ad waiting page on monetized download links so please-wait and continue busywork take less of your time.',
  },
  {
    question: 'Can I skip the please-wait screen?',
    answer:
      'Yes on supported gates. Skip Wait advances past click-to-continue busywork and sends you onward when unlock is allowed.',
  },
  {
    question: 'Will it always skip the full delay instantly?',
    answer:
      'It removes client-only waits. If the shortener still enforces a real hold, Skip Wait honors that once, then finishes—stable adfocus countdown bypass behavior.',
  },
  {
    question: 'Is this a multi-blog chain helper?',
    answer:
      'AdFocus is usually a single interstitial. Skip Wait focuses on that gate; stacked blog networks are covered on their own catalog pages.',
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
