export const keyframes = {
  rise: {
    from: { opacity: '0', transform: 'translateY(1.25rem)' },
    to: { opacity: '1', transform: 'translateY(0)' },
  },
  'fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  marquee: {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(-50%)' },
  },
} as const;

export const animation = {
  rise: 'rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
  'rise-delayed': 'rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both',
  'fade-in': 'fade-in 0.8s ease both',
  marquee: 'marquee 48s linear infinite',
} as const;
