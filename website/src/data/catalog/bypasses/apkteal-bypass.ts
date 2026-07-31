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

const intro = "Need a ApkTeal direct download bypass that skips timer pages on file buttons? Skip Wait resolves real download URLs on the supported website so clicks open files instead of waiting screens.";

const problem = "ApkTeal often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a ApkTeal bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a ApkTeal download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the ApkTeal bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for ApkTeal; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on ApkTeal. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported ApkTeal page.",
  },
];

const skips = [
  "ApkTeal direct download flows",
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
