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

const intro = "If LinkShortify links keep adding countdowns and go pages, Skip Wait is the Chrome extension that bypasses those short link waits on 5 supported websites in this network for you.";

const problem = "LinkShortify monetized short links chain gate pages, captcha screens, and unlock timers before the destination. A LinkShortify bypass is what people want when they need the final URL without clicking through every hop.";

const howItWorks = "Install Skip Wait, paste or click a LinkShortify short link, and let the extension handle the unlock flow. It bypasses countdown timers, go pages, and captcha follow ups on supported LinkShortify URLs, then opens the final destination automatically. Gate hops on 5 supported websites keep moving until the destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the LinkShortify bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for LinkShortify; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a LinkShortify link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported LinkShortify delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "LinkShortify skip short link flows",
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
