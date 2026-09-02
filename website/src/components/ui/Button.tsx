import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { AppLink } from '@/components/nav/AppLink';

const base =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-ui whitespace-nowrap no-underline transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

const variants = {
  dark: 'bg-[linear-gradient(180deg,oklch(0.52_0.22_255)_0%,oklch(0.48_0.24_255)_100%)] text-white shadow-button hover:-translate-y-px hover:shadow-cardHover',
  light:
    'bg-white text-primary-700 shadow-buttonSoft hover:-translate-y-px hover:bg-primary-50',
  ghost:
    'bg-surface-canvas text-ink ring-1 ring-neutral-200/90 shadow-buttonSoft hover:-translate-y-px hover:bg-primary-50 hover:text-primary-700 hover:ring-primary-200',
} as const;

type Variant = keyof typeof variants;
type Common = { variant?: Variant; className?: string; children: ReactNode };

function buttonClasses(variant: Variant = 'dark', className = ''): string {
  return `${base} ${variants[variant]} ${className}`.trim();
}

export function ButtonLink({
  href,
  variant,
  className,
  children,
}: Common & { href: string }): React.ReactElement {
  return (
    <AppLink href={href} className={buttonClasses(variant, className)}>
      {children}
    </AppLink>
  );
}

export function ButtonAnchor({
  variant,
  className,
  children,
  ...props
}: Common & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>): React.ReactElement {
  return (
    <a className={buttonClasses(variant, className)} {...props}>
      {children}
    </a>
  );
}
