import { useEffect, useState, type ReactNode } from 'react';
import { HOSTS_UPDATED_AT_KEY, parseHostsUpdatedAt, pullHosts } from '../../hosts/check';
import { IconRefresh } from './icons';

type Status = 'idle' | 'loading' | 'err';

const formatUpdatedAt = (ms: number): string =>
  new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(
    new Date(ms),
  );

export function HostsUpdateSection(): React.ReactElement {
  const [status, setStatus] = useState<Status>('idle');
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const busy = status === 'loading';

  useEffect(() => {
    void chrome.storage.local.get(HOSTS_UPDATED_AT_KEY).then((stored) => {
      setUpdatedAt(parseHostsUpdatedAt(stored[HOSTS_UPDATED_AT_KEY]));
    });
    const onChanged = (changes: { [key: string]: chrome.storage.StorageChange }, area: string) => {
      if (area !== 'local' || !(HOSTS_UPDATED_AT_KEY in changes)) return;
      setUpdatedAt(parseHostsUpdatedAt(changes[HOSTS_UPDATED_AT_KEY]?.newValue));
    };
    chrome.storage.onChanged.addListener(onChanged);
    return () => chrome.storage.onChanged.removeListener(onChanged);
  }, []);

  const statusLine: ReactNode = (() => {
    if (busy) return 'Downloading new domains…';
    if (status === 'err') return <span className="font-semibold text-warning-700">Could not refresh. Try again.</span>;
    if (updatedAt !== null) return `Last refreshed ${formatUpdatedAt(updatedAt)}`;
    return null;
  })();

  return (
    <section className="px-4 py-2.5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">New domains</p>
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            setStatus('loading');
            void pullHosts()
              .then((ok) => setStatus(ok ? 'idle' : 'err'))
              .catch(() => setStatus('err'));
          }}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-success-600 px-3.5 text-[0.75rem] font-semibold text-white transition-colors hover:bg-success-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success-700 disabled:opacity-60"
        >
          <IconRefresh className={`size-4 ${busy ? 'animate-spin' : ''}`} />
          {busy ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
      <div className="mt-1 flex items-baseline justify-between gap-3">
        <h2 className="min-w-0 text-[0.875rem] font-bold tracking-tight text-ink">Same bypass, new domain</h2>
        {statusLine !== null ? (
          <p className="shrink-0 text-[0.6875rem] font-medium text-ink-soft">{statusLine}</p>
        ) : null}
      </div>
      <p className="mt-1 text-[0.8125rem] font-medium leading-snug text-ink-soft">
        If a site changed domain but the shortener or timer is the same, tell us — or we add it when we see it. New
        domains download when Chrome starts, or tap Refresh. No Chrome Web Store review for domain-only updates.
      </p>
    </section>
  );
}
