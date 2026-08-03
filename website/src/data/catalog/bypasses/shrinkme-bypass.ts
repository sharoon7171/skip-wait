import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "ShrinkMe";

const bypassType = "Skip Short Link";

const description = "ShrinkMe bypass skips entry captcha gates, blog mediator pages, and countdown timers on ShrinkMe monetized links for instant destination access.";

const domains = [
  "shrinkme.click",
  "shrinke.me",
  "shrinkme.io",
  "themezon.net",
  "en.mrproblogger.com",
] as const;

const keywords = [
  "shrinkme bypass",
  "ShrinkMe bypass extension",
  "shrinkme timer bypass",
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

const intro = "ShrinkMe bypass skips entry captcha gates, blog mediator pages, and countdown timers on ShrinkMe monetized links for instant destination access. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "ShrinkMe monetized short links chain gate pages, captcha screens, and unlock timers before the destination.";

const howItWorks = "Skip Wait automates the short link bypass steps and continues through gates until your destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The ShrinkMe bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for ShrinkMe.",
  },
  {
    title: "Open a supported link",
    body: "Open a ShrinkMe link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported ShrinkMe delay.",
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
    question: "Which ShrinkMe domains like shrinkme.io does Skip Wait support?",
    answer: "Skip Wait handles shrinkme.click, shrinke.me, shrinkme.io, themezon.net, and en.mrproblogger.com across the ShrinkMe network.",
  },
  {
    question: "What entry captcha and blog mediator pages does Skip Wait skip?",
    answer: "Entry captcha gates, blog mediator pages, and countdown timers on ShrinkMe monetized links are automated until your destination is ready.",
  },
  {
    question: "Can Skip Wait bypass countdown timers on ShrinkMe monetized links?",
    answer: "Yes. go page redirect hops and short link verification steps are handled automatically on supported ShrinkMe URLs.",
  },
  {
    question: "Is the ShrinkMe bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The ShrinkMe bypass runs on supported pages with no account or paid plan required.",
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
