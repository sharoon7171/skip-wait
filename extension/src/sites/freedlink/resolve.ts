import {
  CAPTCHA_RESPONSE,
  FREE_BUTTON,
  FREE_CAPTCHA,
  FREE_FORM,
  MISSING_TITLE,
} from './hosts';

const SERVER_ERR_RE = /<div class='alert alert-danger'>([\s\S]*?)<\/div>/i;
const COOLDOWN_RE =
  /you have to wait\s+(?:(\d+)\s*minutes?\s*,?\s*)?(?:(\d+)\s*seconds?)?\s*till next download/i;
const SKIP =
  /frdl\.|freedl\.ink|fonts\.|googleapis|gstatic|cdnjs|cdn\.|jsdelivr|bootstrap|hcaptcha|googletagmanager/i;
const FILE_EXT = /\.(rar|zip|7z|tar|gz|apk|mp4|mkv|pdf|exe|iso|dmg)(\?|$)/i;

type HcaptchaApi = { getResponse: (id?: string) => string; reset: (id?: string) => void };
type WindowHcaptcha = Window & { hcaptcha?: HcaptchaApi };

export type PageKind = 'missing' | 'cooldown' | 'ready' | 'unknown';

const decode = (s: string): string => s.replace(/&amp;/g, '&');
const stripHtml = (s: string): string => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const isDownloadUrl = (url: string): boolean => {
  if (!/^https?:\/\//i.test(url) || SKIP.test(url)) return false;
  if (/^https:\/\/fs\d+\./i.test(url)) return true;
  if (FILE_EXT.test(url)) return true;
  return !/\.html?(\?|$)/i.test(url);
};

const fileHref = (html: string): string | null => {
  for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/gi)) {
    const url = decode(m[1] ?? '');
    if (isDownloadUrl(url)) return url;
  }
  return null;
};

export const freeForm = (): HTMLFormElement | null =>
  document.querySelector<HTMLFormElement>(FREE_FORM);

export const missingFromPage = (): { title: string; detail: string } | null => {
  const title = document.querySelector(MISSING_TITLE)?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  if (!/^file not found$/i.test(title)) return null;
  const detail =
    document.querySelector('.alert.alert-warning')?.textContent?.replace(/\s+/g, ' ').trim() ||
    'The file you were looking for could not be found, sorry for any inconvenience';
  return { title, detail };
};

export const cooldownFromPage = (): { message: string; seconds: number } | null => {
  for (const el of document.querySelectorAll<HTMLElement>('.alert.alert-danger')) {
    if (el.id === 'failed' || el.closest('#adb-disable')) continue;
    const style = el.getAttribute('style') ?? '';
    if (/display\s*:\s*none/i.test(style)) continue;
    const text = el.textContent?.replace(/\s+/g, ' ').trim() ?? '';
    const m = COOLDOWN_RE.exec(text);
    if (!m) continue;
    const minutes = Number(m[1] ?? 0);
    const seconds = Number(m[2] ?? 0);
    const total = minutes * 60 + seconds;
    if (total <= 0) continue;
    return { message: text, seconds: total };
  }
  return null;
};

export const isFreeReady = (): boolean => {
  const form = freeForm();
  return !!form?.querySelector(FREE_BUTTON) && !!form.querySelector(`${FREE_CAPTCHA} .h-captcha`);
};

export const detectPageKind = (): PageKind => {
  if (missingFromPage()) return 'missing';
  if (cooldownFromPage()) return 'cooldown';
  if (isFreeReady()) return 'ready';
  return 'unknown';
};

export const captchaToken = (form: HTMLFormElement): string => {
  for (const el of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(CAPTCHA_RESPONSE)) {
    const v = el.value.trim();
    if (v.length > 20) return v;
  }
  const widget = form.querySelector<HTMLElement>('.h-captcha');
  const id = widget?.getAttribute('data-hcaptcha-widget-id') ?? undefined;
  const v = (window as WindowHcaptcha).hcaptcha?.getResponse(id)?.trim() ?? '';
  return v.length > 20 ? v : '';
};

