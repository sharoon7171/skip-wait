import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { decryptLinkshortifyPayload, resolveLinkshortifyUrl } from './decrypt';
import { LKSFY_ALIAS_RE, LKSFY_UNLOCK_HOSTS, MSG_LKSFY_ADBLOCK } from './hosts';

const OVERLAY_ID = 'skip-wait-lksfy-overlay';
const CAPTCHA_PIN_STYLE_ID = 'skip-wait-lksfy-captcha-pin';
const CAPTCHA_WIDGET_ID = 'captchaLinksGo';
const TURNSTILE_RESPONSE = '[name="cf-turnstile-response"]';
const TURNSTILE_IFRAMES = [
  'iframe[src*="challenges.cloudflare.com"]',
  'iframe[src*="turnstile"]',
] as const;
const GO_FORM = '#go-link, form[action*="/links/go"]';
const BASE64_RE = /var\s+base64\s*=\s*['"]([^'"]+)['"]/;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

const CAPTCHA_NOTE = {
  lead: 'Confirm you’re human.',
  detail: 'Complete the Turnstile check below. We’ll continue automatically when it’s done.',
} as const;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

let ui: FullPageOverlay | null = null;
let started = false;

const requestAdblockBypass = (): void => {
  chrome.runtime.sendMessage({ type: MSG_LKSFY_ADBLOCK }).catch(() => {});
};

const mountUi = (
  note: typeof NOTE | typeof CAPTCHA_NOTE = NOTE,
  status = 'Getting things ready…',
): FullPageOverlay => {
  if (ui) {
    ui.setNote(note);
    ui.setStatus(status);
    ui.setError(null);
    return ui;
  }
  ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note,
    status,
    countdownLabel: 'Your link opens in',
  });
  return ui;
};

const pathAlias = (): string | null => {
  const parts = location.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  const alias = parts[0] ?? '';
  return parts.length === 1 && LKSFY_ALIAS_RE.test(alias) ? alias : null;
};

const isUnlockShell = (): boolean =>
  !!document.querySelector('#timer, #get-link, #form-show, .cf-turnstile, #captchaLinksGo') ||
  BASE64_RE.test(document.documentElement.innerHTML);

const isInternalUrl = (href: string): boolean => {
  try {
    const h = new URL(href).hostname.toLowerCase();
    return LKSFY_UNLOCK_HOSTS.some((d) => h === d || h.endsWith('.' + d));
  } catch {
    return true;
  }
};

const turnstileToken = (): string | null => {
  for (const el of document.querySelectorAll(TURNSTILE_RESPONSE)) {
    const v = (el as HTMLInputElement | HTMLTextAreaElement).value?.trim();
    if (v && v.length > 20) return v;
  }
  return null;
};

const readFormFields = (form: HTMLFormElement): Record<string, string> => {
  const fields: Record<string, string> = {};
  for (const el of form.elements) {
    if (!(el instanceof HTMLInputElement) && !(el instanceof HTMLTextAreaElement)) continue;
    if (!el.name || el.disabled) continue;
    if (el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio') && !el.checked) {
      continue;
    }
    fields[el.name] = el.value ?? '';
  }
  return fields;
};

const pageBase64 = (): string | null => BASE64_RE.exec(document.documentElement.innerHTML)?.[1] ?? null;

const waitForPageBase64 = async (timeoutMs: number): Promise<string | null> => {
  const existing = pageBase64();
  if (existing) return existing;
  const end = Date.now() + timeoutMs;
  while (Date.now() < end) {
    const value = pageBase64();
    if (value) return value;
    await sleep(50);
  }
  return pageBase64();
};

const ensureGoForm = async (alias: string): Promise<HTMLFormElement | null> => {
  const live = document.querySelector<HTMLFormElement>(GO_FORM);
  if (live?.querySelector('[name="ad_form_data"]')) return live;

  const payload = await waitForPageBase64(15_000);
  if (!payload) return null;
  const html = await decryptLinkshortifyPayload(payload, alias);
  if (!html?.includes('ad_form_data')) return null;

  let mount = document.getElementById('form-show');
  if (!mount) {
    mount = document.createElement('div');
    mount.id = 'form-show';
    (document.body || document.documentElement).appendChild(mount);
  }
  mount.innerHTML = html;
  return document.querySelector<HTMLFormElement>(GO_FORM);
};

