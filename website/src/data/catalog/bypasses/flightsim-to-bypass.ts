import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'FlightSim.to';

const bypassType = 'Skip Download Timer';

const description =
  'FlightSim bypass skips the addon download countdown timer dialog so flight simulator mods and add ons start downloading immediately for free users.';

const domains = ['flightsim.to'] as const;

const keywords = [
  'flightsim.to bypass',
  'FlightSim.to bypass extension',
  'flightsim.to timer bypass',
  'skip download timer',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'download countdown bypass',
  'addon download skip',
] as const;

const intro =
  'A FlightSim.to bypass search usually means a free addon download opened a countdown dialog before the transfer started. Skip Wait is the free Chrome extension that clears that timer dialog so flight simulator mods begin downloading without sitting through Unlocks in chrome.';

const body = `## Free addon downloads stuck on a countdown dialog

FlightSim.to lets free users download mods and add-ons, then parks a timed dialog in front of the file. You trigger download, watch the countdown, and wait for the transfer to arm. Close early or miss the release and you restart the same skip download timer ritual.

That dialog is why FlightSim.to timer bypass, download countdown bypass, and addon download skip queries cluster around FlightSim.to bypass extension installs—the file is ready; the UI just stalls free traffic.

## Clearing the timer so the transfer starts

Skip Wait activates on supported download-timer flows. When the countdown dialog appears, the extension bypasses or automates the wait the page already expects and lets the file transfer start as soon as the host allows it. You keep using the addon page normally—no paste box and no alternate mirror hunt.

Client countdown theater gets out of the way. Required holds still finish honestly so the download does not fail with a fake zero-second cheat.

## Mods without babysitting every free download

Sitting through the dialog on every community addon adds nothing to the package. A skip wait extension install keeps skip countdown timer and bypass countdown timer behavior on the live page so free users spend time installing the mod, not watching the clock.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What countdown does Skip Wait skip?',
    answer:
      'The addon download countdown timer dialog that appears before free downloads start. Skip Wait clears that wait so the transfer can begin.',
  },
  {
    question: 'Do flight simulator mods start immediately?',
    answer:
      'As soon as the host allows the file. Client dialog busywork goes away; required holds are still respected.',
  },
  {
    question: 'Do I still click download myself?',
    answer:
      'Yes. Trigger download the normal way. Skip Wait handles the timed dialog behind that click.',
  },
  {
    question: 'Is the FlightSim.to bypass free?',
    answer:
      'Yes. Skip Wait is free with no account or paid plan required.',
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
