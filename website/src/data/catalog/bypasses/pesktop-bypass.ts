import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "PeskTop";

const bypassType = "Direct Download";

const description = "PeskTop bypass skips the downloads waiting page and opens the signed peskfree CDN file link directly from the Direct download button instantly.";

const domains = [
  "pesktop.com",
] as const;

const keywords = [
  "pesktop bypass",
  "PeskTop bypass extension",
  "pesktop timer bypass",
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

const intro = "PeskTop bypass skips the downloads waiting page and opens the signed peskfree CDN file link directly from the Direct download button instantly. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "PeskTop often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Skip Wait resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The PeskTop bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for PeskTop.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on PeskTop. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported PeskTop delay.",
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
    question: "What downloads waiting page does Skip Wait skip on PeskTop?",
    answer: "Skip Wait bypasses the downloads waiting page on pesktop.com and opens the signed peskfree CDN file link directly from the Direct download button.",
  },
  {
    question: "How does Skip Wait open signed peskfree CDN links from Direct download?",
    answer: "The extension resolves the real CDN URL in the background after your click, skipping the timer page that normally blocks the file link.",
  },
  {
    question: "Can I bypass PeskTop delays after clicking the download button?",
    answer: "Yes. Generating timers and intermediary redirect pages are bypassed so the file opens from the button you already pressed.",
  },
  {
    question: "Is the PeskTop bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The PeskTop bypass runs on supported pages with no account or paid plan required.",
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
