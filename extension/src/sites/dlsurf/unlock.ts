import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';
import { DLSURF_API, DLSURF_FILE_RE, DLSURF_PANEL_ID, MSG_DLSURF_PREFETCH, MSG_DLSURF_UNLOCK } from './hosts';
import { createDlsurfPanel, findActionRow } from './panel';
import type { DlsurfUnlockResult } from './hosts';

let activeSlug: string | null = null;
let runGen = 0;
let lastPath = '';
let historyHooked = false;

const slugFromPath = (): string | null => DLSURF_FILE_RE.exec(location.pathname)?.[1] ?? null;

const isAuthed = (): Promise<boolean> =>
  fetch(`${DLSURF_API}/api/account/check-auth/`, { credentials: 'include', cache: 'no-store' }).then((r) => r.ok);

const prefetchJwt = (slug: string): Promise<string> =>
  chrome.runtime
    .sendMessage({ type: MSG_DLSURF_PREFETCH, slug })
    .then((r: { token?: string } | undefined) => (typeof r?.token === 'string' ? r.token : ''))
    .catch(() => '');

const unlock = async (slug: string, captchaToken: string, jwt: string): Promise<string> => {
  const r = (await chrome.runtime.sendMessage({
    type: MSG_DLSURF_UNLOCK,
    slug,
    captchaToken,
    jwt,
  })) as DlsurfUnlockResult | undefined;
  if (r?.ok === true) return r.url;
  throw new Error(r && r.ok === false ? r.err : 'unlock');
};

const teardown = (): void => {
  runGen += 1;
  activeSlug = null;
  document.getElementById(DLSURF_PANEL_ID)?.remove();
};

const stillCurrent = (gen: number, slug: string): boolean =>
  gen === runGen && slugFromPath() === slug;

const run = async (): Promise<void> => {
  if (window !== window.top) return;
  const slug = slugFromPath();
  if (!slug) {
    if (activeSlug) teardown();
    return;
  }
  if (slug === activeSlug && document.getElementById(DLSURF_PANEL_ID)) return;

  teardown();
  const action = findActionRow();
  if (!action) return;

  const gen = ++runGen;
  activeSlug = slug;
  action.primary.hidden = true;

  const panel = createDlsurfPanel(action.row);
  panel.setStatus('Checking dl.surf account…');

  try {
    if (!(await isAuthed())) {
      if (!stillCurrent(gen, slug)) return;
      panel.setStatus('Sign In required');
      panel.setError('Skip Wait uses the signed-in dl.surf account. Sign in on this site, then open the file again.');
      panel.showLogin(`/accounts/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
    if (!stillCurrent(gen, slug)) return;

    panel.setStatus('Complete the quick check below — then the file unlocks.');
    panel.setError(null);
    const jwtReady = prefetchJwt(slug);

    const onCaptcha = (captchaToken: string): void => {
      if (!stillCurrent(gen, slug)) return;
      panel.setStatus('Unlocking file…');
      void jwtReady
        .then((jwt) => unlock(slug, captchaToken, jwt))
        .then((url) => {
          if (!stillCurrent(gen, slug)) return;
          panel.setStatus('Ready — tap Download File · Skip Wait when needed.');
          panel.setError(null);
          panel.showDownload(url);
        })
        .catch(() => {
          if (!stillCurrent(gen, slug)) return;
          panel.setError('Could not unlock this file. Sign in if needed, then complete the check again.');
          panel.setStatus('Unlock Failed');
          void panel.mountTurnstile(onCaptcha);
        });
    };
    await panel.mountTurnstile(onCaptcha);
  } catch {
    if (!stillCurrent(gen, slug)) return;
    document.getElementById(DLSURF_PANEL_ID)?.remove();
    action.primary.hidden = false;
    activeSlug = null;
  }
};

const onPathMaybeChanged = (): void => {
  const path = location.pathname;
  if (path === lastPath) {
    void run();
    return;
  }
  lastPath = path;
  if (activeSlug && slugFromPath() !== activeSlug) teardown();
  void run();
};

const hookHistory = (): void => {
  if (historyHooked) return;
  historyHooked = true;
  lastPath = location.pathname;
  const wrap =
    (original: typeof history.pushState): typeof history.pushState =>
    function (this: History, ...args: Parameters<typeof history.pushState>) {
      const ret = original.apply(this, args);
      queueMicrotask(onPathMaybeChanged);
      return ret;
    };
  history.pushState = wrap(history.pushState.bind(history));
  history.replaceState = wrap(history.replaceState.bind(history));
  window.addEventListener('popstate', onPathMaybeChanged);
};

export function initDlsurfUnlock(): void {
  if (window !== window.top) return;
  void isRemoteSite('dlsurf').then((ok) => {
    if (!ok) return;
    hookHistory();
    whenDomParsed(onPathMaybeChanged);
    new MutationObserver(onPathMaybeChanged).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}
