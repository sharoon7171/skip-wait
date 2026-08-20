import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'XDMovies';

const bypassType = 'Skip Landing Wait';

const description =
  'XDMovies bypass that clears the landing delay before Open main site so you reach the streaming homepage without a forced connection wait on load.';

const domains = ['xdmovies.com'] as const;

const keywords = [
  'xdmovies bypass',
  'xdmovies bypass extension',
  'xdmovies timer bypass',
  'xdmovies open main site',
  'xdmovies landing page',
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
  'An XDMovies bypass or skip landing wait search usually means the entry page forced an Open main site delay before the streaming homepage. Skip Wait is the $1/month Chrome extension that clears that landing wait so you start browsing without sitting through connection chrome on every visit.';

const body = `## Landing first, homepage second

XDMovies parks the working homepage behind a landing wait. You load the entry URL, watch Open main site / connection delay chrome, then finally reach the streaming homepage. Refresh early and the same landing page bypass loop restarts.

That entry stall—not a file shortener—is why people search xdmovies timer bypass and mirror site bypass next to skip landing wait.

### Entry delays before browsing

- Landing-page connection stalls on load
- Open main site wait screens
- Mirror delays before the homepage
- Restarting the entry URL when a hop fails

## Advancing past Open main site in Chrome

Skip Wait runs on the landing page inside Chrome. It clears the landing wait and opens the working destination so you continue into the site without the forced connection delay.

You visit the same entry URL as always. No paste tool. The delay chrome goes away; the homepage route still completes honestly.

## Entry skins that change between mirrors

Hardcoded “click Open main site after N seconds” habits fail when the landing skin changes. An XDMovies bypass extension keyed to landing-wait release stays useful without relearning each entry layout.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What landing delay does Skip Wait skip on XDMovies?',
    answer:
      'The Open main site / connection wait on the entry page. Skip Wait advances into the streaming homepage without that forced delay.',
  },
  {
    question: 'Do I still visit the landing URL?',
    answer:
      'Yes. Open the same entry page; Skip Wait only removes the landing wait behind it.',
  },
  {
    question: 'Is this the same as the download mediator hop?',
    answer:
      'No. This entry covers the homepage landing wait. Mediator please-wait pages after download clicks are a separate path.',
  },
  {
    question: 'How much does the XDMovies bypass cost?',
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
