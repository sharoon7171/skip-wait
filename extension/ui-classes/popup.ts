export const popupShell = 'relative box-border w-[480px] overflow-hidden bg-surface-muted font-sans antialiased';

export const popupMain = 'relative flex flex-col gap-3.5 px-4 pb-4';

export const heroGlow =
  'pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.18_250/0.35)_0%,transparent_70%)]';

export const headerBar = 'relative flex items-center justify-between gap-3 px-4 pb-3 pt-4';

export const headerBrand = 'flex min-w-0 items-center gap-3';

export const headerIcon =
  'size-12 shrink-0 rounded-card shadow-icon ring-[3px] ring-white/90';

export const headerTitle = 'truncate text-[1.25rem] font-extrabold tracking-tight text-ink';

export const headerTag = 'truncate text-[0.75rem] font-medium text-ink-soft';

export const statusPill =
  'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.06em] ring-1';

export const statusPillLive = `${statusPill} bg-success-600/12 text-success-700 ring-success-600/25`;

export const statusPillNeed = `${statusPill} bg-warning-500/12 text-warning-700 ring-warning-500/25`;

export const statusPillBusy = `${statusPill} bg-primary-600/10 text-primary-700 ring-primary-600/25`;

export const statusDot = 'size-1.5 rounded-full';

export const licenseHero =
  'relative overflow-hidden rounded-card bg-[linear-gradient(135deg,oklch(0.52_0.24_255)_0%,oklch(0.42_0.2_265)_55%,oklch(0.38_0.16_280)_100%)] p-4 text-white shadow-button';

export const licenseHeroGlow =
  'pointer-events-none absolute -right-8 -top-10 size-36 rounded-full bg-[radial-gradient(circle,oklch(1_0_0/0.22)_0%,transparent_70%)]';

export const licenseHeroTitle = 'text-[1.0625rem] font-extrabold tracking-tight text-white';

export const licenseHeroBody = 'text-[0.8125rem] font-medium leading-snug text-primary-200';

export const planGrid = 'grid grid-cols-2 gap-2';

export const planTile =
  'group flex flex-col rounded-card bg-white/12 px-3 py-2.5 text-left no-underline ring-1 ring-white/20 transition-all hover:-translate-y-0.5 hover:bg-white/18 hover:ring-white/35';

export const planTileLabel = 'text-[0.625rem] font-bold uppercase tracking-[0.08em] text-primary-200';

export const planTilePrice = 'mt-1 text-[1rem] font-extrabold tracking-tight text-white';

export const planTileHint = 'mt-0.5 text-[0.6875rem] font-medium text-primary-200/90';

export const activateCard =
  'rounded-card bg-surface-canvas p-3.5 shadow-card ring-1 ring-neutral-200/70';

export const stepRow = 'mb-2.5 flex items-center gap-2';

export const stepBadge =
  'flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[0.6875rem] font-extrabold text-white shadow-buttonSoft';

export const stepLabel = 'text-[0.8125rem] font-bold text-ink';

export const fieldInput =
  'box-border w-full rounded-card border-0 bg-surface-muted px-3.5 py-3 font-mono text-[0.8125rem] text-ink ring-1 ring-neutral-200/90 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-primary-500/35';

export const btnActivate =
  'inline-flex h-11 w-full items-center justify-center gap-2 rounded-card bg-[linear-gradient(180deg,oklch(0.52_0.22_255)_0%,oklch(0.48_0.22_255)_100%)] text-[0.875rem] font-bold text-white shadow-button transition-all hover:-translate-y-px hover:shadow-cardHover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:translate-y-0 disabled:opacity-55';

export const activeHero =
  'relative overflow-hidden rounded-card bg-[linear-gradient(135deg,oklch(0.54_0.17_148)_0%,oklch(0.44_0.14_152)_100%)] p-4 text-white shadow-button';

export const activeHeroGlow =
  'pointer-events-none absolute -right-6 -top-8 size-32 rounded-full bg-[radial-gradient(circle,oklch(1_0_0/0.18)_0%,transparent_70%)]';

export const activeHeroContent = 'relative flex items-start gap-3';

