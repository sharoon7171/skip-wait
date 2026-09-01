import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'ShortXLinks';

const bypassType = 'Skip Short Link';

const description =
  'ShortXLinks bypass skips the ad-hop detour and Too Early hold, then finishes Get Link unlock so the shared short URL opens the destination without babysitting every interstitial.';

const domains = ['shortxlinks.com', 'shortxlinks.in'] as const;

const keywords = [
  'shortxlinks bypass',
  'shortxlinks.in bypass',
  'shortxlinks.com bypass',
  'bypass shortxlinks',
  'skip shortxlinks',
  'shortxlinks timer bypass',
  'shortxlinks countdown bypass',
  'shortxlinks too early',
  'shortxlinks get link',
  'shortxlinks waiting page',
  'shortxlinks please wait',
  'shortxlinks unlock bypass',
  'shortxlinks chrome extension',
  'shortxlinks bypass chrome',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'get link shortener bypass',
  'short link bypass',
] as const;

const intro =
  'A ShortXLinks bypass matters when a shared short URL bounces you through ad interstitials and a Too Early lock before Get Link ever appears. Skip Wait is the Chrome extension that keeps you on the short-link unlock path, finishes the real hold, and opens the destination without walking every hop by hand.';

const body = `## Too Early before Get Link

A ShortXLinks share rarely opens the file in one click. The short URL first tries to dump you onto rotating ad pages. Come back too soon and the unlock screen says Too Early; wait long enough and Get Link finally shows. Leave mid-flow and the ShortXLinks waiting page can reset, which is the pain a shortxlinks timer bypass and shortxlinks countdown bypass are meant to clear.

Cosmetic Continue buttons and ad tours are not the destination. The real gate is the shortener’s unlock session: stay long enough for Too Early to clear, then Get Link can open the file.

### Stages people actually hit

- Short URL bounce toward ad interstitials instead of the file
- Too Early lock if unlock is opened before the session is ready
- Get Link / unlock countdown UI after the hold
- Manual reloads when a tab closes mid-wait

## Stay on the short-link unlock

Skip Wait treats ShortXLinks as a short-link unlock, not an ad crawl. It keeps the session on the shortener unlock path, covers the busy waiting UI, and holds only as long as Too Early still requires. When unlock is ready, it finishes Get Link and opens the destination already present there—including through ShortXLinks.in short links on the same path.

You do not babysit every interstitial Continue for this flow. The required unlock hold still finishes honestly so a shortxlinks please wait bypass stays stable instead of inventing a zero-second cheat that errors out.

## Live session vs a paste decoder

Unlock needs a live shortener session, not a frozen string from last week. Skip Wait runs inside Chrome on the short link, so rotating ad hosts do not force you to re-copy the alias into a third-party resolver. A shortxlinks chrome extension or skip wait extension install keeps that session on the tab until Get Link succeeds.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a ShortXLinks bypass actually skip?',
    answer:
      'It skips the ad-hop busywork and unlock UI hunting. The real Too Early hold still completes, then Get Link opens the destination.',
  },
  {
    question: 'Do I still visit the ad interstitial pages?',
    answer:
      'No. On supported ShortXLinks short links, Skip Wait stays on the unlock path and finishes there instead of walking every interstitial.',
  },
  {
    question: 'What does Too Early mean?',
    answer:
      'The unlock screen is not ready yet. Skip Wait waits that required hold, then continues—so the shortxlinks too early / shortxlinks timer bypass stays stable.',
  },
  {
    question: 'Is every timer removed instantly?',
    answer:
      'No. Forced ad hops and button hunting go away. When unlock still needs a real wait, Skip Wait stays on that step, then opens the link.',
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
