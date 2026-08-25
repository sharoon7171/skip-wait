import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';
import { createOverlay } from './overlay';

const mount = createOverlay(
  'skip-wait-unlocktoearn-mediator',
  'skip-wait-unlocktoearn-mediator-boot',
);
let done = false;

function gateForm(): HTMLFormElement | null {
  return (
    document.querySelector<HTMLFormElement>('#tp98') ??
    document.querySelector<HTMLFormElement>('#nextForm') ??
    document.querySelector<HTMLFormElement>('#unlockForm')
  );
}

function run(): void {
  if (done) return;
  const form = gateForm();
  if (!form) return;
  done = true;
  mount(form.id === 'unlockForm' ? 'Opening…' : 'Unlocking…');
  HTMLFormElement.prototype.submit.call(form);
}

export function initUnlocktoearnMediator(): void {
  if (window !== window.top) return;
  void canBypass('unlocktoearn-mediator').then((ok) => {
    if (!ok) return;
    mount('Unlocking…');
    whenDomParsed(run);
    run();
    if (done) return;
    const observer = new MutationObserver(() => {
      run();
      if (done) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
}
