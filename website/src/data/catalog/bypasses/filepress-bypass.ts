import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'FilePress';

const bypassType = 'Direct Download';

const description =
  'FilePress bypass skips the download page generating timer and opens direct or instant download links when you click the download button on the page.';

const domains = ['filepress.baby'] as const;

const keywords = [
  'filepress bypass',
  'FilePress bypass extension',
  'filepress timer bypass',
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
  'A FilePress bypass search usually means Instant or Direct download still forced a generating timer before the file URL appeared. Skip Wait is the $1/month Chrome extension that resolves that link in the background so the download button opens the archive without the wait page.';

const body = `## Instant download that still generates first

FilePress labels controls as direct or instant, then parks a generating timer or intermediary redirect between the click and the real file. You press download, watch the clock, and hope the CDN path appears before you refresh and lose progress.

That mismatch—instant branding, timed unlock—is why filepress timer bypass, direct download bypass, and download timer skip cluster around FilePress bypass extension installs.

## Background resolve on the download click

Skip Wait watches the download button on supported pages. It resolves the real file URL in the background and bypasses the timer or redirect page that normally follows the click. You keep using the host you already opened; nothing asks for a paste form.

Client generating chrome gets out of the way when the host allows the link. Required holds still finish honestly so the fetch stays stable.

## Host buttons that add another wait screen

Mirror and host-style buttons often stack a second wait after the first. On supported paths Skip Wait skips those extra screens so your click opens the file link instead of another timer page. A skip wait extension keeps that file host bypass path in one install.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What generating timer does Skip Wait skip?',
    answer:
      'The download-page generating timer and intermediary redirects after you click download. The extension opens the direct or instant link when the host allows it.',
  },
  {
    question: 'Do I still click the download button myself?',
    answer:
      'Yes. Use the same button. Skip Wait resolves the real file URL in the background.',
  },
  {
    question: 'Are mirror button waits covered?',
    answer:
      'Yes on supported paths. Extra wait screens on mirror and host buttons are skipped so the file opens from the click.',
  },
  {
    question: 'How much does the FilePress bypass cost?',
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
