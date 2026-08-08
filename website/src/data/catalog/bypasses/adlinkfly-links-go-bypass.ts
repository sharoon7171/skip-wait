import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = 'AdLinkFly Links Go';

const bypassType = 'Skip Waiting Page';

const description =
  'AdLinkFly bypass for Links Go shorteners: skip the please-wait countdown, continue gates, and Get Link delay so you reach the destination without babysitting the waiting page.';

const domains = [
  'linkjust.com',
  'pahe.plus',
  'go.zovo.ink',
  'shortnest.com',
  'link.liteshort.com',
] as const;

const keywords = [
  'adlinkfly bypass',
  'bypass adlinkfly',
  'adlinkfly links go bypass',
  'links go bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'please wait seconds bypass',
  'get link shortener bypass',
  'get link bypass',
  'link shortener bypass',
  'continue button bypass',
  'monetized short link bypass',
  'skip wait chrome extension',
  'skip wait extension',
  'free chrome extension skip wait',
] as const;

const intro =
  'Install Skip Wait once and AdLinkFly Links Go waiting pages stop owning your afternoon. The free Chrome extension covers the please-wait countdown, Continue / Proceed gates, and Get Link delay on supported Links Go shorteners—so a shared short URL becomes a short overlay moment instead of a skip-waiting-page chore. When a human check appears, it stays pinned in the overlay; otherwise unlock runs as soon as the shortener allows, without you staring at a fake client timer or digging Get Link out from under ads.';

const problem =
  'Links Go interstitials are built to burn time. You land on please-wait seconds, tap Continue, wait again, then chase Get Link before the real destination shows up. Refresh too soon or miss the button and the same monetized short-link loop restarts. An AdLinkFly bypass exists for that exact skip-countdown-timer frustration—not because the destination is hard to find, but because the waiting page is designed to keep you there.';

const howItWorks =
  'Skip Wait drops a full-page overlay on the matching waiting page and runs the Links Go unlock path for you. Continue-style steps advance without extra taps, captcha stays visible only when required, and unlock is requested early whenever the shortener accepts it. Purely cosmetic countdowns get skipped; a real server delay is honored once, then Get Link finishes so you leave with the destination instead of babysitting the interstitial.';

const steps: readonly BypassStep[] = [
  {
    title: 'Add Skip Wait to Chrome',
    body: 'Install the free Skip Wait extension from the Chrome Web Store. AdLinkFly Links Go support turns on by itself—no account, paste box, or userscript manager.',
  },
  {
    title: 'Leave it enabled',
    body: 'Keep Skip Wait on. Supported please-wait and Get Link pages need zero settings.',
  },
  {
    title: 'Open the short URL normally',
    body: 'Use the link the way you always do. When the waiting page appears, the overlay takes over.',
  },
  {
    title: 'Finish captcha only if asked',
    body: 'If a human check shows on the overlay, complete it once. The continue and Get Link chain resumes without more busywork.',
  },
  {
    title: 'Land on the destination',
    body: 'Successful unlock redirects you to the real URL—no more timer watching or Get Link hunting.',
  },
];

const skips = [
  'Please-wait countdown screens',
  'Continue and Proceed gate loops',
  'Manual Get Link hunting after the timer',
  'Client-side timers the server does not enforce',
  'Ad noise while the overlay is active',
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does an AdLinkFly Links Go bypass do?',
    answer:
      'It clears the monetized waiting page—please-wait countdown, continue gates, and Get Link delay—so you spend less time on the interstitial and more time at the destination. Skip Wait runs that path on supported Links Go pages.',
  },
  {
    question: 'Which Links Go shorteners are covered?',
    answer:
      'The domains listed on this page. Open any of those short links with Skip Wait enabled and the waiting-page bypass starts automatically.',
  },
  {
    question: 'Will it always skip the full countdown?',
    answer:
      'It unlocks as soon as the shortener allows. Cosmetic client timers are skipped; if the server rejects an early unlock, Skip Wait waits that enforced delay once, then finishes Get Link for you.',
  },
  {
    question: 'Do I need Tampermonkey for AdLinkFly?',
    answer:
      'No. Captcha only when the page shows one—Skip Wait pins it on the overlay. Supported Links Go pages do not need a separate userscript.',
  },
  {
    question: 'Is the AdLinkFly bypass free?',
    answer:
      'Yes. Skip Wait is free, with no account and no paid tier for Links Go support.',
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
    problem,
    howItWorks,
    steps,
    skips,
    faq,
  },
} satisfies SupportedBypass;
