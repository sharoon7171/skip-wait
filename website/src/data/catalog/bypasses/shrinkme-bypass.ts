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

const intro = "ShrinkMe is a popular ad link shortener people search to bypass daily. Skip Wait supports 5 supported websites in this network and removes the repetitive unlock steps between you and the destination URL.";

const problem = "ShrinkMe monetized short links chain gate pages, captcha screens, and unlock timers before the destination. A ShrinkMe bypass is what people want when they need the final URL without clicking through every hop.";

const howItWorks = "Once Skip Wait is active, open any supported ShrinkMe monetized link. The extension automates the short link bypass steps and continues through gates until your destination URL is ready. Gate hops on 5 supported websites keep moving until the destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the ShrinkMe bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for ShrinkMe; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a ShrinkMe link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported ShrinkMe delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "ShrinkMe skip short link flows",
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
