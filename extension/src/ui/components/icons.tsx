type IconProps = { className?: string };

const stroke = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export function IconArrowRight({ className = '' }: IconProps): React.ReactElement {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function IconRefresh({ className = '' }: IconProps): React.ReactElement {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 4v5h-5" />
    </svg>
  );
}

export function IconStar({ className = '' }: IconProps): React.ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path d="M10 1.5 12.4 7l6 .5-4.6 4 1.4 5.8L10 14.4 4.8 17.3l1.4-5.8L1.6 7.5l6-.5L10 1.5Z" />
    </svg>
  );
}

export function IconKey({ className = '' }: IconProps): React.ReactElement {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="m15.5 7.5 2.9 2.9" />
      <path d="M11 11 6.5 15.5 4 18l-1-1 2.5-2.5L10 10" />
      <circle cx="14" cy="10" r="3.5" />
    </svg>
  );
}

export function IconGlobe({ className = '' }: IconProps): React.ReactElement {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

export function IconCheck({ className = '' }: IconProps): React.ReactElement {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
