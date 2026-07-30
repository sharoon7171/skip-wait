import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { APUNKAGAMES_HOSTS } from './hosts';

function destination(): string | null {
  const href = document.querySelector<HTMLAnchorElement>('#dlink')?.href.trim();
  if (href && /^https?:\/\//i.test(href)) return href;
  const action = document.querySelector<HTMLFormElement>('#tokensubmit')?.action.trim();
  if (action && /^https?:\/\//i.test(action) && !/download-process\.php/i.test(action)) return action;
  return null;
}

export function initApunkagamesDownloadProcess(): void {
  if (!isAllowedHost(APUNKAGAMES_HOSTS)) return;
  if (!/download-process\.php/i.test(location.pathname)) return;
  whenDomParsed(() => {
    const url = destination();
    if (url) location.replace(url);
  });
}
