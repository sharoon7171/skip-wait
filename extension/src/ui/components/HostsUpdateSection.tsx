import { useState } from 'react';
import { pullHosts } from '../../hosts/check';

type Status = 'idle' | 'loading' | 'ok' | 'err';

export function HostsUpdateSection(): React.ReactElement {
  const [status, setStatus] = useState<Status>('idle');
  const busy = status === 'loading';
  return (
    <section aria-labelledby="hosts-heading" className="px-4 py-2.5 text-left">
      <h2
        id="hosts-heading"
        className="font-poppins text-sm font-extrabold tracking-tight text-primary-950"
      >
        Host list
      </h2>
      <p className="mt-1 font-poppins text-xs font-medium leading-snug text-neutral-800">
        Pages use the list saved on this device. Fetch the latest file when domains change.
      </p>
      <button
        type="button"
        disabled={busy}
        onClick={() => {
          setStatus('loading');
          void pullHosts()
            .then((ok) => setStatus(ok ? 'ok' : 'err'))
            .catch(() => setStatus('err'));
        }}
        className="mt-2 inline-flex items-center justify-center rounded-radius-button bg-primary-600 px-3 py-1.5 font-poppins text-xs font-bold text-white shadow-sm hover:bg-primary-700 disabled:opacity-60"
      >
        {busy ? 'Updating…' : 'Update hosts'}
      </button>
      {status === 'ok' ? (
        <p className="mt-1.5 font-poppins text-xs font-medium text-emerald-700">Local list updated.</p>
      ) : null}
      {status === 'err' ? (
        <p className="mt-1.5 font-poppins text-xs font-medium text-red-700">Could not fetch hosts.</p>
      ) : null}
    </section>
  );
}
