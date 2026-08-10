import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'AnkerGames';

const bypassType = 'Direct Download';

const description =
  'AnkerGames bypass that skips the treasure box scroll in the download modal and opens the signed CDN file from each Direct button without the animation wait.';

const domains = ['ankergames.net'] as const;

const keywords = [
  'ankergames bypass',
  'AnkerGames bypass extension',
  'ankergames bypass chrome',
  'bypass ankergames',
  'skip ankergames',
  'ankergames timer bypass',
  'ankergames treasure box skip',
  'ankergames direct download',
  'treasure box download bypass',
  'cdn download bypass',
  'direct download',
  'direct download bypass',
  'download timer skip',
  'file host bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'skip wait extension',
] as const;

const intro =
  'An AnkerGames bypass search usually means the download modal still forces a treasure box scroll before the signed file link appears. Skip Wait is the free Chrome extension that opens that CDN path from each Direct button without the scroll delay theater.';

const body = `## Treasure box scrolls before the CDN file

AnkerGames download modals often sit a playful scroll or wait in front of the real signed CDN URL. You open Direct, watch the treasure box animation, then finally get the file. Across multi-part games that ritual adds up—hence ankergames treasure box skip, download timer skip, and direct download bypass queries on every release page.

### What the modal inserts

- Treasure box scroll delays before the file
- Generating-style waits after Direct clicks
- Intermediary screens before the CDN link
- Extra holds on mirror-style controls in the modal

## Direct buttons that already know the signed URL

Skip Wait’s AnkerGames support resolves the real CDN file URL in the background when you press Direct. Instead of waiting out the treasure box scroll, you move straight to the signed link the modal was going to reveal anyway. One AnkerGames bypass extension install covers those buttons—no paste tool and no manual URL decoding.

You still choose the part or mirror you want; Skip Wait only removes the busywork wait between the click and the file path.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What delay does an AnkerGames bypass remove?',
    answer:
      'It skips the treasure box scroll delay in the download modal and opens the signed CDN file link from each Direct button.',
  },
  {
    question: 'How do files open from the modal?',
    answer:
      'When you click Direct, the extension resolves the real CDN URL in the background instead of making you finish the treasure box wait first.',
  },
  {
    question: 'Does it clear generating waits after download clicks?',
    answer:
      'Yes on supported controls. Intermediary screens and extra modal holds are cleared so the file link opens from the button you already pressed.',
  },
  {
    question: 'Do I need to decode the CDN URL myself?',
    answer:
      'No. Skip Wait reads the destination the page already prepared and opens it after your Direct click.',
  },
  {
    question: 'Is the AnkerGames path free?',
    answer:
      'Yes. Skip Wait is free. The AnkerGames bypass runs on supported pages with no account or paid plan.',
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
