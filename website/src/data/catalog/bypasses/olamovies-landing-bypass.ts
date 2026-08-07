import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = 'OlaMovies Landing';

const bypassType = 'Skip Landing Wait';

const description =
  'OlaMovies Landing bypass skips the official portal landing page and opens the current OlaMovies main site automatically, with no View Main Site click, VPN modal, or domain hunt delay.';

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
  'Looking for the OlaMovies official website without bouncing through a marketing portal? The OlaMovies Landing bypass in Skip Wait skips the official portal landing wait and opens the live OlaMovies main site the moment the portal loads. People search for the OlaMovies official domain, OlaMovies new domain, and OlaMovies current domain after ISP blocks and domain rotations. This extension follows the portal’s own current.php pointer so you reach the OlaMovies movie site instantly instead of hunting mirrors or tapping View Main Site.';

const problem =
  'OlaMovies rotates domains often, so visitors land on a portal instead of the catalog. That page stalls you behind View Main Site, a VPN modal, and brand copy about the OlaMovies official website while the real main site URL sits behind a server redirect. Searching ola movies, OlaMovies new domain, or OlaMovies official domain still drops you on that waiting page before any movie listing loads.';

const howItWorks =
  'On supported OlaMovies portal hosts, Skip Wait reads the same current.php endpoint the site uses to publish its live main site URL, then replaces the landing page with that destination. Search queries on the portal are preserved so an OlaMovies main site search continues after the hop. No hardcoded mirror list and no fallback domains: one resolve path from the official portal into the current catalog host.';

const steps: readonly BypassStep[] = [
  {
    title: 'Add Skip Wait to Chrome',
    body: 'Install Skip Wait from the Chrome Web Store. The OlaMovies Landing bypass turns on automatically for supported portal hosts, with no account or paste tool.',
  },
  {
    title: 'Keep the extension enabled',
    body: 'Leave Skip Wait on. There is nothing to configure for the OlaMovies portal bypass or landing page skip.',
  },
  {
    title: 'Open the OlaMovies official portal',
    body: 'Visit the OlaMovies official portal the way you usually open the official website. If you used a search link, keep the search query. Skip Wait forwards it to the main site.',
  },
  {
    title: 'Reach the OlaMovies movie site faster',
    body: 'Skip Wait resolves the OlaMovies current domain from current.php and opens the live catalog immediately, skipping View Main Site and the VPN modal delay.',
  },
];

const skips = [
  'Official portal landing waits before the catalog',
  'View Main Site click gates before the catalog',
  'VPN modal interruption after the portal CTA',
  'Manual hunting for the OlaMovies new domain or official domain',
  'Stale bookmark delays when the OlaMovies current domain rotates',
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: 'Which OlaMovies portals does this landing page bypass support?',
    answer:
      'Skip Wait supports the official portal hosts listed on this page. Those pages redirect or publish the live OlaMovies main site; the extension follows that pointer automatically.',
  },
  {
    question: 'Does Skip Wait find the OlaMovies official domain or new domain for me?',
    answer:
      'Yes for the portal hop. It reads the portal’s current.php response, the same source the site uses for its OlaMovies current domain, then opens that main site URL. You do not need a separate mirror list.',
  },
  {
    question: 'What happens if I open the portal with a movie search query?',
    answer:
      'If the portal URL includes a search query, Skip Wait preserves that search on the destination so you land on the OlaMovies main site already filtered for your query.',
  },
  {
    question: 'Does this skip download short link timers on the Link Generator?',
    answer:
      'No. This page is only the portal landing hop into the live catalog. For the OlaMovies Link Generator human check and Verify to generate link wait, see the separate OlaMovies Link Generator bypass in the Skip Wait catalog.',
  },
  {
    question: 'Is the OlaMovies Landing bypass free with Skip Wait?',
    answer:
      'Yes. Skip Wait is a free Chrome extension. The OlaMovies Landing bypass runs on supported portal pages with no account or paid plan required.',
  },
  {
    question: 'Why do people search for multiple OlaMovies portal names together?',
    answer:
      'Portal hostnames rotate and redirect into each other as the public official website entry, while the catalog lives on a rotating main host. Skip Wait treats the supported portal hosts the same so either bookmark reaches the movie site without the landing delay.',
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
