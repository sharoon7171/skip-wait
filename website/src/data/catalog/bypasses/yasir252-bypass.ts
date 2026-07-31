import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Yasir252";

const bypassType = "Direct Download";

const description = "Yasir252 bypass decodes locked download buttons into direct PixelDrain, MediaFire, and file host links without the mediator page or wait timer.";

const domains = [
  "yasir252.com",
  "download.yasir252.com",
] as const;

const keywords = [
  "yasir252 bypass",
  "Yasir252 bypass extension",
  "yasir252 timer bypass",
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

const intro = "Searching for Yasir252 bypass to skip download waits? Skip Wait targets supported websites on this network and replaces slow download flows with direct file access from the host page.";

const problem = "Yasir252 often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a Yasir252 bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "Add Skip Wait to Chrome, open a Yasir252 file listing, and press download. Instead of sitting on a generating screen, the extension fetches the direct link and starts the file path immediately when the host allows it. Download buttons on 2 supported websites resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Yasir252 bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Yasir252; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on Yasir252. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported Yasir252 page.",
  },
];

const skips = [
  "Yasir252 direct download flows",
  "Download generating timers after button clicks",
  "Intermediary redirect pages before the file",
  "Extra wait screens on mirror and host buttons",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What 8-second timer does Skip Wait skip on Yasir252 downloads?",
    answer: "Skip Wait decodes locked download buttons on yasir252.com and download.yasir252.com without the mediator page or 8-second timer delay.",
  },
  {
    question: "Which file hosts like PixelDrain and MediaFire does Skip Wait decode on Yasir252?",
    answer: "The extension unlocks direct PixelDrain, MediaFire, and other file host links from Yasir252 download buttons in the background.",
  },
  {
    question: "Does Skip Wait bypass the mediator page on yasir252.com download buttons?",
    answer: "Yes. Instead of sitting on a generating screen, Skip Wait fetches the direct link and starts the file path immediately when the host allows it.",
  },
  {
    question: "Is the Yasir252 bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Yasir252 bypass runs on supported pages with no account or paid plan required.",
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
