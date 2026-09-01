import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Ontops';

const bypassType = 'Skip Waiting Page';

const description =
  'Ontops bypass reads the destination already encoded on /st links and Skip Wait opens that URL without sitting through the Ontops hop gate.';

const domains = ['ontops.link'] as const;

const keywords = [
  'ontops bypass',
  'ontops.link bypass',
  'ontops short link bypass',
  'ontops st bypass',
  'ontops waiting page',
  'ontops timer bypass',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
  'please wait bypass',
  'waiting page bypass',
] as const;

const intro =
  'Ontops /st links park traffic on a hop gate before the real destination. Skip Wait is the Chrome extension that clears that Ontops hop so you open the stored URL without babysitting the intermediate page.';

const body = `## The /st hop is the stall

Ontops shares that use the /st path carry the next address in the link itself, then still force a hop screen before you leave. If the hop blocks, bans, or spins, you never reach what was already encoded on the URL.

That single stall is the Ontops problem: a traffic gate between the click and the destination the publisher already attached.

### What burns time on Ontops

- /st hop pages before the real destination
- Intermediate gate chrome that can block or ban the tab
- Manual reloads when the hop never releases
- Waiting on a screen that does not own the final content

## Opening the encoded destination from the hop

Skip Wait detects supported Ontops /st pages in Chrome, reads the destination already present on that link, and navigates there without depending on the hop UI to finish.

You stay on the tab you opened until the destination loads. Client hop theater is skipped; there is no paste tool and no second extension for this brand alone.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does Ontops bypass skip?',
    answer:
      'The /st hop gate. Skip Wait opens the destination already attached to the Ontops link when the page is supported.',
  },
  {
    question: 'Do I need the hop page to finish loading?',
    answer:
      'No on supported /st links. Skip Wait uses the destination encoded on the link and navigates without waiting on hop chrome.',
  },
  {
    question: 'What if Ontops shows a ban or block screen?',
    answer:
      'Skip Wait still targets the destination on the /st URL when that value is present, so a blocked hop UI does not have to succeed first.',
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
