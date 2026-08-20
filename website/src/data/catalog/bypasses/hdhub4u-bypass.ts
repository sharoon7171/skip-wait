import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'HDHub4u';

const bypassType = 'Skip Landing Wait';

const description =
  'HDHub4u bypass that clears the entry-page mirror wait and opens the current working catalog host so you reach movies and downloads without sitting on the connection screen.';

const domains = [
  'hdhub4u.med',
  'hdhub4u.catering',
  'hdhub4u.ec',
  'hdhub4u.gd',
  'hdhub4u.gives',
  'hdhub4u.glass',
  'hdhub4u.gs',
  'hdhub4u.hn',
  'hdhub4u.ht',
  'hdhub4u.insure',
] as const;

const keywords = [
  'hdhub4u bypass',
  'hdhub4u bypass chrome',
  'hdhub4u bypass extension',
  'bypass hdhub4u',
  'skip hdhub4u',
  'hdhub4u timer bypass',
  'hdhub4u landing bypass',
  'hdhub4u waiting page',
  'hdhub4u mirror bypass',
  'skip landing wait',
  'landing page bypass',
  'mirror site bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'skip wait extension',
] as const;

const intro =
  'Looking for an HDHub4u bypass or HDHub4u landing bypass usually means the entry URL parked you on a mirror wait before the catalog. Skip Wait is the $1/month Chrome extension that clears that landing delay and continues into the working mirror so movies and downloads load without the connection screen.';

const body = `## Entry URLs that stall before the catalog

HDHub4u bookmarks often open a landing wait first: connection delay, open-main-site countdown, rotating entry hosts that still show the same pause. The catalog is not broken—it is gated behind that mirror screen every visit.

That is why hdhub4u mirror bypass and skip landing wait searches spike next to generic landing page bypass queries. People want the working host, not another refresh loop.

### What the landing screen actually costs

- Connection delays before any title list appears
- Open-main-site countdowns on rotating entry hosts
- Manual mirror hunting when the wrong host is bookmarked
- Repeat waits on every return visit

## Clearing the wait into the live mirror

Skip Wait detects the landing pattern on supported entry hosts and advances past it into the current working mirror. You visit the entry URL the same way as always; the extension clears the delay so the catalog loads without babysitting the connection screen.

Supported entry hosts share that landing pattern, so one HDHub4u bypass extension install covers the list without per-mirror toggles.

## Bookmarks vs live entry behavior

Saving a random mirror still leaves you on landing waits when that host rotates. Skip Wait keeps skip landing wait inside Chrome so each visit reaches the live catalog instead of sitting on the entry delay.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does an HDHub4u bypass skip?',
    answer:
      'The landing-page mirror wait so the current working catalog opens without sitting on the entry connection delay.',
  },
  {
    question: 'Does it cover rotating entry hosts?',
    answer:
      'Yes for supported hosts that share the same landing pattern. Skip Wait advances past the delay into the working mirror on each listed entry.',
  },
  {
    question: 'Do I still open the landing URL myself?',
    answer:
      'Yes. Visit the entry page as usual. Skip Wait clears the wait and continues into the catalog.',
  },
  {
    question: 'What about blog waits after I pick a download?',
    answer:
      'Those mediator gates are a separate flow. Use the HDHub4u Mediator guide when a download hop parks you on a please-wait blog.',
  },
  {
    question: 'How much does Skip Wait cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup. The HDHub4u landing path runs on supported pages.',
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
