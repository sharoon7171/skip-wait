function splitAppHref(href: string): { pathname: string; hash: string } {
  const index = href.indexOf('#');
  if (index === -1) {
    return { pathname: href || '/', hash: '' };
  }

  return {
    pathname: href.slice(0, index) || '/',
    hash: href.slice(index),
  };
}

function scrollToHashId(id: string, smooth: boolean): void {
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'start',
    });
  });
}

export function syncScrollFromLocation(smooth: boolean): void {
  const hash = window.location.hash;
  if (hash) {
    scrollToHashId(hash.slice(1), smooth);
    return;
  }
  window.scrollTo(0, 0);
}

export function handleSamePathNav(href: string, currentPathname: string): boolean {
  const { pathname, hash } = splitAppHref(href);
  if (pathname !== currentPathname) {
    return false;
  }

  if (!hash) {
    if (!window.location.hash) {
      return false;
    }
    window.history.pushState(null, '', pathname);
    window.scrollTo(0, 0);
    return true;
  }

  if (window.location.hash === hash) {
    scrollToHashId(hash.slice(1), true);
    return true;
  }

  window.location.hash = hash.slice(1);
  return true;
}
