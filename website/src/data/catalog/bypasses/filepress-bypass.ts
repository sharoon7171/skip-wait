import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "FilePress";

const bypassType = "Direct Download";

const description = "FilePress bypass skips the download page generating timer and opens direct or instant download links when you click the download button on the page.";

const domains = [
  "filepress.baby",
] as const;

const keywords = [
  "filepress bypass",
  "FilePress bypass extension",
  "filepress timer bypass",
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

const intro = "FilePress often hides files behind generating timers and redirect hops. Skip Wait bypasses those download delays on the supported website and opens the file link from the button you already clicked.";

const problem = "FilePress often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a FilePress bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a FilePress download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the FilePress bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for FilePress; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on FilePress. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported FilePress page.",
  },
];

const skips = [
  "FilePress direct download flows",
  "Download generating timers after button clicks",
  "Intermediary redirect pages before the file",
  "Extra wait screens on mirror and host buttons",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What generating timer does Skip Wait skip on filepress.baby?",
    answer: "Skip Wait bypasses the download page generating timer on filepress.baby and opens direct or instant download links when you click the download button.",
  },
  {
    question: "Can Skip Wait open instant download links from FilePress buttons?",
    answer: "Yes. The extension resolves the real file URL in the background and bypasses intermediary redirect pages before the file.",
  },
  {
    question: "How does Skip Wait handle extra waits on FilePress mirror buttons?",
    answer: "Extra wait screens on mirror and host buttons are skipped so your click opens the file link instead of another timer page.",
  },
  {
    question: "Is the FilePress bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The FilePress bypass runs on supported pages with no account or paid plan required.",
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
