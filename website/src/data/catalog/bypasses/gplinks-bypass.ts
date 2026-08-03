import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "GPLinks";

const bypassType = "Skip Short Link";

const description = "GPLinks bypass skips the subscription gate and automates go page countdowns, mediator blog steps, and Turnstile to open your destination link faster.";

const domains = [
  "gplinks.co",
  "gplinks.com",
  "skrresults.com",
] as const;

const keywords = [
  "gplinks bypass",
  "gplinks.co bypass",
  "bypass gplinks",
  "skip gplinks",
  "gplinks skip",
  "gplinks timer bypass",
  "gplinks waiting page",
  "gplinks chrome extension",
] as const;

const intro = "GPLinks bypass skips the subscription gate and automates go page countdowns, mediator blog steps, and Turnstile to open your destination link faster. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "GPLinks monetized short links chain gate pages, captcha screens, and unlock timers before the destination.";

const howItWorks = "Skip Wait automates the short link bypass steps and continues through gates until your destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The GPLinks bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for GPLinks.",
  },
  {
    title: "Open a supported link",
    body: "Open a GPLinks link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported GPLinks delay.",
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
    question: "Does Skip Wait handle the GPLinks subscription gate automatically?",
    answer: "Yes. Skip Wait skips the subscription gate and automates go page countdowns, mediator blog steps, and Turnstile on gplinks.co, gplinks.com, and skrresults.com.",
  },
  {
    question: "What mediator blog steps does Skip Wait automate on gplinks.co links?",
    answer: "The extension continues through go page redirect hops and short link verification steps until your destination URL is ready without clicking every page yourself.",
  },
  {
    question: "Can Skip Wait pass Turnstile and go page countdowns on GPLinks?",
    answer: "Yes. Ad link countdown timers and Turnstile checks on supported GPLinks monetized links are handled as part of the automated bypass flow.",
  },
  {
    question: "Is the GPLinks bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The GPLinks bypass runs on supported pages with no account or paid plan required.",
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
