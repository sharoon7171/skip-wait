import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Softpedia';

const bypassType = 'Direct Download';

const description =
  'Softpedia bypass skips the post download waiting page after mirror selection and opens the direct file download link without any extra delay.';

const domains = ['softpedia.com'] as const;

const keywords = [
  'softpedia bypass',
  'Softpedia bypass extension',
  'softpedia timer bypass',
  'direct download',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'direct download bypass',
  'download timer skip',
  'file host bypass',
] as const;

const intro =
  'Looking for a Softpedia bypass or download timer skip usually means you already picked a mirror and still hit a generating wait before the real file. Skip Wait is the $1.50/month Chrome extension that resolves the direct download path after mirror selection so skip waiting page busywork is not another hop.';

const body = `## Mirror chosen—then another generating screen

Softpedia download flows often sit a waiting page, generating timer, or intermediary redirect after you pick a mirror. The software page already knows where the file lives; the extra screen is delay theater before the CDN path starts. That pattern drives softpedia timer bypass, direct download bypass, and file host bypass searches when you only wanted the installer.

Refreshing the wait page rarely helps. The file URL is resolved separately from the countdown UI.

### After-click delays people actually hit

- Post-download waiting pages after mirror selection
- Generating timers before the file link appears
- Intermediary redirect pages before the CDN
- Extra waits on mirror and host buttons

## Resolving the file URL in the background

Skip Wait runs on matching Softpedia download pages. When you use the same download or mirror control you already click, the extension resolves the real file URL in the background and bypasses the timer or redirect page that normally follows.

Client delay chrome gets out of the way. That is a Softpedia bypass extension for direct download—not a third-party paste site that asks you to copy the page URL again.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What post-download wait does Skip Wait skip?',
    answer:
      'It bypasses the waiting page that appears after mirror selection and opens the direct file link when Softpedia allows it.',
  },
  {
    question: 'Does Skip Wait open direct file links after mirror selection?',
    answer:
      'Yes. The extension resolves the real file URL in the background and skips the timer page that normally follows your mirror choice.',
  },
  {
    question: 'Do generating timers still run?',
    answer:
      'Client generating theater and intermediary redirects are bypassed. If the host still needs a short check before the file URL exists, Skip Wait stays until it is allowed.',
  },
  {
    question: 'Is this a paste-a-link Softpedia decoder?',
    answer:
      'No. You click download on Softpedia as usual. The extension works on that page.',
  },
  {
    question: 'How much does the Softpedia bypass cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. The Softpedia path runs on supported pages.',
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
