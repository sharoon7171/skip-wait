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

const intro = "Yasir252 bypass decodes locked download buttons into direct PixelDrain, MediaFire, and file host links without the mediator page or wait timer. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Yasir252 often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Instead of sitting on a generating screen, Skip Wait fetches the direct link and starts the file path immediately when the host allows it.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Yasir252 bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Yasir252.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on Yasir252. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Yasir252 delay.",
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
