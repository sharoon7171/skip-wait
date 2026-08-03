import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "HaxPC";

const bypassType = "Direct Download";

const description = "HaxPC bypass skips the extra waiting page on software downloads so the download buttons open the file host link directly without any forced delay.";

const domains = [
  "haxpc.net",
] as const;

const keywords = [
  "haxpc bypass",
  "HaxPC bypass extension",
  "haxpc timer bypass",
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

const intro = "HaxPC bypass skips the extra waiting page on software downloads so the download buttons open the file host link directly without any forced delay. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "HaxPC often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Skip Wait resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The HaxPC bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for HaxPC.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on HaxPC. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported HaxPC delay.",
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
    question: "What extra waiting page does Skip Wait skip on HaxPC software downloads?",
    answer: "Skip Wait bypasses the extra waiting page on haxpc.net so download buttons open the file host directly instead of after a delay screen.",
  },
  {
    question: "Do HaxPC download buttons open file hosts directly with Skip Wait?",
    answer: "Yes. The extension resolves the real file URL in the background and bypasses generating timers that normally appear after each download click.",
  },
  {
    question: "How does Skip Wait bypass delays after clicking download on haxpc.net?",
    answer: "Intermediary redirect pages and extra wait screens on mirror buttons are skipped so the file link opens from the button you already pressed.",
  },
  {
    question: "Is the HaxPC bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The HaxPC bypass runs on supported pages with no account or paid plan required.",
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
