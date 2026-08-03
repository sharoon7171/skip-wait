import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "ApkTeal";

const bypassType = "Direct Download";

const description = "ApkTeal bypass skips the Premium APK download waiting page and opens direct download links for MOD and latest release versions right away for you.";

const domains = [
  "apkteal.com",
] as const;

const keywords = [
  "apkteal bypass",
  "ApkTeal bypass extension",
  "apkteal timer bypass",
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

const intro = "ApkTeal bypass skips the Premium APK download waiting page and opens direct download links for MOD and latest release versions right away for you. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "ApkTeal often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Skip Wait resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The ApkTeal bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for ApkTeal.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on ApkTeal. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported ApkTeal delay.",
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
    question: "Does Skip Wait work on ApkTeal Premium APK waiting pages?",
    answer: "Yes. Skip Wait bypasses the Premium APK download waiting page on apkteal.com and opens direct download links for both MOD and latest release versions.",
  },
  {
    question: "What happens when I download a MOD version from ApkTeal with Skip Wait?",
    answer: "The extension resolves the real file URL after your click, skipping the timer and redirect page that normally appears before the MOD APK link unlocks.",
  },
  {
    question: "Can Skip Wait bypass wait screens on ApkTeal mirror and host buttons?",
    answer: "Yes. Extra wait screens on mirror and host buttons are bypassed so clicks open files instead of intermediary generating pages.",
  },
  {
    question: "Is the ApkTeal bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The ApkTeal bypass runs on supported pages with no account or paid plan required.",
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
