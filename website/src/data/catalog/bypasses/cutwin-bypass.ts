import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Cutwin";

const bypassType = "Skip Waiting Page";

const description = "Cutwin bypass skips the blog waiting page gate and unlocks your destination link from this cut URL style shortener automatically and instantly.";

const domains = [
  "masrawytrend.com",
] as const;

const keywords = [
  "cutwin bypass",
  "Cutwin bypass extension",
  "cutwin timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Cutwin bypass skips the blog waiting page gate and unlocks your destination link from this cut URL style shortener automatically and instantly. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Cutwin places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "When the waiting page loads, Skip Wait runs in the background, skips the delay layer, and sends you straight to the target URL supported for Cutwin.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Cutwin bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Cutwin.",
  },
  {
    title: "Open a supported link",
    body: "Open a Cutwin link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Cutwin delay.",
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
    question: "What blog waiting gate does Skip Wait bypass on Cutwin-style links?",
    answer: "Skip Wait skips the blog waiting page gate on Cutwin cut-URL shorteners and unlocks your destination link from masrawytrend.com automatically.",
  },
  {
    question: "Does Skip Wait work on masrawytrend.com Cutwin pages?",
    answer: "Yes. When the waiting page loads on supported Cutwin hosts, the extension bypasses the delay layer and redirects to your target URL.",
  },
  {
    question: "Can I reach my destination without the Cutwin please wait screen?",
    answer: "Yes. Gate pages and manual continue button loops are skipped so you go straight to the destination link.",
  },
  {
    question: "Is the Cutwin bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Cutwin bypass runs on supported pages with no account or paid plan required.",
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
