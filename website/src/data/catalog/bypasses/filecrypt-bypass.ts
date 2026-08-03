import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Filecrypt";

const bypassType = "Skip Security Check";

const description = "Filecrypt bypass skips the I am human verification check and unlocks the mirror download list so you can pick your file host right away and download.";

const domains = [
  "filecrypt.cc",
  "filecrypt.to",
  "filecrypt.co",
] as const;

const keywords = [
  "filecrypt bypass",
  "Filecrypt bypass extension",
  "filecrypt timer bypass",
  "skip security check",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "human verification bypass",
  "captcha gate bypass",
] as const;

const intro = "Filecrypt bypass skips the I am human verification check and unlocks the mirror download list so you can pick your file host right away and download. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Filecrypt blocks the mirror list behind a human verification check.";

const howItWorks = "Skip Wait activates on recognized skip security check flows and bypasses or automates the wait so you reach the content faster.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Filecrypt bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Filecrypt.",
  },
  {
    title: "Open a supported link",
    body: "Open a Filecrypt link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Filecrypt delay.",
  },
];

const skips = [
  "Security Check that block the destination",
  "Human verification gates",
  "Mirror list lock screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What human verification check does Skip Wait skip on Filecrypt?",
    answer: "Skip Wait bypasses the I am human verification gate on Filecrypt and unlocks the mirror download list so you can pick a file host immediately.",
  },
  {
    question: "Which Filecrypt domains like filecrypt.cc and filecrypt.to are covered?",
    answer: "Skip Wait supports filecrypt.cc, filecrypt.to, and filecrypt.co, bypassing security check flows on all three mirror list hosts.",
  },
  {
    question: "Can I see the mirror download list on Filecrypt without the security gate?",
    answer: "Yes. The mirror list lock screen is bypassed so you choose your download host right away instead of after manual verification.",
  },
  {
    question: "Is the Filecrypt bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Filecrypt bypass runs on supported pages with no account or paid plan required.",
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
