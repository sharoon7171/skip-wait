import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "MoviesMod";

const bypassType = "Skip Timed Reveal";

const description =
  "MoviesMod bypass that skips WordPress timed-content waits so download and episode links show immediately instead of after a please-wait countdown.";

const domains = [
  "episodes.modpro.blog",
  "links.modpro.blog",
  "leechpro.blog",
] as const;

const keywords = [
  "moviesmod bypass",
  "leechpro bypass",
  "leechpro.blog bypass",
  "modpro timed content bypass",
  "skip timed reveal",
  "skip countdown timer",
  "bypass countdown timer",
  "please wait seconds bypass",
  "skip waiting page",
  "hidden download links unlock",
  "skip wait extension",
  "timed content plugin bypass",
] as const;

const intro =
  "Install Skip Wait once and timed download sections on MoviesMod-style blogs unlock as soon as the page loads—no watching a five-second generate-links timer.";

const problem =
  "These blogs hide server buttons behind a WordPress Timed Content client timer, so you stare at “wait N seconds to generate links” before any download option appears.";

const howItWorks =
  "Skip Wait injects CSS that flips Timed Content hide/show classes on load, revealing the already-rendered download buttons and episode links without waiting for the plugin timer.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install from the Chrome Web Store. Timed-reveal support for MoviesMod-related blogs enables itself automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on. No per-site toggle is required for timed download pages.",
  },
  {
    title: "Open the archive or episode page",
    body: "Load the post that shows a please-wait countdown before download servers. Links are already in the HTML.",
  },
  {
    title: "Pick a download server right away",
    body: "Fast Server, G-Drive, OneDrive, and other buttons appear immediately so you can continue without the fake generate delay.",
  },
];

const skips = [
  "Please-wait N seconds generate-links messages",
  "WordPress Timed Content client hide/show delays",
  "CSS-locked download and episode button blocks",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which sites get this timed reveal bypass?",
    answer:
      "episodes.modpro.blog, links.modpro.blog, and leechpro.blog—blogs that hide download or episode links with the Timed Content plugin.",
  },
  {
    question: "Are the download links already on the page during the timer?",
    answer:
      "Yes. The buttons are rendered in the HTML and only CSS-hidden for a few seconds. Skip Wait shows that block immediately.",
  },
  {
    question: "Does this remove the counter text as well?",
    answer:
      "The wait message lives in the Timed Content hide block, so revealing the show block and hiding the wait block removes that countdown UI with the links.",
  },
  {
    question: "Is the MoviesMod timed reveal bypass free?",
    answer:
      "Yes. Skip Wait is a free Chrome extension with no account required for these timed-content pages.",
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
