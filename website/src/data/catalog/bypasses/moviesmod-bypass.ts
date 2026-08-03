import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "MoviesMod";

const bypassType = "Skip Timed Reveal";

const description = "MoviesMod bypass skips the timed content reveal wait and shows episode and download links immediately on modded streaming pages without delay.";

const domains = [
  "episodes.modpro.blog",
  "links.modpro.blog",
] as const;

const keywords = [
  "moviesmod bypass",
  "MoviesMod bypass extension",
  "moviesmod timer bypass",
  "skip timed reveal",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "timed reveal bypass",
  "hidden link unlock",
] as const;

const intro = "MoviesMod bypass skips the timed content reveal wait and shows episode and download links immediately on modded streaming pages without delay. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "MoviesMod hides episode or download links behind a timed reveal. Users want a MoviesMod bypass that shows the links immediately.";

const howItWorks = "Skip Wait activates on recognized skip timed reveal flows and bypasses or automates the wait so you reach the content faster.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The MoviesMod bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for MoviesMod.",
  },
  {
    title: "Open the episode or download section",
    body: "Browse to the content section on MoviesMod. Skip Wait reveals links that would normally stay hidden until the timer ends.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported MoviesMod delay.",
  },
];

const skips = [
  "Timed Reveal that block the destination",
  "Timed hidden link reveals",
  "CSS locked episode links",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What timed content reveal does Skip Wait skip on MoviesMod pages?",
    answer: "Skip Wait bypasses the timed content reveal wait on episodes.modpro.blog and links.modpro.blog, showing episode and download links immediately.",
  },
  {
    question: "Which MoviesMod domains like episodes.modpro.blog are covered?",
    answer: "Both episodes.modpro.blog and links.modpro.blog are supported, with CSS-locked episode links revealed right away.",
  },
  {
    question: "Can I see episode and download links immediately on modded streaming pages?",
    answer: "Yes. Timed hidden link reveals that normally force you to wait are bypassed so links appear as soon as the page loads.",
  },
  {
    question: "Is the MoviesMod bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The MoviesMod bypass runs on supported pages with no account or paid plan required.",
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
