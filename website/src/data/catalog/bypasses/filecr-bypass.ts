import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "FileCR";

const bypassType = "Direct Download";

const description = "FileCR bypass opens real file links from Direct Download, Fast Download, and torrent buttons instantly without wait pages or FileCR Assistant.";

const domains = [
  "filecr.com",
] as const;

const keywords = [
  "filecr bypass",
  "FileCR bypass extension",
  "filecr timer bypass",
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

const intro = "FileCR often hides files behind generating timers and redirect hops. Skip Wait bypasses those download delays on the supported website and opens the file link from the button you already clicked.";

const problem = "FileCR often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a FileCR bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a FileCR download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the FileCR bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for FileCR; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on FileCR. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported FileCR page.",
  },
];

const skips = [
  "FileCR direct download flows",
  "Download generating timers after button clicks",
  "Intermediary redirect pages before the file",
  "Extra wait screens on mirror and host buttons",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Do I need the FileCR Assistant extension when using Skip Wait on FileCR?",
    answer: "No. Skip Wait opens real file links from Direct Download, Fast Download, and torrent buttons on filecr.com without wait pages or the FileCR Assistant extension.",
  },
  {
    question: "Which FileCR download buttons open real links instantly with Skip Wait?",
    answer: "Direct Download, Fast Download, and torrent buttons all resolve to actual file URLs in the background, bypassing generating timers after each click.",
  },
  {
    question: "What wait pages does Skip Wait bypass on filecr.com downloads?",
    answer: "Intermediary redirect pages, download generating timers, and extra wait screens on mirror buttons are skipped so files open from the button you clicked.",
  },
  {
    question: "Is the FileCR bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The FileCR bypass runs on supported pages with no account or paid plan required.",
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
