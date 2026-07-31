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

const intro = "Want a GPLinks bypass for monetized short links without clicking through every gate? Skip Wait handles unlock timers and redirect hops on supported websites on this network automatically.";

const problem = "GPLinks monetized short links chain gate pages, captcha screens, and unlock timers before the destination. A GPLinks bypass is what people want when they need the final URL without clicking through every hop.";

const howItWorks = "Once Skip Wait is active, open any supported GPLinks monetized link. The extension automates the short link bypass steps and continues through gates until your destination URL is ready. Gate hops on 3 supported websites keep moving until the destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the GPLinks bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for GPLinks; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a GPLinks link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported GPLinks delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "GPLinks skip short link flows",
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
