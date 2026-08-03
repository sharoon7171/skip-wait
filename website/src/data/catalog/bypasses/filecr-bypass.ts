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

const intro = "FileCR bypass opens real file links from Direct Download, Fast Download, and torrent buttons instantly without wait pages or FileCR Assistant. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "FileCR often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Skip Wait resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The FileCR bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for FileCR.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on FileCR. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported FileCR delay.",
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
