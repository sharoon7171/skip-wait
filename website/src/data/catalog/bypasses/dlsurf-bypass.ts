import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'dl.surf';

const bypassType = 'Skip Ads Download';

const description =
  'dl.surf bypass skips Continue to Download ad timers and unlocks the file with your signed-in account so you can save without the ads modal.';

const domains = ['dlsurf.com', 'dl.surf'] as const;

const keywords = [
  'dlsurf bypass',
  'dl.surf bypass',
  'dlsurf.com bypass',
  'bypass dlsurf',
  'bypass dl.surf',
  'dlsurf download bypass',
  'dl.surf download bypass',
  'dlsurf continue to download',
  'continue to download dlsurf',
  'dlsurf ads',
  'dlsurf skip ads',
  'dl.surf skip ads',
  'dlsurf ads timer',
  'dlsurf timer bypass',
  'dlsurf countdown bypass',
  'dlsurf waiting page',
  'dlsurf please wait',
  'dlsurf captcha',
  'dlsurf turnstile',
  'dlsurf human check',
  'dlsurf signed in download',
  'dlsurf login required download',
  'dlsurf chrome extension',
  'skip wait dlsurf',
  'file host ads bypass',
  'skip download ads',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'skip wait extension',
] as const;

const intro =
  'A dl.surf bypass matters when Continue to Download opens an ads modal with countdown steps before the file. Skip Wait is the $1.50/month Chrome extension that skips those ad timers on supported file pages and unlocks the download with the account you already signed in with.';

const body = `## Continue to Download that turns into ads

dl.surf file pages look ready until you press Continue to Download. That click opens an ads modal: banner waits, another banner, a video timer, then a human check. Close the modal or miss a step and you start over. That loop is why a dlsurf download bypass, dlsurf ads timer skip, and dl.surf skip ads path matters.

Signing in does not remove the ads wall for free users. The account is required for the download unlock; the ads modal is still the busywork in front of the file.

### What stalls the save

- Continue to Download opening the ads modal
- Banner and video countdowns before the file link
- Human check after the timers
- Reloading the file page when the modal is closed mid-wait
- Looking signed in in the header while the download unlock still asks for a fresh sign-in

## Skip Wait on the file page

On a supported dl.surf file page, Skip Wait places a Skip Ads & Timers panel above Continue to Download. When your dl.surf session is live, it runs the quick human check in that panel and unlocks the real download link. When the session is missing or expired, it asks you to sign in on dl.surf first — Skip Wait does not invent an account; it uses yours.

You still prove you are human when the host requires it. You do not sit through the ads timers or hunt for the buried download control under the modal. If unlock fails after the check, use Try again on the panel instead of restarting the whole ads path.

## Your account, not a paste tool

dl.surf unlocks downloads for signed-in users. Skip Wait keeps that model: open the file while logged in, complete the check in the Skip Wait panel, then tap Download File · Skip Wait. No third-party paste site and no cookie tricks — just the account session already on the tab.

A profile name in the header is not always enough. If Skip Wait still shows Sign In required, sign in again on dl.surf, reopen the file, and let the panel finish the human check once the session is live.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does the dl.surf bypass skip?',
    answer:
      'The Continue to Download ads modal and its banner/video countdowns. Skip Wait unlocks the file from the page after the human check when you are signed in.',
  },
  {
    question: 'Do I need a dl.surf account?',
    answer:
      'Yes. Skip Wait uses the account you sign in with on dl.surf. Sign in on the site first, then open the file page.',
  },
  {
    question: 'I look signed in but Skip Wait still asks me to sign in. Why?',
    answer:
      'The header can still show your name after the live download session expires. Sign in again on dl.surf, reopen the file, and wait for Skip Wait to confirm the account before the human check.',
  },
  {
    question: 'Do I still complete a human check?',
    answer:
      'Yes when the host requires it. The check appears in the Skip Wait panel instead of after long ad timers.',
  },
  {
    question: 'What if unlock fails after the check?',
    answer:
      'Use Try again on the Skip Wait panel. That starts a fresh check without sending you back through the ads modal.',
  },
  {
    question: 'How much does the dl.surf bypass cost?',
    answer: 'Skip Wait is $1.50 per month. Activate a license in the popup.',
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
