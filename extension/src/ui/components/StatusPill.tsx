import { statusDot, statusPillBusy, statusPillLive, statusPillNeed } from '../../../ui-classes/popup';

type Tone = 'live' | 'need' | 'busy';

const toneClass: Record<Tone, string> = {
  live: statusPillLive,
  need: statusPillNeed,
  busy: statusPillBusy,
};

const dotClass: Record<Tone, string> = {
  live: 'bg-success-600',
  need: 'bg-warning-500',
  busy: 'bg-primary-600 animate-pulse',
};

export function StatusPill({ label, tone }: { label: string; tone: Tone }): React.ReactElement {
  return (
    <span className={toneClass[tone]}>
      <span className={`${statusDot} ${dotClass[tone]}`} aria-hidden />
      {label}
    </span>
  );
}
