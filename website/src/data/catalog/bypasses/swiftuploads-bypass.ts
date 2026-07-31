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

const intro = "Need a SwiftUploads direct download bypass that skips timer pages on file buttons? Skip Wait resolves real download URLs on the supported website so clicks open files instead of waiting screens.";

const problem = "SwiftUploads often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a SwiftUploads bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a SwiftUploads download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the SwiftUploads bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for SwiftUploads; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on SwiftUploads. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported SwiftUploads page.",
  },
];

const skips = [
  "SwiftUploads direct download flows",
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
