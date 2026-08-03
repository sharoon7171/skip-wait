import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Exe.io";

const bypassType = "Skip Waiting Page";

const description = "Exe.io bypass skips gate screens, captcha waits, and countdown timers on this popular ad link shortener for instant redirect to your destination URL.";

const domains = [
  "exe.io",
  "exeygo.com",
] as const;

const keywords = [
  "exe.io bypass",
  "Exe.io bypass extension",
  "exe.io timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Exe.io bypass skips gate screens, captcha waits, and countdown timers on this popular ad link shortener for instant redirect to your destination URL. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Exe.io places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "Skip Wait detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Exe.io bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Exe.io.",
  },
  {
    title: "Open a supported link",
    body: "Open a Exe.io link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Exe.io delay.",
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
    question: "Which Exe.io gate screens does Skip Wait bypass?",
    answer: "Skip Wait bypasses gate screens, captcha waits, and countdown timers on exe.io and exeygo.com for instant redirect to your destination URL.",
  },
  {
    question: "Does Skip Wait handle captcha waits on exe.io and exeygo.com links?",
    answer: "The extension detects waiting pages on both domains and bypasses please wait steps while handling captcha gates when they appear on the flow.",
  },
  {
    question: "Can I skip countdown timers on this popular ad link shortener?",
    answer: "Yes. Manual continue button loops and gate pages before the destination are skipped automatically on supported Exe.io URLs.",
  },
  {
    question: "Is the Exe.io bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Exe.io bypass runs on supported pages with no account or paid plan required.",
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
