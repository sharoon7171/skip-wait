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

const intro = "Mirrored.to bypass skips the mirror files countdown and interstitial wait so you reach host download links from this mirror aggregator faster. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Mirrored.to puts a countdown timer or unlock delay in front of the continue or get link step. A Mirrored.to bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Skip Wait removes unlock timers on Mirrored.to so get-link and continue steps are no longer blocked.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Mirrored.to bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Mirrored.to.",
  },
  {
    title: "Open a supported link",
    body: "Open a Mirrored.to link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Mirrored.to delay.",
  },
];

const skips = [
  "Countdown timers on unlock pages",
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
