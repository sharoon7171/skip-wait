import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "LinkShortify";

const bypassType = "Skip Short Link";

const description = "LinkShortify bypass skips encrypted gate pages, article unlock waits, and countdown timers on this Indian link shortener network for faster access.";

const domains = [
  "recruitmentaim.in",
  "mahitiplus.com",
  "lksfy.com",
  "linkshortify.com",
  "lite.pw4free.in",
] as const;

const keywords = [
  "linkshortify bypass",
  "LinkShortify bypass extension",
  "linkshortify timer bypass",
  "skip short link",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "ad link bypass",
  "short link bypass",
  "monetized link bypass",
] as const;

const intro = "LinkShortify bypass skips encrypted gate pages, article unlock waits, and countdown timers on this Indian link shortener network for faster access. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "LinkShortify monetized short links chain gate pages, captcha screens, and unlock timers before the destination.";

const howItWorks = "Skip Wait bypasses countdown timers, go pages, and captcha follow ups on supported LinkShortify URLs, then opens the final destination automatically.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The LinkShortify bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for LinkShortify.",
  },
  {
    title: "Open a supported link",
    body: "Open a LinkShortify link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported LinkShortify delay.",
  },
];

const skips = [
  "Short-link verification gates",
  "Ad link countdown timers",
  "Go page and unlock redirect hops",
  "Short link verification steps before the destination",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What encrypted gate pages does Skip Wait skip on LinkShortify?",
    answer: "Skip Wait bypasses encrypted gate pages, article unlock waits, and countdown timers across the LinkShortify Indian shortener network.",
  },
  {
    question: "Which Indian LinkShortify network sites like recruitmentaim.in are covered?",
    answer: "Five sites are supported including recruitmentaim.in, mahitiplus.com, lksfy.com, linkshortify.com, and lite.pw4free.in.",
  },
  {
    question: "Does Skip Wait handle article unlock waits on linkshortify.com links?",
    answer: "Yes. The extension bypasses countdown timers, go pages, and captcha follow-ups on supported LinkShortify URLs, then opens the final destination.",
  },
  {
    question: "Is the LinkShortify bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The LinkShortify bypass runs on supported pages with no account or paid plan required.",
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
