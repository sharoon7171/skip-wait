import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'CPMlink';

const bypassType = 'Skip Short Link';

const description =
  'CPMlink bypass pins Please check the captcha and clears Get Link waits so Skip Wait opens the destination after one human check.';

const domains = ['cpmlink.net'] as const;

const keywords = [
  'cpmlink bypass',
  'cpmlink.net bypass',
  'cpmlink captcha bypass',
  'cpmlink recaptcha',
  'cpmlink get link bypass',
  'cpmlink please check the captcha',
  'cpmlink disable adblock',
  'cpmlink timer bypass',
  'cpmlink countdown bypass',
  'bypass cpmlink',
  'skip cpmlink',
  'short link bypass',
  'monetized link bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
] as const;

const intro =
  'CPMlink aliases open on Please check the captcha box to proceed to the destination page—an I’m not a robot checkbox that can expand into an image grid—then a go page with Get Link under ads and a Please disable Adblock scare. Skip Wait is the $1/month Chrome extension that pins that checkbox on the overlay, keeps the image challenge usable, and opens the destination Get Link already holds.';

const body = `## Please check the captcha before any destination

A [CPMlink](https://cpmlink.net/) short alias never shows the final URL on the first screen. The gate asks you to Please check the captcha box to proceed to the destination page. That Google checkbox is real: you may only need the tick, or you may get Select all images… after a wrong answer. The site also runs Please disable Adblock and can strip the captcha card when the detector fires.

Only after a valid captcha post does the go page appear. Get Link is already pointed at the destination while a short cosmetic countdown and ad frames try to keep you watching. Clicking Get Link can also fire a pop-under. That mix drives cpmlink captcha bypass and cpmlink Get Link bypass—the file or page is ready after one human check, but the UI still wants dwell time.

### Stages on a typical alias

1. Please check the captcha / I’m not a robot on the alias
2. Optional image challenge if the checkbox is not enough
3. Please disable Adblock when the page thinks ads are blocked
4. Go page Get Link with a cosmetic countdown and ad chrome

## Pin the checkbox, then open Get Link

Skip Wait keeps the live alias tab and pins the site’s reCAPTCHA on the overlay so Please check the captcha stays in reach. When the image challenge opens, it stays on top so you can finish Select all images… without the page chrome eating clicks. After the token is accepted, the extension moves to the go page, ignores the cosmetic timer and adblock wall, and opens the URL Get Link already stores.

Miss a grid and need another try—the human check stays on the same tab. Skip Wait does not farm reCAPTCHA for you; it only keeps the real widget usable and clears the busywork after you succeed.

This CPMlink path is separate from other similarly named short-link brands. Support here is for the hosts listed on this page.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'Does Skip Wait solve the CPMlink captcha for me?',
    answer:
      'No. It pins Please check the captcha on the overlay. You still tap I’m not a robot and complete any image challenge yourself.',
  },
  {
    question: 'What if I get Select all images… or Please try again?',
    answer:
      'Finish the grid on the raised challenge. If it asks again, keep solving on the same tab—Skip Wait keeps the widget usable instead of sending you to hunt under ads.',
  },
  {
    question: 'What does a CPMlink bypass skip?',
    answer:
      'Get Link countdown theater, Please disable Adblock walls, and pop-under distraction on supported go pages. The captcha still needs a human.',
  },
  {
    question: 'Is Get Link already the destination?',
    answer:
      'On supported go pages, yes. Skip Wait opens that URL without waiting out the on-page timer.',
  },
  {
    question: 'Is this the same as CPMLink on other domains?',
    answer:
      'No. This page covers CPMlink on the domains listed here. Other similarly named shorteners have their own catalog entries.',
  },
  {
    question: 'How much does Skip Wait cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup. The CPMlink path runs on supported alias links.',
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
    body,
    faq,
  },
} satisfies SupportedBypass;
