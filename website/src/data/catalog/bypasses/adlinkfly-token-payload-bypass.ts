import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "AdLinkFly Token Payload";

const bypassType = "Skip Short Link";

const description = "AdLinkFly bypass unlocks the destination URL from token payload captcha pages without extra countdown timers, unlock waits, or forced gate delays.";

const domains = [
  "oii.la",
  "tpi.li",
  "aii.sh",
  "lnbz.la",
  "shrink.pe",
] as const;

const keywords = [
  "adlinkfly bypass",
  "AdLinkFly token bypass",
  "oii.la bypass",
  "tpi.li bypass",
  "aii.sh bypass",
  "shrink.pe bypass",
  "ad link shortener bypass",
  "short link bypass",
  "bypass countdown timer",
  "link shortener bypass",
  "monetized link bypass",
] as const;

const intro = "AdLinkFly token payload pages hide the real destination behind a captcha screen and encoded token field. Skip Wait decodes the unlock token after you verify and redirects you to the final URL on oii.la, tpi.li, and related AdLinkFly hosts.";

const problem = "AdLinkFly Token Payload monetized short links chain gate pages, captcha screens, and unlock timers before the destination. A AdLinkFly Token Payload bypass is what people want when they need the final URL without clicking through every hop.";

const howItWorks = "Install Skip Wait and open a supported AdLinkFly token payload link such as oii.la or tpi.li. Complete the captcha when it appears. The extension reads the hidden token payload, extracts the destination URL, and redirects you without walking through additional unlock pages. Gate hops on 5 supported websites keep moving until the destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the AdLinkFly Token Payload bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for AdLinkFly Token Payload; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a AdLinkFly Token Payload link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported AdLinkFly Token Payload delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Post captcha unlock countdown pages",
  "Manual token decode steps",
  "Extra go page redirect hops",
  "Repeated short link verification screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "How does Skip Wait get the final URL from oii.la or tpi.li token pages?",
    answer: "After you complete the captcha, Skip Wait reads the hidden token payload, extracts the encoded destination URL, and redirects you directly without additional unlock pages.",
  },
  {
    question: "Do I need to complete the captcha before Skip Wait redirects on AdLinkFly token pages?",
    answer: "Yes. You verify the captcha when it appears, and Skip Wait then decodes the token and sends you to the final link on oii.la, tpi.li, and related hosts.",
  },
  {
    question: "What extra unlock pages does Skip Wait skip after the captcha on token payload links?",
    answer: "Skip Wait bypasses countdown and follow-up unlock steps by pulling the destination straight from the token field once captcha verification is done.",
  },
  {
    question: "Is the AdLinkFly Token Payload bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The AdLinkFly Token Payload bypass runs on supported pages with no account or paid plan required.",
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
