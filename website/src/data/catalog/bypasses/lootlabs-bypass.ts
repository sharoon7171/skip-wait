import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'LootLabs';

const bypassType = 'Skip Content Locker';

const description =
  'LootLabs bypass that auto-runs locker wait timers on supported `/s` unlock links, handles Turnstile when required, and redirects to the destination without completing survey tasks.';

const domains = [
  'links.lootlabs.gg',
  'lootlabs.gg',
  'loot-link.com',
  'lootlinks.com',
  'lootlinks.co',
  'lootdest.org',
  'lootdest.com',
  'lootdest.net',
  'rapid-links.com',
  'rapid-links.net',
  'speedy-links.com',
  'best-links.org',
  'free-leaks.com',
  'fast-links.org',
  'free-content.pro',
  'direct-links.net',
  'direct-links.org',
  'ultra-links.net',
] as const;

const keywords = [
  'lootlabs bypass',
  'lootlabs bypass chrome',
  'lootlabs bypass extension',
  'bypass lootlabs',
  'skip lootlabs',
  'lootlabs timer bypass',
  'loot link bypass',
  'lootlinks bypass',
  'lootdest bypass',
  'skip content locker',
  'content locker bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
] as const;

const intro =
  'A LootLabs bypass usually means a shared unlock dropped you onto a content locker with a wait timer and survey copy instead of the file. Skip Wait is the Chrome extension that runs the locker timer automatically, handles Turnstile when the page requires it, and redirects when the destination releases.';

const body = `## Lockers that stall on timers, not one click

A LootLabs monetized link lands on a content locker—often \`/s\` on \`links.lootlabs.gg\` or a partner host—with a countdown and task text that implies surveys or ad gates. Close the tab early or refresh mid-flow and you restart from the first screen.

That friction is why loot link bypass and lootlabs timer bypass searches cluster together—the payload sits behind a release timer, not a single redirect.

### What the locker usually shows

- A wait countdown before the destination unlocks
- Survey-style task titles on the locker page
- Turnstile human verification on some unlocks
- Partner domains that redirect into the same locker stack

## Bypassing the locker inside Chrome

Skip Wait runs on supported LootLabs-family locker pages. It hooks the live unlock flow, runs the wait timer automatically, and shows a Skip Wait overlay with the remaining countdown—no survey tasks to click through.

When the locker requires Turnstile, the check appears in the overlay while the timer keeps running. Once the server releases the link, Skip Wait redirects automatically without showing the destination URL in the overlay.

## Partner locker hosts use the same pattern

Paste boxes go stale when locker domains rotate. Skip Wait keys off the live \`/s\` locker page on supported hosts—including \`loot-link.com\`, \`lootdest\` mirrors, and \`rapid-links\` family domains—so the bypass keeps working after partner redirects land on the same locker stack.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a LootLabs bypass skip?',
    answer:
      'Manual survey tasks and timer babysitting on supported locker pages. Skip Wait runs the wait countdown automatically and redirects when the destination releases.',
  },
  {
    question: 'Do I still need to complete surveys?',
    answer:
      'No. Skip Wait does not walk through survey or ad-gate tasks. The locker timer runs down automatically while the Skip Wait overlay shows bypass progress.',
  },
  {
    question: 'What about Turnstile on the locker?',
    answer:
      'When the locker requires Turnstile, the human check appears inside the Skip Wait overlay while the timer continues. Complete it once and the bypass keeps going.',
  },
  {
    question: 'Do partner unlocks that redirect into LootLabs work?',
    answer:
      'Yes when the final locker host is supported and the URL is a locker path such as `/s`. Open the unlock as usual; after the redirect Skip Wait runs on that page.',
  },
  {
    question: 'Does Skip Wait redirect automatically on release?',
    answer:
      'Yes. Keep the tab open with Skip Wait active on a supported locker host and it redirects when the link becomes available.',
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
