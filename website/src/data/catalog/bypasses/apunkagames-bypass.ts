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

const intro = "ApunKaGames bypass skips the download process timer on ApunKaSoftware and AKG Links vlink pages and opens each part destination link directly. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "ApunKaGames places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "Skip Wait detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The ApunKaGames bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for ApunKaGames.",
  },
  {
    title: "Open a supported link",
    body: "Open a ApunKaGames link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported ApunKaGames delay.",
  },
];

const skips = [
  "Waiting pages and continue gates",
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
