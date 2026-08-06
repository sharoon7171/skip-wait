import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "AdLinkFly Links Go";

const bypassType = "Skip Waiting Page";

const description =
  "AdLinkFly bypass that skips please-wait countdowns, continue gates, and get-link delays on Links Go shorteners so you reach the destination faster.";

const domains = [
  "linkjust.com",
  "pahe.plus",
  "go.zovo.ink",
  "shortnest.com",
] as const;

const keywords = [
  "adlinkfly bypass",
  "bypass adlinkfly",
  "links go bypass",
  "linkjust bypass",
  "shortnest bypass",
  "pahe.plus bypass",
  "pahe links bypass",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "please wait seconds bypass",
  "get link shortener bypass",
  "link shortener bypass",
  "skip wait extension",
] as const;

const intro =
  "Add the free Skip Wait Chrome extension and AdLinkFly Links Go pages unlock in the background—no paste box, userscript manager, or manual timer watching.";

const problem =
  "Monetized AdLinkFly short links force a please-wait countdown, click-to-continue steps, and a final get-link action before the real URL appears.";

const howItWorks =
  "On a matching waiting page the overlay advances continue steps, pins captcha when the site requires it, requests unlock as soon as the host accepts it, and only holds for a server-enforced timer when an early unlock fails.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install from the Chrome Web Store. AdLinkFly Links Go handling starts on its own after install.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait active in Chrome. Supported Links Go shorteners need zero configuration.",
  },
  {
    title: "Open the short link as usual",
    body: "Click the shortened URL the same way you always do. When the interstitial loads, Skip Wait takes over.",
  },
  {
    title: "Solve captcha only if shown",
    body: "Some hosts pin a human check on the overlay. Complete it once; the unlock chain continues without further clicks.",
  },
  {
    title: "Arrive at the real URL",
    body: "When unlock succeeds, you are redirected to the destination instead of hunting for a get-link button.",
  },
];

const skips = [
  "Forced please-wait countdown screens",
  "Click continue / proceed interstitial loops",
  "Manual get-link button hunting after the timer",
  "Watching client-side timers the server does not enforce",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What is an AdLinkFly Links Go bypass?",
    answer:
      "It is automation for AdLinkFly-style short links that normally show a countdown and get-link step. Skip Wait handles that flow so you spend less time on the waiting page.",
  },
  {
    question: "Can Skip Wait skip the countdown timer on these pages?",
    answer:
      "It tries unlock immediately. If the host only uses a client timer, you move on without sitting through every second. If the server rejects early unlock, Skip Wait waits the enforced delay then retries.",
  },
  {
    question: "Do I still need a captcha or userscript for AdLinkFly links?",
    answer:
      "Captcha only when the page shows one—Skip Wait pins it for you. You do not need Tampermonkey or a separate AdLinkFly userscript for supported Links Go hosts.",
  },
  {
    question: "Is this AdLinkFly bypass free?",
    answer:
      "Yes. Skip Wait is a free Chrome extension with no account and no paid tier required for AdLinkFly Links Go support.",
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
