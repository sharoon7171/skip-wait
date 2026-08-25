import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';
import { jobsheelAliasFromCookie } from './hosts';
import { createOverlay } from './overlay';

const mount = createOverlay('skip-wait-jobsheel-mediator', 'skip-wait-jobsheel-mediator-boot');
let done = false;

function safelinkForm(alias: string): HTMLFormElement | null {
  for (const form of document.querySelectorAll<HTMLFormElement>(
    'form[name="tp1"], form[name="tp"]',
  )) {
    for (const el of form.elements) {
      if (!(el instanceof HTMLInputElement) || el.disabled) continue;
      if (/^newwpsafelink\d*$/i.test(el.name) && el.value === alias) return form;
    }
  }
  return null;
}

function babylinksHref(): string | null {
  const href = document.querySelector<HTMLAnchorElement>('a#btn6[href]')?.href?.trim() ?? '';
  if (!/^https?:\/\//i.test(href)) return null;
  try {
    const host = new URL(href).hostname.toLowerCase();
    return host === 'go.babylinks.in' || host.endsWith('.babylinks.in') ? href : null;
  } catch {
    return null;
  }
}

function run(): void {
  if (done) return;
  const dest = babylinksHref();
  if (dest) {
    done = true;
    mount('Opening Babylinks…');
    location.replace(dest);
    return;
  }
  const alias = jobsheelAliasFromCookie();
  if (!alias) return;
  const form = safelinkForm(alias);
  if (!form) return;
  done = true;
  mount('Skipping JobSheel gate…');
  HTMLFormElement.prototype.submit.call(form);
}

export function initJobsheelMediator(): void {
  if (window !== window.top) return;
  if (/\/baby\.php$/i.test(location.pathname)) return;
  void canBypass('jobsheel').then((ok) => {
    if (!ok) return;
    if (jobsheelAliasFromCookie() || babylinksHref()) mount('Unlocking…');
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
