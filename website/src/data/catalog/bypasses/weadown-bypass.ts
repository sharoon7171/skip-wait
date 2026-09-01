import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'WeaDown';

const bypassType = 'Skip Secure Link';

const description =
  'WeaDown bypass clears Generate Secure Link and Verifying Link Safety on file gate pages so Skip Wait opens the file host without the button wait.';

const domains = ['weadown.com'] as const;

const keywords = [
  'weadown bypass',
  'weadown download',
  'weadown generate secure link',
  'weadown verifying link safety',
  'weadown secure link bypass',
  'weadown wordpress plugin download',
  'weadown file host redirect',
  'skip secure link wait',
  'skip wait extension',
] as const;

const intro =
  'WeaDown sends plugin and theme saves through file gate pages that show Generate Secure Link, Verifying Link Safety, and View & Download File before the real host opens. Skip Wait is the Chrome extension that runs that gate automatically and takes you to the file host.';

const body = `## Three screens before the host opens

After Download on a resource post, WeaDown opens a file gate page. The banner reads that your direct link will be ready shortly, the button says Generate Secure Link, the hold screen shows Verifying Link Safety, and the unlock step finishes on View & Download File.

Consent overlays can sit on top of the button, and leaving the tab too long can expire the one-time gate.

### Friction on WeaDown file gate pages

- Generate Secure Link on every file gate URL
- Verifying Link Safety before the redirect unlocks
- View & Download File as the final click before the host
- Consent overlays blocking the download button

## Automatic unlock to the file host

On supported file gate pages, Skip Wait reads the live button labels and banner text from the page, runs the secure-link flow for you, and redirects to the file host when the server allows it. You do not need to click Generate Secure Link or chase the ready state.

The overlay follows the same labels the site shows—Generate Secure Link, Verifying Link Safety, and View & Download File—so you always see what step is running.

## When WeaDown changes the gate wording

Skip Wait takes its labels and gate URLs from the page itself. If WeaDown renames the buttons or waiting text, the bypass keeps using the live copy without waiting for an extension update.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'Which WeaDown pages does Skip Wait handle?',
    answer:
      'File gate pages with Generate Secure Link—the step after Download on a resource post, before the file host opens.',
  },
  {
    question: 'Do I still click Generate Secure Link or View & Download File?',
    answer:
      'No. Skip Wait starts the gate automatically and opens the file host when the server allows it.',
  },
  {
    question: 'What does the Skip Wait overlay show on WeaDown?',
    answer:
      'The same live labels from the page—Generate Secure Link, Verifying Link Safety, and View & Download File—so you can see which gate step is running.',
  },
  {
    question: 'Does Skip Wait remove every second instantly?',
    answer:
      'The button tour and consent overlays are skipped on your side. If WeaDown still needs a short server hold, Skip Wait continues as soon as that hold clears.',
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
