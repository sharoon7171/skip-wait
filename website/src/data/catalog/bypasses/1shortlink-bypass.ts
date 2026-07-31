import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "1shortlink";

const bypassType = "Skip Waiting Page";

const description = "1shortlink bypass skips the please wait page on this ad link shortener and redirects you to the real destination URL instantly without delay.";

const domains = [
  "1shortlink.com",
] as const;

const keywords = [
  "1shortlink bypass",
  "1shortlink bypass extension",
  "1shortlink timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Looking for a 1shortlink bypass that actually skips the please wait screen? Skip Wait removes the manual click through on the supported website and sends you to the real destination faster.";

const problem = "1shortlink places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a 1shortlink bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "After you add Skip Wait, visit a 1shortlink link as usual. When the waiting page loads, the extension runs in the background, skips the delay layer, and sends you straight to the target URL supported for 1shortlink. You get past continue loops on the supported website and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the 1shortlink bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for 1shortlink; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a 1shortlink link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported 1shortlink delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "1shortlink skip waiting page flows",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What happens when I open a 1shortlink.com link with Skip Wait?",
    answer: "Skip Wait detects the please wait page on 1shortlink.com, bypasses the delay layer in the background, and redirects you straight to the real destination URL without asking you to click continue.",
  },
  {
    question: "Do I still need to click Continue on 1shortlink gate screens?",
    answer: "No. Skip Wait skips the manual continue button loops and gate pages that normally sit between the short link and your target URL on 1shortlink.",
  },
  {
    question: "Where does Skip Wait send me after bypassing a 1shortlink wait?",
    answer: "You land on the actual long URL behind the shortener, the same destination the please wait screen was blocking, opened instantly instead of after a timed gate.",
  },
  {
    question: "Is the 1shortlink bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The 1shortlink bypass runs on supported pages with no account or paid plan required.",
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
