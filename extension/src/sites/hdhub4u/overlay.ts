import {
  createFullPageOverlay,
  type FullPageOverlay,
  type FullPageOverlayNote,
} from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';

export function createOverlay(id: string, bootStyleId: string, note: FullPageOverlayNote) {
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
    ui = createFullPageOverlay({ id, brand: 'Skip Wait', note, status });
    return ui;
  };
}
