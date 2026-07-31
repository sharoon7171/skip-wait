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

const intro = "Need a HubCloud / HubCDN direct download bypass that skips timer pages on file buttons? Skip Wait resolves real download URLs on 7 supported websites in this network so clicks open files instead of waiting screens.";

const problem = "HubCloud often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a HubCloud bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "Add Skip Wait to Chrome, open a HubCloud / HubCDN file listing, and press download. Instead of sitting on a generating screen, the extension fetches the direct link and starts the file path immediately when the host allows it. Download buttons on 7 supported websites resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the HubCloud bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for HubCloud; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on HubCloud. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported HubCloud page.",
  },
];

const skips = [
  "HubCloud / HubCDN direct download flows",
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
