import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { overlayActiveClass } from '../../injected-ui/overlay-styles';

const ID = 'skip-wait-earnlinks';
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "Skip Wait is working. You don't need to tap anything.",
} as const;

export const createOverlay = () => {
  let ui: FullPageOverlay | null = null;

  const paint = (status: string): FullPageOverlay => {
    document.documentElement.classList.add(overlayActiveClass(ID));
    if (ui) {
      ui.setNote(NOTE);
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

  return {
    setStatus: (status: string) => paint(status),
    setError: (status: string) => {
      const overlay = paint(status);
      overlay.setError(status);
      return overlay;
    },
  };
};
