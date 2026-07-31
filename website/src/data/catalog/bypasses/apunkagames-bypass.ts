import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "ApunKaGames";

const bypassType = "Skip Waiting Page";

const description = "ApunKaGames bypass skips the download process timer on ApunKaSoftware and AKG Links vlink pages and opens each part destination link directly.";

const domains = [
  "akglinks.com",
  "apunkasoftware.net",
] as const;

const keywords = [
  "apunkagames bypass",
  "ApunKaGames bypass extension",
  "apunkagames timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "ApunKaGames wraps links behind waiting pages and continue gates. Skip Wait detects those flows on supported websites on this network and bypasses the delay so you are not stuck on filler screens.";

const problem = "ApunKaGames places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a ApunKaGames bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "Install Skip Wait from the Chrome Web Store, open any ApunKaGames waiting page, and keep browsing normally. The extension detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly. You get past continue loops on 2 supported websites and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the ApunKaGames bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for ApunKaGames; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a ApunKaGames link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported ApunKaGames delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "ApunKaGames skip waiting page flows",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which ApunKaGames domains does Skip Wait support?",
    answer: "Skip Wait works on akglinks.com and apunkasoftware.net, bypassing download process timers on ApunKaSoftware and AKG Links vlink pages.",
  },
  {
    question: "What timer does Skip Wait skip on AKG Links vlink pages?",
    answer: "The download process timer that delays each part link is bypassed so ApunKaGames destination links open directly instead of after a timed wait.",
  },
  {
    question: "Can I open multi-part download links on ApunKaSoftware without the download process wait?",
    answer: "Yes. Skip Wait detects the vlink waiting flow and redirects you to each part destination link without sitting on please wait screens.",
  },
  {
    question: "Is the ApunKaGames bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The ApunKaGames bypass runs on supported pages with no account or paid plan required.",
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
