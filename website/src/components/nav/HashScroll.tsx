'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { syncScrollFromLocation } from '@/lib/hash-nav';

export function HashScroll(): null {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      if (window.location.hash) {
        syncScrollFromLocation(false);
      }
    } else {
      syncScrollFromLocation(Boolean(window.location.hash));
    }

    const onHashChange = (): void => syncScrollFromLocation(true);
    const onPopState = (): void => syncScrollFromLocation(Boolean(window.location.hash));

    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onPopState);
    };
  }, [pathname]);

  return null;
}
