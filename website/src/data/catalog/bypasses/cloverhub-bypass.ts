import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'CloverHub';

const bypassType = 'Auto Generate Key';

const description =
  'CloverHub bypass skips the Get your free key LootLabs checkpoint on getkey and shows your 24-hour access key to copy.';

const domains = ['cloverhub.app'] as const;

const keywords = [
  'cloverhub bypass',
  'cloverhub key bypass',
  'cloverhub get key',
  'cloverhub free key',
  'cloverhub key generator',
  'cloverhub access key',
  'get key bypass',
  'lootlabs key bypass',
  'skip lootlabs checkpoint',
  'skip wait extension',
] as const;

const intro =
  'CloverHub Access asks you to open a LootLabs checkpoint before it shows a 24-hour key on getkey. Skip Wait is the Chrome extension that opens that page, runs the LootLabs leg automatically, and puts the issued key on screen with a Copy key button.';

const body = `## Get your free key without babysitting the checkpoint

On [CloverHub Access](https://cloverhub.app/getkey), **Get your free key** starts a provider checkpoint—usually LootLabs—then polls until CloverHub can issue a short-lived access key. Close the tab, pick the wrong provider, or sit through the locker timer and you are back at the start.

Skip Wait targets **getkey** on CloverHub: the overlay checks or creates a LootLabs claim, bypasses the LootLabs wait, then shows the key when CloverHub marks the claim complete.

### What you normally click through

- **Get your free key** on the CloverHub page
- **Continue verification →** into a LootLabs unlock link
- A locker countdown and task copy before CloverHub accepts the checkpoint
- A one-time key display once verification finishes

### What Skip Wait changes on getkey

Open **getkey** with Skip Wait enabled. The overlay walks three honest steps: checking your claim, creating one if needed, then bypassing LootLabs. When the key is ready, it appears in the overlay with **Copy key**—nothing is copied until you tap the button.

Linkvertise and PlatoBoost checkpoints on the same page are not auto-bypassed; Skip Wait sticks to LootLabs claims so the flow stays reliable.

For the LootLabs locker itself, see the [LootLabs bypass](/sites/lootlabs-bypass) page—CloverHub reuses that stack, but Skip Wait handles both legs when you start from CloverHub getkey.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Which CloverHub page does Skip Wait use?',
    answer:
      'The getkey page where CloverHub shows Get your free key. Skip Wait starts automatically when that URL loads with the extension active.',
  },
  {
    question: 'Does Skip Wait copy the key for me?',
    answer:
      'No. The key appears in the overlay and you tap Copy key when you want it on your clipboard.',
  },
  {
    question: 'Does this work with Linkvertise or PlatoBoost on getkey?',
    answer:
      'Not automatically. Skip Wait forces and bypasses LootLabs claims only. Other providers still need their normal checkpoint flow.',
  },
  {
    question: 'How long is the CloverHub key valid?',
    answer:
      'CloverHub issues 24-hour access keys after verification. Skip Wait does not change the expiry—only how fast you reach the issued key.',
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
