import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Work.ink';

const bypassType = 'Skip Short Link';

const description =
  'Work.ink bypass that pins hCaptcha when required, clears short-link unlock gates, and opens the destination after verification—without post-captcha continue loops.';

const domains = ['work.ink'] as const;

const keywords = [
  'work.ink bypass',
  'workink bypass',
  'work.ink bypass extension',
  'work.ink timer bypass',
  'work.ink hcaptcha',
  'skip short link',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'hcaptcha short link',
  'monetized link bypass',
] as const;

const intro =
  'A Work.ink bypass or workink bypass search usually means a monetized short URL stuck you behind hCaptcha and an unlock gate before the real destination. Skip Wait is the $1/month Chrome extension that pins the check, clears post-captcha unlock waits, and opens the target so skip short link is not a manual continue loop.';

const body = `## Captcha, then unlock, then the real URL

Work.ink short links put verification and unlock gates between the short path and your destination. You solve hCaptcha, wait for unlock, and only then reach the target. Miss the pinned check, stay logged into a publisher session that blocks the free path, or leave mid-unlock and the same monetized link bypass loop restarts.

That two-step stall is why people search Work.ink hCaptcha, hcaptcha short link, and Work.ink timer bypass together.

### Gates after the short path

- Short-link unlock screens on matching paths
- hCaptcha before unlock is allowed
- Post-captcha unlock waits before the destination
- Manual continue loops after verification

## Pinning the check and finishing unlock

On a matching short URL, Skip Wait shows an overlay, pins hCaptcha when required, then unlocks and opens the destination after you complete the check. Only short-link paths are covered—not every page on the host.

You keep opening the shared short URL as usual. No paste tool.

## Publisher logins that block the free path

If a publisher auth session is active, free-path unlock can stall even with the extension on. Log out of that publisher session, reopen the short link, and let Skip Wait pin captcha again.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Which Work.ink links does Skip Wait support?',
    answer:
      'Short-link paths only (the monetized unlock URLs)—not every page on the host.',
  },
  {
    question: 'Do I still solve captcha?',
    answer:
      'Yes when the site shows one. Skip Wait pins hCaptcha in the overlay; after you solve it, unlock continues automatically.',
  },
  {
    question: 'Why might the bypass stall?',
    answer:
      'A publisher login session can block free-path unlock. Log out of that publisher session, then open the short link again.',
  },
  {
    question: 'How much does the Work.ink bypass cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup.',
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
