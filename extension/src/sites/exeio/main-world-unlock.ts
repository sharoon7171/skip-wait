import type { ExeioUnlockResult } from './hosts';

type ExeioWindow = Window & { vhit?: { report?: () => unknown } };

export async function runExeioGoUnlock(): Promise<ExeioUnlockResult> {
  const { vhit } = window as ExeioWindow;
  if (!vhit?.report) return { ok: false, err: 'vhit.report missing' };
  await Promise.resolve(vhit.report());
  const form = document.getElementById('go-link');
  if (!(form instanceof HTMLFormElement) || !form.querySelector('[name=ad_form_data]')) {
    return { ok: false, err: 'go-link missing' };
  }
  form.action = `${location.origin}/links/go`;
  form.method = 'post';
  HTMLFormElement.prototype.submit.call(form);
  return { ok: true };
}
