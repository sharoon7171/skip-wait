import type { CutyUnlockResult } from './hosts';

type CutyWindow = Window & { vhit?: { report?: () => Promise<void> } };

export async function runCutyGoUnlock(): Promise<CutyUnlockResult> {
  const form = document.getElementById('submit-form');
  if (
    !(form instanceof HTMLFormElement) ||
    !form.querySelector('[name="data"]') ||
    !form.querySelector('[name="_token"]')
  ) {
    return { ok: false, err: 'Unlock form missing. Reload and try again.' };
  }
  const { vhit } = window as CutyWindow;
  if (!vhit?.report) {
    return { ok: false, err: 'cuty view report blocked. Pause adblock for this site, then try again.' };
  }
  await vhit.report();
  HTMLFormElement.prototype.submit.call(form);
  return { ok: true };
}
