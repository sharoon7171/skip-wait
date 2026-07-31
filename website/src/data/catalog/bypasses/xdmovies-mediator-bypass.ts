import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "XDMovies Mediator";

const bypassType = "Skip Waiting Page";

const description = "XDMovies bypass skips the extra waiting page and verification steps in the download mediator chain to open your file link faster and automatically.";

const domains = [
  "latestnewsonline.sbs",
] as const;

const keywords = [
  "xdmovies mediator bypass",
  "XDMovies Mediator bypass extension",
  "xdmovies mediator timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Tired of XDMovies Mediator waiting pages that block every link? Skip Wait is a free Chrome extension built to bypass those gate screens on the supported website without extra setup.";

const problem = "XDMovies Mediator places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a XDMovies Mediator bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "After you add Skip Wait, visit a XDMovies Mediator link as usual. When the waiting page loads, the extension runs in the background, skips the delay layer, and sends you straight to the target URL supported for XDMovies Mediator. You get past continue loops on the supported website and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the XDMovies Mediator bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for XDMovies Mediator; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a XDMovies Mediator link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported XDMovies Mediator delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "XDMovies Mediator skip waiting page flows",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What verification steps does Skip Wait skip in the XDMovies download mediator chain?",
    answer: "Skip Wait skips the extra waiting page and verification steps in the XDMovies download mediator chain on latestnewsonline.sbs to open your file link faster.",
  },
  {
    question: "Does Skip Wait bypass the extra waiting page on latestnewsonline.sbs?",
    answer: "Yes. please wait and click-to-continue gate screens are bypassed automatically when you open an XDMovies Mediator link.",
  },
  {
    question: "How does Skip Wait help open file links faster from XDMovies mediators?",
    answer: "When the mediator waiting page loads, the extension skips the delay layer and sends you straight to the target file URL.",
  },
  {
    question: "Is the XDMovies bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The XDMovies bypass runs on supported pages with no account or paid plan required.",
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
