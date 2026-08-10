import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: 'Skip Wait is handling the waiting pages for you.',
} as const;

export function createUnlocktoearnOverlay(
  id: string,
  bootStyleId: string,
): (status: string) => FullPageOverlay {
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
    });
    return ui;
  };
}
