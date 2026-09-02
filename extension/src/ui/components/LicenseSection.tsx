import { useCallback, useEffect, useState } from 'react';
import { FREE_DAILY_KEY, getFreeUsage, type FreeUsage } from '../../free-bypass';
import { activateLicense, deactivateLicense } from '../../license/gate';
import {
  entitlementIsLive,
  getLicenseSession,
  leaseIsLive,
  storageKeys,
} from '../../license/storage';
import type { LicenseSession } from '../../license/types';
import {
  activateCard,
  activeHero,
  activeHeroContent,
  activeHeroGlow,
  activeHeroIcon,
  activeHeroMeta,
  activeHeroText,
  activeHeroTitle,
  btnActivate,
  btnGhost,
  errorBanner,
  fieldInput,
  freeBanner,
  freeBannerMeta,
  freeBannerTitle,
  keyLabel,
  keyPanel,
  keyRow,
  keyValue,
  licenseHero,
  licenseHeroBody,
  licenseHeroGlow,
  licenseHeroTitle,
  planGrid,
  planTile,
  planTileHint,
  planTileLabel,
  planTilePrice,
  stackSm,
  stepBadge,
  stepLabel,
  stepRow,
} from '../../../ui-classes/popup';
import { EAS_STORE_URL, LICENSE_COPY } from '../constants';
import { IconCheck, IconLicenseKey } from './icons';

const copy = LICENSE_COPY;

const formatWhen = (ms: number): string =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(ms));

const expiryLabel = (entExp: number | null): string =>
  entExp ? copy.expires(formatWhen(entExp)) : copy.lifetime;

const sessionIsLive = (session: LicenseSession): boolean =>
  entitlementIsLive(session.entExp) && leaseIsLive(session.leaseExp);

const planLink = (label: string, price: string, hint: string): React.ReactElement => (
  <a href={EAS_STORE_URL} target="_blank" rel="noopener noreferrer" className={planTile}>
    <span className={planTileLabel}>{label}</span>
    <span className={planTilePrice}>{price}</span>
    <span className={planTileHint}>{hint}</span>
  </a>
);

const errorMessage = (code: string | undefined): string => {
  switch (code) {
    case 'INVALID_KEY':
      return 'Enter a valid EAS license key.';
    case 'LICENSE_NOT_VALID':
      return 'License revoked, expired, or not found.';
    case 'ACTIVATION_NOT_VALID':
      return 'Activation is no longer valid. Activate again.';
    case 'DEVICE_LIMIT_REACHED':
      return 'This key is already used on another device. Unbind it in EAS Store, then activate here.';
    case 'GRANT_INCOMPLETE':
      return 'License server response was incomplete. Try again.';
    case 'LEASE_INVALID':
      return 'License grant could not be verified.';
    case 'LEASE_EXPIRED':
      return 'Offline lease expired. Check your connection.';
    case 'LICENSE_EXPIRED':
      return 'License expired.';
    case 'NETWORK':
      return 'Could not reach EAS Store. Check your connection.';
    case 'NO_KEY':
      return 'No license on this device.';
    default:
      return code ?? 'License check failed.';
  }
};

