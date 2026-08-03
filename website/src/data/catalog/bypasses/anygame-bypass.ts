import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "AnyGame";

const bypassType = "Direct Download";

const description = "AnyGame bypass skips the MOD APK download countdown timer and unlocks direct file links when you click Fast Download or Torrent on the page.";

const domains = [
  "anygame.net",
] as const;

const keywords = [
  "anygame bypass",
  "AnyGame bypass extension",
  "anygame timer bypass",
  "direct download",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "direct download bypass",
  "download timer skip",
  "file host bypass",
] as const;

const intro = "AnyGame bypass skips the MOD APK download countdown timer and unlocks direct file links when you click Fast Download or Torrent on the page. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "AnyGame often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Instead of sitting on a generating screen, Skip Wait fetches the direct link and starts the file path immediately when the host allows it.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The AnyGame bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for AnyGame.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on AnyGame. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported AnyGame delay.",
  },
];

const skips = [
  "Direct-download generating timers",
  "Download generating timers after button clicks",
  "Intermediary redirect pages before the file",
  "Extra wait screens on mirror and host buttons",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which AnyGame download buttons work with Skip Wait?",
    answer: "Fast Download and Torrent buttons on anygame.net are supported, Skip Wait unlocks direct file links and skips the MOD APK download countdown that normally blocks them.",
  },
  {
    question: "What timer does Skip Wait skip on AnyGame MOD APK pages?",
    answer: "The extension bypasses the countdown timer that appears before MOD APK downloads unlock, fetching the direct link immediately when the host allows it.",
  },
  {
    question: "Can I get a direct file link from Fast Download on AnyGame without waiting?",
    answer: "Yes. Skip Wait resolves the real download URL in the background so you skip the generating screen and start the file path right away.",
  },
  {
    question: "Is the AnyGame bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The AnyGame bypass runs on supported pages with no account or paid plan required.",
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
