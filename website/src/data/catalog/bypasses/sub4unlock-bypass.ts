import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Sub4Unlock";

const bypassType = "Skip Waiting Page";

const description = "Sub4Unlock bypass skips all creator task slots on sub4unlock.com and sub4unlock.pro—subscribe, follow, join, like, comment, custom links, countdowns, and password gates—for instant redirect to your destination URL.";

const domains = [
  "sub4unlock.com",
  "sub4unlock.pro",
] as const;

const keywords = [
  "sub4unlock bypass",
  "Sub4Unlock bypass extension",
  "sub4unlock.com bypass",
  "sub4unlock.pro bypass",
  "sub4unlock timer bypass",
  "sub4unlock password bypass",
  "sub4unlock social unlock",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Sub4Unlock bypass skips all creator task slots on sub4unlock.com and sub4unlock.pro—subscribe, follow, join, like, comment, custom links, countdowns, and password gates—for instant redirect to your destination URL. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Sub4Unlock on .com and .pro can require up to ten actions before the destination—subscribe, follow, join, like, comment, or custom links—then countdown waits and an optional password screen.";

const howItWorks = "Com or .pro. The extension matches the unlock pages, reads the destination already on the page, and redirects you without requiring each task slot to be completed.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Sub4Unlock bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Sub4Unlock.",
  },
  {
    title: "Open a supported link",
    body: "Open a Sub4Unlock link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Sub4Unlock delay.",
  },
];

const skips = [
  "All url1–url10 creator task slots (subscribe, follow, join, like, comment, custom)",
  "Countdown waits before Get Link",
  "Password and code gates on the final page",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which unlock actions does Skip Wait cover on Sub4Unlock?",
    answer: "Every creator task slot on supported pages—subscribe, follow, join, like, comment, custom links—plus countdown waits and password gates on sub4unlock.com and sub4unlock.pro.",
  },
  {
    question: "Does Skip Wait jump straight to the destination from Sub4Unlock short links?",
    answer: "Yes. Supported /S/, LP, and LPD unlock pages are handled so you reach the destination without completing the full action list.",
  },
  {
    question: "Which Sub4Unlock domains does this bypass cover?",
    answer: "This entry covers sub4unlock.com and sub4unlock.pro. Separate catalog pages cover sub4unlock.me and sub4unlock.io.",
  },
  {
    question: "Is the Sub4Unlock bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Sub4Unlock bypass runs on supported pages with no account or paid plan required.",
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
