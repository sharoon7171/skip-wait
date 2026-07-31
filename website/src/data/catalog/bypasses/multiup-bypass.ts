import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "MultiUp";

const bypassType = "Skip Waiting Page";

const description = "MultiUp bypass skips the download waiting page and opens the mirror download list automatically on this multi host file aggregator instantly.";

const domains = [
  "multiup.io",
] as const;

const keywords = [
  "multiup bypass",
  "MultiUp bypass extension",
  "multiup timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Looking for a MultiUp bypass that actually skips the please wait screen? Skip Wait removes the manual click through on the supported website and sends you to the real destination faster.";

const problem = "MultiUp places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a MultiUp bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "After you add Skip Wait, visit a MultiUp link as usual. When the waiting page loads, the extension runs in the background, skips the delay layer, and sends you straight to the target URL supported for MultiUp. You get past continue loops on the supported website and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the MultiUp bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for MultiUp; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a MultiUp link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported MultiUp delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "MultiUp skip waiting page flows",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What download waiting page does Skip Wait skip on multiup.io?",
    answer: "Skip Wait bypasses the download waiting page on multiup.io and opens the mirror download list automatically on this multi-host aggregator.",
  },
  {
    question: "Does Skip Wait open the mirror download list automatically?",
    answer: "Yes. Instead of sitting on a please wait gate, the extension sends you straight to the mirror list where you pick your file host.",
  },
  {
    question: "How does Skip Wait help with this multi-host file aggregator?",
    answer: "Gate pages and manual continue button loops before the mirror list are bypassed so you reach download options without repeated clicks.",
  },
  {
    question: "Is the MultiUp bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The MultiUp bypass runs on supported pages with no account or paid plan required.",
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
