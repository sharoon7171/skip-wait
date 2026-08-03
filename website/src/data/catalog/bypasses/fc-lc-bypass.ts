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

const intro = "FC.LC bypass skips short link verification steps, captcha gates, and countdown timers on this monetized URL shortener platform right away for you. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "FC.LC monetized short links chain gate pages, captcha screens, and unlock timers before the destination.";

const howItWorks = "LC monetized link. The extension automates the short link bypass steps and continues through gates until your destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The FC.LC bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for FC.LC.",
  },
  {
    title: "Open a supported link",
    body: "Open a FC.LC link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported FC.LC delay.",
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
