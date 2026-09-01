import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'FileCR';

const bypassType = 'Direct Download';

const description =
  'FileCR bypass opens real file links from Direct Download, Fast Download, and torrent buttons instantly without wait pages or FileCR Assistant.';

const domains = ['filecr.com'] as const;

const keywords = [
  'filecr bypass',
  'FileCR bypass extension',
  'filecr timer bypass',
  'direct download',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'direct download bypass',
  'download timer skip',
  'file host bypass',
] as const;

const intro =
  'A FileCR bypass search usually means Direct Download, Fast Download, or a torrent button stalled on a generating page—or someone told you to install FileCR Assistant just to finish. Skip Wait is the Chrome extension that resolves those buttons to real file URLs without the wait theater or a second helper.';

const body = `## Download buttons that stall on generating pages

FileCR software pages offer Direct Download, Fast Download, and torrent controls that often sit behind a generating timer or intermediary redirect before the real file link appears. You click the path you want, then babysit chrome that adds nothing to the archive itself.

That is why filecr timer bypass, direct download bypass, and download timer skip show up next to FileCR bypass extension queries—people want the button they pressed to open a real URL.

### Direct, Fast, and torrent paths on one install

All three button families resolve through the same Skip Wait path on supported pages. You do not pick a different userscript per mirror style; one install covers the wait behind each click.

## Opening real file URLs without FileCR Assistant

Skip Wait runs on the catalog page you already opened. After you click a supported download control, it resolves the real file URL in the background and skips the generating or redirect page that normally follows. No FileCR Assistant install, no paste box, no alternate storefront.

Client wait theater gets out of the way when the host allows the link. You still choose which button to press—Direct, Fast, or torrent—so nothing auto-downloads a format you did not pick.

## Mirror waits that never add a better file

Extra wait screens on mirror-style controls get the same treatment on supported paths: the click opens the file link instead of another timer page. A skip wait extension keeps that direct download path working without babysitting every generate screen.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Do I need FileCR Assistant when using Skip Wait?',
    answer:
      'No. Skip Wait opens real file links from Direct Download, Fast Download, and torrent buttons without wait pages or the Assistant extension.',
  },
  {
    question: 'Which buttons are covered?',
    answer:
      'Direct Download, Fast Download, and torrent controls on supported pages all resolve to actual file URLs in the background.',
  },
  {
    question: 'What wait pages get skipped?',
    answer:
      'Intermediary redirect pages, download generating timers, and extra wait screens on mirror-style buttons after the click.',
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
