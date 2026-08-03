import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Tfly";

const bypassType = "Skip Waiting Page";

const description = "Tfly bypass skips the continue gate, captcha screen, and unlock countdown on this link shortener for instant redirect to your destination URL.";

const domains = [
  "tfly.link",
] as const;

const keywords = [
  "tfly bypass",
  "Tfly bypass extension",
  "tfly timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Tfly bypass skips the continue gate, captcha screen, and unlock countdown on this link shortener for instant redirect to your destination URL. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Tfly places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "When the waiting page loads, Skip Wait runs in the background, skips the delay layer, and sends you straight to the target URL supported for Tfly.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Tfly bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Tfly.",
  },
  {
    title: "Open a supported link",
    body: "Open a Tfly link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Tfly delay.",
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
    question: "What continue gate and captcha does Skip Wait handle on tfly.link?",
    answer: "Skip Wait skips the continue gate, captcha screen, and unlock countdown on tfly.link for instant redirect to your link.",
  },
  {
    question: "Does Skip Wait skip the unlock countdown on Tfly shorteners?",
    answer: "Yes. Gate pages and manual continue button loops are bypassed automatically when you open a Tfly monetized URL.",
  },
  {
    question: "How quickly can I reach my link from a Tfly monetized URL?",
    answer: "When the waiting page loads, the extension bypasses the delay layer and sends you straight to the destination without repeated clicks.",
  },
  {
    question: "Is the Tfly bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Tfly bypass runs on supported pages with no account or paid plan required.",
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
