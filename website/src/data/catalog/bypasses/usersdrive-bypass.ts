import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "UsersDrive";

const bypassType = "Skip Countdown";

const description = "UsersDrive bypass skips the create download link countdown timer and opens your direct CDN download URL from this file hosting service instantly.";

const domains = [
  "usersdrive.com",
] as const;

const keywords = [
  "usersdrive bypass",
  "UsersDrive bypass extension",
  "usersdrive timer bypass",
  "skip countdown",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "countdown timer bypass",
  "skip timer unlock",
] as const;

const intro = "UsersDrive countdown timers are a common reason people search for a bypass extension. Skip Wait skips those timer screens on the supported website and unlocks the link or download step faster.";

const problem = "UsersDrive puts a countdown timer or unlock delay in front of the continue or get link step. A UsersDrive bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Install Skip Wait, browse to a supported UsersDrive page, and use the site normally. Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the UsersDrive bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for UsersDrive; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a UsersDrive link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported UsersDrive delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "UsersDrive skip countdown flows",
  "Unlock countdown timers",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What create download link countdown does Skip Wait skip on UsersDrive?",
    answer: "Skip Wait bypasses the create download link countdown timer on usersdrive.com and opens your direct CDN download URL.",
  },
  {
    question: "Does Skip Wait open direct CDN download URLs from usersdrive.com?",
    answer: "Yes. Unlock countdown timers and get link delay screens are bypassed so the CDN link appears without the full wait.",
  },
  {
    question: "How does Skip Wait speed up file downloads from this hosting service?",
    answer: "The extension activates on UsersDrive countdown flows and automates the wait so you reach the download link step faster.",
  },
  {
    question: "Is the UsersDrive bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The UsersDrive bypass runs on supported pages with no account or paid plan required.",
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
