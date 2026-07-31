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

const intro = "Need a GamesNostalgia direct download bypass that skips timer pages on file buttons? Skip Wait resolves real download URLs on the supported website so clicks open files instead of waiting screens.";

const problem = "GamesNostalgia often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a GamesNostalgia bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a GamesNostalgia download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the GamesNostalgia bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for GamesNostalgia; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on GamesNostalgia. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported GamesNostalgia page.",
  },
];

const skips = [
  "GamesNostalgia direct download flows",
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
