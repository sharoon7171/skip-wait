import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Rinku";

const bypassType = "Skip Short Link";

const description =
  "Rinku bypass for people tired of please-wait screens: skip the Rinku countdown, clear the waiting page, and move past unlock checks on monetized ad links so the real destination shows up sooner.";

const domains = [
  "excelad.top",
  "7mb.io",
  "rinku.pro",
  "rinku.me",
  "halo.cararabic.com",
  "biosjourney.com",
  "noble.postalcode.com.pk",
  "esladvice.com",
] as const;

const keywords = [
  "rinku bypass",
  "bypass rinku",
  "skip rinku",
  "rinku.me bypass",
  "rinku.pro bypass",
  "7mb.io bypass",
  "fly.inc bypass",
  "rinku timer bypass",
  "rinku countdown bypass",
  "rinku waiting page",
  "rinku chrome extension",
  "rinku bypass extension",
  "skip short link",
  "short link bypass",
  "ad link bypass",
  "monetized link bypass",
  "link shortener bypass",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "please wait bypass",
  "skip wait chrome extension",
  "skip wait extension",
] as const;

const intro =
  "Searching for a Rinku bypass usually means one thing: you clicked a short link and got parked on a timer instead of the file, video, or page you wanted. Fly.inc-style monetized shorteners lean on that delay—Rinku waiting pages, a countdown you cannot ignore, sometimes a human check, then another unlock hop. Skip Wait is a free Chrome extension built for that exact mess. It does not ask you to paste the URL into another site. You open the Rinku link like normal; when the page matches, the extension runs a rinku timer bypass and short link bypass in place so less of your day disappears into please-wait theater.";

const problem =
  "Ad link networks get paid when you linger. Rinku is good at that: the clock runs, the continue button stays locked, a captcha may appear, and leaving the tab can reset progress. Searching “skip rinku” or “rinku countdown bypass” is what people do after the third identical waiting page. The friction is the product—not a bug.";

const howItWorks =
  "On a supported Rinku flow, Skip Wait watches for the waiting page and unlock UI the shortener actually serves. It advances countdown and continue steps it can handle, keeps captcha follow-ups in view when a check is required, and lets the shortener itself hand back the next URL. Nothing is invented offline—the destination still comes from the live unlock path, just with less idle staring.";

const steps: readonly BypassStep[] = [
  {
    title: "Install the Rinku Chrome extension path",
    body: "Get Skip Wait from the Chrome Web Store. That single install is your rinku bypass extension—no separate app, no signup wall.",
  },
  {
    title: "Click the short link you already have",
    body: "Use the same Rinku or Fly.inc-style link from Discord, Telegram, or a download page. Skip Wait wakes up on matching pages only.",
  },
  {
    title: "Finish any human check if one shows",
    body: "If a captcha appears, complete it once. The extension stays on the unlock path so you are not hunting for a hidden continue button afterward.",
  },
  {
    title: "Land on what you came for",
    body: "When the shortener releases the next hop or final URL, you follow it—without replaying the full please-wait loop by hand.",
  },
];

const skips = [
  "Rinku countdown timers that hold the continue button",
  "Waiting-page delays on monetized short links",
  "Unlock hops after the timer finally ends",
  "Captcha follow-ups that sit on top of the gate",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Is this a paste-a-link rinku.me bypass website?",
    answer:
      "No. Skip Wait is a Chrome extension. You never paste the short URL into a third-party bypass page—the rinku chrome extension work happens on the page you already opened.",
  },
  {
    question: "Will a rinku timer bypass still need a captcha sometimes?",
    answer:
      "Often yes. Human checks stay with you; what disappears is the busywork around them—watching the clock, hunting continue, restarting after every stall.",
  },
  {
    question: "Does skip rinku mean the destination is guessed?",
    answer:
      "No. Skip Wait drives the real short-link unlock. The final address still comes from the shortener after those steps succeed.",
  },
  {
    question: "Is the Skip Wait rinku bypass free?",
    answer:
      "Yes. Free Chrome extension, no account, no paid tier required for the supported Rinku short link bypass.",
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
