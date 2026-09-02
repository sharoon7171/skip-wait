export const cardBase =
  'rounded-panel shadow-card ring-1 transition-all duration-200';

export const cardNeutral = `${cardBase} bg-surface-canvas ring-neutral-200/70`;

export const cardBlue =
  `${cardBase} bg-[linear-gradient(145deg,oklch(0.98_0.02_250)_0%,oklch(0.94_0.05_255)_100%)] ring-primary-200/70`;

export const cardGreen =
  `${cardBase} bg-[linear-gradient(145deg,oklch(0.98_0.02_148)_0%,oklch(0.94_0.05_148)_100%)] ring-success-600/25`;

export const cardHoverLift = 'hover:-translate-y-0.5 hover:shadow-cardHover';

export const cardBlueHover = `${cardBlue} ${cardHoverLift} hover:ring-primary-300`;

export const cardGreenHover = `${cardGreen} ${cardHoverLift} hover:ring-success-600/40`;

export const cardNeutralHover = `${cardNeutral} ${cardHoverLift} hover:ring-primary-200/80`;

export const panelGradient =
  'relative overflow-hidden rounded-panel bg-[linear-gradient(135deg,oklch(0.52_0.24_255)_0%,oklch(0.44_0.22_255)_55%,oklch(0.36_0.18_255)_100%)] text-white shadow-panel transition-all duration-200';

export const panelGradientHover = `${panelGradient} ${cardHoverLift}`;

export const panelGlow =
  'pointer-events-none absolute -right-10 -top-12 size-56 rounded-full bg-[radial-gradient(circle,oklch(1_0_0/0.22)_0%,transparent_70%)]';

export const bandGradient = 'bg-primary-950';

export const glassTile =
  'rounded-card bg-white/12 ring-1 ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/18 hover:ring-white/35';

export const stepBadgeSolid =
  'inline-flex size-10 items-center justify-center rounded-full text-caption font-bold text-white shadow-buttonSoft';
