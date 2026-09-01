import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'GamesNostalgia';

const bypassType = 'Direct Download';

const description =
  'GamesNostalgia bypass skips the download modal and generates the CDN file link in the background so Download this File opens the archive directly.';

const domains = ['gamesnostalgia.com'] as const;

const keywords = [
  'gamesnostalgia bypass',
  'gamesnostalgia bypass chrome',
  'gamesnostalgia bypass extension',
  'bypass gamesnostalgia',
  'skip gamesnostalgia',
  'gamesnostalgia timer bypass',
  'gamesnostalgia download bypass',
  'gamesnostalgia waiting page',
  'direct download bypass',
  'download timer skip',
  'file host bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'skip wait extension',
  'retro game download bypass',
  'cdn download bypass',
] as const;

const intro =
  'A GamesNostalgia bypass search usually means you clicked Download this File and got stuck in a generating modal instead of the archive. Skip Wait is a Chrome extension that resolves the CDN link in the background so the same button opens the file without the forced wait.';

const body = `## Generating modal between Download this File and the archive

GamesNostalgia stores classic game archives behind a download modal that generates a CDN URL after you click. That generating timer, intermediary redirect, and extra wait on mirror buttons sit between you and the zip or iso you already chose.

People look for a GamesNostalgia timer bypass, direct download bypass, and download timer skip because babysitting the modal every time adds nothing to the download itself.

## CDN resolve behind the same button

Skip Wait’s GamesNostalgia support watches the download click you already make. It resolves the real CDN file URL in the background and skips the modal wait so Download this File opens the archive directly when the host allows it.

Client-only generating chrome gets out of the way. You still use the same download button—no paste tool, no alternate mirror hunt. Retro archives stay one intentional click, not a second scavenger hunt.

## Retro archives without babysitting the modal

Sitting through the modal on every archive wastes time without changing the file. A GamesNostalgia bypass chrome or GamesNostalgia bypass extension install keeps the direct path working on supported pages so classic downloads start from the button you pressed.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What is a GamesNostalgia bypass?',
    answer:
      'A way to skip the download modal wait and open the CDN archive link directly. Skip Wait generates the file URL in the background so Download this File starts without the generating screen.',
  },
  {
    question: 'Does Skip Wait skip the generating timer instantly?',
    answer:
      'It removes the modal busywork and resolves the CDN link when the host allows it—a reliable GamesNostalgia download bypass, not a broken zero-second cheat.',
  },
  {
    question: 'Do I still click Download this File myself?',
    answer:
      'Yes. Use the same button you always use. Skip Wait handles the wait behind that click.',
  },
  {
    question: 'Will this work on mirror and host buttons?',
    answer:
      'Yes on supported download paths. Extra wait screens and intermediary redirects before the file are skipped so the archive opens from the button you pressed.',
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
