import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'LiteShort';

const bypassType = 'Skip Short Link';

const description =
  'LiteShort bypass for Continue to Destination disclaimers and Get Link countdowns on liteshort.com and link.liteshort.com—Skip Wait stays on those hosts and opens the next URL when unlock is allowed.';

const domains = ['liteshort.com', 'link.liteshort.com'] as const;

const keywords = [
  'liteshort bypass',
  'bypass liteshort',
  'skip liteshort',
  'liteshort.com bypass',
  'link.liteshort.com bypass',
  'liteshort get link',
  'liteshort continue to destination',
  'continue to destination bypass',
  'liteshort timer bypass',
  'liteshort countdown bypass',
  'get link bypass liteshort',
  'liteshort chrome extension',
  'organic redirect google bypass',
  'skip waiting page liteshort',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait chrome extension',
] as const;

const intro =
  'A LiteShort share usually opens Continue to Destination on liteshort.com, then a Get Link countdown on link.liteshort.com. Skip Wait is the $1.50/month Chrome extension that keeps you on those two hosts, skips the off-site hop the disclaimer wants, and finishes Get Link when the shortener actually allows it.';

const body = `## Continue to Destination is not the destination

[LiteShort](https://liteshort.com/) aliases start with a disclaimer titled Continue to Destination. That button does not open what you came for. It tries to send the tab through a rotating off-site hop first, then unlock only works on link.liteshort.com after that hop is treated as the referrer.

Miss the hop, pick the wrong result, or reload mid-run and you land back on the disclaimer. That loop is why people search liteshort continue to destination and liteshort get link—not because the last URL is hard to understand.

### What you actually see

- Continue to Destination on liteshort.com/{alias}
- Get Link countdown chrome on link.liteshort.com/{alias}
- A server-side wait (often a few seconds) before /links/go returns the next URL

## Stay on LiteShort hosts

Skip Wait runs only on liteshort.com and link.liteshort.com. It covers Continue to Destination, forges the visit context unlock expects, and never opens those rotating off-site hops as tabs.

On Get Link, cosmetic countdown chrome is ignored. If the server still rejects an early unlock, Skip Wait holds for that real counter once, then posts Get Link and opens whatever URL comes back—another shortener or a direct page. This LiteShort page ends there.

## Get Link is a gate, not a file promise

Get Link is LiteShort’s unlock control. It does not mean a download. The next URL is whatever the alias points to today. Paste sites that list yesterday’s hop hosts go stale; a liteshort chrome extension path keys off the two LiteShort domains and the live alias instead.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'Which LiteShort URLs start Skip Wait?',
    answer:
      'Alias links on liteshort.com and link.liteshort.com. Home, login, and other site pages do not start it.',
  },
  {
    question: 'Do I still tap Continue to Destination?',
    answer:
      'No. Skip Wait clears that disclaimer on the LiteShort host and does not send the tab through the off-site hop it advertises.',
  },
  {
    question: 'Does Get Link still wait?',
    answer:
      'Only when the server enforces a real counter. Fake countdown UI is ignored; Skip Wait waits that enforced delay once, then finishes Get Link.',
  },
  {
    question: 'What opens after LiteShort?',
    answer:
      'Whatever URL Get Link returns for that alias. Skip Wait’s LiteShort path stops when that URL opens.',
  },
  {
    question: 'How much does LiteShort support cost?',
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
