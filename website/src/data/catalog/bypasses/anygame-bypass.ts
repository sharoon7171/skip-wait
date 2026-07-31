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

const intro = "AnyGame often hides files behind generating timers and redirect hops. Skip Wait bypasses those download delays on the supported website and opens the file link from the button you already clicked.";

const problem = "AnyGame often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a AnyGame bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "Add Skip Wait to Chrome, open a AnyGame file listing, and press download. Instead of sitting on a generating screen, the extension fetches the direct link and starts the file path immediately when the host allows it. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the AnyGame bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for AnyGame; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on AnyGame. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported AnyGame page.",
  },
];

const skips = [
  "AnyGame direct download flows",
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