export function LicenseSection(): React.ReactElement {
  const [hydrated, setHydrated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [paidLive, setPaidLive] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [activationId, setActivationId] = useState<string | null>(null);
  const [entExp, setEntExp] = useState<number | null>(null);
  const [free, setFree] = useState<FreeUsage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const applySession = useCallback((session: LicenseSession | null): void => {
    if (!session || !sessionIsLive(session)) {
      setPaidLive(false);
      setActiveKey(null);
      setActivationId(null);
      setEntExp(null);
      return;
    }
    setPaidLive(true);
    setActiveKey(session.key);
    setActivationId(session.activationId);
    setEntExp(session.entExp);
  }, []);

  const loadFromStorage = useCallback(async (): Promise<void> => {
    const [session, usage] = await Promise.all([getLicenseSession(), getFreeUsage()]);
    applySession(session);
    setFree(usage);
  }, [applySession]);

  useEffect(() => {
    void loadFromStorage().then(() => setHydrated(true));
    const onChanged = (changes: { [key: string]: chrome.storage.StorageChange }, area: string): void => {
      if (area !== 'local') return;
      if (
        storageKeys.licenseKey in changes ||
        storageKeys.entExp in changes ||
        storageKeys.leaseExp in changes ||
        FREE_DAILY_KEY in changes
      ) {
        void loadFromStorage();
      }
    };
    chrome.storage.onChanged.addListener(onChanged);
    return () => chrome.storage.onChanged.removeListener(onChanged);
  }, [loadFromStorage]);

  const onActivate = (): void => {
    setBusy(true);
    setError(null);
    void activateLicense(keyInput)
      .then(async (state) => {
        if (!state.ok) {
          setError(errorMessage(state.error));
          await loadFromStorage();
          return;
        }
        setError(null);
        await loadFromStorage();
      })
      .catch(() => setError(errorMessage('NETWORK')))
      .finally(() => setBusy(false));
  };

  const onClear = (): void => {
    void deactivateLicense().then(() => {
      setPaidLive(false);
      setActiveKey(null);
      setActivationId(null);
      setEntExp(null);
      setKeyInput('');
      setError(null);
      void getFreeUsage().then(setFree);
    });
  };

  if (!hydrated) return <div className="h-40 animate-pulse rounded-card bg-neutral-200/50" aria-hidden />;

  if (paidLive && activeKey) {
    return (
      <section className={stackSm} aria-labelledby="license-heading">
        <h2 id="license-heading" className="sr-only">
          {copy.activeHeading}
        </h2>
        <div className={activeHero}>
          <div className={activeHeroGlow} aria-hidden />
          <div className={activeHeroContent}>
            <span className={activeHeroIcon}>
              <IconCheck className="size-5" />
            </span>
            <div className={activeHeroText}>
              <p className={activeHeroTitle}>{copy.activeHeading}</p>
              <p className={activeHeroMeta}>{expiryLabel(entExp)}</p>
            </div>
          </div>
        </div>
        {error ? <p className={errorBanner}>{error}</p> : null}
        <div className={keyPanel}>
          <dl className={keyRow}>
            <dt className={keyLabel}>{copy.keyLabel}</dt>
            <dd className={keyValue}>{activeKey}</dd>
            {activationId ? (
              <>
                <dt className={keyLabel}>{copy.idLabel}</dt>
                <dd className={keyValue}>{activationId}</dd>
              </>
            ) : null}
          </dl>
          <button type="button" onClick={onClear} className={`${btnGhost} mt-3 w-full`}>
            {copy.remove}
          </button>
        </div>
      </section>
    );
  }

  const freeUsed = free?.used ?? 0;
  const freeLimit = free?.limit ?? 0;
  const freeDone = freeUsed >= freeLimit && freeLimit > 0;

  return (
    <section className={stackSm} aria-labelledby="license-heading">
      <h2 id="license-heading" className="sr-only">
        {copy.buyHeading}
      </h2>
      <div className={freeBanner} role="status">
        <p className={freeBannerTitle}>{copy.usingFree}</p>
        <p className={freeBannerMeta}>
          {free ? copy.freeToday(freeUsed, freeLimit) : '…'}
          {freeDone ? ` — ${copy.freeExhausted}` : null}
        </p>
      </div>
      <div className={licenseHero}>
        <div className={licenseHeroGlow} aria-hidden />
        <p className={licenseHeroTitle}>{copy.buyHeading}</p>
        <p className={`${licenseHeroBody} mt-1`}>{copy.buyWhy}</p>
        <div className={`${planGrid} mt-3`}>
          {planLink(copy.storeTrial, copy.storeTrialPrice, copy.storeTrialHint)}
          {planLink(copy.storeMonthly, copy.storeMonthlyPrice, copy.storeMonthlyHint)}
        </div>
      </div>
      <div className={activateCard}>
        <div className={stepRow}>
          <span className={stepBadge}>2</span>
          <span className={stepLabel}>{copy.buyAfterPurchase}</span>
        </div>
        {error ? <p className={`${errorBanner} mb-2`}>{error}</p> : null}
        <input
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value.toUpperCase())}
          placeholder="EAS-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
          className={fieldInput}
        />
        <button
          type="button"
          disabled={busy || keyInput.trim().length < 8}
          onClick={onActivate}
          className={`${btnActivate} mt-2`}
        >
          <IconLicenseKey className="size-4" />
          {busy ? copy.activating : copy.activate}
        </button>
        <p className="mt-2 text-center text-[0.6875rem] font-semibold text-ink-soft">{copy.buyDevice}</p>
      </div>
    </section>
  );
}
