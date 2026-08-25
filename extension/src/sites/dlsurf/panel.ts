import {
  DLSURF_MSG_SOURCE,
  DLSURF_PANEL_ID,
  DLSURF_TURNSTILE_MOUNT_ID,
  MSG_DLSURF_TURNSTILE,
  MSG_DLSURF_TURNSTILE_REMOVE,
} from './hosts';

const STYLE_ID = 'skip-wait-dlsurf-panel-css';

type DlsurfPanel = {
  mountTurnstile: (onToken: (token: string) => void) => Promise<void>;
  setError: (text: string | null) => void;
  setStatus: (text: string) => void;
  showDownload: (href: string) => void;
  showLogin: (href: string) => void;
  showRetry: (label: string, onClick: () => void) => void;
};

const ensureCss = (): void => {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent =
    `#${DLSURF_PANEL_ID}{box-sizing:border-box;width:100%;margin:0 0 12px;padding:14px 16px;border:1px solid rgba(0,0,0,.08);border-radius:10px;background:rgba(255,255,255,.92);color:#111;font:500 14px/1.45 system-ui,-apple-system,sans-serif}` +
    `@media(prefers-color-scheme:dark){#${DLSURF_PANEL_ID}{border-color:rgba(255,255,255,.12);background:rgba(24,24,27,.92);color:#f4f4f5}}` +
    `#${DLSURF_PANEL_ID} *{box-sizing:border-box}` +
    `#${DLSURF_PANEL_ID} .sw-brand{font-size:12px;font-weight:700;letter-spacing:.02em;opacity:.7;margin:0 0 6px}` +
    `#${DLSURF_PANEL_ID} .sw-title{font-size:16px;font-weight:700;margin:0 0 4px}` +
    `#${DLSURF_PANEL_ID} .sw-detail{font-size:13px;font-weight:500;opacity:.75;margin:0 0 12px}` +
    `#${DLSURF_PANEL_ID} .sw-status{font-size:13px;font-weight:600;margin:0 0 10px}` +
    `#${DLSURF_PANEL_ID} .sw-err{font-size:13px;font-weight:600;color:#dc2626;margin:0 0 10px}` +
    `#${DLSURF_PANEL_ID} .sw-turnstile{display:flex;justify-content:center;min-height:72px;margin:0 0 10px}` +
    `#${DLSURF_PANEL_ID} .sw-btn{display:inline-flex;align-items:center;justify-content:center;width:100%;min-height:40px;padding:0 16px;border:0;border-radius:8px;background:#111;color:#fff;font:600 14px/1 system-ui,-apple-system,sans-serif;text-decoration:none;cursor:pointer}` +
    `@media(prefers-color-scheme:dark){#${DLSURF_PANEL_ID} .sw-btn{background:#fafafa;color:#111}}` +
    `#${DLSURF_PANEL_ID} .sw-btn[hidden],#${DLSURF_PANEL_ID} .sw-turnstile[hidden]{display:none!important}`;
  (document.head || document.documentElement).appendChild(style);
};

const releaseTurnstile = (widgetId: string): void => {
  if (!widgetId) return;
  void chrome.runtime
    .sendMessage({ type: MSG_DLSURF_TURNSTILE_REMOVE, widgetId })
    .catch(() => undefined);
};

export const removeDlsurfPanel = (): void => {
  const panel = document.getElementById(DLSURF_PANEL_ID);
  if (!panel) return;
  const widgetId = panel.querySelector(`#${DLSURF_TURNSTILE_MOUNT_ID}`)?.getAttribute('data-sw-ts-id') ?? '';
  panel.remove();
  releaseTurnstile(widgetId);
};

export const findActionRow = (): HTMLElement | null => {
  for (const row of document.querySelectorAll<HTMLElement>('div.mt-4.flex.flex-col.gap-4.md\\:flex-row')) {
    const buttons = [...row.querySelectorAll<HTMLButtonElement>(':scope > button[data-slot="button"]')];
    if (buttons.length !== 2) continue;
    const primary = buttons[0]!;
    const secondary = buttons[1]!;
    if (!primary.classList.contains('md:flex-1') || !secondary.classList.contains('md:flex-1')) continue;
    if (![...secondary.classList].some((c) => c.includes('amber'))) continue;
    if (
      !primary.classList.contains('bg-primary') &&
      ![...primary.classList].some((c) => c.includes('success') || c.includes('green'))
    ) {
      continue;
    }
    return row;
  }
  return null;
};

