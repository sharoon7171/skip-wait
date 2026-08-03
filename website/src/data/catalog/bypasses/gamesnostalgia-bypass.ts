import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "GamesNostalgia";

const bypassType = "Direct Download";

const description = "GamesNostalgia bypass skips the download modal and generates the CDN file link in the background so Download this File opens the archive directly.";

const domains = [
  "gamesnostalgia.com",
] as const;

const keywords = [
  "gamesnostalgia bypass",
  "GamesNostalgia bypass extension",
  "gamesnostalgia timer bypass",
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

const intro = "GamesNostalgia bypass skips the download modal and generates the CDN file link in the background so Download this File opens the archive directly. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "GamesNostalgia often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Skip Wait resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The GamesNostalgia bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for GamesNostalgia.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on GamesNostalgia. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported GamesNostalgia delay.",
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
    question: "What download modal step does Skip Wait skip on GamesNostalgia?",
    answer: "Skip Wait skips the download modal wait and generates the CDN file link in the background so Download this File opens the archive directly.",
  },
  {
    question: "How does Skip Wait generate the CDN file link for Download this File?",
    answer: "When you click download on gamesnostalgia.com, the extension resolves the real CDN URL instead of making you wait through the modal generating step.",
  },
  {
    question: "Can I open retro game archives directly from GamesNostalgia?",
    answer: "Yes. Download generating timers and intermediary redirect pages are bypassed so the archive opens from the button you already clicked.",
  },
  {
    question: "Is the GamesNostalgia bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The GamesNostalgia bypass runs on supported pages with no account or paid plan required.",
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
