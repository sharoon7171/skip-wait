import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'UsersDrive';

const bypassType = 'Skip Countdown';

const description =
  'UsersDrive bypass that posts the create-download form, reads the CDN file URL, blocks ad mediator popups, and starts the download from a branded button—skipping the Create Download Link countdown.';

const domains = ['usersdrive.com'] as const;

const keywords = [
  'usersdrive bypass',
  'usersdrive bypass extension',
  'usersdrive timer bypass',
  'usersdrive create download link',
  'usersdrive turnstile',
  'skip countdown',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'countdown timer bypass',
  'skip timer unlock',
  'cdn download bypass',
  'file host bypass',
] as const;

const intro =
  'A UsersDrive bypass or Create Download Link countdown search usually means a file page forced a timer, then an ad mediator, before the real CDN URL. Skip Wait is the Chrome extension that posts the create-download form, reads the CDN link, and starts that file from a branded button after Turnstile when required.';

const body = `## Create Download Link as a timer wall

UsersDrive free saves put a countdown in front of Create Download Link. After the timer you may still hit an intermediate HTML page or an ad mediator popup instead of the CDN file. Fail Turnstile, close the wrong tab, or click a fake download and you restart the same skip countdown loop.

That stack is why people search usersdrive timer bypass, countdown timer bypass, and cdn download bypass together.

### What eats the click after Turnstile

- Create Download Link countdown chrome
- Intermediate create-link HTML pages
- Ad mediator popups on download click
- Hunting for the real CDN URL under noise

## Posting the form and reading the CDN URL

Skip Wait runs on the file page inside Chrome. After you complete Turnstile if it appears, the extension posts the create-download form, reads the CDN file URL from the response, blocks mediator popups, and puts that download on a branded Free Download button.

You are not watching the clock or chasing alveridium-style popups. The timer UI goes away; the real CDN path stays.

## Mediator popups that rotate weekly

Userscripts that only auto-click Create Download Link break when the next popup skin appears. A UsersDrive bypass extension that resolves the CDN URL from the form response stays useful without a paste tool.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What Create Download Link countdown does Skip Wait skip?',
    answer:
      'The create-download countdown on supported UsersDrive file pages. The extension posts the form, reads the CDN URL, and starts that download instead of making you watch the timer.',
  },
  {
    question: 'Does it open the direct CDN URL?',
    answer:
      'Yes. After Turnstile when required, Skip Wait reads the CDN /d/ style link from the create-download response and downloads that file—not an ad mediator.',
  },
  {
    question: 'Are ad mediator popups blocked?',
    answer:
      'Yes on supported flows. Mediator popups on download click stay out of the way while the branded button uses the real CDN URL.',
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
