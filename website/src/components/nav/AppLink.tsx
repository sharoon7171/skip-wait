'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { handleSamePathNav } from '@/lib/hash-nav';

type AppLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

export function AppLink({ href, onClick, ...props }: AppLinkProps): React.ReactElement {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) {
          return;
        }
        if (handleSamePathNav(href, pathname)) {
          event.preventDefault();
        }
      }}
    />
  );
}
