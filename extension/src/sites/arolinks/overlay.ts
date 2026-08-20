import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { overlayActiveClass } from '../../injected-ui/overlay-styles';

const ID = 'skip-wait-arolinks-unlock';

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: 'Skip Wait is handling the waiting pages for you.',
} as const;

export const spoofVisibility = (): void => {
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
};

export const countdown = async (overlay: FullPageOverlay, ms: number, status: string): Promise<void> => {
  overlay.setStatus(status);
  overlay.startCountdown(Date.now() + ms);
  await new Promise<void>((r) => setTimeout(r, ms));
  overlay.hideCountdown();
};

export const createOverlay = () => {
  let ui: FullPageOverlay | null = null;
  return (status: string): FullPageOverlay => {
    document.documentElement.classList.add(overlayActiveClass(ID));
    if (ui) {
      ui.setStatus(status);
      return ui;
    }
    ui = createFullPageOverlay({
      id: ID,
      brand: 'Skip Wait',
      note: NOTE,
      status,
      countdownLabel: 'Your link opens in',
    });
    return ui;
  };
};
