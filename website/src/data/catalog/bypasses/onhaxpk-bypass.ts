import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'OnhaxPK';

const bypassType = 'Skip Copy Step';

const description =
  'OnhaxPK bypass for countdown waits before session share copy: Skip Wait places the share string on your clipboard so software unlocks without the manual copy-and-wait dance.';

const domains = ['onhaxpk.net'] as const;

const keywords = [
  'onhaxpk bypass',
  'OnhaxPK bypass extension',
  'onhaxpk timer bypass',
  'skip copy step',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'copy cookie bypass',
  'session cookie copy',
] as const;

const intro =
  'An OnhaxPK bypass or skip copy step search usually means a software page made you wait, then copy session share data by hand before downloads unlocked. Skip Wait is the $1/month Chrome extension that skips that countdown and copies the string for you.';

const body = `## Unlock pages that demand a timed copy

OnhaxPK-style software unlocks often gate the file behind session share data: wait for a countdown, copy a cookie or share string, paste it somewhere else, then retry the download. Miss the window or fumble the clipboard and the instructions restart—why onhaxpk timer bypass, copy cookie bypass, and session cookie copy queries show up together.

The useful payload is the share string. The wait and manual copy are the tax.

### Clipboard without the babysitting

Skip Wait fetches the cookie or share string on the supported page, copies it to your clipboard, and keeps a Copy control available if you need it again. Client countdown busywork before that copy stops blocking you; you still use the session data the site already issued.

That is skip copy step for this host in one OnhaxPK bypass extension install—less waiting and fewer paste mistakes before the software path continues.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What session data does Skip Wait copy?',
    answer:
      'The share string or cookie payload the unlock page exposes after its wait. Skip Wait copies it so you are not doing the manual copy step by hand.',
  },
  {
    question: 'Does the countdown before copy still run?',
    answer:
      'Client wait busywork is cleared when possible. Required holds still finish—so the onhaxpk timer bypass stays reliable.',
  },
  {
    question: 'What if I need the string again?',
    answer:
      'A Copy control remains available so you can re-copy without restarting the whole page flow.',
  },
  {
    question: 'How much does Skip Wait cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup.',
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
