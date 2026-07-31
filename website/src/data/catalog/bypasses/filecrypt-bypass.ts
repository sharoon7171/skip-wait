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

const intro = "Filecrypt blocks access behind a human verification gate. Skip Wait bypasses that check on supported websites on this network and unlocks the mirror list so you can choose a download host right away.";

const problem = "Filecrypt blocks the mirror list behind a human verification check. People search for a Filecrypt bypass to skip that gate and pick a file host immediately.";

const howItWorks = "Install Skip Wait, browse to a supported Filecrypt page, and use the site normally. The extension activates on recognized skip security check flows and bypasses or automates the wait so you reach the content faster. The mirror list on 3 supported websites opens without the human verification gate in the way.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Filecrypt bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Filecrypt; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Filecrypt link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait skips the verification gate and unlocks the Filecrypt mirror download list.",
  },
];

const skips = [
  "Filecrypt skip security check flows",
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
