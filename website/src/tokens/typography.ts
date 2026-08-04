export const fontFamilies = {
  sans: ['var(--font-sans)'],
  display: ['var(--font-sans)'],
  mono: ['var(--font-mono)'],
} as const;

export const fontSize = {
  overline: [
    '0.75rem',
    { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0.06em' },
  ],
  domain: ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
  caption: ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
  'body-sm': ['1rem', { lineHeight: '1.65', fontWeight: '400' }],
  body: ['1.0625rem', { lineHeight: '1.7', fontWeight: '400' }],
  ui: ['0.9375rem', { lineHeight: '1.3', fontWeight: '600' }],
  title: [
    '1.25rem',
    { lineHeight: '1.3', fontWeight: '700', letterSpacing: '-0.015em' },
  ],
  'title-lg': [
    '1.5rem',
    { lineHeight: '1.25', fontWeight: '700', letterSpacing: '-0.02em' },
  ],
  lead: ['clamp(1.125rem, 1.7vw, 1.3125rem)', { lineHeight: '1.6', fontWeight: '400' }],
  headline: [
    'clamp(2rem, 4.2vw, 3rem)',
    { lineHeight: '1.12', fontWeight: '800', letterSpacing: '-0.025em' },
  ],
  display: [
    'clamp(2.25rem, 8vw, 4.75rem)',
    { lineHeight: '1.05', fontWeight: '800', letterSpacing: '-0.03em' },
  ],
  metric: [
    'clamp(2.25rem, 4vw, 3.25rem)',
    { lineHeight: '1.05', fontWeight: '800', letterSpacing: '-0.025em' },
  ],
} as const;
