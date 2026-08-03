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

const intro = "FilePress bypass skips the download page generating timer and opens direct or instant download links when you click the download button on the page. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "FilePress often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Skip Wait resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The FilePress bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for FilePress.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on FilePress. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported FilePress delay.",
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
