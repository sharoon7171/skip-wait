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

const intro = "Cuty countdown timers are a common reason people search for a bypass extension. Skip Wait skips those timer screens on the supported website and unlocks the link or download step faster.";

const problem = "Cuty puts a countdown timer or unlock delay in front of the continue or get link step. A Cuty bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Install Skip Wait, browse to a supported Cuty page, and use the site normally. Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Cuty bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Cuty; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Cuty link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Cuty delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Cuty skip countdown flows",
  "Unlock countdown timers",
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
