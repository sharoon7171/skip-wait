import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Softpedia";

const bypassType = "Direct Download";

const description = "Softpedia bypass skips the post download waiting page after mirror selection and opens the direct file download link without any extra delay.";

const domains = [
  "softpedia.com",
] as const;

const keywords = [
  "softpedia bypass",
  "Softpedia bypass extension",
  "softpedia timer bypass",
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

const intro = "Need a Softpedia direct download bypass that skips timer pages on file buttons? Skip Wait resolves real download URLs on the supported website so clicks open files instead of waiting screens.";

const problem = "Softpedia often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a Softpedia bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a Softpedia download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Softpedia bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Softpedia; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on Softpedia. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported Softpedia page.",
  },
];

const skips = [
  "Softpedia direct download flows",
  "Download generating timers after button clicks",
  "Intermediary redirect pages before the file",
  "Extra wait screens on mirror and host buttons",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What post-download waiting page does Skip Wait skip on Softpedia?",
    answer: "Skip Wait bypasses the post-download waiting page that appears after mirror selection on softpedia.com and opens the direct file link.",
  },
  {
    question: "Does Skip Wait open direct file links after mirror selection?",
    answer: "Yes. The extension resolves the real file URL in the background and skips the timer page that normally follows your mirror choice.",
  },
  {
    question: "How does Skip Wait bypass delays after I choose a Softpedia mirror?",
    answer: "Generating timers and intermediary redirect pages are bypassed so the download starts from the resolved link immediately.",
  },
  {
    question: "Is the Softpedia bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Softpedia bypass runs on supported pages with no account or paid plan required.",
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
