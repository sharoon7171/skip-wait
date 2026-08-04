'use client';

import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import {
  trackAddToChrome,
  trackChromeWebStoreFooter,
  trackCtaClick,
  type AddToChromePlacement,
  type CtaDestination,
} from '@/lib/analytics';
import { ButtonAnchor } from '@/components/ui/Button';

type TrackedAnchorProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'className' | 'children'
> & {
  className?: string;
  children: ReactNode;
  addToChrome?: AddToChromePlacement;
  chromeWebStoreFooter?: boolean;
  cta?: CtaDestination;
  button?: boolean;
  variant?: 'dark' | 'light' | 'ghost';
};

export function TrackedAnchor({
  addToChrome,
  chromeWebStoreFooter,
  cta,
  button,
  variant = 'dark',
  children,
  className = '',
  onClick,
  ...props
}: TrackedAnchorProps): React.ReactElement {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (addToChrome) trackAddToChrome(addToChrome);
    if (chromeWebStoreFooter) trackChromeWebStoreFooter();
    if (cta) trackCtaClick(cta);
    onClick?.(event);
  };

  if (button) {
    return (
      <ButtonAnchor {...props} variant={variant} className={className} onClick={handleClick}>
        {children}
      </ButtonAnchor>
    );
  }

  return (
    <a {...props} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
