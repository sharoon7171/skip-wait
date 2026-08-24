import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { overlayActiveClass } from '../../injected-ui/overlay-styles';
import type { ResolveProgress } from './resolve';

const ID = 'skip-wait-alpharede';

export const createOverlay = () => {
  let ui: FullPageOverlay | null = null;

  const paint = (status: string, lead?: string, detail?: string): FullPageOverlay => {
    document.documentElement.classList.add(overlayActiveClass(ID));
    const note = {
      lead: lead ?? 'Hang tight — unlocking your link.',
      detail: detail ?? "Skip Wait is working. You don't need to tap anything.",
    };
    if (ui) {
      ui.setNote(note);
      ui.setStatus(status);
      return ui;
    }
    ui = createFullPageOverlay({
      id: ID,
      brand: 'Skip Wait',
      note,
      status,
      countdownLabel: 'Your link opens in',
    });
    return ui;
  };

  return {
    progress: (p: ResolveProgress) => paint(p.status, p.lead, p.detail),
    setError: (status: string) => {
      const overlay = paint(status, 'Something went wrong.', 'Reload the short link and try again.');
      overlay.setError(status);
      return overlay;
    },
  };
};
