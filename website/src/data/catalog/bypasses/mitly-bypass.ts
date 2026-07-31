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

const intro = "Waiting on Mitly unlock countdowns adds up fast. Skip Wait bypasses the timer on the supported website and continues the flow automatically when the site allows it.";

const problem = "Mitly puts a countdown timer or unlock delay in front of the continue or get link step. A Mitly bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Install Skip Wait, browse to a supported Mitly page, and use the site normally. Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Mitly bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Mitly; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Mitly link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Mitly delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Mitly skip countdown flows",
  "Unlock countdown timers",
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
