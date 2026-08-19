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

  const statusLine: ReactNode = (() => {
    if (busy) return 'Looking for new website names…';
    if (status === 'err') return <span className="font-semibold text-warning-700">Could not refresh — try again</span>;
    if (updatedAt !== null) return `Last refreshed ${formatUpdatedAt(updatedAt)}`;
    return 'Tap Refresh when we add a new website';
  })();

  return (
    <section className="px-5 py-4">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">New sites</p>
          <h2 className="mt-0.5 text-[0.9375rem] font-bold tracking-tight text-ink">Get new websites without updating</h2>
        </div>
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            setStatus('loading');
            void pullHosts()
              .then((ok) => setStatus(ok ? 'idle' : 'err'))
              .catch(() => setStatus('err'));
          }}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-success-600 pl-4 pr-4 text-[0.8125rem] font-semibold text-white transition-colors hover:bg-success-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success-700 disabled:opacity-60"
        >
          <IconRefresh className={`size-4 ${busy ? 'animate-spin' : ''}`} />
          {busy ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
      <p className="mt-2 text-[0.8125rem] font-medium leading-snug text-ink-soft">
        Skip Wait already has the skip tricks built in. When we add another link site or file host, Refresh downloads
        that website name for you.
      </p>
      <p className="mt-1.5 text-[0.8125rem] font-medium leading-snug text-ink-soft">
        Refresh does not update bypass code — only new names. Chrome Web Store updates take time, so use Refresh to get
        new websites right away.
      </p>
      <p className="mt-1.5 text-[0.75rem] font-medium text-ink-soft">{statusLine}</p>
    </section>
  );
}
