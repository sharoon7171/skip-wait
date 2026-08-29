import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'MoviesMod';

const bypassType = 'Skip Timed Reveal';

const description =
  'MoviesMod bypass for WordPress timed-content waits: Skip Wait reveals already-rendered download and episode buttons instead of forcing a please-wait generate-links countdown.';

const domains = [
  'episodes.modpro.blog',
  'links.modpro.blog',
  'leechpro.blog',
] as const;

const keywords = [
  'moviesmod bypass',
  'leechpro bypass',
  'leechpro.blog bypass',
  'modpro timed content bypass',
  'skip timed reveal',
  'skip countdown timer',
  'bypass countdown timer',
  'please wait seconds bypass',
  'skip waiting page',
  'hidden download links unlock',
  'skip wait extension',
  'timed content plugin bypass',
] as const;

const intro =
  'People hunting a MoviesMod bypass or skip timed reveal usually opened an archive or episode post and watched please-wait generate-links instead of download buttons. Skip Wait is the $1.50/month Chrome extension that shows those already-rendered links as soon as the page loads.';

const body = `## Timed reveal that only hides CSS

MoviesMod-style blogs often wrap Fast Server and cloud drive buttons in a WordPress Timed Content block. The UI says wait N seconds to generate links, yet the buttons are already in the HTML—only CSS-hidden until a client clock flips classes. That fake delay is why modpro timed content bypass, please wait seconds bypass, and hidden download links unlock searches cluster around every new episode drop.

Nothing is being generated. The plugin is stalling visibility.

### Reveal vs real download waits

Timed Content is a client hide/show. Later shortener or host timers are separate. This page is only the first wall: get the server row visible without staring at generate-links chrome. Once you pick a button, other Skip Wait rules may apply on those destinations when supported.

## Flipping hide/show on load

Skip Wait’s MoviesMod support flips the Timed Content classes inside Chrome the moment a matching archive or episode page loads. The show block becomes visible; the wait message that lived in the hide block goes with it. No paste tool, no guessed server URLs—just skip timed reveal for links the page already had.

A timed content plugin bypass install stays useful across posts that reuse the same plugin pattern, which is why moviesmod bypass and leechpro bypass queries point at one extension instead of a userscript per blog.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a MoviesMod bypass reveal?',
    answer:
      'Download and episode buttons that WordPress Timed Content had CSS-hidden behind a please-wait generate-links message. Skip Wait shows that block on load.',
  },
  {
    question: 'Are the links already on the page during the timer?',
    answer:
      'Yes. They are rendered in the HTML and only hidden for a few seconds. The extension shows the block immediately.',
  },
  {
    question: 'Does the countdown text disappear too?',
    answer:
      'The wait message lives in the Timed Content hide block, so revealing the show block removes that UI with the links.',
  },
  {
    question: 'Do I need a per-blog toggle?',
    answer:
      'No. Leave Skip Wait enabled and open the post as usual. Timed-reveal support runs on matching pages automatically.',
  },
  {
    question: 'How much does the timed reveal bypass cost?',
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
