import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "OnlineTools";

const bypassType = "Direct Download";

const description = "OnlineTools bypass skips the export download wait timer and instantly copies or downloads PNG, text, and CSV results from online utility tools.";

const domains = [
  "onlinetools.com",
  "onlinegiftools.com",
  "onlinejpgtools.com",
  "onlinepngtools.com",
  "onlinestringtools.com",
  "onlinetexttools.com",
] as const;

const keywords = [
  "onlinetools bypass",
  "OnlineTools bypass extension",
  "onlinetools timer bypass",
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

const intro = "OnlineTools bypass skips the export download wait timer and instantly copies or downloads PNG, text, and CSV results from online utility tools. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "OnlineTools often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Skip Wait resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The OnlineTools bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for OnlineTools.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on OnlineTools. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported OnlineTools delay.",
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
    question: "Which OnlineTools sites like onlinepngtools.com does Skip Wait support?",
    answer: "Skip Wait works on six OnlineTools sites including onlinetools.com, onlinepngtools.com, onlinejpgtools.com, onlinetexttools.com, and others.",
  },
  {
    question: "What export download wait does Skip Wait skip on utility tool results?",
    answer: "The export download wait timer is bypassed so PNG, text, and CSV results from online utility tools copy or download instantly.",
  },
  {
    question: "Can Skip Wait instantly copy or download PNG, text, and CSV exports?",
    answer: "Yes. After you generate a result on supported OnlineTools pages, the extension skips the wait and delivers the export immediately.",
  },
  {
    question: "Is the OnlineTools bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The OnlineTools bypass runs on supported pages with no account or paid plan required.",
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
