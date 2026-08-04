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

const howItWorks = "Skip Wait posts the create-download form, reads the userdrive.org CDN URL from the response, blocks ad mediator popups, and starts that file download from the branded button.";

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
    body: "Open a UsersDrive file page the same way you usually do. Complete Turnstile if it appears.",
  },
  {
    title: "Click the branded Free Download button",
    body: "Skip Wait replaces Create Download Link with a branded button and downloads from the real CDN—no mediator or waiting page.",
  },
];

const skips = [
  "Create Download Link countdown",
  "Ad mediator popups on download click",
  "Intermediate create-link HTML page",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What create download link countdown does Skip Wait skip on UsersDrive?",
    answer: "Skip Wait bypasses the create download link countdown on usersdrive.com, resolves the dns*.userdrive.org CDN file URL, and starts that download.",
  },
  {
    question: "Does Skip Wait open direct CDN download URLs from usersdrive.com?",
    answer: "Yes. It posts the download2 form after Turnstile, reads the userdrive.org /d/ link from the response, and downloads that file—not an ad mediator.",
  },
  {
    question: "How does Skip Wait speed up file downloads from this hosting service?",
    answer: "The extension removes the timer UI, brands the download button, blocks alveridium-style mediator popups, and clicks the real CDN URL.",
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
