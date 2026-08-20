import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Storyline SCORM';

const bypassType = 'Skip Course Wait';

const description =
  'Storyline bypass skips the course play countdown wait on SCORM training slides so you can advance past timed content blocks immediately.';

const domains = [
  'mrtzn.com',
  'vocationaltraininghub.com',
] as const;

const keywords = [
  'storyline scorm bypass',
  'Storyline SCORM bypass extension',
  'storyline scorm timer bypass',
  'skip course wait',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'scorm timer bypass',
  'course slide bypass',
] as const;

const intro =
  'A Storyline SCORM bypass or skip course wait search usually means a training slide locked Next behind a play countdown. Skip Wait is the $1/month Chrome extension that clears that scorm timer bypass path so course slide bypass busywork is not the lesson itself.';

const body = `## Play countdowns on SCORM training slides

Articulate Storyline-style SCORM packages often force you to sit through a timed content block before Next enables. The slide already loaded; the course play countdown is the gate—exactly why storyline scorm timer bypass and skip countdown timer queries appear next to generic skip waiting page help when you only wanted to finish the module.

This is not a shortener chain. It is in-player lockouts on supported training hosts.

### Locks that pad every slide

- Course play countdown waits before advance
- SCORM slide timer blocks on Next / Continue
- Timed content locks that ignore reading speed
- Manual scrubbing that still refuses until the clock ends

## Advancing when the slide is already ready

Skip Wait activates on recognized skip course wait flows. On supported training pages it clears or automates the play countdown so you can move to the next block without watching the full timer.

You open the SCORM content as usual—no paste tool. That is a Storyline SCORM bypass extension for timed slides, not a link shortener helper. Client delay theater disappears; any LMS check that still must complete finishes honestly.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What course play countdown does Skip Wait skip?',
    answer:
      'It bypasses the play countdown wait on supported SCORM training slides so you can advance past timed content blocks without sitting through the full clock.',
  },
  {
    question: 'Is this a link shortener bypass?',
    answer:
      'No. Storyline SCORM support targets timed course slides on supported training hosts, not monetized short URLs.',
  },
  {
    question: 'Can I advance as soon as I finish reading?',
    answer:
      'On supported slides, yes—timed training locks that force a wait before continuing are cleared so Next is not held hostage by the clock alone.',
  },
  {
    question: 'Does every LMS rule disappear?',
    answer:
      'Client play-countdown theater goes away. If the package still requires a real completion check, that step still finishes before advance.',
  },
  {
    question: 'How much does the Storyline SCORM bypass cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup. The Storyline SCORM path runs on supported pages.',
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
