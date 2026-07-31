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

const intro = "Searching for HaxPC bypass to skip download waits? Skip Wait targets the supported website and replaces slow download flows with direct file access from the host page.";

const problem = "HaxPC often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a HaxPC bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a HaxPC download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the HaxPC bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for HaxPC; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on HaxPC. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported HaxPC page.",
  },
];

const skips = [
  "HaxPC direct download flows",
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
