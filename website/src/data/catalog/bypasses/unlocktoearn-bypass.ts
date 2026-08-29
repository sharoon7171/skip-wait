import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Unlock To Earn';

const bypassType = 'Skip multi step Waits';

const description =
  'Unlock To Earn bypass for Please Complete Task lists and Click Here to Open Link on unlocktoearn.com aliases—Skip Wait stays on that host, finishes unlock, and opens the next URL.';

const domains = ['unlocktoearn.com'] as const;

const keywords = [
  'unlock to earn bypass',
  'unlocktoearn bypass',
  'unlocktoearn.com bypass',
  'unlock to earn chrome extension',
  'click here to open link bypass',
  'please complete task to unlock link',
  'unlock to earn subscribe youtube',
  'unlock to earn telegram task',
  'social unlock bypass',
  'unlock to earn timer bypass',
  'unlock to earn countdown bypass',
  'please wait bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
] as const;

const intro =
  'Unlock To Earn aliases often keep you on unlocktoearn.com with a Please Complete Task to Unlock Link card—Subscribe, Join, then Click Here to Open Link. Skip Wait is the $1.50/month Chrome extension that covers that card on the short URL, skips the off-site bounce those shares still send, and opens the next URL when Click Here would have.';

const body = `## The task card is the waiting page

[Unlock To Earn](https://unlocktoearn.com/) short aliases do not need a second domain in your address bar. The useful screen is already on unlocktoearn.com/{alias}: a lock-style list (SUBSCRIBE on YouTube, LIKE & COMMENT, Join on Telegram, Join on WhatsApp) and a disabled Click Here to Open Link control that only enables after each row’s delay.

Those rows are on-page theater. They do not contain the next URL. Click Here to Open Link posts a hidden referdomain field on the same alias; that post is what returns the next location. Home, login, and register never start this.

A raw open without Skip Wait can still 302 the tab away. Skip Wait keeps the alias in the tab, shows an overlay over the task card, and completes that same Click Here post in the background.

### What this page is not

It is not a promise of a file host. The post can open a cloud folder, another shortener, or any other http(s) URL the publisher stored. Unlock To Earn support ends when that URL loads.

If LiteSpeed shows Bot verification / reCAPTCHA on the alias, finish the check on the overlay; Skip Wait continues after it.

## Click Here without the subscribe tour

Skip Wait does not click every social row. It does not open YouTube, Telegram, or WhatsApp for this flow. It posts Click Here to Open Link the way the page already does, then navigates to the Location that post returns.

Cosmetic disable-link delays and spinner ticks are ignored. You stay on unlocktoearn.com until the next URL is ready. If a share stops resolving, reload the alias or report it—there is no extra host list to refresh for this brand.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'When does Unlock To Earn bypass start?',
    answer:
      'On a short-alias URL on unlocktoearn.com. Home, login, and register do not start it.',
  },
  {
    question: 'Do I still Subscribe / Join every row?',
    answer:
      'No. Those rows only delay Click Here to Open Link in the page UI. Skip Wait completes the Click Here post without the social tour.',
  },
  {
    question: 'Will the tab leave unlocktoearn.com for article hosts?',
    answer:
      'No. Skip Wait keeps the alias on unlocktoearn.com until the next URL is ready, then opens that URL in the same tab.',
  },
  {
    question: 'Is the next URL always a download?',
    answer:
      'No. Click Here returns whatever the publisher stored—another page, another shortener, or a file host. This bypass stops when that URL opens.',
  },
  {
    question: 'How much does Skip Wait cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. Unlock To Earn runs on supported alias links.',
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
