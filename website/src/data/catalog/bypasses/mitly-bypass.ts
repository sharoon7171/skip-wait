import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Mitly";

const bypassType = "Skip Countdown";

const description = "Mitly bypass skips the gate wait, captcha screen, and countdown timer on this link shortener for instant unlock of your destination URL every time.";

const domains = [
  "mitly.us",
] as const;

const keywords = [
  "mitly bypass",
  "Mitly bypass extension",
  "mitly timer bypass",
  "skip countdown",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "countdown timer bypass",
  "skip timer unlock",
] as const;

const intro = "Mitly bypass skips the gate wait, captcha screen, and countdown timer on this link shortener for instant unlock of your destination URL every time. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Mitly puts a countdown timer or unlock delay in front of the continue or get link step. A Mitly bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Mitly bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Mitly.",
  },
  {
    title: "Open a supported link",
    body: "Open a Mitly link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Mitly delay.",
  },
];

const skips = [
  "Countdown timers on unlock pages",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What gate wait and captcha screen does Skip Wait skip on mitly.us?",
    answer: "Skip Wait bypasses the gate wait, captcha screen, and countdown timer on mitly.us for instant unlock of your destination URL.",
  },
  {
    question: "How quickly can Skip Wait unlock my destination from a Mitly short link?",
    answer: "When the Mitly page loads, the extension automates the countdown bypass and continues the flow without you waiting through each step.",
  },
  {
    question: "Does Skip Wait bypass the Mitly countdown timer automatically?",
    answer: "Yes. get link delay screens and unlock countdown timers on mitly.us are handled automatically by the extension.",
  },
  {
    question: "Is the Mitly bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Mitly bypass runs on supported pages with no account or paid plan required.",
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
