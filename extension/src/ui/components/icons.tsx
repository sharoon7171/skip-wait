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

export function IconLicenseKey({ className = '' }: IconProps): React.ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        d="M7 5C3.1545455 5 0 8.1545455 0 12C0 15.845455 3.1545455 19 7 19C9.7749912 19 12.089412 17.314701 13.271484 15H16v3h6v-3h2V9h-1L13.287109 9C12.172597 6.6755615 9.8391582 5 7 5zM7 7C9.2802469 7 11.092512 8.4210017 11.755859 10.328125L11.988281 11H22v2h-2v3h-2v-3H12.017578l-.248.635C11.010114 15.575499 9.1641026 17 7 17C4.2454545 17 2 14.754545 2 12C2 9.2454545 4.2454545 7 7 7zM7 9C5.3545455 9 4 10.354545 4 12C4 13.645455 5.3545455 15 7 15C8.6454545 15 10 13.645455 10 12C10 10.354545 8.6454545 9 7 9zM7 11C7.5545455 11 8 11.445455 8 12C8 12.554545 7.5545455 13 7 13C6.4454545 13 6 12.554545 6 12C6 11.445455 6.4454545 11 7 11z"
      />
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