export const resetCaptcha = (form: HTMLFormElement): void => {
  const widget = form.querySelector<HTMLElement>('.h-captcha');
  const id = widget?.getAttribute('data-hcaptcha-widget-id') ?? undefined;
  (window as WindowHcaptcha).hcaptcha?.reset(id);
  for (const el of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(CAPTCHA_RESPONSE)) {
    el.value = '';
  }
};

export const revealFreeCaptcha = (form: HTMLFormElement): HTMLElement | null => {
  const panel = form.querySelector<HTMLElement>(FREE_CAPTCHA);
  if (panel) panel.style.display = 'block';
  const flag = form.querySelector<HTMLInputElement>('#download_free');
  if (flag) flag.value = '1';
  return form.querySelector<HTMLElement>(`${FREE_CAPTCHA} .h-captcha`);
};

const formBody = (form: HTMLFormElement, extra: Record<string, string>): URLSearchParams => {
  const body = new URLSearchParams();
  for (const el of form.elements) {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) continue;
    if (!el.name || el.disabled || el.type === 'button' || el.type === 'submit') continue;
    body.set(el.name, el.value);
  }
  for (const [k, v] of Object.entries(extra)) body.set(k, v);
  return body;
};

export const parseDownloadResponse = (
  html: string,
  responseUrl: string,
  contentType: string,
): { url?: string; serverError?: string; cooldownSeconds?: number } => {
  if (isDownloadUrl(responseUrl)) return { url: responseUrl };
  if (/octet-stream|x-rar|x-zip|x-7z-compressed|force-download/i.test(contentType)) {
    return { url: responseUrl };
  }

  const refresh = html.match(/http-equiv="refresh"[^>]*content="[^;]*;\s*url=([^"]+)"/i)?.[1];
  if (refresh && isDownloadUrl(decode(refresh))) return { url: decode(refresh) };

  const jsLoc = html.match(/window\.location(?:\.href)?\s*=\s*['"](https?:\/\/[^'"]+)['"]/i)?.[1];
  if (jsLoc && isDownloadUrl(decode(jsLoc))) return { url: decode(jsLoc) };

  const href = fileHref(html);
  if (href) return { url: href };

  const raw = html.match(SERVER_ERR_RE)?.[1];
  const serverError = raw ? stripHtml(raw) : undefined;
  if (serverError) {
    const m = COOLDOWN_RE.exec(serverError);
    if (m) {
      const total = Number(m[1] ?? 0) * 60 + Number(m[2] ?? 0);
      if (total > 0) return { serverError, cooldownSeconds: total };
    }
    return { serverError };
  }
  return {};
};

export class FreedlinkError extends Error {
  constructor(
    readonly code: 'captcha' | 'unlock' | 'cooldown',
    message?: string,
    readonly cooldownSeconds?: number,
  ) {
    super(message ?? code);
    this.name = 'FreedlinkError';
  }
}

export async function requestFreeDownload(form: HTMLFormElement): Promise<string> {
  const token = captchaToken(form);
  if (!token) throw new FreedlinkError('captcha', 'Captcha token missing');

  const res = await fetch(form.action || location.href, {
    method: 'POST',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      Accept: 'text/html,*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: formBody(form, {
      download_free: '1',
      adblock_detected: '0',
      'h-captcha-response': token,
      'g-recaptcha-response': token,
    }).toString(),
  });

  const parsed = parseDownloadResponse(await res.text(), res.url, res.headers.get('content-type') ?? '');
  if (parsed.url) return parsed.url;
  if (parsed.cooldownSeconds) {
    throw new FreedlinkError('cooldown', parsed.serverError ?? 'Cooldown required', parsed.cooldownSeconds);
  }
  const err = parsed.serverError ?? '';
  if (/wrong captcha/i.test(err)) throw new FreedlinkError('captcha', err);
  if (err) throw new FreedlinkError('unlock', err);
  throw new FreedlinkError('unlock', 'Download link not found in response');
}
