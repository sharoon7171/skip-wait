import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'HubCloud / HubCDN';

const bypassType = 'Direct Download';

const description =
  'HubCloud / HubCDN bypass that covers vcloud and HubCloud drive pages with an overlay, skips generating waits, and opens the next download-links page automatically.';

const domains = [
  'hubcloud.cx',
  'hubcloud.foo',
  'hubcloud.club',
  'hubcloud.fans',
  'vcloud.zip',
  'vcloud.fit',
  'hubcdn.sbs',
  'hubcdn.fans',
] as const;

const keywords = [
  'hubcloud bypass',
  'hubcdn bypass',
  'hubcloud hubcdn bypass',
  'hubcloud bypass chrome',
  'hubcloud bypass extension',
  'hubcloud timer bypass',
  'hubcdn timer bypass',
  'vcloud bypass',
  'vcloud.zip bypass',
  'vcloud.fit bypass',
  'direct download',
  'direct download bypass',
  'download timer skip',
  'file host bypass',
  'cloud drive download bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'skip wait extension',
] as const;

const intro =
  'A HubCloud bypass, vcloud bypass, or HubCDN download timer skip usually starts after a cloud-drive page shows a generating wait instead of the file. Skip Wait is the Chrome extension that covers that page with an overlay and opens the next download-links page without the forced delay.';

const body = `## Cloud drives that invent a generating pause

HubCloud, vcloud, and HubCDN mirrors often sit a download wait, generating timer, or intermediary redirect in front of the real file. The bytes are already on the host—the pause only delays the path you clicked.

That is why direct download bypass and cloud drive download bypass searches pair with hubcloud timer bypass and vcloud bypass: people want the file URL, not another spinner after every mirror press.

### What stalls after you press download

- Generating timers on cloud-drive buttons
- Intermediary redirect pages before the file starts
- Extra wait screens that repeat on each mirror
- Manual retries when the generating page hangs

## Overlay, then the download links page

On a matching HubCloud or vcloud drive page, Skip Wait draws a full-page overlay so the noisy download UI cannot steal clicks. It resolves the same next download-links URL the finished generating flow would open, then navigates there automatically.

No paste tool and no extra tap on this step—client-only wait chrome stays under the overlay while the real links page loads.

## One install across rotating storage hosts

Mirrors reshuffle while the generating pattern stays familiar. A HubCloud bypass extension that runs on the live page keeps the hop working across supported storage hosts—including vcloud.zip and vcloud.fit—without relearning each mirror’s delay UI.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a HubCloud / HubCDN bypass skip?',
    answer:
      'Cloud-drive generating waits and intermediary delay screens so the next download-links page opens without babysitting the spinner.',
  },
  {
    question: 'Does it cover vcloud as well as HubCloud and HubCDN?',
    answer:
      'Yes on supported hosts, including vcloud.zip and vcloud.fit. The same overlay-and-navigate pattern runs across the listed pages.',
  },
  {
    question: 'Do I tap a download button on the overlay?',
    answer:
      'Not on the drive page. Skip Wait covers the wait, then opens the next download-links page for you.',
  },
  {
    question: 'Is every delay removed instantly?',
    answer:
      'Waiting-page busywork goes away. When the host still gates release on a later page, that path still applies there.',
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
