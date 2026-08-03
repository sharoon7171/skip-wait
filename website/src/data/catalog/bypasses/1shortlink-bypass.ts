import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "1shortlink";

const bypassType = "Skip Waiting Page";

const description = "1shortlink bypass skips the please wait page on this ad link shortener and redirects you to the real destination URL instantly without delay.";

const domains = [
  "1shortlink.com",
] as const;

const keywords = [
  "1shortlink bypass",
  "1shortlink bypass extension",
  "1shortlink timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "1shortlink bypass skips the please wait page on this ad link shortener and redirects you to the real destination URL instantly without delay. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "1shortlink places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "When the waiting page loads, Skip Wait runs in the background, skips the delay layer, and sends you straight to the target URL supported for 1shortlink.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The 1shortlink bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for 1shortlink.",
  },
  {
    title: "Open a supported link",
    body: "Open a 1shortlink link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported 1shortlink delay.",
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
    question: "What happens when I open a 1shortlink.com link with Skip Wait?",
    answer: "Skip Wait detects the please wait page on 1shortlink.com, bypasses the delay layer in the background, and redirects you straight to the real destination URL without asking you to click continue.",
  },
  {
    question: "Do I still need to click Continue on 1shortlink gate screens?",
    answer: "No. Skip Wait skips the manual continue button loops and gate pages that normally sit between the short link and your target URL on 1shortlink.",
  },
  {
    question: "Where does Skip Wait send me after bypassing a 1shortlink wait?",
    answer: "You land on the actual long URL behind the shortener, the same destination the please wait screen was blocking, opened instantly instead of after a timed gate.",
  },
  {
    question: "Is the 1shortlink bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The 1shortlink bypass runs on supported pages with no account or paid plan required.",
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
