import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Shrtslug";

const bypassType = "Skip Waiting Page";

const description = "Shrtslug bypass skips the short link verify waiting page on this URL shortener and opens your destination link without any forced delay steps.";

const domains = [
  "shrtslug.biz",
] as const;

const keywords = [
  "shrtslug bypass",
  "Shrtslug bypass extension",
  "shrtslug timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Shrtslug bypass skips the short link verify waiting page on this URL shortener and opens your destination link without any forced delay steps. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Shrtslug places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "When the waiting page loads, Skip Wait runs in the background, skips the delay layer, and sends you straight to the target URL supported for Shrtslug.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Shrtslug bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Shrtslug.",
  },
  {
    title: "Open a supported link",
    body: "Open a Shrtslug link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Shrtslug delay.",
  },
];

const skips = [
  "Waiting pages and continue gates",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What short link verify waiting page does Skip Wait bypass on shrtslug.biz?",
    answer: "Skip Wait skips the short link verify waiting page on shrtslug.biz and opens your destination link without delay.",
  },
  {
    question: "Do I need to wait on Shrtslug gate screens with Skip Wait installed?",
    answer: "No. please wait and click-to-continue screens are bypassed automatically when you open a Shrtslug link.",
  },
  {
    question: "How quickly does Skip Wait open my destination from Shrtslug links?",
    answer: "When the waiting page loads, the extension runs in the background and redirects immediately to the target URL.",
  },
  {
    question: "Is the Shrtslug bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Shrtslug bypass runs on supported pages with no account or paid plan required.",
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
