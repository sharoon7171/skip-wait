import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Ouo";

const bypassType = "Skip Countdown";

const description = "Ouo bypass skips the get link countdown timer and continue button waits on ad link shorteners for instant redirect to your destination URL every time.";

const domains = [
  "ouo.io",
  "ouo.press",
] as const;

const keywords = [
  "ouo bypass",
  "ouo.io bypass",
  "bypass ouo",
  "skip ouo",
  "ouo skip",
  "ouo.press bypass",
  "ouo timer bypass",
  "ouo get link bypass",
  "ouo chrome extension",
] as const;

const intro = "Ouo bypass skips the get link countdown timer and continue button waits on ad link shorteners for instant redirect to your destination URL every time. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Ouo puts a countdown timer or unlock delay in front of the continue or get link step. A Ouo bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Unlock timers on 2 supported websites no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Ouo bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Ouo.",
  },
  {
    title: "Open a supported link",
    body: "Open a Ouo link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Ouo delay.",
  },
];

const skips = [
  "Countdown timers on unlock pages",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which Ouo domains like ouo.io and ouo.press does Skip Wait cover?",
    answer: "Skip Wait supports both ouo.io and ouo.press, bypassing get link countdown timers and continue button waits on each.",
  },
  {
    question: "What get link countdown does Skip Wait skip on Ouo shorteners?",
    answer: "The unlock countdown timer and get link delay screens on Ouo ad link shorteners are bypassed for instant redirect to your destination.",
  },
  {
    question: "Does Skip Wait bypass continue button waits on Ouo ad links?",
    answer: "Yes. The extension activates on Ouo countdown flows and automates the wait so your destination URL opens faster.",
  },
  {
    question: "Is the Ouo bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Ouo bypass runs on supported pages with no account or paid plan required.",
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
