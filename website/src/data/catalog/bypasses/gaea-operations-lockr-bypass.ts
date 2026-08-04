import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Gaea Operations / Lockr";

const bypassType = "Skip Content Locker";

const description = "Gaea Operations Lockr bypass skips content locker tasks, Discord gates, and unlock wait timers on Lockr links so your destination opens automatically without waiting.";

const domains = [
  "lockr.net",
  "lockr.so",
] as const;

const keywords = [
  "lockr bypass",
  "Lockr bypass extension",
  "gaea operations lockr bypass",
  "gaea lockr bypass",
  "lockr.net bypass",
  "lockr.so bypass",
  "skip content locker",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "content locker bypass",
] as const;

const intro = "Gaea Operations Lockr bypass skips content locker tasks, Discord gates, and unlock wait timers on Lockr links so your destination opens automatically without waiting. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Lockr (Gaea Operations) locks the destination behind tasks, Discord joins, adblock checks, and a long unlock wait. A Lockr bypass removes that gate so the target opens without completing those steps.";

const howItWorks = "When a Lockr locker page loads, Skip Wait unlocks the destination in the background and redirects you straight to the target URL on lockr.net and lockr.so.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Gaea Operations / Lockr bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Lockr.",
  },
  {
    title: "Open a supported link",
    body: "Open a Lockr link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Lockr delay.",
  },
];

const skips = [
  "Content locker tasks and Discord gates",
  "Adblock detection gates",
  "Locker unlock wait timers",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What is Gaea Operations / Lockr?",
    answer: "Lockr is the content locker product operated by Gaea Operations GmbH on lockr.net and lockr.so.",
  },
  {
    question: "What does Skip Wait skip on Lockr locker pages?",
    answer: "Skip Wait bypasses content locker tasks, Discord gates, adblock checks, and unlock wait timers on lockr.net and lockr.so so the destination opens automatically.",
  },
  {
    question: "Does Skip Wait work on both lockr.net and lockr.so?",
    answer: "Yes. Both lockr.net and lockr.so are supported hosts for the Gaea Operations / Lockr bypass.",
  },
  {
    question: "Is the Gaea Operations / Lockr bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Lockr bypass runs on supported pages with no account or paid plan required.",
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
