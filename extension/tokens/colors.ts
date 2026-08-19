export const neutral = {
  50: 'oklch(0.985 0 0)',
  200: 'oklch(0.92 0.004 264)',
  300: 'oklch(0.865 0.006 264)',
  500: 'oklch(0.55 0.018 264)',
  900: 'oklch(0.20 0.015 264)',
} as const;

export const primary = {
  50: 'oklch(0.98 0.01 250)',
  200: 'oklch(0.88 0.07 250)',
  300: 'oklch(0.78 0.12 250)',
  600: 'oklch(0.48 0.22 255)',
  700: 'oklch(0.42 0.18 258)',
} as const;

export const success = {
  600: 'oklch(0.52 0.16 148)',
  700: 'oklch(0.44 0.12 148)',
} as const;

export const warning = {
  500: 'oklch(0.72 0.22 70)',
  700: 'oklch(0.52 0.16 65)',
} as const;

export const surface = {
  canvas: 'oklch(1 0 0)',
  muted: neutral[50],
} as const;

export const ink = {
  DEFAULT: neutral[900],
  soft: neutral[500],
  inverse: 'oklch(0.985 0.004 250)',
} as const;