export const activeHeroIcon =
  'flex size-9 shrink-0 items-center justify-center rounded-card bg-white/15 ring-1 ring-white/20';

export const activeHeroText = 'min-w-0 flex-1';

export const activeHeroTitle = 'text-[1rem] font-extrabold leading-tight text-white';

export const activeHeroMeta = 'mt-1 text-[0.8125rem] font-medium leading-snug text-white/85';

export const keyPanel =
  'rounded-card bg-surface-canvas p-3.5 shadow-card ring-1 ring-neutral-200/70';

export const keyRow = 'grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-[0.75rem]';

export const keyLabel = 'font-semibold uppercase tracking-[0.05em] text-ink-soft';

export const keyValue = 'break-all font-mono font-medium text-ink';

export const btnGhost =
  'inline-flex h-9 items-center justify-center rounded-card bg-surface-muted px-3.5 text-[0.75rem] font-semibold text-ink ring-1 ring-neutral-200/90 transition-all hover:bg-neutral-50';

export const btnStoreRenew =
  'inline-flex h-10 w-full items-center justify-center gap-2 rounded-card bg-white/15 text-[0.8125rem] font-bold text-white ring-1 ring-white/25 transition-all hover:bg-white/22';

export const actionGrid = 'grid grid-cols-2 gap-2.5';

export const actionTile =
  'group relative overflow-hidden rounded-card p-3.5 no-underline shadow-buttonSoft ring-1 transition-all hover:-translate-y-0.5 hover:shadow-cardHover';

export const actionTileSites =
  `${actionTile} bg-[linear-gradient(145deg,oklch(0.98_0.02_250)_0%,oklch(0.94_0.05_255)_100%)] ring-primary-200/60 hover:ring-primary-300`;

export const actionTileDomains =
  `${actionTile} bg-[linear-gradient(145deg,oklch(0.98_0.02_148)_0%,oklch(0.94_0.05_148)_100%)] ring-success-600/20 hover:ring-success-600/35`;

export const actionTileIconWrap = 'flex size-9 items-center justify-center rounded-card shadow-buttonSoft';

export const actionTileIconSites = `${actionTileIconWrap} bg-primary-600 text-white`;

export const actionTileIconDomains = `${actionTileIconWrap} bg-success-600 text-white`;

export const actionTileTitle = 'mt-3 text-[0.875rem] font-bold tracking-tight text-ink';

export const actionTileBody = 'mt-0.5 text-[0.6875rem] font-medium leading-snug text-ink-soft';

export const actionTileMeta = 'mt-1 text-[0.625rem] font-semibold text-ink-soft/80';

export const supportCard =
  'rounded-card bg-surface-canvas p-3.5 shadow-card ring-1 ring-neutral-200/70';

export const supportTitle = 'text-[0.8125rem] font-bold text-ink';

export const supportBody = 'mt-1 text-[0.75rem] font-medium leading-snug text-ink-soft';

export const contactGrid = 'mt-2.5 grid grid-cols-3 gap-2';

export const contactTile =
  'inline-flex h-11 flex-col items-center justify-center gap-1 rounded-card bg-surface-muted text-[0.6875rem] font-bold text-ink no-underline ring-1 ring-neutral-200/80 transition-all hover:-translate-y-px hover:bg-primary-50 hover:text-primary-700 hover:ring-primary-200';

export const footerShell =
  'flex items-center justify-between gap-3 border-t border-neutral-200/80 bg-white/70 px-4 py-3 backdrop-blur-sm';

export const footerReview =
  'inline-flex items-center gap-1.5 rounded-full bg-warning-500/10 px-3 py-1.5 text-[0.75rem] font-bold text-ink no-underline ring-1 ring-warning-500/25 transition-colors hover:bg-warning-500/15';

export const footerMeta = 'text-[0.6875rem] font-medium text-ink-soft';

export const errorBanner =
  'rounded-card bg-warning-500/10 px-3 py-2 text-[0.75rem] font-semibold text-warning-700 ring-1 ring-warning-500/25';

export const stackSm = 'flex flex-col gap-2';

export const stackMd = 'flex flex-col gap-3';
