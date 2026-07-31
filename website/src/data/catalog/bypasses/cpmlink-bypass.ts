import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "CPMLink";

const bypassType = "Skip Short Link";

const description = "CPMLink bypass skips hop pages and unlock countdown waits on this ad link monetization platform to reach your destination URL faster and easier.";

const domains = [
  "cpm.link",
  "cpmlink.pro",
  "bildirim.online",
] as const;

const keywords = [
  "cpmlink bypass",
  "CPMLink bypass extension",
  "cpmlink timer bypass",
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

const intro = "Want a CPMLink bypass for monetized short links without clicking through every gate? Skip Wait handles unlock timers and redirect hops on supported websites on this network automatically.";

const problem = "CPMLink monetized short links chain gate pages, captcha screens, and unlock timers before the destination. A CPMLink bypass is what people want when they need the final URL without clicking through every hop.";

const howItWorks = "Once Skip Wait is active, open any supported CPMLink monetized link. The extension automates the short link bypass steps and continues through gates until your destination URL is ready. Gate hops on 3 supported websites keep moving until the destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the CPMLink bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for CPMLink; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a CPMLink link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported CPMLink delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "CPMLink skip short link flows",
  "Ad link countdown timers",
  "Go page and unlock redirect hops",
  "Short link verification steps before the destination",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which CPMLink domains like cpm.link and cpmlink.pro are supported?",
    answer: "Skip Wait handles cpm.link, cpmlink.pro, and bildirim.online, automating short link bypass steps across all three CPMLink hosts.",
  },
  {
    question: "What hop pages does Skip Wait skip on CPMLink monetized links?",
    answer: "Go page and unlock redirect hops, ad link countdown timers, and verification steps before the destination are automated until your final URL is ready.",
  },
  {
    question: "Can Skip Wait bypass unlock countdown waits on CPMLink ad links?",
    answer: "Yes. Open any supported CPMLink monetized link and the extension continues through gates and countdowns automatically.",
  },
  {
    question: "Is the CPMLink bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The CPMLink bypass runs on supported pages with no account or paid plan required.",
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
