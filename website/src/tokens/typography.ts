export const fontFamilies = {
  sans: ['var(--font-sans)'],
  display: ['var(--font-sans)'],
  mono: ['var(--font-sans)'],
} as const;

export const fontSize = {
  overline: [
    '0.6875rem',
    { lineHeight: '1.25', fontWeight: '600', letterSpacing: '0.08em' },
  ],
  domain: [
    '0.75rem',
    { lineHeight: '1.35', fontWeight: '500', letterSpacing: '-0.01em' },
  ],
  caption: [
    '0.8125rem',
    { lineHeight: '1.4', fontWeight: '500' },
  ],
  ui: [
    '0.875rem',
    { lineHeight: '1.25', fontWeight: '600' },
  ],
  'body-sm': [
    '0.9375rem',
    { lineHeight: '1.55', fontWeight: '400' },
  ],
  body: [
    '1rem',
    { lineHeight: '1.6', fontWeight: '400' },
  ],
  title: [
    '1.125rem',
    { lineHeight: '1.25', fontWeight: '700', letterSpacing: '-0.02em' },
  ],
  'title-lg': [
    '1.25rem',
    { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.025em' },
  ],
  lead: [
    'clamp(1.0625rem, 1.15vw, 1.125rem)',
    { lineHeight: '1.55', fontWeight: '400' },
  ],
  headline: [
    'clamp(1.875rem, 2.8vw, 2.375rem)',
    { lineHeight: '1.15', fontWeight: '800', letterSpacing: '-0.03em' },
  ],
  display: [
    'clamp(2.125rem, 4.5vw, 3.25rem)',
    { lineHeight: '1.05', fontWeight: '800', letterSpacing: '-0.035em' },
  ],
  metric: [
    'clamp(2rem, 2.8vw, 2.5rem)',
    { lineHeight: '1', fontWeight: '800', letterSpacing: '-0.03em' },
  ],
  timer: [
    'clamp(1.75rem, 2.4vw, 2.125rem)',
    { lineHeight: '1', fontWeight: '600', letterSpacing: '-0.02em' },
  ],
} as const;
