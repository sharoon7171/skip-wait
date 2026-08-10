import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Sub4Unlock.io';

const bypassType = 'Skip Waiting Page';

const description =
  'Sub4Unlock.io bypass skips locked Unlock Link actions—YouTube subscribe variants, Instagram/Facebook/Twitter follow, Telegram and Discord join—plus client timers so the href on Unlock Link opens without finishing every step.';

const domains = [
  'sub4unlock.io',
  'sub2unlock.io',
] as const;

const keywords = [
  'sub4unlock.io bypass',
  'Sub4Unlock.io bypass extension',
  'sub4unlock io bypass',
  'sub4unlock.io timer bypass',
  'sub4unlock.io social unlock',
  'sub2unlock.io bypass',
  'Sub2Unlock bypass extension',
  'sub2unlock io bypass',
  'sub4unlock youtube telegram discord',
  'sub4unlock instagram facebook twitter',
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
  'Searching for a Sub4Unlock.io bypass or Sub2Unlock.io bypass usually means Unlock Link stayed disabled until YouTube subscribe variants, Instagram/Facebook/Twitter follow, and Telegram or Discord joins finished—plus a client timer on each lock. Skip Wait is the free Chrome extension that reads the destination href on Unlock Link so skip waiting page busywork is not a chat-join marathon.';

const body = `## Unlock Link locked behind chat joins and video actions

The .io unlock hosts center on one control: Unlock Link. Creators can require YouTube subscribe, a second subscribe, like and subscribe, sub and hit bell, like, or like and comment; Instagram, Facebook, and Twitter follow; then Telegram and Discord joins—sometimes a second Telegram—before the button’s href is usable. Each locked action often carries its own progress timer. That mix of chat joins plus Unlock Link is why Sub4Unlock.io social unlock searches feel different from a ten-slot checklist or a YouTube-only .com locker.

The destination is the href already on Unlock Link. The product is keeping that control locked until every chosen action clears.

### Controls and joins this host family emphasizes

- YouTube subscribe variants, like, and like-and-comment
- Instagram, Facebook, and Twitter follow
- Telegram and Discord join (including a second Telegram)
- Locked-action progress timers before Unlock Link

## Taking the href when Unlock Link already has it

When the Unlock Link control has a destination href, Skip Wait reads it and redirects without waiting through each locked-action timer.

You open the same share you received—no paste decoder. That is a Sub4Unlock.io bypass extension for Unlock Link pages (including the paired Sub2Unlock .io host). Creator lockers that greenlight YouTube blocks on the .
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Which unlock actions does Skip Wait cover on Sub4Unlock.io?',
    answer:
      'YouTube subscribe variants, like, and like-and-comment; Instagram, Facebook, and Twitter follow; Telegram and Discord join; plus locked-action timers on supported .io unlock pages.',
  },
  {
    question: 'What does Skip Wait actually open?',
    answer:
      'The destination href already present on the Unlock Link control—after client lock timers and action busywork are cleared.',
  },
  {
    question: 'Does this also cover Sub2Unlock on .io?',
    answer:
      'Yes. This catalog entry covers both Sub4Unlock and Sub2Unlock on the .io hosts that share the Unlock Link pattern.',
  },
  {
    question: 'Is this the same as multi-slot Sub4Unlock checklists?',
    answer:
      'No. This flow is Unlock Link plus chat joins and video actions. Multi-slot password checklists live on separate product hosts.',
  },
  {
    question: 'Is the Sub4Unlock.io bypass free?',
    answer:
      'Yes. Skip Wait is free. The .io unlock path runs on supported pages with no paid plan.',
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
