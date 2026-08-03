import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "SwiftUploads";

const bypassType = "Direct Download";

const description = "SwiftUploads bypass skips free download waits, generating timers, and redirect pages on this file host so your download starts in one click.";

const domains = [
  "swiftuploads.com",
] as const;

const keywords = [
  "swiftuploads bypass",
  "SwiftUploads bypass extension",
  "swiftuploads timer bypass",
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

const intro = "SwiftUploads bypass skips free download waits, generating timers, and redirect pages on this file host so your download starts in one click. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "SwiftUploads often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Skip Wait resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The SwiftUploads bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for SwiftUploads.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on SwiftUploads. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported SwiftUploads delay.",
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
    question: "What free download waits does Skip Wait skip on swiftuploads.com?",
    answer: "Skip Wait bypasses free download waits, generating timers, and redirect pages on swiftuploads.com so your download starts in one click.",
  },
  {
    question: "Can my download start in one click on SwiftUploads with Skip Wait?",
    answer: "Yes. The extension resolves the real file URL in the background and bypasses intermediary pages that normally appear after the download button.",
  },
  {
    question: "Does Skip Wait bypass generating timers and redirect pages on SwiftUploads?",
    answer: "Yes. Extra wait screens on mirror and host buttons are also skipped so the file path opens immediately when the host allows it.",
  },
  {
    question: "Is the SwiftUploads bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The SwiftUploads bypass runs on supported pages with no account or paid plan required.",
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
