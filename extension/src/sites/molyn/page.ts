import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { overlayClasses } from '../../injected-ui/overlay-styles';
import { fetchKey } from './fetch-key';
import { OVERLAY_ID, PASTEBIN_FALLBACK, SITE, isMolynKeyFlow } from './hosts';

const NOTE = {
  working: {
    lead: 'Skipping Linkvertise…',
    detail: 'Skip Wait is fetching your MOLYN key.',
  },
  ready: {
    lead: 'Your key is ready',
    detail: 'Copy it below and paste into the MOLYN hub.',
  },
  failed: {
    lead: 'Key unavailable',
    detail: 'Opening the manual Pastebin fallback.',
  },
} as const;

const showKey = (ui: FullPageOverlay, key: string): void => {
  ui.setNote(NOTE.ready);
  ui.setStatus('');
  ui.setError(null);

  const mount = ui.turnstileMount;
  mount.replaceChildren();

  const code = document.createElement('code');
  code.textContent = key;
  code.style.cssText =
    'display:block;margin-top:4px;padding:14px 16px;border-radius:10px;background:rgba(0,0,0,.35);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.85em;line-height:1.45;color:#e2e8f0;word-break:break-all;user-select:text;-webkit-user-select:text';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = overlayClasses.action;
  btn.textContent = 'Copy key';
  btn.style.border = '0';
  btn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(key);
      btn.textContent = 'Copied!';
      window.setTimeout(() => {
        btn.textContent = 'Copy key';
      }, 2000);
    } catch {
      btn.textContent = 'Copy failed';
      window.setTimeout(() => {
        btn.textContent = 'Copy key';
      }, 2000);
    }
  };

  mount.append(code, btn);
  recordBypassSuccess();
};

const openPastebin = (ui: FullPageOverlay): void => {
  ui.setNote(NOTE.failed);
  ui.setStatus('Redirecting…');
  location.replace(PASTEBIN_FALLBACK);
};

const run = async (ui: FullPageOverlay): Promise<void> => {
  ui.setNote(NOTE.working);
  ui.setStatus('Fetching key');
  const key = await fetchKey().catch(() => null);
  if (key) {
    showKey(ui, key);
    return;
  }
  openPastebin(ui);
};

export const initMolynPage = (): void => {
  if (window !== window.top || !isMolynKeyFlow()) return;
  void canBypass(SITE).then((ok) => {
    if (!ok) return;
    const ui = createFullPageOverlay({
      id: OVERLAY_ID,
      brand: 'Skip Wait',
      note: NOTE.working,
      status: 'Fetching key',
    });
    void run(ui);
  });
};
