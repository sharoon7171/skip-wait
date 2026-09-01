import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'OlaMovies Landing';

const bypassType = 'Skip Landing Wait';

const description =
  'OlaMovies Landing bypass for official portal waits: Skip Wait opens the current main movie site without View Main Site clicks, VPN modals, or hunting a rotating catalog host by hand.';

const domains = ['olamovies.dad', 'olamovies.top'] as const;

const keywords = [
  'olamovies landing bypass',
  'olamovies bypass',
  'ola movies bypass',
  'olamovies.dad bypass',
  'olamovies.top bypass',
  'olamovies official website',
  'olamovies official domain',
  'olamovies new domain',
  'olamovies current domain',
  'olamovies main site',
  'view main site olamovies',
  'olamovies portal bypass',
  'reach olamovies movie site',
  'skip landing wait',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'landing page bypass',
  'mirror site bypass',
  'skip wait extension',
  'please wait bypass',
] as const;

const intro =
  'People searching OlaMovies official website, OlaMovies new domain, or OlaMovies landing bypass usually hit a marketing portal instead of the catalog. Skip Wait is the Chrome extension that skips that landing wait and opens the live main site the portal already publishes.';

const body = `## Portals that stall before the catalog

OlaMovies rotates catalog hosts often enough that public entry points are portals, not the movie index. Those pages stall behind View Main Site, a VPN modal, and brand copy about the official website while the real main URL sits behind a server pointer. Searching ola movies or OlaMovies current domain still drops you on that waiting page before any listing loads—classic skip landing wait and landing page bypass territory.

### What the portal is actually for

The portal’s job is to advertise and to publish the live catalog location. View Main Site and the VPN interrupt are friction on top of that pointer. Manual mirror lists go stale the moment the current domain rotates; the portal’s own endpoint stays authoritative.

## Following current.php into the main site

On supported portal hosts, Skip Wait reads the same current.php response the site uses to publish its live main URL, then replaces the landing with that destination. Search queries on the portal URL are preserved so an OlaMovies main site search continues after the hop. No hardcoded mirror list—one resolve path from the official portal into the catalog.

This page is only the portal hop.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Which portals does this landing bypass support?',
    answer:
      'The official portal hosts listed on this page. Those pages publish the live OlaMovies main site; the extension follows that pointer automatically.',
  },
  {
    question: 'Does Skip Wait find the OlaMovies current domain for me?',
    answer:
      'Yes for the portal hop. It reads current.php—the same source the site uses—then opens that main URL. You do not maintain a separate mirror list.',
  },
  {
    question: 'What if I open the portal with a movie search query?',
    answer:
      'If the portal URL includes a search query, Skip Wait preserves it on the destination so you land filtered for that query.',
  },
  {
    question: 'Does this skip Link Generator human checks?',
    answer:
      'No. This page is only the portal hop into the catalog. Human check and Verify to generate link are covered on the separate Link Generator bypass page.',
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
