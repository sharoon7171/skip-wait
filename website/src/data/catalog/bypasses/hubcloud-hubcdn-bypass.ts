import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "HubCloud / HubCDN";

const bypassType = "Direct Download";

const description = "HubCloud bypass skips cloud drive waiting pages and opens your direct download link from HubCloud and HubCDN file storage without delay or waits.";

const domains = [
  "hubcloud.cx",
  "hubcloud.foo",
  "hubcloud.club",
  "hubcloud.fans",
  "vcloud.zip",
  "hubcdn.sbs",
  "hubcdn.fans",
] as const;

const keywords = [
  "hubcloud / hubcdn bypass",
  "HubCloud / HubCDN bypass extension",
  "hubcloud / hubcdn timer bypass",
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

const intro = "HubCloud bypass skips cloud drive waiting pages and opens your direct download link from HubCloud and HubCDN file storage without delay or waits. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "HubCloud often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Instead of sitting on a generating screen, Skip Wait fetches the direct link and starts the file path immediately when the host allows it.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The HubCloud / HubCDN bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for HubCloud / HubCDN.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on HubCloud / HubCDN. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported HubCloud / HubCDN delay.",
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
    question: "Which HubCloud and HubCDN domains does Skip Wait support?",
    answer: "Skip Wait covers seven sites including hubcloud.cx, hubcloud.foo, vcloud.zip, hubcdn.sbs, and hubcdn.fans, skipping cloud drive waiting pages on all of them.",
  },
  {
    question: "What cloud drive waiting pages does Skip Wait skip?",
    answer: "Generating timers and intermediary redirect pages before HubCloud and HubCDN files are bypassed so your direct download link opens without delay.",
  },
  {
    question: "Can I open direct download links from HubCloud storage without delay?",
    answer: "Yes. Click download on any supported HubCloud or HubCDN page and Skip Wait fetches the direct link immediately when the host allows it.",
  },
  {
    question: "Is the HubCloud bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The HubCloud bypass runs on supported pages with no account or paid plan required.",
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
