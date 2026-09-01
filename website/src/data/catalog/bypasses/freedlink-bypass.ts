import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'FreeDlink';

const bypassType = 'Direct Download';

const description =
  'FreeDlink bypass clears Normal Download’s minute wait and “till next download” cooldowns so Skip Wait unlocks the free file after hCaptcha.';

const domains = ['frdl.by', 'frdl.my', 'frdl.is'] as const;

const keywords = [
  'freedlink bypass',
  'frdl bypass',
  'frdl download',
  'freedl bypass',
  'frdl normal download',
  'frdl timer bypass',
  'frdl countdown bypass',
  'frdl free download',
  'frdl hcaptcha',
  'till next download',
  'file host bypass',
  'direct download bypass',
  'download timer skip',
  'skip waiting page',
  'skip wait chrome extension',
] as const;

const intro =
  'A FreeDlink or frdl free download should not mean staring at Normal Download for a full minute, then solving hCaptcha, only to hit You have to wait till next download on the next file. Skip Wait is the Chrome extension that skips that client wait on supported frdl pages, keeps the cooldown honest when the host enforces it, and puts Direct Download ready after you finish the human check.';

const body = `## Normal Download that burns a minute first

Shared FreeDlink / frdl file pages put Normal Download beside a louder Free Premium path. The free route still starts a long on-page countdown before the captcha panel appears. Finish that clock, pass the check, and the host may still answer with a till-next-download cooldown before another free grab is allowed.

That mix—minute timer, hCaptcha, then server cooldown—is the frdl timer bypass and frdl countdown bypass pain. Refresh mid-wait or miss the check and you restart Normal Download from scratch.

### What you actually meet on a free grab

1. Open the file card on a supported frdl mirror
2. Hit Normal Download and watch the Seconds strip count down
3. Complete hCaptcha when Verify you are human shows
4. Either get the file or see You have to wait … till next download

## Skipping the client clock, not the host rules

On a matching file page Skip Wait skips Normal Download’s client-only minute and brings the captcha forward so you are not babysitting Seconds. When the check succeeds it prepares Direct Download · Skip Wait on that same tab—you tap when you want the file.

If the host returns a real cooldown, Skip Wait shows Available in with the remaining time and reloads when it ends. File Not Found pages stay File Not Found—no fake download button.

## Free Premium is a different door

Free Premium Download on these cards is a separate ads-and-access-code path. This FreeDlink bypass targets the Normal Download / free download lane only: timer skip, captcha, cooldown, and Direct Download when the free path works.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a FreeDlink / frdl bypass skip?',
    answer:
      'Normal Download’s client countdown before hCaptcha. After you pass the check, Skip Wait prepares Direct Download instead of leaving you on the waiting page.',
  },
  {
    question: 'Do I still solve hCaptcha?',
    answer:
      'Yes. The human check stays. Skip Wait removes the minute of Seconds busywork around it, then unlocks when the check succeeds.',
  },
  {
    question: 'What if the page says I have to wait till next download?',
    answer:
      'That cooldown is from the host. Skip Wait shows the remaining time and reloads when it ends so you can try the free path again.',
  },
  {
    question: 'Does this cover Free Premium Download?',
    answer:
      'No. This entry is the Normal Download free path only—not the Free Premium ads session.',
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
