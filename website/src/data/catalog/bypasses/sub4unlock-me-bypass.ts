import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Sub4Unlock.me';

const bypassType = 'Skip Waiting Page';

const description =
  'Sub4Unlock.me bypass clears WhatsApp, Telegram, Discord, TikTok, Instagram, Facebook, Twitter, YouTube, custom link, password, and continue steps—plus the unlock countdown—so you reach the destination faster.';

const domains = ['sub4unlock.me', 'sub2unlock.me'] as const;

const keywords = [
  'sub4unlock.me bypass',
  'Sub4Unlock.me bypass extension',
  'sub4unlock me bypass',
  'sub4unlock.me timer bypass',
  'sub4unlock.me social unlock',
  'sub2unlock.me bypass',
  'Sub2Unlock.me bypass extension',
  'sub2unlock me bypass',
  'sub4unlock whatsapp telegram tiktok discord',
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
  'Searching for a Sub4Unlock.me bypass or Sub2Unlock.me bypass usually means a locker mixed WhatsApp, Telegram, Discord, and TikTok joins with Instagram/Facebook/Twitter follows, YouTube steps, custom links, a password, and an AdLinkFly-style countdown. Skip Wait is the Chrome extension that completes the supported unlock path so please wait bypass busywork is not every chat app at once.';

const body = `## Chat apps and TikTok before the go-link countdown

A .me Sub4Unlock share rarely opens in one step. Creators can require WhatsApp, Telegram, or Discord joins; TikTok follow or like; Instagram, Facebook, or Twitter actions; YouTube subscribe/like/comment; custom link visits; continue hops; and a password—then an AdLinkFly-style countdown still sits in front of the URL. Miss one messenger join or fight overlays on every gate and you restart the locker from scratch—why Sub4Unlock.me timer bypass and sub4unlock whatsapp telegram tiktok discord searches feel heavier than a single Unlock Link button.

The go-link form already knows the destination. The product is the cross-app locker plus countdown.

### Locker pieces that show up together on .me

- WhatsApp, Telegram, and Discord join requirements
- TikTok follow or like gates next to Instagram/Facebook/Twitter
- YouTube subscribe, like, and comment locks
- Custom links, continue steps, password, and unlock countdowns

## Completing the server unlock path on the go page

Skip Wait’s Sub4Unlock.me support runs on the unlock page inside Chrome. When the locker or go-link form is present, it completes the server unlock path the page already expects, then redirects to the destination without finishing each social action manually.

Client-only busywork gets out of the way; required checks still finish honestly. That is a full skip waiting page path for the .me host family (including Sub2Unlock on the same pattern)—not a ten-slot password checklist on other Sub4Unlock product hosts.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What is a Sub4Unlock.me bypass?',
    answer:
      'It is a way to skip the cross-app social locker and unlock countdown on Sub4Unlock.me-style shares. Skip Wait completes the supported unlock path in Chrome and opens the destination.',
  },
  {
    question: 'Which locker actions does Skip Wait cover?',
    answer:
      'WhatsApp, Telegram, and Discord joins; TikTok, Instagram, Facebook, and Twitter follow or like; YouTube subscribe, like, and comment; custom links; continue steps; password; and the AdLinkFly-style unlock countdown on supported .me pages.',
  },
  {
    question: 'Does Skip Wait skip every social task instantly?',
    answer:
      'It removes busywork and client-only delays. When a step still requires a real unlock before redirect, Skip Wait stays until allowed, then continues—so the timer bypass stays reliable.',
  },
  {
    question: 'Is Sub2Unlock on .me covered here?',
    answer:
      'Yes. This catalog entry covers both Sub4Unlock and Sub2Unlock on the .me hosts that share this locker pattern.',
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
