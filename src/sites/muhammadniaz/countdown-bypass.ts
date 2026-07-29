import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';

const HOSTS = ['muhammadniaz.link'] as const;
const NOTICE_ID = 'skipwait-muhammadniaz-countdown';

function run(): void {
  const btn = document.getElementById('downloadbtn');
  if (!btn) return;
  if (!document.getElementById('countdown')) return;

  document.querySelectorAll('#countdown').forEach((el) => el.remove());

  btn.querySelectorAll('[data-status="disabled"]').forEach((el) => el.remove());

  if (document.getElementById(NOTICE_ID)) return;
  btn.insertAdjacentHTML(
    'beforebegin',
    `<div id="${NOTICE_ID}" class="info-card" role="status"><div class="info-label">Skip Wait</div><ul><li><span class="infoname">Status</span><span>Timer skipped. Click Create download link.</span></li></ul></div>`,
  );
}

export function initMuhammadniazCountdownBypass(): void {
  if (!isAllowedHost(HOSTS)) return;
  whenDomParsed(run);
}

