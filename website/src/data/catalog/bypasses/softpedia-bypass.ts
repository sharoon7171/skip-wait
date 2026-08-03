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

const intro = "Softpedia bypass skips the post download waiting page after mirror selection and opens the direct file download link without any extra delay. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Softpedia often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Skip Wait resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Softpedia bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Softpedia.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on Softpedia. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Softpedia delay.",
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
