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

const intro = "FastDL bypass skips the countdown download page and opens the direct file download link without waiting on any intermediary screen or gate page. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "FastDL often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Skip Wait resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The FastDL bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for FastDL.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on FastDL. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported FastDL delay.",
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
