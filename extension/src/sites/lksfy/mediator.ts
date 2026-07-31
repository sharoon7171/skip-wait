import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { LKSFY_ALIAS_RE, LKSFY_MEDIATOR_HOSTS, lksfyUnlockUrl } from './hosts';

let started = false;

function validAlias(value: string | null | undefined): string | null {
  const v = value?.trim() ?? '';
  return LKSFY_ALIAS_RE.test(v) ? v : null;
}

function resolveAlias(): string | null {
  const id = validAlias(new URLSearchParams(location.search).get('id'));
  if (id) return id;

  const html = /var\s+alias\s*=\s*['"]([^'"]+)['"]/.exec(document.documentElement.innerHTML)?.[1];
  const fromHtml = validAlias(html);
  if (fromHtml) return fromHtml;

  const hasGate =
    !!document.querySelector('#topButton, #bottomButton, .pro_btn') ||
    /tagrget_url\s*=/.test(document.documentElement.innerHTML) ||
    /You Are On\s*<span>\s*Step\s*\d+\s*\/\s*\d+/i.test(document.documentElement.innerHTML);
  if (!hasGate) return null;

  const cookie = /(?:^|;\s*)alias=([^;]+)/i.exec(document.cookie)?.[1];
  try {
    return validAlias(cookie ? decodeURIComponent(cookie) : null);
  } catch {
    return validAlias(cookie);
  }
}

function jump(): void {
  if (started) return;
  const alias = resolveAlias();
  if (!alias) return;
  started = true;
  location.replace(lksfyUnlockUrl(alias));
}

export function initLksfyMediator(): void {
  if (window !== window.top) return;
  if (!isAllowedHost(LKSFY_MEDIATOR_HOSTS)) return;

  jump();
  whenDomParsed(jump);
  const mo = new MutationObserver(() => {
    jump();
    if (started) mo.disconnect();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
}
