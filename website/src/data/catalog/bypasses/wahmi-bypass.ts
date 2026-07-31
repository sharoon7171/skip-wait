import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Wahmi";

const bypassType = "Skip Countdown";

const description = "Wahmi bypass skips the file download countdown timer and shows your direct download link immediately on this free file host without waiting.";

const domains = [
  "wahmi.org",
] as const;

const keywords = [
  "wahmi bypass",
  "Wahmi bypass extension",
  "wahmi timer bypass",
  "skip countdown",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "countdown timer bypass",
  "skip timer unlock",
] as const;

const intro = "Waiting on Wahmi unlock countdowns adds up fast. Skip Wait bypasses the timer on the supported website and continues the flow automatically when the site allows it.";

const problem = "Wahmi puts a countdown timer or unlock delay in front of the continue or get link step. A Wahmi bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Install Skip Wait, browse to a supported Wahmi page, and use the site normally. Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Wahmi bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Wahmi; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Wahmi link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Wahmi delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Wahmi skip countdown flows",
  "Unlock countdown timers",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What file download countdown does Skip Wait skip on wahmi.org?",
    answer: "Skip Wait bypasses the file download countdown timer on wahmi.org and shows your direct download link immediately.",
  },
  {
    question: "Does Skip Wait show my direct download link immediately on Wahmi?",
    answer: "Yes. get link delay screens and unlock countdown timers are bypassed on this free file host.",
  },
  {
    question: "How does Skip Wait help with free file host downloads on Wahmi?",
    answer: "The extension continues the flow automatically when the site allows it, skipping the timer that normally blocks the download link.",
  },
  {
    question: "Is the Wahmi bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Wahmi bypass runs on supported pages with no account or paid plan required.",
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
