import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "AnkerGames";

const bypassType = "Direct Download";

const description = "AnkerGames bypass skips the treasure box scroll delay and opens the signed CDN file link directly from each Direct button in the download modal.";

const domains = [
  "ankergames.net",
] as const;

const keywords = [
  "ankergames bypass",
  "AnkerGames bypass extension",
  "ankergames timer bypass",
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

const intro = "AnkerGames often hides files behind generating timers and redirect hops. Skip Wait bypasses those download delays on the supported website and opens the file link from the button you already clicked.";

const problem = "AnkerGames often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a AnkerGames bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a AnkerGames download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the AnkerGames bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for AnkerGames; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on AnkerGames. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported AnkerGames page.",
  },
];

const skips = [
  "AnkerGames direct download flows",
  "Download generating timers after button clicks",
  "Intermediary redirect pages before the file",
  "Extra wait screens on mirror and host buttons",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What delay does Skip Wait remove when downloading from AnkerGames?",
    answer: "Skip Wait skips the treasure box scroll delay in the download modal and opens the signed CDN file link directly from each Direct button on ankergames.net.",
  },
  {
    question: "How does Skip Wait open files from the AnkerGames download modal?",
    answer: "When you click Direct in the modal, the extension resolves the real CDN URL in the background instead of making you scroll through the treasure box wait first.",
  },
  {
    question: "Does Skip Wait bypass generating timers after AnkerGames download clicks?",
    answer: "Yes. Intermediary redirect pages and extra wait screens on mirror buttons are skipped so the file link opens from the button you already pressed.",
  },
  {
    question: "Is the AnkerGames bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The AnkerGames bypass runs on supported pages with no account or paid plan required.",
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
