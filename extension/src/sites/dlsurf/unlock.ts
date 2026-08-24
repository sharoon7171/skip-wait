import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';
import {
  DLSURF_FILE_RE,
  DLSURF_PANEL_ID,
  MSG_DLSURF_AUTH,
  MSG_DLSURF_PREFETCH,
  MSG_DLSURF_UNLOCK,
  type DlsurfUnlockResult,
} from './hosts';
import { createDlsurfPanel, findActionRow, removeDlsurfPanel } from './panel';

let activeSlug: string | null = null;
let runGen = 0;
let lastPath = '';
let historyHooked = false;
let busy = false;
let queued = false;

const slugFromPath = (): string | null => DLSURF_FILE_RE.exec(location.pathname)?.[1] ?? null;

const isAuthed = (): Promise<boolean> =>
  chrome.runtime
    .sendMessage({ type: MSG_DLSURF_AUTH })
    .then((r: { ok?: boolean } | undefined) => r?.ok === true)
    .catch(() => false);

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

const unlockErrText = (err: unknown): string => {
  const msg = err instanceof Error ? err.message : '';
  if (!msg || msg === 'unlock' || msg === 'token' || msg === 'download' || msg === 'args' || msg === 'empty') {
    return 'Could not unlock this file. Complete the check again, or sign in again if the session expired.';
  }
  if (msg.startsWith('auth ') || msg.includes('Refresh token') || /unauthor/i.test(msg)) {
    return 'Session expired. Sign in on dl.surf, then open this file again.';
  }
  return msg;
};

const panelEl = (): HTMLElement | null => document.getElementById(DLSURF_PANEL_ID);

const teardown = (): void => {
  runGen += 1;
  activeSlug = null;
  removeDlsurfPanel();
};

const stillCurrent = (gen: number, slug: string): boolean =>
  gen === runGen && slugFromPath() === slug;

const mutationIsOurs = (records: MutationRecord[]): boolean => {
  const panel = panelEl();
  if (!panel) return false;
  return records.every((r) => {
    const t = r.target;
    return t instanceof Node && (t === panel || panel.contains(t));
  });
};

const run = async (): Promise<void> => {
  if (window !== window.top) return;
  if (busy) {
    queued = true;
    return;
  }

  const slug = slugFromPath();
  if (!slug) {
    if (activeSlug) teardown();
    return;
  }
  if (activeSlug === slug && panelEl()) return;

  const action = findActionRow();
  if (!action) return;

  busy = true;
  const gen = ++runGen;
  const primary = action.primary;
  primary.hidden = true;

  const abort = (): void => {
    removeDlsurfPanel();
    if (primary.isConnected) primary.hidden = false;
    if (activeSlug === slug) activeSlug = null;
  };

  try {
    removeDlsurfPanel();
    if (!stillCurrent(gen, slug) || !action.row.isConnected) {
      abort();
      return;
    }

    const panel = createDlsurfPanel(action.row);
    if (!stillCurrent(gen, slug) || !panelEl()) {
      abort();
      return;
    }
    activeSlug = slug;
    panel.setStatus('Checking dl.surf account…');

    if (!(await isAuthed())) {
      if (!stillCurrent(gen, slug) || !panelEl()) {
        abort();
        return;
      }
      panel.setStatus('Sign In required');
      panel.setError(
        'Skip Wait needs a live dl.surf session (not just the profile name in the header). Sign in, then open the file again.',
      );
      panel.showLogin(`/accounts/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
    if (!stillCurrent(gen, slug) || !panelEl()) {
      abort();
      return;
    }

    const startCheck = async (): Promise<void> => {
      if (!stillCurrent(gen, slug) || !panelEl()) return;
      panel.setStatus('Complete the quick check below — then the file unlocks.');
      panel.setError(null);
      const jwtReady = prefetchJwt(slug);
      await panel.mountTurnstile((captchaToken) => {
        if (!stillCurrent(gen, slug) || !panelEl()) return;
        panel.setStatus('Unlocking file…');
        void jwtReady
          .then((jwt) => unlock(slug, captchaToken, jwt))
          .then((url) => {
            if (!stillCurrent(gen, slug) || !panelEl()) return;
            panel.setStatus('Ready — tap Download File · Skip Wait when needed.');
            panel.setError(null);
            panel.showDownload(url);
          })
          .catch((err: unknown) => {
            if (!stillCurrent(gen, slug) || !panelEl()) return;
            panel.setError(unlockErrText(err));
            panel.setStatus('Unlock Failed');
            panel.showRetry('Try again', () => {
              void startCheck();
            });
          });
      });
    };
    await startCheck();
  } catch {
    if (!stillCurrent(gen, slug)) return;
    abort();
  } finally {
    busy = false;
    if (queued) {
      queued = false;
      queueMicrotask(() => {
        void run();
      });
    }
  }
};

const schedule = (): void => {
  const path = location.pathname;
  if (path !== lastPath) {
    lastPath = path;
    const slug = slugFromPath();
    if (activeSlug && slug !== activeSlug) teardown();
  }
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
      queueMicrotask(schedule);
      return ret;
    };
  history.pushState = wrap(history.pushState.bind(history));
  history.replaceState = wrap(history.replaceState.bind(history));
  window.addEventListener('popstate', schedule);
};

export function initDlsurfUnlock(): void {
  if (window !== window.top) return;
  void isRemoteSite('dlsurf').then((ok) => {
    if (!ok) return;
    hookHistory();
    whenDomParsed(schedule);
    new MutationObserver((records) => {
      if (mutationIsOurs(records)) return;
      schedule();
    }).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}
