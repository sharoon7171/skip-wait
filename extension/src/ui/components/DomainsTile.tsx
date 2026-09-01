import { useEffect, useState } from 'react';
import { HOSTS_UPDATED_AT_KEY, parseHostsUpdatedAt, pullHosts } from '../../hosts/check';
import {
  actionTileBody,
  actionTileDomains,
  actionTileIconDomains,
  actionTileIconWrap,
  actionTileMeta,
  actionTileTitle,
} from '../../../ui-classes/popup';
import { IconRefresh } from './icons';

type Status = 'idle' | 'loading' | 'err';

const formatUpdatedAt = (ms: number): string =>
  new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(
    new Date(ms),
  );

export function DomainsTile(): React.ReactElement {
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

  const statusLine = busy
    ? 'Downloading…'
    : status === 'err'
      ? 'Tap to try again'
      : updatedAt
        ? `Last updated ${formatUpdatedAt(updatedAt)}`
        : 'Not synced yet — tap to refresh';

  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => {
        setStatus('loading');
        void pullHosts()
          .then((ok) => setStatus(ok ? 'idle' : 'err'))
          .catch(() => setStatus('err'));
      }}
      className={`${actionTileDomains} text-left disabled:opacity-70`}
    >
      <span className={`${actionTileIconWrap} ${actionTileIconDomains}`}>
        <IconRefresh className={`size-4 ${busy ? 'animate-spin' : ''}`} />
      </span>
      <p className={actionTileTitle}>{busy ? 'Refreshing…' : 'New domains'}</p>
      <p className={actionTileBody}>Download newer bypass domains — no Chrome Web Store update needed.</p>
      <p className={actionTileMeta}>{statusLine}</p>
    </button>
  );
}
