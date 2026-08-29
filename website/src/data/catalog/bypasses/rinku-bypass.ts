import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Rinku';

const bypassType = 'Skip Short Link';

const description =
  'Rinku bypass for monetized short links: Skip Wait clears Security Check busywork, Next-button delays, and Please Wait unlock chrome on rotating article hops, keeps human checks in view, and opens the destination after the real unlock hold finishes.';

const domains = ['rinku.me', 'rinku.pro', '7mb.io'] as const;

const keywords = [
  'rinku bypass',
  'bypass rinku',
  'skip rinku',
  'rinku.me bypass',
  'rinku.pro bypass',
  '7mb.io bypass',
  'fly.inc bypass',
  'rinku timer bypass',
  'rinku countdown bypass',
  'rinku waiting page',
  'rinku security check',
  'rinku turnstile',
  'rinku please wait',
  'rinku next button',
  'rinku chrome extension',
  'rinku bypass extension',
  'rinku bypass chrome',
  'skip short link',
  'short link bypass',
  'ad link bypass',
  'monetized link bypass',
  'link shortener bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'please wait bypass',
  'security check bypass',
  'skip wait chrome extension',
  'skip wait extension',
] as const;

const intro =
  'A Rinku bypass matters when a shared short URL turns into Security Check pages, Next-button delays, and Please Wait unlock screens on rotating article hops. Skip Wait is the $1.50/month Chrome extension that clears that short-link busywork, keeps human checks in view when required, and opens the destination after the unlock hold the shortener still enforces.';

const body = `## Monetized short links that refuse a one-hop redirect

Rinku-style shares are built as a tour, not a clean redirect. You open the short URL, land on a rotating article page, face a Security Check with a human challenge, tap Next, then sit through another Please Wait unlock before the destination appears. Leave mid-flow, mistime a step, or chase Continue under ads and the same rinku waiting page loop starts again.

That stack is intentional. Ad networks get paid when you linger on please-wait chrome, so rinku timer bypass, rinku countdown bypass, security check bypass, and monetized link bypass all describe the same pain: the file or page is already decided, but the unlock path still wants attention.

### Stages people actually hit

- Security Check pages with a Turnstile-style human check before Next unlocks
- Next-button delays that force a second tap after a short on-page timer
- Please Wait unlock screens with progress chrome before the destination opens
- Rotating article hosts that change between shares while the unlock pattern stays the same
- Extra land or out hops on the shortener side before the final URL appears

## Running the live unlock path in Chrome

Open the Rinku short link you already have. Skip Wait starts from that tab, follows the unlock path across rotating article hops by how those pages behave—not a fixed blog host list—and covers the busy UI so you are not hunting Next through overlays.

When a human check is required, the challenge stays visible on the Skip Wait overlay for you to complete. Client-only button delays and waiting-page theater get out of the way. When unlock still needs a real server hold, Skip Wait shows that wait honestly, then continues—so a rinku countdown bypass stays reliable instead of inventing a zero-second cheat that errors out.

## Short link, rotating hops, one extension

Paste boxes fail when intermediate articles rotate. A rinku bypass extension that runs on the pages you opened keeps the live session as the chain reshuffles, as long as the Security Check → Next → Please Wait pattern stays the same. One skip wait chrome extension install covers the listed Rinku shortener hosts and the matching unlock hops that follow them.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Rinku bypass skip?',
    answer:
      'Security Check busywork, Next-button delays, and Please Wait unlock chrome on monetized short-link hops. Required human checks and server unlock holds still finish before the destination opens.',
  },
  {
    question: 'Is this a paste-a-link bypass website?',
    answer:
      'No. Skip Wait is a Chrome extension. You never paste the short URL into a third-party page—the work happens on the page you already opened.',
  },
  {
    question: 'Will a rinku timer bypass still need a captcha sometimes?',
    answer:
      'Often yes. Turnstile-style human checks stay with you on the overlay; what disappears is watching the clock, hunting Next, and restarting after every stall.',
  },
  {
    question: 'Is every timer removed instantly?',
    answer:
      'No. Client-only delay chrome goes away. When unlock still needs a real hold, Skip Wait stays on that step, then continues—so the rinku countdown bypass stays stable.',
  },
  {
    question: 'What if tomorrow’s share uses a new article host?',
    answer:
      'Rinku rotates intermediate article hosts between shares. Skip Wait follows the unlock pattern on those hops instead of depending on one fixed blog domain list. Stay on the tab for supported pages.',
  },
  {
    question: 'How much does the Rinku bypass cost?',
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
