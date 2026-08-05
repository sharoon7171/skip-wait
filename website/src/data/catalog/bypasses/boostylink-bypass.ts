import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "BoostyLink";

const bypassType = "Skip Countdown";

const description = "BoostyLink bypass automates the content locker actions and unlock timer on monetized short links so your destination opens without tapping each step.";

const domains = [
  "boostylink.com",
] as const;

const keywords = [
  "boostylink bypass",
  "BoostyLink bypass extension",
  "boostylink timer bypass",
  "skip countdown",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "countdown timer bypass",
  "skip timer unlock",
] as const;

const intro = "BoostyLink bypass automates the content locker actions and unlock timer on monetized short links so your destination opens without tapping each step. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "BoostyLink puts locker actions and a server unlock timer in front of the continue step. A BoostyLink bypass runs those actions for you and opens the destination when the unlock completes.";

const howItWorks = "Skip Wait starts the locker actions, waits out the unlock timer, completes each action, and opens the destination URL automatically.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The BoostyLink bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for BoostyLink.",
  },
  {
    title: "Open a supported link",
    body: "Open a BoostyLink link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported BoostyLink delay.",
  },
];

const skips = [
  "Manual locker action clicks",
  "Unlock timer busywork on the page",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which BoostyLink domain does Skip Wait support?",
    answer: "Skip Wait supports boostylink.com locker pages, automating action start and complete calls before opening the destination URL.",
  },
  {
    question: "Does Skip Wait remove the BoostyLink unlock timer completely?",
    answer: "The unlock timer is server-side. Skip Wait runs the locker flow for you and opens the destination as soon as the unlock is allowed—no manual action clicks.",
  },
  {
    question: "Will BoostyLink still open my return URL after unlock?",
    answer: "Yes. When the locker returns a destination URL—including return links from sites that use BoostyLink as their shortener—Skip Wait navigates there automatically after unlock.",
  },
  {
    question: "Is the BoostyLink bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The BoostyLink bypass runs on supported pages with no account or paid plan required.",
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
