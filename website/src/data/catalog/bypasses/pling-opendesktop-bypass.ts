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

const intro = "Need a Pling / openDesktop direct download bypass that skips timer pages on file buttons? Skip Wait resolves real download URLs on supported websites on this network so clicks open files instead of waiting screens.";

const problem = "Pling often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a Pling bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a Pling / openDesktop download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on 3 supported websites resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Pling bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Pling; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on Pling. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported Pling page.",
  },
];

const skips = [
  "Pling / openDesktop direct download flows",
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
