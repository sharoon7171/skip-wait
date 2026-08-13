import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Cinefreak Mediator';

const bypassType = 'Skip Waiting Page';

const description =
  'Cinefreak mediator bypass skips the generate-page timer, adblock warning, and two-step verify flow so movie downloads open on the file host right away.';

const domains = [
  'cinefreak.net',
  'cinefreak.top',
  'cinefreak.tv',
  'cinefreak.ch',
  'cinefreak.ca',
] as const;

const keywords = [
  'cinefreak bypass',
  'cinefreak mediator bypass',
  'cinefreak timer bypass',
  'cinefreak adblock bypass',
  'cinefreak download bypass',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'please wait bypass',
  'waiting page bypass',
  'verify download bypass',
  'skip wait extension',
  'link shortener bypass',
] as const;

const intro =
  'Cinefreak download links often stop on a securing-your-connection page with a countdown, an adblock warning, and a two-step verify button before the file host opens. Skip Wait is the free Chrome extension that clears that mediator hop so you are not stuck on please-wait and disable-adblock loops.';

const body = `## Generate pages that block the file twice

Shared Cinefreak movie links do not go straight to the host. They land on a generate step that runs a visible countdown, asks you to verify download, and may flash an adblock or VPN warning even when your setup is fine. Close the tab or miss the second click and the whole Cinefreak waiting page ritual starts again.

That layer sits between the movie listing and the actual file. The page is built to keep you on-site through timers and verification—not to hand you the download in one tap.

### Stages that slow every share

- Five-second security countdown before any button appears
- Adblock or Private DNS warnings that hide the download controls
- Verify download, then a second get-download-link click
- Popup prompts tied to social channels between steps

## Opening the file host inside Chrome

Skip Wait runs on supported Cinefreak mediator pages when the generate link loads. It reads the encoded destination already in the URL and sends you to the file host immediately—no countdown babysitting, no turning adblock off, no hunting verify buttons under overlays.

That is a Cinefreak timer bypass and waiting page bypass in one step: the extension handles the mediator hop in Chrome instead of asking you to paste the link somewhere else. If the share uses a mirror domain from the supported list, the same path applies without relearning a new interstitial layout.

## Mirrors and the same generate flow

Cinefreak rotates mirror domains when the main site is down. The generate.php pattern—the countdown, verify flow, and encoded file link—is the same across those mirrors. Skip Wait targets that shared mediator shape so a new mirror does not mean another manual routine as long as it stays on the supported list.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Cinefreak mediator bypass skip?',
    answer:
      'The generate-page countdown, adblock warning screen, and two-step verify download flow before the file host opens.',
  },
  {
    question: 'Do I need to disable my adblocker?',
    answer:
      'On supported generate pages, no. Skip Wait moves past that gate and opens the encoded download destination without the on-page adblock check.',
  },
  {
    question: 'Do I still click Verify Download?',
    answer:
      'On supported pages, no. The extension completes the mediator hop so you are not pressing verify twice per file.',
  },
  {
    question: 'Does this work on Cinefreak mirror domains?',
    answer:
      'Yes on the listed mirror domains that use the same generate.php mediator. Domains outside that list are not covered until added.',
  },
  {
    question: 'Is the Cinefreak bypass free?',
    answer:
      'Yes. Skip Wait is free on the Chrome Web Store. The Cinefreak mediator path runs on supported pages with no paid plan.',
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
