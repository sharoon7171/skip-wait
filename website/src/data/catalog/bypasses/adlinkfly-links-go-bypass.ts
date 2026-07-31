import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "AdLinkFly Links Go";

const bypassType = "Skip Waiting Page";

const description = "AdLinkFly bypass automates the continue gate, captcha step, and get link flow on Links Go shorteners so your destination URL opens without waiting.";

const domains = [
  "linkjust.com",
  "pahe.plus",
  "go.zovo.ink",
] as const;

const keywords = [
  "adlinkfly bypass",
  "AdLinkFly Links Go bypass",
  "linkjust bypass",
  "tpi.li bypass",
  "ad link shortener bypass",
  "links go bypass",
  "skip waiting page",
  "bypass countdown timer",
  "link shortener bypass",
  "monetized link bypass",
  "skip wait extension",
] as const;

const intro = "AdLinkFly Links Go shorteners put a continue gate, captcha check, and unlock timer between you and the final URL. Skip Wait automates that flow on linkjust and related AdLinkFly hosts so you reach the destination without clicking through every step yourself.";

const problem = "AdLinkFly Links Go places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a AdLinkFly Links Go bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "Install Skip Wait, open an AdLinkFly Links Go short link, and browse normally. The extension auto submits the continue gate, pins the captcha widget for you to complete when required, waits through the server timer if one is enforced, then posts to the links go unlock path and redirects you to the destination URL. You get past continue loops on 3 supported websites and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the AdLinkFly Links Go bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for AdLinkFly Links Go; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a AdLinkFly Links Go link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported AdLinkFly Links Go delay layer, and sends you to the destination or unlock result.",
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
    answer: "Skip Wait auto-submits the continue gate, waits through any server-enforced timer, posts to the links-go unlock path, and redirects you to the destination on linkjust and related AdLinkFly hosts.",
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
