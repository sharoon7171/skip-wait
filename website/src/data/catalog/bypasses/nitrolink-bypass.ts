import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Nitro Link';

const bypassType = 'Skip Short Link';

const description =
  'Nitro Link bypass clears the article wait tour and Your link is almost ready so Skip Wait opens the destination on the short link.';

const domains = ['nitro-link.com'] as const;

const keywords = [
  'nitro link bypass',
  'nitrolink bypass',
  'nitro-link bypass',
  'nitro link timer bypass',
  'your link is almost ready bypass',
  'get link timer bypass',
  'please wait continue bypass',
  'nitro link get link bypass',
  'skip waiting page nitro',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'short link bypass',
  'skip wait chrome extension',
] as const;

const intro =
  'Nitro Link short URLs try to send you through Please wait / Continue article pages before Your link is almost ready and Get Link. Skip Wait is the $1.50/month Chrome extension that keeps you on the Nitro Link short URL and finishes unlock there.';

const body = `## Stay on the Nitro Link short URL

Open a Nitro Link alias and the shortener wants to leave for article waits—Level Step labels, Please wait, Continue, Next Step—before Your link is almost ready. Skip Wait keeps the tab on Nitro Link. You do not open those article pages yourself.

TinyURL or other wrappers that only forward into a Nitro Link alias land on the same short link. Once you are on Nitro Link, this bypass applies.

### What you actually see

- The Nitro Link short URL you opened
- Your link is almost ready with a short Get Link timer
- Get Link after that timer

## Your link is almost ready

The real hold is the Get Link timer on Your link is almost ready. Skip Wait shows that countdown from the page, waits only that time, then unlocks and opens the destination.

No babysitting Continue on article hops. That is a Nitro Link bypass that treats the short link as the whole job.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Nitro Link bypass clear?',
    answer:
      'The article Please wait / Continue tour and the Your link is almost ready Get Link timer, while you stay on the Nitro Link short URL.',
  },
  {
    question: 'Do I visit every article page?',
    answer:
      'No. Skip Wait keeps you on Nitro Link and unlocks from the short link.',
  },
  {
    question: 'Why does Skip Wait show a countdown?',
    answer:
      'Your link is almost ready rejects an early Get Link. Skip Wait uses the timer from that page, then continues when it ends.',
  },
  {
    question: 'What about TinyURL into Nitro Link?',
    answer:
      'If TinyURL only opens a Nitro Link alias, this same Nitro Link bypass runs once you are on Nitro Link.',
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
