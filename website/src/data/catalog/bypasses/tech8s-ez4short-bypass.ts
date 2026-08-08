import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = 'Tech8s / Ez4Short';

const bypassType = 'Skip Short Link';

const description =
  'Tech8s / Ez4Short bypass skips gate-page waits, PLEASE WAIT screens, and redirect hops on Ez4Short-style ad link shorteners so your destination opens without clicking through every step.';

const domains = [
  'ez4short.com',
  'game5s.com',
  'tech8s.net',
  'link4m.co',
  'carrnissan.com',
  'adrinolinks.in',
  'adrinolinks.com',
] as const;

const keywords = [
  'tech8s bypass',
  'ez4short bypass',
  'tech8s / ez4short bypass',
  'ez4short timer bypass',
  'tech8s timer bypass',
  'skip short link',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'please wait bypass',
  'ad link bypass',
  'short link bypass',
  'monetized link bypass',
  'link shortener bypass',
  'gate page bypass',
  'safe redirect bypass',
  'skip wait extension',
  'skip wait chrome extension',
] as const;

const intro =
  'Ez4Short-style ad links rarely mean one page. You get a safe redirect, a PLEASE WAIT gate, another continue form, sometimes a second shortener, then finally an unlock hop—classic Tech8s monetized-link theater. Skip Wait is the free Chrome extension that treats that whole gate-page bypass as one job: it reads redirect targets, walks blog continue steps behind an overlay, and opens the next URL when the path is ready. You keep the short link; you drop the ritual of tapping every please-wait screen yourself.';

const problem =
  'Each hop exists to look like progress while delaying the destination. Safe redirects hide the next URL in the page, PLEASE WAIT screens demand patience, and blog gates chain continue posts until an unlock link appears. Related ad-link entries dump you into the same maze under a different skin. One missed continue or a mid-chain refresh and the short-link bypass problem resets from the top.';

const howItWorks =
  'As soon as a supported Tech8s / Ez4Short-style page loads, Skip Wait identifies which kind of hop you are on. Redirect interstitials yield their real next URL and move you along. Blog gates run their continue sequence in the background under the overlay until the unlock link is available. Entry pages that only exist to shove you into those gates are jumped the same way—Skip Wait grabs the gate target and continues—so the ad-link chain collapses into fewer stops instead of a full click-through.';

const steps: readonly BypassStep[] = [
  {
    title: 'Install from the Chrome Web Store',
    body: 'Add Skip Wait once. Tech8s / Ez4Short-style short links and gates are included automatically.',
  },
  {
    title: 'Do not turn it off',
    body: 'Leave Skip Wait running. Ad-link and gate pages need no extra options.',
  },
  {
    title: 'Follow the shared ad link',
    body: 'Open it like any other short URL. Matching redirects, gates, and entry pages pick up the overlay on their own.',
  },
  {
    title: 'Let the chain finish',
    body: 'Skip Wait advances supported hops and opens the next destination when unlock is ready—without a manual PLEASE WAIT tour.',
  },
];

const skips = [
  'Safe-redirect interstitials',
  'PLEASE WAIT and continue gates',
  'Multi-step blog continue chains',
  'Entry hops that only feed the same gates',
  'Hunting the unlock link after the last gate',
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: 'What is the Tech8s / Ez4Short bypass for?',
    answer:
      'Clearing gate pages, PLEASE WAIT screens, and redirect hops on Ez4Short-style ad links so the next destination opens without a full manual click-through. Skip Wait runs on the domains listed here.',
  },
  {
    question: 'What kinds of pages are supported?',
    answer:
      'The shortener and gate domains on this page, plus related ad-link entries that feed the same gate theater. With Skip Wait on, those links start the bypass themselves.',
  },
  {
    question: 'Which waits go away?',
    answer:
      'Safe-redirect stalls, PLEASE WAIT / continue gates, and the blog continue chain that ends in an unlock link. Skip Wait handles those steps and opens the next URL when it is ready.',
  },
  {
    question: 'Are redirect hops automatic?',
    answer:
      'On supported redirects and unlock hops, yes—Skip Wait moves you to the real next URL instead of leaving you on the interstitial.',
  },
  {
    question: 'Do I pay for Tech8s / Ez4Short support?',
    answer:
      'No. Skip Wait is free, with no account and no paid plan for this bypass.',
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
