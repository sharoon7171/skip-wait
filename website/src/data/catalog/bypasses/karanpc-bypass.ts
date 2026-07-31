import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "KaranPC";

const bypassType = "Skip Waiting Page";

const description = "KaranPC bypass skips the download progress bar wait timer and enables the continue to file button immediately on software download pages for you.";

const domains = [
  "inloadapi.com",
] as const;

const keywords = [
  "karanpc bypass",
  "KaranPC bypass extension",
  "karanpc timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Looking for a KaranPC bypass that actually skips the please wait screen? Skip Wait removes the manual click through on the supported website and sends you to the real destination faster.";

const problem = "KaranPC places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a KaranPC bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "After you add Skip Wait, visit a KaranPC link as usual. When the waiting page loads, the extension runs in the background, skips the delay layer, and sends you straight to the target URL supported for KaranPC. You get past continue loops on the supported website and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the KaranPC bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for KaranPC; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a KaranPC link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported KaranPC delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "KaranPC skip waiting page flows",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What progress bar wait does Skip Wait skip on KaranPC downloads?",
    answer: "Skip Wait skips the download progress bar wait timer on inloadapi.com and enables the continue to file button immediately on KaranPC software pages.",
  },
  {
    question: "Does Skip Wait enable the continue-to-file button immediately on inloadapi.com?",
    answer: "Yes. The please wait gate that blocks the continue button is bypassed so you reach the file link without waiting for the progress bar to finish.",
  },
  {
    question: "How does Skip Wait speed up KaranPC software download pages?",
    answer: "When the waiting page loads, the extension runs in the background and sends you straight to the target file URL on supported KaranPC links.",
  },
  {
    question: "Is the KaranPC bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The KaranPC bypass runs on supported pages with no account or paid plan required.",
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
