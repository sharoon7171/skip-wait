import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "ShrtFly";

const bypassType = "Skip Short Link";

const description =
  "Free ShrtFly bypass for Chrome that skips ad-gated short-link timers, human checks, and publisher waits so you reach the destination faster.";

const domains = [
  "shrtslug.biz",
  "shrtfly.com",
  "technons.com",
  "tournguide.com",
  "dailyjobposting.xyz",
  "financefernly.com",
] as const;

const keywords = [
  "shrtfly bypass",
  "shrtfly bypass extension",
  "bypass shrtfly",
  "shrtslug bypass",
  "shrtslug.biz bypass",
  "skip short link",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "turnstile short link",
  "ad link shortener bypass",
  "link shortener bypass",
  "skip wait extension",
] as const;

const intro =
  "Add Skip Wait from the Chrome Web Store and ShrtFly network short links unlock automatically—no paste tool, userscript, or account required.";

const problem =
  "Ad-gated ShrtFly shorteners force a verify step, then rotate you through publisher pages with Turnstile, progress bars, and countdowns before the real URL loads.";

const howItWorks =
  "Skip Wait shows an unlock overlay, submits the entry verify hop, pins Turnstile on mediator pages when needed, respects only server-enforced unlock timers, follows speed-token redirects, and opens the final link.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install from the Chrome Web Store. ShrtFly network support enables itself on matching pages.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on. There is nothing to configure for supported short links or mediator hops.",
  },
  {
    title: "Open the short link as usual",
    body: "Click the monetized URL the same way you always do. The overlay takes over the unlock flow.",
  },
  {
    title: "Solve Turnstile only if shown",
    body: "When a publisher hop requires a human check, complete the pinned Turnstile once. Unlock continues afterward.",
  },
  {
    title: "Arrive at the destination",
    body: "After verify and unlock finish, Skip Wait redirects you to the real URL instead of more continue screens.",
  },
];

const skips = [
  "Forced human-verification continue clicks",
  "Publisher interstitial continue loops",
  "Progress bar and countdown unlock screens",
  "Manual next-hop form submissions",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What is a ShrtFly bypass?",
    answer:
      "It is a way to skip the ad-gated waits on ShrtFly short links. Skip Wait runs in Chrome and automates the unlock chain so you spend less time on verify and timer pages.",
  },
  {
    question: "Does this cover Shrtslug links too?",
    answer:
      "Yes. Entry links on shrtslug.biz use the ShrtFly unlock network. The same bypass handles that entry hop and the publisher mediator pages that follow.",
  },
  {
    question: "Do I still need to complete Turnstile?",
    answer:
      "Only when a mediator page requires it. Skip Wait pins the widget on the overlay; after you finish the check, the flow continues without more clicks.",
  },
  {
    question: "Is the ShrtFly bypass free?",
    answer:
      "Yes. Skip Wait is a free Chrome extension with no signup and no paid plan for ShrtFly network unlocks.",
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
