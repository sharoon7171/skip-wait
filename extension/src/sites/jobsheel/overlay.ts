import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';

export const JOBSHEEL_NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: 'Skip Wait is handling JobSheel for you.',
} as const;

export const JOBSHEEL_CAPTCHA_NOTE = {
  lead: 'Confirm you’re human.',
  detail: 'Complete the Turnstile check below. We’ll continue automatically when it’s done.',
} as const;

export function createJobsheelOverlay(
  id: string,
  bootStyleId: string,
): (status: string, note?: typeof JOBSHEEL_NOTE | typeof JOBSHEEL_CAPTCHA_NOTE) => FullPageOverlay {
  let ui: FullPageOverlay | null = null;
  return (status, note = JOBSHEEL_NOTE): FullPageOverlay => {
    const active = overlayActiveClass(id);
    document.documentElement.classList.add(active);
    if (!document.getElementById(bootStyleId)) {
      const style = document.createElement('style');
      style.id = bootStyleId;
      style.textContent = buildFullPageOverlayCss(id, active);
      (document.head ?? document.documentElement).appendChild(style);
    }
    if (ui) {
      ui.setNote(note);
      ui.setStatus(status);
      ui.setError(null);
      return ui;
    }
    ui = createFullPageOverlay({
      id,
      brand: 'Skip Wait',
      note,
      status,
    });
    return ui;
  };
}
