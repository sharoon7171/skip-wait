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

const intro = "Need a Theuser.cloud direct download bypass that skips timer pages on file buttons? Skip Wait resolves real download URLs on the supported website so clicks open files instead of waiting screens.";

const problem = "Theuser.cloud often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a Theuser.cloud bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a Theuser.cloud download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Theuser.cloud bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Theuser.cloud; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on Theuser.cloud. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported Theuser.cloud page.",
  },
];

const skips = [
  "Theuser.cloud direct download flows",
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
