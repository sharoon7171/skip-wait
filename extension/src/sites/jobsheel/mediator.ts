import { whenDomParsed } from '../../utils/domain-check';
import { clearJobsheelChain, readJobsheelChain } from './chain';
import { isJobsheelHost } from './hosts';
import { createJobsheelOverlay, JOBSHEEL_NOTE } from './overlay';

const mount = createJobsheelOverlay(
  'skip-wait-jobsheel-mediator',
  'skip-wait-jobsheel-mediator-boot',
);

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

function destination(): string | null {
  const href = document.querySelector<HTMLAnchorElement>('a#btn6[href]')?.href?.trim() ?? '';
  if (!/^https?:\/\//i.test(href)) return null;
  try {
    const host = new URL(href).hostname.toLowerCase();
    return host === 'babylinks.in' || host.endsWith('.babylinks.in') ? href : null;
  } catch {
    return null;
  }
}

export function initJobsheelMediator(): void {
  if (window !== window.top) return;
  if (!isJobsheelHost(location.hostname)) return;
  if (/\/baby\.php$/i.test(location.pathname)) return;

  void (async (): Promise<void> => {
    const chain = await readJobsheelChain();
    if (!chain) return;

    const advance = async (): Promise<boolean> => {
      const dest = destination();
      if (dest) {
        mount('Opening Babylinks…', JOBSHEEL_NOTE);
        await clearJobsheelChain();
        location.replace(dest);
        return true;
      }
      const form = safelinkForm(chain.alias);
      if (!form) return false;
      mount('Skipping JobSheel gate…', JOBSHEEL_NOTE);
      HTMLFormElement.prototype.submit.call(form);
      return true;
    };

    if (await advance()) return;
    whenDomParsed(() => {
      void (async (): Promise<void> => {
        if (await advance()) return;
        await clearJobsheelChain();
      })();
    });
  })();
}
