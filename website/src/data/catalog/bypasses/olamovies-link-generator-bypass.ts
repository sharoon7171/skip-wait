import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'OlaMovies Link Generator';

const bypassType = 'Skip Human Check';

const description =
  'OlaMovies Link Generator bypass for hold or slide human checks and Verify to generate link waits: Skip Wait shows the shortener destination in a banner when you are signed in with your own account.';

const domains = ['links.olamovies.mov'] as const;

const keywords = [
  'olamovies link generator bypass',
  'olamovies download link bypass',
  'links.olamovies.mov bypass',
  'olamovies human check bypass',
  'olamovies press and hold captcha',
  'olamovies slide to verify',
  'olamovies verify to generate link',
  'om links bypass',
  'omdrive temporary link',
  'olamovies shortener skip',
  'olamovies login to continue',
  'olamovies captcha skip',
  'skip wait olamovies',
  'skip countdown timer',
  'bypass countdown timer',
  'please wait bypass',
  'link shortener bypass',
  'human verification bypass',
  'movie download link wait',
  'skip wait chrome extension',
] as const;

const intro =
  'After you pick a file on OlaMovies, the catalog often sends you to the OlaMovies Link Generator (OM Links) where a press-and-hold or slide human check and Verify to generate link sit between you and the temporary download path. Skip Wait is the Chrome extension that skips that human verification busywork when you are already signed in with your own account, then shows the destination in a clear banner.';

const body = `## Human checks before temporary shorteners

A typical free download opens the Link Generator with filename and size, then demands a Human check—press and hold until the ring fills, or slide to the marker when the site rotates that challenge—before Verify to generate link will issue a temporary shortener URL. Unsigned visitors also see Login to Continue, plus ad-blocker notes and a Premium pitch. That mix drives olamovies human check bypass, olamovies press and hold captcha, and omdrive temporary link searches: the file is ready, but the page still wants attention.

Mistimed holds and accidental ad clicks waste more time than the catalog itself.

### Signed-in path Skip Wait automates

The extension mounts a banner under the Link Generator title. It checks your own session first—if Login to Continue is showing, you sign in yourself and return; there is no shared account. When you are signed in, it disables the on-page hold or slide controls and visit button so you follow the banner only, then completes the verify and generate path free users normally do by hand. When the temporary destination is ready, the banner shows a clickable href—no silent auto-redirect.

Later shortener hops (when those hosts are supported) use their own Skip Wait rules.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Which screen does the Link Generator bypass cover?',
    answer:
      'The OM Links / OlaMovies Link Generator page after you choose a download on the catalog. Portal landing into the main movie site is a separate landing bypass.',
  },
  {
    question: 'Do I still need to log in?',
    answer:
      'Yes. The generator refuses to create a temporary link without your own signed-in session. Skip Wait checks that first and will not invent a login.',
  },
  {
    question: 'Does this cover both press-and-hold and slide checks?',
    answer:
      'Yes for signed-in free users on the supported generator. The site rotates challenge types; Skip Wait handles the active one and advances to generate.',
  },
  {
    question: 'Why is the result a shortener URL, not a direct file?',
    answer:
      'That is how free generate works: you get a temporary shortener destination. Skip Wait’s job here is the human check and generate gate, shown as a clickable href.',
  },
  {
    question: 'Will the banner redirect me automatically?',
    answer:
      'No. When ready, it shows an href you open yourself so navigation stays intentional.',
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
