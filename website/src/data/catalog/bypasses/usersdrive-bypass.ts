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

const intro = "UsersDrive bypass skips the create download link countdown timer and opens your direct CDN download URL from this file hosting service instantly. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "UsersDrive puts a countdown timer or unlock delay in front of the continue or get link step. A UsersDrive bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The UsersDrive bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for UsersDrive.",
  },
  {
    title: "Open a supported link",
    body: "Open a UsersDrive link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported UsersDrive delay.",
  },
];

const skips = [
  "Countdown timers on unlock pages",
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
