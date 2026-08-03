import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Pling / openDesktop";

const bypassType = "Direct Download";

const description = "Pling bypass skips the download redirect delay on openDesktop and KDE store pages so add ons and project files download immediately without waiting.";

const domains = [
  "addons.videolan.org",
  "opendesktop.org",
  "store.kde.org",
] as const;

const keywords = [
  "pling / opendesktop bypass",
  "Pling / openDesktop bypass extension",
  "pling / opendesktop timer bypass",
  "direct download",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "direct download bypass",
  "download timer skip",
  "file host bypass",
] as const;

const intro = "Pling bypass skips the download redirect delay on openDesktop and KDE store pages so add ons and project files download immediately without waiting. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Pling often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Skip Wait resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Pling / openDesktop bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Pling / openDesktop.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on Pling / openDesktop. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Pling / openDesktop delay.",
  },
];

const skips = [
  "Direct-download generating timers",
  "Download generating timers after button clicks",
  "Intermediary redirect pages before the file",
  "Extra wait screens on mirror and host buttons",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which stores like store.kde.org and opendesktop.org does Skip Wait support?",
    answer: "Skip Wait handles addons.videolan.org, opendesktop.org, and store.kde.org, skipping download redirect delays on all three.",
  },
  {
    question: "What download redirect delay does Skip Wait skip on Pling pages?",
    answer: "The redirect delay that sits between your download click and the file on openDesktop and KDE store pages is bypassed for immediate download.",
  },
  {
    question: "Can KDE add-ons and project files download immediately with Skip Wait?",
    answer: "Yes. The extension resolves real download URLs so add-ons and project files start downloading without a timer or redirect page.",
  },
  {
    question: "Is the Pling bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Pling bypass runs on supported pages with no account or paid plan required.",
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
