import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Filecrypt';

const bypassType = 'Skip Security Check';

const description =
  'Filecrypt bypass skips the I am human verification check and unlocks the mirror download list so you can pick your file host right away and download.';

const domains = ['filecrypt.cc', 'filecrypt.to', 'filecrypt.co'] as const;

const keywords = [
  'filecrypt bypass',
  'Filecrypt bypass extension',
  'filecrypt timer bypass',
  'skip security check',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'human verification bypass',
  'captcha gate bypass',
] as const;

const intro =
  'People search Filecrypt bypass or skip security check after a shared container blocks the mirror list behind an I am human gate. Skip Wait is the $1.50/month Chrome extension that clears that verification lock so you can pick a host and download without staring at the security check.';

const body = `## Mirror lists locked behind I am human

Filecrypt containers hide the download host list until a human verification check passes. You land on the folder page, face the I am human gate, and only then see mirrors. Refresh mid-check or fail the widget and the same lock screen returns—exactly the loop behind human verification bypass and Filecrypt bypass extension searches.

The destination is not a single file URL; it is the unlocked mirror list you still choose from.

## Unlocking hosts so you can pick a mirror

Skip Wait activates on supported Filecrypt container pages. It advances the security-check path the site already expects, unlocks the mirror list, and leaves host selection to you. You are not auto-sent to a random mirror; you still pick Mega, Rapidgator, or whatever the publisher listed.

Client lock-screen busywork stops owning the tab. If a real human widget still appears, finish it once; afterward the list stays reachable so skip security check stays practical inside Chrome.

## Security check busywork vs choosing a host

Paste tools that claim a Filecrypt bypass often return a guessed single link and miss multi-mirror containers. A skip wait extension that unlocks the live list matches how publishers actually share files—one container, several hosts, your choice.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What human verification does Skip Wait skip?',
    answer:
      'The I am human gate that locks the mirror download list. After unlock, you pick a file host from the list yourself.',
  },
  {
    question: 'Does Skip Wait choose a mirror for me?',
    answer:
      'No. It unlocks the list. You still select which host to download from.',
  },
  {
    question: 'What if a captcha widget still appears?',
    answer:
      'Complete it once. After the token exists, Skip Wait continues so the mirror list becomes usable.',
  },
  {
    question: 'How much does the Filecrypt bypass cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup.',
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
