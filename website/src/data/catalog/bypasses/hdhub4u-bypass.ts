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

const intro = "HDHub4u bypass skips the landing page mirror wait and opens the current working mirror site so you reach movies and downloads faster every visit. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "HDHub4u delays the main site behind a landing wait screen.";

const howItWorks = "Skip Wait clears the landing wait so you continue into the site without the connection delay.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The HDHub4u bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for HDHub4u.",
  },
  {
    title: "Land on the entry page",
    body: "Visit the HDHub4u landing URL as usual. Skip Wait advances past the delay into the main site.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported HDHub4u delay.",
  },
];

const skips = [
  "Landing-page connection delays",
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
