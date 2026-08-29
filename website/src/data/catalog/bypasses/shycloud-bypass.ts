import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'ShyCloud';

const bypassType = 'Skip Waiting Page';

const description =
  'ShyCloud bypass skips the Secure Link Generator wait on inloadapi-style download gates and redirects past the securing-connection delay used by software download posts.';

const domains = [
  'inloadapi.com',
  'srv.inload.net',
  'karanpc.com',
] as const;

const keywords = [
  'shycloud bypass',
  'ShyCloud bypass extension',
  'inloadapi bypass',
  'karanpc bypass',
  'karanpc timer bypass',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
  'please wait bypass',
  'waiting page bypass',
] as const;

const intro =
  'A ShyCloud bypass or inloadapi bypass search usually means a software download button opened a Secure Link Generator wait instead of the file. Skip Wait is the $1.50/month Chrome extension that clears that please wait bypass path—including the securing-connection hop—so waiting page bypass busywork is not the download itself.';

const body = `## Secure Link Generator between button and file

ShyCloud’s download gateway sits between “Download” on software posts and the real host. You land on a progress wait labeled like Secure Link Generator, then sometimes a short securing-connection screen before the CDN path appears. That is why karanpc timer bypass and skip waiting page queries show up next to generic please wait bypass searches—the gate is the product, not the archive.

Clicking the post button again does not help if the gateway still forces the same progress theater.

### Delays that feel like the download

- Secure Link Generator progress waits
- Continue / Download Now unlock delays
- Securing-connection screens on the file hop
- Manual retries when the generator stalls

## Decoding the unlock route in Chrome

When the gateway waiting page loads, Skip Wait reads the unlock route the page already carries, shows an overlay, and redirects to the destination or secure download path without babysitting the generator clock.

Client delay chrome disappears; any hold the gateway still enforces finishes honestly. That is a ShyCloud bypass extension for software posts that route through the same gateway—not a paste tool that invents a file URL offline.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What wait does Skip Wait skip on ShyCloud gates?',
    answer:
      'It skips the Secure Link Generator progress wait and related continue delays, then continues to the decoded download path when the page allows it.',
  },
  {
    question: 'Does this help software posts that open the same gateway?',
    answer:
      'Yes when the download button routes through the supported ShyCloud gateway. Skip Wait runs after that hop and unlocks the destination.',
  },
  {
    question: 'Is the securing-connection screen covered?',
    answer:
      'Yes on supported file hops. The short securing-connection delay is cleared so you continue to the secure download step without watching it by hand.',
  },
  {
    question: 'Is this a paste-a-link file decoder?',
    answer:
      'No. The extension works on the gateway page you opened after the download click.',
  },
  {
    question: 'How much does the ShyCloud bypass cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. The ShyCloud path runs on supported pages.',
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
