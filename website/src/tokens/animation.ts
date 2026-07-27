export const keyframes = {
  marquee: {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(-50%)' },
  },
} as const;

export const animation = {
  marquee: 'marquee 48s linear infinite',
} as const;
