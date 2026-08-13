import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: 'Skip Wait is handling the waiting pages for you.',
} as const;

export const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

export const spoofVisibility = (): void => {
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
};

export const countdown = async (
  overlay: FullPageOverlay,
  ms: number,
  status: string,
): Promise<void> => {
  overlay.setStatus(status);
  overlay.startCountdown(Date.now() + ms);
  await sleep(ms);
  overlay.hideCountdown();
};

export const createOverlay = (id: string, bootStyleId: string) => {
  let ui: FullPageOverlay | null = null;
  return (status: string): FullPageOverlay => {
    const active = overlayActiveClass(id);
    document.documentElement.classList.add(active);
    if (!document.getElementById(bootStyleId)) {
      const style = document.createElement('style');
      style.id = bootStyleId;
      style.textContent = buildFullPageOverlayCss(id, active);
      (document.head ?? document.documentElement).appendChild(style);
    }
    if (ui) {
      ui.setStatus(status);
      return ui;
    }
    ui = createFullPageOverlay({
      id,
      brand: 'Skip Wait',
      note: NOTE,
      status,
      countdownLabel: 'Your link opens in',
    });
    return ui;
  };
};
