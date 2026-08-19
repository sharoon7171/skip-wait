import { useEffect, useState, type ReactNode } from 'react';
import { HOSTS_UPDATED_AT_KEY, parseHostsUpdatedAt, pullHosts } from '../../hosts/check';
import { IconRefresh } from './icons';

type Status = 'idle' | 'loading' | 'err';

const formatUpdatedAt = (ms: number): string =>
  new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ms));

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

  const subtitle: ReactNode = (() => {
    if (busy) return 'Fetching the latest domains…';
    if (status === 'err') return <span className="font-semibold text-warning-700">Could not fetch — try again</span>;
    if (updatedAt !== null) return `Updated ${formatUpdatedAt(updatedAt)}`;
    return 'Refresh after we add domains';
  })();

  return (
    <section className="flex items-center gap-3 px-5 py-4">
      <span className="min-w-0 flex-1">
        <h2 className="truncate text-[0.9375rem] font-bold tracking-tight text-ink">Host list</h2>
        <p className="mt-1 truncate text-[0.8125rem] font-medium text-ink-soft">{subtitle}</p>
      </span>
      <button
        type="button"
        disabled={busy}
        onClick={() => {
          setStatus('loading');
          void pullHosts()
            .then((ok) => setStatus(ok ? 'idle' : 'err'))
            .catch(() => setStatus('err'));
        }}
        className="inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-success-600 pl-4 pr-5 text-[0.8125rem] font-semibold text-white transition-colors hover:bg-success-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success-700 disabled:opacity-60"
      >
        <IconRefresh className={`size-[1.125rem] ${busy ? 'animate-spin' : ''}`} />
        {busy ? 'Updating…' : 'Update'}
      </button>
    </section>
  );
}
