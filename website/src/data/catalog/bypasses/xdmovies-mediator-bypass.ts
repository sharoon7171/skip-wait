import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'XDMovies Mediator';

const bypassType = 'Skip Waiting Page';

const description =
  'XDMovies mediator bypass for the extra please-wait hop in the download chain so file links open without hunting Continue under ads.';

const domains = ['latestnewsonline.sbs'] as const;

const keywords = [
  'xdmovies mediator bypass',
  'xdmovies mediator bypass extension',
  'xdmovies mediator timer bypass',
  'xdmovies download mediator',
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
  'An XDMovies mediator bypass search usually means the homepage was fine, but the download path dumped you on another please-wait page before the file. Skip Wait is the free Chrome extension that clears that mediator hop so skip click to continue is not the whole download ritual.';

const body = `## After the homepage: the download mediator hop

Streaming entry waits and download mediators are different problems. Once you leave the homepage for a file, some XDMovies shares route through an extra waiting page—verification chrome, continue loops, countdown strips—before the host link appears. Miss Continue under ads or refresh mid-wait and the same waiting page bypass starts again.

That mid-chain stall is why xdmovies download mediator and xdmovies mediator timer bypass sit next to generic please wait bypass queries.

### What the mediator usually adds

- Extra please-wait screens on the download path
- Click-to-continue gates buried in overlays
- Verification delays before the file host
- Manual continue loops that reset on a bad click

## Clearing the hop inside Chrome

Skip Wait runs on the mediator page you already opened. It skips the busywork delay layer, advances continue when the flow allows, and sends you toward the file URL without a paste box. Client clutter goes away; any hold the hop still requires finishes honestly.

## Why this is not the same as the landing wait

Landing Open main site delays block browsing. Mediator waits block the file after browsing already worked. An xdmovies mediator bypass extension keyed to that second hop stays useful when download partners rotate skins, without relearning each interstitial by hand.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does the XDMovies mediator bypass skip?',
    answer:
      'The extra waiting page and continue/verification busywork on the download hop after you leave the homepage—not the landing Open main site delay.',
  },
  {
    question: 'Is this the same as the XDMovies landing bypass?',
    answer:
      'No. Landing clears entry into the site. Mediator clears the please-wait chain on the way to the file. Use both when a share hits both layers.',
  },
  {
    question: 'Do I still click Continue on the mediator?',
    answer:
      'On supported hops, Skip Wait completes that flow so you are not hunting buttons through ads.',
  },
  {
    question: 'Is it free?',
    answer:
      'Yes. Skip Wait is free. The mediator path runs on supported pages with no account.',
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
