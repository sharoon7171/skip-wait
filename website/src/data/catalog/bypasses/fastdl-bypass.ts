import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "FastDL";

const bypassType = "Direct Download";

const description = "FastDL bypass skips the countdown download page and opens the direct file download link without waiting on any intermediary screen or gate page.";

const domains = [
  "fastdl.zip",
] as const;

const keywords = [
  "fastdl bypass",
  "FastDL bypass extension",
  "fastdl timer bypass",
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

const intro = "Searching for FastDL bypass to skip download waits? Skip Wait targets the supported website and replaces slow download flows with direct file access from the host page.";

const problem = "FastDL often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a FastDL bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a FastDL download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the FastDL bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for FastDL; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on FastDL. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported FastDL page.",
  },
];

const skips = [
  "FastDL direct download flows",
  "Download generating timers after button clicks",
  "Intermediary redirect pages before the file",
  "Extra wait screens on mirror and host buttons",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What intermediary screen does Skip Wait skip on fastdl.zip downloads?",
    answer: "Skip Wait bypasses the countdown download page that normally sits between your click and the file, opening the direct download link instead.",
  },
  {
    question: "Does Skip Wait open the direct file link from FastDL download buttons?",
    answer: "Yes. When you click download on fastdl.zip, the extension resolves the real file URL in the background and skips the timer page.",
  },
  {
    question: "Can I bypass the countdown download page on FastDL with one click?",
    answer: "Yes. Extra wait screens on mirror and host buttons are also bypassed so your download starts from the resolved link immediately.",
  },
  {
    question: "Is the FastDL bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The FastDL bypass runs on supported pages with no account or paid plan required.",
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
