import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Unlock To Earn';

const bypassType = 'Skip multi step Waits';

const description =
  'Unlock To Earn bypass for social unlock short links: Skip Wait starts only on the short URL, advances rotating gate posts, and opens the next hop without YouTube or other social busywork.';

const domains = ['unlocktoearn.com'] as const;

const keywords = [
  'unlock to earn bypass',
  'unlocktoearn bypass',
  'unlocktoearn.com bypass',
  'unlock to earn chrome extension',
  'unlock to earn timer bypass',
  'unlock to earn countdown bypass',
  'skip multi step waits',
  'social unlock bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'please wait bypass',
  'link shortener bypass',
  'skip wait extension',
  'redirect chain bypass',
] as const;

const intro =
  'An Unlock To Earn bypass search usually means a short link turned into stacked social gates and countdown UI before the real hop. Skip Wait is the free Chrome extension that starts only when that short URL opens, then walks the live chain so skip multi step waits is not a YouTube-only checklist.';

const body = `## CPM social unlock, not a YouTube-only locker

[Unlock To Earn](https://unlocktoearn.com/) is a CPM shortlink locker: creators publish short links, visitors pass social and wait gates, publishers earn on the traffic. Gates can be YouTube, Instagram, Facebook, Telegram, Twitter, or other tasks—the product is the locker chain, not one network.

Shares start at a short alias, bounce through safe.php and rotating article gates, then hand off to the next shortener. Client timers and task cards only toggle CSS; the extension posts the same hidden fields the page already embeds.

### What the chain actually does

- Starts only on an Unlock To Earn short-alias URL
- Advances safe.php and article gate forms for that alias
- Skips client YouTube/social waits and the final countdown UI
- Clears the chain after the last gate; no chain means no mediator work
- Hands off to [JobSheel](/sites/jobsheel-bypass) when the share routes through \`baby.php?links=\`

## Typical three-brand handoff

Many shares do not end on Unlock To Earn. A common path is [Unlock To Earn](/sites/unlock-to-earn-bypass) → \`babylinks.in\` → [JobSheel](/sites/jobsheel-bypass) → [AdLinkFly Links Go on \`go.babylinks.in\`](/sites/adlinkfly-links-go-bypass) → destination. Each hop is a separate Skip Wait rule with its own chain gate—nothing runs site-wide.

## Why a chain-gated Chrome path matters

Mediator blogs rotate hosts. Hardcoding every article host fails overnight. Skip Wait keys off the short-URL chain token and matching \`tp*\` form fields for that alias—so an Unlock To Earn countdown bypass stays tied to a real open short link instead of scanning every page for unlock boxes.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'Does Unlock To Earn always hold the final file link?',
    answer:
      'No. Many shares unlock into Babylinks and JobSheel, then AdLinkFly Links Go on go.babylinks.in. Skip Wait continues on each supported hop—see the JobSheel and AdLinkFly Links Go bypass pages for those layers.',
  },
  {
    question: 'Is Unlock To Earn only YouTube unlock?',
    answer:
      'No. Unlock To Earn is a CPM shortlink locker with stacked social and wait gates. A given share may show YouTube tasks, but the site also supports other social unlock steps.',
  },
  {
    question: 'When does Skip Wait start on Unlock To Earn?',
    answer:
      'Only after you open a short-alias URL. Home, login, and register pages do not start the chain.',
  },
  {
    question: 'Do mediator blogs keep running the bypass forever?',
    answer:
      'No. Mediator pages only run after a short-alias URL wrote the chain. That chain is cleared after the final unlock form submit.',
  },
  {
    question: 'Is this free?',
    answer:
      'Yes. Skip Wait is free on the Chrome Web Store. The Unlock To Earn path runs on supported short links with no paid plan.',
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
