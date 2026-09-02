import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';

const IDLE = 'Free Download · Skip Wait — No Timer, No Mediator Pages';

function download2(id: string): void {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = location.href;
  for (const [name, value] of Object.entries({
    op: 'download2',
    id,
    rand: '',
    referer: location.href,
    method_free: 'Free Download >>',
    method_premium: '',
    adblock_detected: '0',
  })) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.append(input);
  }
  document.body.append(form);
  recordBypassSuccess();
  form.submit();
}

export function initFilespayoutsBypass(): void {
  void canBypass('filespayouts').then((ok) => {
    if (!ok) return;
    whenDomParsed(() => {
      const btn = document.querySelector<HTMLInputElement>('#method_free');
      const form = btn?.form;
      const id = form?.querySelector<HTMLInputElement>('input[name="id"]')?.value.trim();
      if (!btn || !form || !id || !form.querySelector('input[name="op"][value="download1"]')) return;

      btn.classList.add('btn-success');
      btn.value = IDLE;

      btn.addEventListener(
        'click',
        (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          btn.value = 'Starting…';
          download2(id);
          btn.value = IDLE;
        },
        true,
      );
    });
  });
}
