import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { AppLink } from '@/components/nav/AppLink';

const base =
  'inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-7 text-ui whitespace-nowrap no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

const variants = {
  dark: 'bg-primary-600 text-white hover:bg-primary-700',
  light: 'bg-white text-primary-700 hover:bg-primary-50',
  ghost: 'text-ink ring-1 ring-neutral-300 hover:bg-surface-muted hover:ring-neutral-400',
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
