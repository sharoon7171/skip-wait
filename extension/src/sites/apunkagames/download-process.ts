import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';

function destination(): string | null {
  const href = document.querySelector<HTMLAnchorElement>('#dlink')?.href.trim();
  if (href && /^https?:\/\//i.test(href)) return href;
  const action = document.querySelector<HTMLFormElement>('#tokensubmit')?.action.trim();
  if (action && /^https?:\/\//i.test(action) && !/download-process\.php/i.test(action)) return action;
  return null;
}

export function initApunkagamesDownloadProcess(): void {
  if (!/download-process\.php/i.test(location.pathname)) return;
  void canBypass('apunkagames').then((ok) => {
    if (!ok) return;
    whenDomParsed(() => {
      const url = destination();
      if (url) location.replace(url);
    });
  });
}
