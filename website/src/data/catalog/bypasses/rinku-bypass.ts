import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Rinku";

const bypassType = "Skip Short Link";

const description = "Rinku bypass skips landing page countdowns, captcha gates, and unlock timers on this link shortener for redirect to your destination URL faster.";

const domains = [
  "excelad.top",
  "7mb.io",
  "rinku.pro",
  "rinku.me",
] as const;

const keywords = [
  "rinku bypass",
  "Rinku bypass extension",
  "rinku timer bypass",
  "skip short link",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "ad link bypass",
  "short link bypass",
  "monetized link bypass",
] as const;

const intro = "Rinku bypass skips landing page countdowns, captcha gates, and unlock timers on this link shortener for redirect to your destination URL faster. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Rinku monetized short links chain gate pages, captcha screens, and unlock timers before the destination.";

const howItWorks = "Skip Wait bypasses countdown timers, go pages, and captcha follow ups on supported Rinku URLs, then opens the final destination automatically.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Rinku bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Rinku.",
  },
  {
    title: "Open a supported link",
    body: "Open a Rinku link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Rinku delay.",
  },
];

const skips = [
  "Short-link verification gates",
  "Ad link countdown timers",
  "Go page and unlock redirect hops",
  "Short link verification steps before the destination",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which Rinku domains like rinku.pro and rinku.me does Skip Wait support?",
    answer: "Skip Wait covers excelad.top, 7mb.io, rinku.pro, and rinku.me, bypassing landing page countdowns and unlock timers on all four.",
  },
  {
    question: "What landing page countdowns does Skip Wait skip on Rinku links?",
    answer: "Landing page countdowns, captcha gates, and go page redirect hops are automated until your destination URL opens.",
  },
  {
    question: "Does Skip Wait handle captcha gates on Rinku shorteners?",
    answer: "Yes. The extension bypasses countdown timers and handles captcha follow-ups on supported Rinku URLs, then opens the final destination.",
  },
  {
    question: "Is the Rinku bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Rinku bypass runs on supported pages with no account or paid plan required.",
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
