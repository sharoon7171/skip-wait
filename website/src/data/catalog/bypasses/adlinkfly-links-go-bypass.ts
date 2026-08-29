import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'AdLinkFly Links Go';

const bypassType = 'Skip Waiting Page';

const description =
  'AdLinkFly Links Go bypass for please-wait seconds, Continue and Proceed gates, and Get Link delay on linkjust.com, pahe.plus, go.zovo.ink, and shortnest.com.';

const domains = [
  'linkjust.com',
  'pahe.plus',
  'go.zovo.ink',
  'shortnest.com',
] as const;

const keywords = [
  'adlinkfly bypass',
  'bypass adlinkfly',
  'adlinkfly links go bypass',
  'links go bypass',
  'links go get link bypass',
  'adlinkfly get link skip',
  'please wait seconds bypass',
  'get link shortener bypass',
  'continue button bypass',
  'proceed button bypass',
  'linkjust.com bypass',
  'pahe.plus bypass',
  'go.zovo.ink bypass',
  'shortnest.com bypass',
  'monetized short link bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait chrome extension',
] as const;

const intro =
  'Links Go waiting pages on linkjust.com, pahe.plus, go.zovo.ink, and shortnest.com stack please-wait seconds, Continue or Proceed, then Get Link. Skip Wait is the $1.50/month Chrome extension that runs that interstitial on those hosts so the listed short URL is an overlay, not a manual timer sit.';

const body = `## Please wait, then Get Link again

A Links Go interstitial is built to burn time on the waiting page itself. You hit please wait seconds, tap Continue or Proceed, wait again, then hunt Get Link. Refresh during a timer or miss the control and the same please-wait loop restarts on that host.

Client clocks on these pages are often decorative. The shortener may still reject an early Get Link. That mix—fake seconds plus a real server delay—is why an adlinkfly links go bypass has to finish the live unlock path, not only hide the countdown.

### Interstitial pieces on these hosts

- Please-wait countdown chrome
- Continue and Proceed gates
- Get Link after each wait
- Ad noise around the real control

Coverage on this page is those four domains only. Other shorteners that look similar are separate catalog entries.

## Overlay on the waiting page

Skip Wait matches the waiting page on a listed host, covers it with an overlay, and advances Continue-style steps without extra taps. Captcha stays on the overlay only when the page shows one. Unlock is requested as soon as Links Go accepts it. A rejected early unlock waits the enforced delay once, then Get Link finishes and the tab opens the URL that unlock returned.

That is a continue button bypass and get link shortener bypass for these brands inside Chrome—not a paste box that breaks when a new Links Go skin appears.

## Human checks stay human

Turnstile or a similar widget still needs you once. Skip Wait pins it. After that, please wait seconds and Get Link theater do not need a second pair of eyes. When unlock succeeds, the tab leaves the interstitial on its own.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does an AdLinkFly Links Go bypass clear?',
    answer:
      'The waiting page on the listed hosts: please-wait countdown, Continue and Proceed gates, and Get Link delay.',
  },
  {
    question: 'Which hosts are on this page?',
    answer:
      'linkjust.com, pahe.plus, go.zovo.ink, and shortnest.com. Open a short link on one of those with Skip Wait enabled and the waiting-page path starts.',
  },
  {
    question: 'Will it always skip the full countdown?',
    answer:
      'It unlocks as soon as Links Go allows. Cosmetic client timers are skipped. If the server rejects an early unlock, Skip Wait waits that delay once, then finishes Get Link.',
  },
  {
    question: 'Do I need Tampermonkey for these pages?',
    answer:
      'No. If captcha appears, Skip Wait pins it on the overlay. Supported Links Go waiting pages do not need a userscript.',
  },
  {
    question: 'How much does the AdLinkFly Links Go path cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup.',
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
