import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Kitokola";

const bypassType = "Direct Download";

const description = "Kitokola bypass skips the on page download countdown timer and opens your direct file download link without the usual forced delay or wait page.";

const domains = [
  "kitokola.id",
] as const;

const keywords = [
  "kitokola bypass",
  "Kitokola bypass extension",
  "kitokola timer bypass",
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

const intro = "Need a Kitokola direct download bypass that skips timer pages on file buttons? Skip Wait resolves real download URLs on the supported website so clicks open files instead of waiting screens.";

const problem = "Kitokola often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a Kitokola bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "Add Skip Wait to Chrome, open a Kitokola file listing, and press download. Instead of sitting on a generating screen, the extension fetches the direct link and starts the file path immediately when the host allows it. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Kitokola bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Kitokola; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on Kitokola. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported Kitokola page.",
  },
];

const skips = [
  "Kitokola direct download flows",
  "Download generating timers after button clicks",
  "Intermediary redirect pages before the file",
  "Extra wait screens on mirror and host buttons",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What on-page countdown does Skip Wait skip on kitokola.id downloads?",
    answer: "Skip Wait bypasses the on-page download countdown timer on kitokola.id and opens your direct file download link without the usual delay.",
  },
  {
    question: "Can I get a direct file link from Kitokola without the usual delay?",
    answer: "Yes. The extension fetches the direct link and starts the file path immediately instead of sitting on a generating screen.",
  },
  {
    question: "How does Skip Wait handle Kitokola download button waits?",
    answer: "Intermediary redirect pages and extra wait screens on mirror buttons are bypassed after you press download on kitokola.id.",
  },
  {
    question: "Is the Kitokola bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Kitokola bypass runs on supported pages with no account or paid plan required.",
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
