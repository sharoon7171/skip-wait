import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "MuhammadNiaz";

const bypassType = "Skip Countdown Timer";

const description = "MuhammadNiaz bypass skips the download countdown timer before create download link so you unlock software files from this host faster every time.";

const domains = [
  "muhammadniaz.link",
] as const;

const keywords = [
  "muhammadniaz bypass",
  "MuhammadNiaz bypass extension",
  "muhammadniaz timer bypass",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "create download link bypass",
  "download wait skip",
] as const;

const intro = "MuhammadNiaz bypass skips the download countdown timer before create download link so you unlock software files from this host faster every time. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "MuhammadNiaz forces a download countdown before create download link. A MuhammadNiaz bypass skips that timer so the file unlocks faster.";

const howItWorks = "Skip Wait activates on recognized skip countdown timer flows and bypasses or automates the wait so you reach the content faster. The create download link countdown on the supported website is skipped so files unlock faster.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The MuhammadNiaz bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for MuhammadNiaz.",
  },
  {
    title: "Open a supported link",
    body: "Open a MuhammadNiaz link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported MuhammadNiaz delay.",
  },
];

const skips = [
  "Countdown Timer that block the destination",
  "Create download link countdowns",
  "Pre generate file waits",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What countdown blocks the create download link button on MuhammadNiaz?",
    answer: "A pre-generate file countdown locks the create download link button on muhammadniaz.link, and Skip Wait bypasses that timer so the button unlocks immediately.",
  },
  {
    question: "Can Skip Wait unlock software files from muhammadniaz.link faster?",
    answer: "Yes. Skip Wait skips the countdown before create download link so you can generate the file link without waiting through the full timer.",
  },
  {
    question: "Does Skip Wait skip the pre-generate file wait on MuhammadNiaz?",
    answer: "Yes. The extension activates on countdown timer flows and bypasses the delay so you reach the download link creation step right away.",
  },
  {
    question: "Is the MuhammadNiaz bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The MuhammadNiaz bypass runs on supported pages with no account or paid plan required.",
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