const waitForTurnstile = async (overlay: FullPageOverlay): Promise<string | null> => {
  overlay.setNote(CAPTCHA_NOTE);
  overlay.setStatus('Waiting for captcha…');

  let stopPin: (() => void) | null = null;
  let pinAt = 0;
  const release = (): void => {
    stopPin?.();
    stopPin = null;
  };

  const ensurePin = (): void => {
    const widget =
      document.getElementById(CAPTCHA_WIDGET_ID) ??
      document.querySelector<HTMLElement>('.cf-turnstile');
    if (!widget) return;
    if (!widget.id) widget.id = CAPTCHA_WIDGET_ID;
    if (stopPin && document.getElementById(widget.id)) return;
    release();
    stopPin = pinSiteWidgetOverOverlay({
      overlayId: OVERLAY_ID,
      mount: overlay.turnstileMount,
      widgetId: widget.id,
      styleId: CAPTCHA_PIN_STYLE_ID,
      alsoVisibleSelectors: TURNSTILE_IFRAMES,
    });
    if (!pinAt) pinAt = Date.now();
    overlay.setStatus('Complete the captcha below.');
  };

  const end = Date.now() + 180_000;
  while (Date.now() < end) {
    ensurePin();
    const token = turnstileToken();
    if (token && Date.now() - pinAt >= 400) {
      release();
      return token;
    }
    await sleep(200);
  }
  release();
  return turnstileToken();
};

const postLinksGo = async (
  form: HTMLFormElement,
  token: string,
  alias: string,
): Promise<string | null> => {
  const fields = readFormFields(form);
  fields['cf-turnstile-response'] = token;
  try {
    const r = await fetch(new URL(form.getAttribute('action') || '/links/go', location.href).href, {
      method: 'POST',
      body: new URLSearchParams(fields),
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    const text = await r.text();
    let raw = '';
    try {
      const data = JSON.parse(text) as { url?: unknown };
      raw = typeof data.url === 'string' ? data.url.trim() : '';
    } catch {
      raw = text.match(/https?:\/\/[^"'\\\s<>]+/)?.[0] ?? '';
    }
    return raw ? resolveLinkshortifyUrl(raw, alias) : null;
  } catch {
    return null;
  }
};

const runUnlock = async (): Promise<void> => {
  const alias = pathAlias();
  if (!alias) {
    mountUi().setError('Missing link alias on this page.');
    started = false;
    return;
  }

  requestAdblockBypass();
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
  const overlay = mountUi(NOTE, 'Getting things ready…');

  const ready = document.querySelector<HTMLAnchorElement>('a.get-link:not(.disabled)');
  const readyHref = ready?.getAttribute('href')?.trim() ?? '';
  if (readyHref && !readyHref.startsWith('javascript:')) {
    const decoded = await resolveLinkshortifyUrl(readyHref, alias);
    if (decoded && !isInternalUrl(decoded)) {
      overlay.setStatus('Opening your link…');
      location.replace(decoded);
      return;
    }
  }

  overlay.setStatus('Preparing unlock form…');
  const form = await ensureGoForm(alias);
  if (!form?.querySelector('[name="ad_form_data"]')) {
    overlay.setError('Unlock form was not ready. Reload and try again.');
    started = false;
    return;
  }

  const token = await waitForTurnstile(overlay);
  if (!token) {
    overlay.setError('Turnstile was not completed. Finish the check above.');
    started = false;
    return;
  }

  overlay.setNote(NOTE);
  overlay.setStatus('Unlocking your link…');

  let url = await postLinksGo(form, token, alias);
  if (!url) {
    const endAt = Date.now() + 8_000;
    while (!url && Date.now() < endAt) {
      url = await postLinksGo(form, token, alias);
      if (url) break;
      await sleep(300);
    }
  }

  if (!url || isInternalUrl(url)) {
    overlay.setError('Couldn’t unlock this link. Reload and try again.');
    started = false;
    return;
  }

  overlay.setStatus('Opening your link…');
  location.replace(url);
};

export function initLksfyGate(): void {
  if (window !== window.top) return;
  if (!isAllowedHost(LKSFY_UNLOCK_HOSTS)) return;
  if (!pathAlias()) return;

  requestAdblockBypass();

  const tryStart = (): void => {
    if (started || !isUnlockShell()) return;
    started = true;
    mountUi(NOTE, 'Getting things ready…');
    void runUnlock().catch(() => {
      mountUi().setError('Unlock failed. Reload and try again.');
      started = false;
    });
  };

  tryStart();
  whenDomParsed(tryStart);
  const mo = new MutationObserver(() => {
    tryStart();
    if (started) mo.disconnect();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
}
