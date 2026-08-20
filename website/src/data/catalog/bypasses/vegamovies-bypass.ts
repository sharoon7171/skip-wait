import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Vegamovies';

const bypassType = 'Skip Landing Wait';

const description =
  'Vegamovies bypass that skips the vglist connecting delay on Quick Access so VegaMovies, RogMovies, Anime, and Xprime live servers open without a forced hub wait.';

const domains = ['vglist.top', 'vglist.nl'] as const;

const keywords = [
  'vegamovies bypass',
  'vegamovies bypass extension',
  'vglist bypass',
  'vegamovies timer bypass',
  'vegamovies quick access',
  'rogmovies bypass',
  'skip landing wait',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'landing page bypass',
  'mirror site bypass',
] as const;

const intro =
  'A Vegamovies bypass or vglist bypass search usually means Quick Access parked you on a “securing connection” delay before VegaMovies, RogMovies, Anime, or Xprime. Skip Wait is the $1/month Chrome extension that resolves the live destination from that connecting page so skip landing wait is not a forced hub timer.';

const body = `## Hub Quick Access, then a connecting stall

The Vegamovies hub does not open the live server in one click. Quick Access routes through a connecting page with a securing-connection style wait before VegaMovies, RogMovies, Anime, or Xprime. Refresh mid-wait or lose the tab and you sit through the same landing page bypass loop again.

That hub delay—not a shortener countdown—is why people also search vegamovies timer bypass and mirror site bypass next to skip landing wait.

### Delays before the live mirror

- Landing-page connection stalls after Quick Access
- Securing-connection redirects on the hub
- Forced waits before each live server open
- Restarting the hub when a hop fails

## Opening live servers without the connecting tour

Skip Wait runs on the hub pages inside Chrome. Use Quick Access as usual; the extension resolves the live destination from the connecting page and skips the wait so the chosen server opens immediately.

You are not watching a connecting spinner for every mirror. Required hub routing still happens; the forced delay chrome does not.

## Mirrors that move between hub updates

Bookmarking yesterday’s live URL fails when mirrors rotate. A Vegamovies bypass extension that reads the connecting page destination stays useful without chasing every new mirror by hand.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What landing wait does Skip Wait skip on the Vegamovies hub?',
    answer:
      'The securing-connection / connecting page after Quick Access. Skip Wait resolves the live destination and opens it without the forced hub wait.',
  },
  {
    question: 'Which Quick Access destinations are covered?',
    answer:
      'Supported hub flows for VegaMovies, RogMovies, Anime, and Xprime live servers—same Quick Access buttons, without the connecting delay.',
  },
  {
    question: 'Do I still use the hub?',
    answer:
      'Yes. Open the hub and Quick Access as usual. Skip Wait only removes the connecting wait behind those links.',
  },
  {
    question: 'How much does the Vegamovies bypass cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup.',
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
