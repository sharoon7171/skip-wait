import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "AdLinkFly Links Go";

const bypassType = "Skip Waiting Page";

const description = "AdLinkFly bypass automates the continue gate, captcha step, and get link flow on Links Go shorteners so your destination URL opens without waiting.";

const domains = [
  "linkjust.com",
  "pahe.plus",
  "go.zovo.ink",
  "shortnest.com",
] as const;

const keywords = [
  "adlinkfly bypass",
  "AdLinkFly Links Go bypass",
  "linkjust bypass",
  "shortnest bypass",
  "tpi.li bypass",
  "ad link shortener bypass",
  "links go bypass",
  "skip waiting page",
  "bypass countdown timer",
  "link shortener bypass",
  "monetized link bypass",
  "skip wait extension",
] as const;

const intro = "AdLinkFly bypass automates the continue gate, captcha step, and get link flow on Links Go shorteners so your destination URL opens without waiting. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "AdLinkFly Links Go places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks =
  "Skip Wait auto submits the continue gate, pins the captcha widget when required, posts to the links go unlock path immediately when the server allows (otherwise waits the enforced timer), then redirects you to the destination URL.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The AdLinkFly Links Go bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for AdLinkFly Links Go.",
  },
  {
    title: "Open a supported link",
    body: "Open a AdLinkFly Links Go link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported AdLinkFly Links Go delay.",
  },
];

const skips = [
  "Continue gate and get link steps",
  "AdLinkFly unlock countdown timers",
  "Manual links go form submission",
  "Repeated click to continue loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What steps does Skip Wait automate on AdLinkFly Links Go shorteners?",
    answer: "Skip Wait auto-submits the continue gate, posts to the links-go unlock path (skipping the client timer when the server allows), and redirects you to the destination on linkjust, shortnest, and related AdLinkFly hosts.",
  },
  {
    question: "Do I still need to solve the captcha on linkjust-style AdLinkFly links?",
    answer: "When a captcha appears, Skip Wait pins the widget so you can complete it, then continues the get link flow automatically after verification.",
  },
  {
    question: "How does Skip Wait unlock the destination after the server timer on Links Go pages?",
    answer: "The extension waits through enforced countdowns when required, then submits the unlock request and opens your final URL without extra manual steps.",
  },
  {
    question: "Is the AdLinkFly Links Go bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The AdLinkFly Links Go bypass runs on supported pages with no account or paid plan required.",
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
