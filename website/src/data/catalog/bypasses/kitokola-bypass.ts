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

const intro = "Kitokola bypass skips the on page download countdown timer and opens your direct file download link without the usual forced delay or wait page. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Kitokola often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Instead of sitting on a generating screen, Skip Wait fetches the direct link and starts the file path immediately when the host allows it.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Kitokola bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Kitokola.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on Kitokola. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Kitokola delay.",
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
