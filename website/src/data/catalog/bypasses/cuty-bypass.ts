import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Cuty";

const bypassType = "Skip Countdown";

const description = "Cuty bypass skips the continue button countdown timer on this link shortener and unlocks your destination after captcha when required, instantly.";

const domains = [
  "cuttty.com",
] as const;

const keywords = [
  "cuty bypass",
  "Cuty bypass extension",
  "cuty timer bypass",
  "skip countdown",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "countdown timer bypass",
  "skip timer unlock",
] as const;

const intro = "Cuty bypass skips the continue button countdown timer on this link shortener and unlocks your destination after captcha when required, instantly. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Cuty puts a countdown timer or unlock delay in front of the continue or get link step. A Cuty bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Cuty bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Cuty.",
  },
  {
    title: "Open a supported link",
    body: "Open a Cuty link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Cuty delay.",
  },
];

const skips = [
  "Countdown timers on unlock pages",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What countdown does Skip Wait skip on cuttty.com links?",
    answer: "Skip Wait bypasses the continue button countdown timer on cuttty.com and unlocks your destination, completing captcha steps when the site requires them.",
  },
  {
    question: "Do I still need to solve captcha on Cuty links with Skip Wait?",
    answer: "When Cuty requires captcha verification, you complete it and Skip Wait handles the countdown bypass and link unlock afterward.",
  },
  {
    question: "How does Skip Wait unlock the destination after the Cuty continue button timer?",
    answer: "The extension activates on Cuty countdown flows and bypasses or automates the get link delay so your destination opens faster.",
  },
  {
    question: "Is the Cuty bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Cuty bypass runs on supported pages with no account or paid plan required.",
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
