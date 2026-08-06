import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Shrtslug";

const bypassType = "Skip Short Link";

const description =
  "Bypass Shrtslug and ShrtFly mediator waits—overlay unlock for shrtslug.biz and publisher pages with Turnstile, progress bars, and countdowns.";

const domains = [
  "shrtslug.biz",
  "shrtslug.com",
  "technons.com",
  "tournguide.com",
  "dailyjobposting.xyz",
  "financefernly.com",
] as const;

const keywords = [
  "shrtslug bypass",
  "shrtslug.biz bypass",
  "shrtfly bypass",
  "Shrtslug bypass extension",
  "shrtfly mediator bypass",
  "skip short link",
  "skip countdown timer",
  "bypass countdown timer",
  "turnstile captcha bypass",
  "link shortener bypass",
  "skip wait extension",
  "monetized link bypass",
] as const;

const intro =
  "Skip Wait automates the full Shrtslug chain: human verification on entry links, then Turnstile and unlock timers on publisher mediator hosts until your destination opens.";

const problem =
  "Entry links on shrtslug.biz force human-verification continues; mediator hosts add Turnstile, progress bars, and countdown gates before the real URL loads.";

const howItWorks =
  "On shrtslug.biz the overlay posts verification hops. On mediator pages it pins Turnstile when needed, waits out the server unlock timer, follows speed-token redirects, and opens the final link.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. Coverage for Shrtslug entry and mediator hosts turns on automatically—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. No settings for shrtslug.biz or the publisher mediator domains.",
  },
  {
    title: "Open a supported link",
    body: "Use a Shrtslug short link or land on a supported mediator page. The unlock overlay runs without paste tools.",
  },
  {
    title: "Complete Turnstile if shown",
    body: "Mediator hops may pin Turnstile on the overlay. Finish that check once; the flow resumes on its own.",
  },
  {
    title: "Reach the destination",
    body: "After verify hops and unlock timers finish, Skip Wait opens the destination from the overlay.",
  },
];

const skips = [
  "Human verification continues on shrtslug.biz",
  "Publisher mediator continue loops",
  "Progress bar and countdown click gates",
  "Manual next-step and scroll-to-continue screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Does Skip Wait work on Shrtslug entry links and mediator pages?",
    answer:
      "Yes. It unlocks shrtslug.biz entry hops and mediator hosts technons.com, tournguide.com, dailyjobposting.xyz, and financefernly.com.",
  },
  {
    question: "What happens on shrtslug.biz without a mediator page?",
    answer:
      "The overlay posts the human-verification step and advances the unlock hop so you skip manual continue clicks on the entry host.",
  },
  {
    question: "How does Skip Wait handle ShrtFly publisher mediator waits?",
    answer:
      "On mediator pages it pins Turnstile when required, respects the unlock timer, follows speed-token hops, and opens your destination.",
  },
  {
    question: "Is the Shrtslug bypass free with Skip Wait?",
    answer:
      "Yes. Skip Wait is a free Chrome extension. The Shrtslug bypass runs on supported pages with no account or paid plan required.",
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
