import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "HDHub4u";

const bypassType = "Skip Landing Wait";

const description = "HDHub4u bypass skips the landing page mirror wait and opens the current working mirror site so you reach movies and downloads faster every visit.";

const domains = [
  "hdhub4u.med",
  "hdhub4u.catering",
  "hdhub4u.ec",
  "hdhub4u.gd",
  "hdhub4u.gives",
  "hdhub4u.glass",
  "hdhub4u.gs",
  "hdhub4u.hn",
  "hdhub4u.ht",
  "hdhub4u.insure",
] as const;

const keywords = [
  "hdhub4u bypass",
  "HDHub4u bypass extension",
  "hdhub4u timer bypass",
  "skip landing wait",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "landing page bypass",
  "mirror site bypass",
] as const;

const intro = "HDHub4u landing pages delay access to the main site or mirror. Skip Wait bypasses that landing wait on 10 supported websites in this network and opens the working destination URL faster.";

const problem = "HDHub4u delays the main site behind a landing wait screen. Users look for a HDHub4u bypass to open the homepage without sitting through the delay.";

const howItWorks = "Install Skip Wait, browse to a supported HDHub4u page, and use the site normally. The extension activates on recognized skip landing wait flows and bypasses or automates the wait so you reach the content faster. The landing delay on 10 supported websites is skipped so you continue into the main site URL.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the HDHub4u bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for HDHub4u; supported flows run in the background when the page matches.",
  },
  {
    title: "Land on the entry page",
    body: "Visit the HDHub4u landing URL as usual. Skip Wait advances past the delay into the main site.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait skips the landing delay and opens the main HDHub4u site URL.",
  },
];

const skips = [
  "HDHub4u skip landing wait flows",
  "Landing page mirror delays",
  "Open main site wait screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "How many HDHub4u mirror domains does Skip Wait cover?",
    answer: "Skip Wait supports ten HDHub4u mirror domains including hdhub4u.med, hdhub4u.catering, hdhub4u.ec, and others, bypassing landing page waits on each.",
  },
  {
    question: "What landing page wait does Skip Wait skip before the main HDHub4u site?",
    answer: "The landing page mirror delay and open-main-site wait screen are bypassed so you reach movies and downloads on the working mirror faster.",
  },
  {
    question: "Can I reach movies and downloads faster on HDHub4u with Skip Wait?",
    answer: "Yes. Skip Wait opens the current working mirror site automatically instead of making you sit through the landing page delay.",
  },
  {
    question: "Is the HDHub4u bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The HDHub4u bypass runs on supported pages with no account or paid plan required.",
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
