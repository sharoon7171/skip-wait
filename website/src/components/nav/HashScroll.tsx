'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function scrollToHash(smooth: boolean): void {
  const hash = window.location.hash;
  if (!hash) {
    return;
  }

  const id = hash.slice(1);
  requestAnimationFrame(() => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  });
}

export function HashScroll(): null {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      if (window.location.hash) {
        scrollToHash(false);
      }
    } else if (window.location.hash) {
      scrollToHash(true);
    } else {
      window.scrollTo(0, 0);
    }

    const onHashChange = (): void => scrollToHash(true);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [pathname]);

  return null;
}
