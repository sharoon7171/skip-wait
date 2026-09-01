import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'ShrinkPe';

const bypassType = 'Skip Short Link';

const description =
  'ShrinkPe bypass clears Verify Your Are Human and Your Link Is Almost Ready so Skip Wait opens the destination without Step One blogs.';

const domains = ['aii.sh', 'lnbz.la', 'oii.la', 'shrink.pe', 'tpi.li'] as const;

const keywords = [
  'shrinkpe bypass',
  'shrink.pe bypass',
  'loanbuzz bypass',
  'lnbz bypass',
  'shrinkbixby bypass',
  'verify your are human bypass',
  'shrinkpe turnstile bypass',
  'shrinkpe captcha skip',
  'step one step two shortlink',
  'your link is almost ready bypass',
  'almost ready seconds bypass',
  'get link countdown bypass',
  'shrinkpe get link skip',
  'please wait shortlink bypass',
  'skip waiting page shrinkpe',
  'monetized short link bypass',
  'ad shortener bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'short link bypass',
  'skip wait chrome extension',
  'chrome extension shortlink bypass',
  'paste shortlink bypass alternative',
] as const;

const intro =
  'ShrinkPe shares often open on Verify Your Are Human with Continue locked behind Turnstile, then push Step One blog tabs before Your Link Is Almost Ready. Skip Wait is the Chrome extension that stays on the short URL, brings that human check forward, skips the Step One / Step Two article tour, and finishes the Almost Ready wait so the destination can open.';

const body = `## Verify Your Are Human before anything useful

[ShrinkPe](https://shrink.pe/) style aliases (including LoanBuzz-branded fronts on the same network) start with a captcha card titled Verify Your Are Human. Continue stays disabled until Cloudflare Turnstile completes. That check is real—Skip Wait does not fake it. It brings the widget forward so you can finish the box without digging under page chrome.

Miss the check, reload mid-run, or trip an adblock wall and you restart on the same card. A shrinkpe captcha skip or verify your are human bypass has to keep that Turnstile result on the live alias—not restart the card after every mistimed Continue.

### What the chain still wants after Turnstile

- Step One and Step Two buttons on rotating blog articles
- Ad tabs that only count while you stay on them
- Continue… that only appears after both steps
- Your Link Is Almost Ready with a live seconds countdown before Get Link unlocks

## Step One blogs are not the file

After Continue, the shortener posts you into article pages that ask you to watch ads, complete Step One, then Step Two, then hit Continue… again. Closing an ad tab early or leaving the article pauses their client timers. None of that HTML holds the final URL for you to copy—it only gates the return trip to the shortener.

Skip Wait does not open those article tabs for you to babysit. After Turnstile succeeds on the short link page, it advances the unlock path for you so Step One / Step Two theater is not your job.

## Your Link Is Almost Ready is a real wait

When the shortener is ready, you land on Your Link Is Almost Ready with a seconds counter (often about fifteen). That countdown is not decoration: posting Get Link too early returns an error. Skip Wait shows that wait clearly, holds for the full Almost Ready length the page publishes, then unlocks and opens the destination.

### OlaMovies drive holds

If the unlocked URL is a protected OlaMovies drive download, Skip Wait still waits a full careful visit length before opening so the drive does not treat the arrival as an instant skip. That extra hold is only for those drive links.

## Live tab vs paste sites

Paste shortlink tools and one-shot scripts break when Turnstile is required or the blog host rotates. Skip Wait runs on the live ShrinkPe-network alias in Chrome, keeps your own captcha result, and finishes Your Link Is Almost Ready on that session—a durable paste shortlink bypass alternative for this chain.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'Which hosts does this ShrinkPe bypass cover?',
    answer:
      'The domains listed on this page—ShrinkPe and LoanBuzz-style captcha shortlinks on the same network. Open the shared alias normally; Skip Wait runs when the Verify Your Are Human card is present.',
  },
  {
    question: 'Do I still need to solve Turnstile?',
    answer:
      'Yes. Verify Your Are Human must complete. Skip Wait brings that check forward, then takes over so you are not stuck on Step One blogs and Almost Ready clicking.',
  },
  {
    question: 'Why does Skip Wait still wait on Your Link Is Almost Ready?',
    answer:
      'The shortener rejects an early Get Link. Skip Wait waits the full Almost Ready seconds the page sets, then unlocks. That is separate from the optional longer hold used only for protected OlaMovies drive destinations.',
  },
  {
    question: 'Will I see the Step One article pages?',
    answer:
      'You should not need to. After Turnstile, Skip Wait advances past that blog tour while you stay on the short link tab.',
  },
  {
    question: 'Is this the same as pasting into an online bypasser?',
    answer:
      'No. Paste sites often fail when Turnstile is required or blogs rotate. Skip Wait keeps your Chrome session and captcha on the live alias.',
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
