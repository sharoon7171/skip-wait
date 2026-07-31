import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Bitcotasks";

const bypassType = "Skip Article Wait";

const description = "Bitcotasks bypass skips the read article wait screen and unlocks your link from this earn to click shortener right away without forced delay.";

const domains = [
  "bitcotasks.com",
] as const;

const keywords = [
  "bitcotasks bypass",
  "Bitcotasks bypass extension",
  "bitcotasks timer bypass",
  "skip article wait",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "read article bypass",
  "article unlock bypass",
] as const;

const intro = "Need to skip the Bitcotasks read article screen? Skip Wait supports the supported website and bypasses the article gate so you reach the unlocked link immediately.";

const problem = "Bitcotasks forces a read article wait before the unlock. People search for a Bitcotasks bypass to skip the article timer and open the destination right away.";

const howItWorks = "Install Skip Wait, browse to a supported Bitcotasks page, and use the site normally. The extension activates on recognized skip article wait flows and bypasses or automates the wait so you reach the content faster. The forced read timer on the supported website is cleared so the unlocked link is available immediately.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Bitcotasks bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Bitcotasks; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Bitcotasks link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Bitcotasks delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Bitcotasks skip article wait flows",
  "Read article timers",
  "Earn to click article gates",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Can I skip the read article screen on Bitcotasks earn to click links?",
    answer: "Yes. Skip Wait bypasses the read article wait screen on bitcotasks.com so you reach the unlocked link from this earn to click shortener immediately.",
  },
  {
    question: "What article gate does Skip Wait bypass on Bitcotasks?",
    answer: "The earn to click article timer that forces you to stay on a page before the link unlocks is skipped, letting you access the destination right away.",
  },
  {
    question: "How quickly can I reach the unlocked link on Bitcotasks with Skip Wait?",
    answer: "As soon as the Bitcotasks page loads, the extension activates on the article wait flow and bypasses the gate without you reading through filler content.",
  },
  {
    question: "Is the Bitcotasks bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Bitcotasks bypass runs on supported pages with no account or paid plan required.",
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
