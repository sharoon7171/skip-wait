import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Mirrored.to";

const bypassType = "Skip Countdown";

const description = "Mirrored.to bypass skips the mirror files countdown and interstitial wait so you reach host download links from this mirror aggregator faster.";

const domains = [
  "mirrored.to",
] as const;

const keywords = [
  "mirrored.to bypass",
  "Mirrored.to bypass extension",
  "mirrored.to timer bypass",
  "skip countdown",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "countdown timer bypass",
  "skip timer unlock",
] as const;

const intro = "Mirrored.to countdown timers are a common reason people search for a bypass extension. Skip Wait skips those timer screens on the supported website and unlocks the link or download step faster.";

const problem = "Mirrored.to puts a countdown timer or unlock delay in front of the continue or get link step. A Mirrored.to bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Install Skip Wait, browse to a supported Mirrored.to page, and use the site normally. Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Mirrored.to bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Mirrored.to; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Mirrored.to link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Mirrored.to delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Mirrored.to skip countdown flows",
  "Unlock countdown timers",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What mirror files countdown does Skip Wait skip on mirrored.to?",
    answer: "Skip Wait bypasses the mirror files countdown and interstitial wait on mirrored.to so you reach host download links from this aggregator faster.",
  },
  {
    question: "Can I reach host download links faster from this mirror aggregator?",
    answer: "Yes. Unlock countdown timers and get link delay screens are skipped so mirror host links appear without the usual interstitial wait.",
  },
  {
    question: "Does Skip Wait bypass interstitial waits on Mirrored.to?",
    answer: "Yes. The extension activates on Mirrored.to countdown flows and continues automatically when the site allows the bypass.",
  },
  {
    question: "Is the Mirrored.to bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Mirrored.to bypass runs on supported pages with no account or paid plan required.",
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
