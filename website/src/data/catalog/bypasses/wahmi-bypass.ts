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

const intro = "Wahmi bypass skips the file download countdown timer and shows your direct download link immediately on this free file host without waiting. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Wahmi puts a countdown timer or unlock delay in front of the continue or get link step. A Wahmi bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Wahmi bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Wahmi.",
  },
  {
    title: "Open a supported link",
    body: "Open a Wahmi link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Wahmi delay.",
  },
];

const skips = [
  "Countdown timers on unlock pages",
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
