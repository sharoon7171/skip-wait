import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Theuser.cloud";

const bypassType = "Direct Download";

const description = "Theuser.cloud bypass solves the custom captcha gate and starts your direct file download in one click without the generated link waiting page.";

const domains = [
  "theuser.cloud",
] as const;

const keywords = [
  "theuser.cloud bypass",
  "Theuser.cloud bypass extension",
  "theuser.cloud timer bypass",
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

const intro = "Theuser.cloud bypass solves the custom captcha gate and starts your direct file download in one click without the generated link waiting page. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Theuser.cloud often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Cloud download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Theuser.cloud bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Theuser.cloud.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on Theuser.cloud. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Theuser.cloud delay.",
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
    question: "What custom captcha gate does Skip Wait solve on theuser.cloud?",
    answer: "Skip Wait solves the custom captcha gate on theuser.cloud and starts your direct file download without the generated link waiting page.",
  },
  {
    question: "Does Skip Wait skip the generated link waiting page for downloads?",
    answer: "Yes. The extension resolves the real file URL in the background and bypasses the timer page that normally follows captcha verification.",
  },
  {
    question: "Can I start a direct file download from Theuser.cloud in one click?",
    answer: "Yes. Intermediary redirect pages and extra wait screens are skipped so your download begins from the resolved link immediately.",
  },
  {
    question: "Is the Theuser.cloud bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Theuser.cloud bypass runs on supported pages with no account or paid plan required.",
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
