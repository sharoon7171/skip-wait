import { useCallback, useEffect, useState } from 'react';
import { FREE_DAILY_KEY, getFreeUsage } from '../../free-bypass';
import {
  entitlementIsLive,
  getLicenseSession,
  leaseIsLive,
  storageKeys,
} from '../../license/storage';
import { headerBar, headerBrand, headerIcon, headerTag, headerTitle } from '../../../ui-classes/popup';
import { LICENSE_COPY, assetUrl } from '../constants';
import { StatusPill } from './StatusPill';

type HeaderStatus = 'active' | 'free' | 'freeDone';

export function Header(): React.ReactElement {
  const [status, setStatus] = useState<HeaderStatus>('free');

  const refresh = useCallback(async (): Promise<void> => {
    const session = await getLicenseSession();
    if (session && entitlementIsLive(session.entExp) && leaseIsLive(session.leaseExp)) {
      setStatus('active');
      return;
    }
    const usage = await getFreeUsage();
    setStatus(usage.used >= usage.limit ? 'freeDone' : 'free');
  }, []);

  useEffect(() => {
    void refresh();
    const onChanged = (changes: { [key: string]: chrome.storage.StorageChange }, area: string): void => {
      if (area !== 'local') return;
      if (
        storageKeys.licenseKey in changes ||
        storageKeys.entExp in changes ||
        storageKeys.leaseExp in changes ||
        FREE_DAILY_KEY in changes
      ) {
        void refresh();
      }
    };
    chrome.storage.onChanged.addListener(onChanged);
    return () => chrome.storage.onChanged.removeListener(onChanged);
  }, [refresh]);

  const pill =
    status === 'active' ? (
      <StatusPill label={LICENSE_COPY.statusActive} tone="live" />
    ) : status === 'freeDone' ? (
      <StatusPill label={LICENSE_COPY.freeExhaustedStatus} tone="need" />
    ) : (
      <StatusPill label={LICENSE_COPY.freeStatus} tone="busy" />
    );

  return (
    <header className={headerBar}>
      <div className={headerBrand}>
        <img src={assetUrl('icon.png')} alt="" className={headerIcon} width={48} height={48} />
        <div className="min-w-0">
          <h1 className={headerTitle}>Skip Wait</h1>
          <p className={headerTag}>Skip timers & download waits instantly</p>
        </div>
      </div>
      {pill}
    </header>
  );
}
