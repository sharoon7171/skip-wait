import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'ShrinkEarn';

const bypassType = 'Skip Short Link';

const description =
  'ShrinkEarn bypass clears advertisingcamps Turnstile, blog hops, and Your Link Is Almost Ready so Skip Wait opens the destination.';

const domains = ['oii.la', 'tpi.li'] as const;

const keywords = [
  'shrinkearn bypass',
  'oii.la bypass',
  'tpi.li bypass',
  'policybuzz bypass',
  'health shield bypass',
  'advertisingcamps bypass',
  'taboola shortlink bypass',
  'verify you are human bypass',
  'turnstile shortlink bypass',
  'your link is almost ready bypass',
  'almost ready seconds bypass',
  'get link countdown bypass',
  'skip waiting page oii',
  'skip waiting page tpi',
  'monetized short link bypass',
  'ad shortener bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'short link bypass',
  'skip wait chrome extension',
  'chrome extension shortlink bypass',
] as const;

const intro =
  'ShrinkEarn short links on oii.la and tpi.li usually start with advertisingcamps Turnstile, push blog hops, then land on Your Link Is Almost Ready before anything useful opens. Skip Wait is the Chrome extension that keeps you on the short link, finishes the human check when required, clears those hops, and waits the standard unlock delay on the same tab.';

const body = `## Turnstile on advertisingcamps first

These aliases post Continue to advertisingcamps.com taboola landings. Continue must include a real Cloudflare Turnstile result—Skip Wait does not fake it. It moves the captcha into the Skip Wait card so you can finish the box, then continues automatically.

Miss the check or reload mid-run and you restart on the same card. The session that unlocks the chain lives in that tab.

### Screens you actually see

- Verify you are human with Turnstile on the short link
- Rotating blog articles with Continue-style hop forms
- Your Link Is Almost Ready with a seconds readout and Get Link
- Download or Get a link tiles around the page that are ads—not unlock

## Blog hops after camps

After a valid Continue, the shortener sends you through rotating blog hosts with hop forms that must post back to the alias. Skip Wait submits those hops with the cookies the blogs expect and returns to the unlock shell on the short link you opened.

Leave during a hop, close the wrong tab, or reload and the chain starts again without ad_form_data on the unlock page.

## Your Link Is Almost Ready

The unlock page runs a short seconds counter before Get Link unlocks. Skip Wait waits that standard delay, then finishes Get Link and opens the destination.

Client chrome gets out of the way; server-side holds still finish honestly. That is a ShrinkEarn bypass that stays on one tab from the short URL you opened.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a ShrinkEarn bypass skip?',
    answer:
      'It skips babysitting blog hop tabs, hunting Continue on article pages, and watching the Almost Ready timer by hand. Turnstile still completes when the page requires a human check.',
  },
  {
    question: 'Do I still need to solve Turnstile?',
    answer:
      'Yes when advertisingcamps requires it. Skip Wait pins that check in the overlay, then takes over once the token is valid.',
  },
  {
    question: 'Why does Skip Wait show a countdown on Almost Ready?',
    answer:
      'The shortener rejects an early Get Link. Skip Wait waits the standard unlock delay on the Skip Wait screen, then continues when that time is up.',
  },
  {
    question: 'Will the status text change while it works?',
    answer:
      'Yes. You see when the human check is loading, when wait pages are being skipped, when Almost Ready is counting down, and when the destination is opening.',
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
