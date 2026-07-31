import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "FC.LC";

const bypassType = "Skip Short Link";

const description = "FC.LC bypass skips short link verification steps, captcha gates, and countdown timers on this monetized URL shortener platform right away for you.";

const domains = [
  "fc-lc.xyz",
  "fc.lc",
  "oii.io",
  "jobzhub.store",
] as const;

const keywords = [
  "fc.lc bypass",
  "FC.LC bypass extension",
  "fc.lc timer bypass",
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

const intro = "Want a FC.LC bypass for monetized short links without clicking through every gate? Skip Wait handles unlock timers and redirect hops on 4 supported websites in this network automatically.";

const problem = "FC.LC monetized short links chain gate pages, captcha screens, and unlock timers before the destination. A FC.LC bypass is what people want when they need the final URL without clicking through every hop.";

const howItWorks = "Once Skip Wait is active, open any supported FC.LC monetized link. The extension automates the short link bypass steps and continues through gates until your destination URL is ready. Gate hops on 4 supported websites keep moving until the destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the FC.LC bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for FC.LC; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a FC.LC link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported FC.LC delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "FC.LC skip short link flows",
  "Ad link countdown timers",
  "Go page and unlock redirect hops",
  "Short link verification steps before the destination",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which FC.LC domains like fc.lc and oii.io does Skip Wait support?",
    answer: "Skip Wait covers fc-lc.xyz, fc.lc, oii.io, and jobzhub.store, automating unlock steps across all four FC.LC network sites.",
  },
  {
    question: "What verification steps does Skip Wait skip on FC.LC monetized links?",
    answer: "Short link verification steps, captcha gates, countdown timers, and go page redirect hops are handled automatically until your destination URL is ready.",
  },
  {
    question: "Can Skip Wait bypass captcha gates and countdown timers on FC.LC?",
    answer: "Yes. Open any supported FC.LC monetized link and the extension continues through gates without manual clicking at each step.",
  },
  {
    question: "Is the FC.LC bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The FC.LC bypass runs on supported pages with no account or paid plan required.",
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