export const createDlsurfPanel = (anchor: HTMLElement): DlsurfPanel => {
  ensureCss();
  removeDlsurfPanel();
  const root = document.createElement('div');
  root.id = DLSURF_PANEL_ID;
  root.innerHTML =
    '<div class="sw-brand">Skip Wait</div>' +
    '<p class="sw-title">Skip Ads &amp; Timers</p>' +
    '<p class="sw-detail">Unlocks this file with a signed-in dl.surf account — no ad waits, no countdown clicks.</p>' +
    '<p class="sw-status"></p>' +
    '<p class="sw-err"></p>' +
    `<div class="sw-turnstile" id="${DLSURF_TURNSTILE_MOUNT_ID}" hidden></div>` +
    '<a class="sw-btn" hidden rel="noopener"></a>';
  anchor.before(root);

  const statusEl = root.querySelector('.sw-status') as HTMLElement;
  const errEl = root.querySelector('.sw-err') as HTMLElement;
  const turnstileEl = root.querySelector('.sw-turnstile') as HTMLElement;
  const btn = root.querySelector('.sw-btn') as HTMLAnchorElement;
  let stopListen: (() => void) | null = null;

  const clearBtnAction = (): void => {
    btn.onclick = null;
  };

  const hideTurnstile = (): void => {
    const widgetId = turnstileEl.getAttribute('data-sw-ts-id') ?? '';
    turnstileEl.hidden = true;
    turnstileEl.removeAttribute('data-sw-ts-id');
    turnstileEl.replaceChildren();
    releaseTurnstile(widgetId);
  };

  const showBtn = (label: string, href?: string, onClick?: () => void): void => {
    stopListen?.();
    stopListen = null;
    clearBtnAction();
    hideTurnstile();
    btn.hidden = false;
    btn.textContent = label;
    if (href) {
      btn.href = href;
      return;
    }
    btn.removeAttribute('href');
    if (onClick) {
      btn.onclick = (e) => {
        e.preventDefault();
        onClick();
      };
    }
  };

  return {
    setStatus(text) {
      statusEl.textContent = text;
    },
    setError(text) {
      errEl.textContent = text ?? '';
    },
    showLogin(href) {
      showBtn('Sign In · dl.surf', href);
    },
    showDownload(href) {
      showBtn('Download File · Skip Wait', href);
    },
    showRetry(label, onClick) {
      showBtn(label, undefined, onClick);
    },
    mountTurnstile(onToken) {
      stopListen?.();
      stopListen = null;
      clearBtnAction();
      btn.hidden = true;
      btn.removeAttribute('href');
      turnstileEl.hidden = false;

      return new Promise<void>((resolve, reject) => {
        const fail = (err: unknown): void => {
          window.removeEventListener('message', onMsg);
          stopListen = null;
          reject(err instanceof Error ? err : new Error('inject'));
        };
        const onMsg = (e: MessageEvent): void => {
          if (e.origin !== location.origin) return;
          const data = e.data as { source?: string; type?: string; token?: string; err?: string } | null;
          if (!data || data.source !== DLSURF_MSG_SOURCE) return;
          if (data.type === 'ready') {
            resolve();
            return;
          }
          if (data.type === 'token' && typeof data.token === 'string') {
            onToken(data.token);
            return;
          }
          if (data.type === 'err') fail(new Error(data.err || 'turnstile'));
        };
        window.addEventListener('message', onMsg);
        stopListen = () => window.removeEventListener('message', onMsg);
        void chrome.runtime
          .sendMessage({ type: MSG_DLSURF_TURNSTILE, mountId: DLSURF_TURNSTILE_MOUNT_ID })
          .then((res: { ok?: boolean } | undefined) => {
            if (!res?.ok) fail(new Error('inject'));
          })
          .catch(fail);
      });
    },
  };
};
