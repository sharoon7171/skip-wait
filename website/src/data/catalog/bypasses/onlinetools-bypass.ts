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

const intro = "OnlineTools often hides files behind generating timers and redirect hops. Skip Wait bypasses those download delays on 6 supported websites in this network and opens the file link from the button you already clicked.";

const problem = "OnlineTools often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a OnlineTools bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a OnlineTools download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on 6 supported websites resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the OnlineTools bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for OnlineTools; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on OnlineTools. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported OnlineTools page.",
  },
];

const skips = [
  "OnlineTools direct download flows",
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
