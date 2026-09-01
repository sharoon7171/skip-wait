import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'ShrinkMe';

const bypassType = 'Skip Short Link';

const description =
  'ShrinkMe bypass skips entry captcha gates, blog mediator pages, and countdown timers on ShrinkMe monetized links for faster destination access.';

const domains = [
  'shrinkme.click',
  'shrinke.me',
  'shrinkme.io',
  'themezon.net',
  'en.mrproblogger.com',
] as const;

const keywords = [
  'shrinkme bypass',
  'ShrinkMe bypass extension',
  'shrinkme timer bypass',
  'skip short link',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'ad link bypass',
  'short link bypass',
  'monetized link bypass',
] as const;

const intro =
  'A ShrinkMe bypass search usually starts after a monetized short URL hits an entry captcha, a blog mediator, and another countdown before the file. Skip Wait is the Chrome extension that walks that short link bypass path in place so ad-link gates stop eating the whole session.';

const body = `## Captcha first, then blogs, then another clock

ShrinkMe shares rarely open in one hop. You clear an entry check, land on a rotating article with Continue buried under ads, then return for a go-page countdown that only unlocks after the mediators cooperate. Leave mid-chain and the monetized link bypass hunt starts again—exactly the loop behind shrinkme timer bypass and skip waiting page searches.

The shortener’s model is dwell time: captcha, blog hop, unlock timer. Each layer is real page work, not a single fake redirect.

### Layers that reset if you bail early

- Entry captcha gates before any continue control
- Blog mediator articles with please-wait strips
- Go-page countdown and unlock redirect hops
- Session loss when a hop opens in the wrong tab

## Automating the chain without a paste box

Skip Wait starts on the short URL you opened and advances the same gates the shortener already expects—captcha stays visible when a human check is required, blog continues complete without button hunting, and the unlock screen progresses once the chain is ready.

Client chrome gets out of the way; server-side holds still finish honestly. That is a ShrinkMe bypass extension that stays useful when mediator hosts rotate, unlike paste APIs keyed to last week’s blog list.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a ShrinkMe bypass skip?',
    answer:
      'It skips babysitting entry captcha UI, blog Continue hunting, and go-page countdown busywork on monetized short links. Required checks still complete before the destination opens.',
  },
  {
    question: 'Do I still solve the entry captcha?',
    answer:
      'Yes when the page requires a human check. Skip Wait keeps the widget usable; what disappears is the delay theater around it.',
  },
  {
    question: 'Will blog mediator hosts break this?',
    answer:
      'If the unlock pattern is the same, the extension follows live page behavior. You do not re-paste the URL into a third-party tool when a mediator rotates.',
  },
  {
    question: 'Is every countdown removed instantly?',
    answer:
      'No. Client-only delays and button hunting go away. When unlock still needs a real wait, Skip Wait stays on that step, then continues.',
  },
  {
    question: 'Do I need a license?',
    answer:
      'Yes. Get a free trial or monthly license on EAS Store and activate your key in the extension popup.',
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
