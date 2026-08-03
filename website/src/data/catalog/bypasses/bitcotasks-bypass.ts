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

const intro = "Bitcotasks bypass skips the read article wait screen and unlocks your link from this earn to click shortener right away without forced delay. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Bitcotasks forces a read article wait before the unlock.";

const howItWorks = "Skip Wait activates on recognized skip article wait flows and bypasses or automates the wait so you reach the content faster. The forced read timer on the supported website is cleared so the unlocked link is available immediately.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Bitcotasks bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Bitcotasks.",
  },
  {
    title: "Open a supported link",
    body: "Open a Bitcotasks link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Bitcotasks delay.",
  },
];

const skips = [
  "Article and unlock waits",
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
