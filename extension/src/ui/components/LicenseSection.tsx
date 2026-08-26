import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { activateLicense, refreshLicense } from '../../license/gate';
import { clearLicenseSession, getLicenseSession, getStoredLicenseKey, licenseIsLive } from '../../license/storage';
import type { LicensePlan } from '../../license/types';
import { CONTACT, PANEL_CARD, PRICE_CRYPTO, PRICE_LABEL } from '../constants';
import { PricingModal } from './PricingModal';
import { IconRefresh } from './icons';

type Status = 'idle' | 'busy' | 'active' | 'missing' | 'err';

const formatWhen = (ms: number): string =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(ms));

const planLabel = (plan: LicensePlan): string => (plan === 'trial30m' ? '30-minute trial' : PRICE_LABEL);

const errorMessage = (code: string | undefined): string => {
  switch (code) {
    case 'INVALID_KEY':
      return 'Enter a valid key (SW-XXXX-XXXX-XXXX-XXXX).';
    case 'LICENSE_NOT_FOUND':
      return 'License revoked, deleted, or not found.';
    case 'LICENSE_EXPIRED':
      return 'License expired.';
    case 'DEVICE_MISMATCH':
      return 'Key is not bound to this device. Unbind it on the other device, then activate here.';
    case 'NETWORK':
      return 'Could not reach the license server. Check your connection.';
    case 'NO_KEY':
      return 'No license on this device.';
    default:
      return code ?? 'License check failed.';
  }
};

export function LicenseSection(): React.ReactElement {
  const [status, setStatus] = useState<Status>('idle');
  const [keyInput, setKeyInput] = useState('');
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [exp, setExp] = useState<number | null>(null);
  const [plan, setPlan] = useState<LicensePlan | null>(null);
  const [verifiedAt, setVerifiedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pricingOpen, setPricingOpen] = useState(false);
  const busy = status === 'busy';

  const loadStatus = useCallback(async (): Promise<void> => {
    setStatus('busy');
    setError(null);
    const stored = await getStoredLicenseKey();
    if (!stored) {
      setActiveKey(null);
      setExp(null);
      setPlan(null);
      setVerifiedAt(null);
      setStatus('missing');
      return;
    }
    setActiveKey(stored);
    const state = await refreshLicense();
    if (!state.ok) {
      const session = await getLicenseSession();
      if (state.error === 'NETWORK' && session && licenseIsLive(session.exp)) {
        setExp(session.exp);
        setPlan(session.plan);
        setStatus('active');
        return;
      }
      setActiveKey(await getStoredLicenseKey());
      setExp(null);
      setPlan(null);
      setVerifiedAt(null);
      setError(errorMessage(state.error));
      setStatus('err');
      return;
    }
    setExp(state.exp ?? null);
    setPlan(state.plan ?? null);
    setVerifiedAt(Date.now());
    setStatus('active');
  }, []);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus]);

  const onActivate = (): void => {
    setStatus('busy');
    setError(null);
    void activateLicense(keyInput)
      .then((state) => {
        if (!state.ok) {
          setError(errorMessage(state.error));
          setStatus('err');
          return;
        }
        setActiveKey(keyInput.trim().toUpperCase());
        setExp(state.exp ?? null);
        setPlan(state.plan ?? null);
        setVerifiedAt(Date.now());
        setStatus('active');
      })
      .catch(() => {
        setError(errorMessage('NETWORK'));
        setStatus('err');
      });
  };

  const onClear = (): void => {
    void clearLicenseSession().then(() => {
      setActiveKey(null);
      setExp(null);
      setPlan(null);
      setVerifiedAt(null);
      setKeyInput('');
      setError(null);
      setStatus('missing');
    });
  };

  const statusLine: ReactNode = (() => {
    if (busy) return 'Checking with server…';
    if (status === 'active' && verifiedAt !== null) {
      return `Verified ${formatWhen(verifiedAt)}`;
    }
    if (status === 'err' && error) {
      return <span className="font-semibold text-warning-700">{error}</span>;
    }
    if (status === 'missing') return `Bypass requires an active ${PRICE_LABEL} license.`;
    return null;
  })();

  return (
    <section className={PANEL_CARD}>
      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />

      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">License</p>
        {activeKey ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => void loadStatus()}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary-600 px-3.5 text-[0.75rem] font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
          >
            <IconRefresh className={`size-4 ${busy ? 'animate-spin' : ''}`} />
            {busy ? 'Checking…' : 'Refresh'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setPricingOpen(true)}
            className="inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full bg-primary-600 px-3.5 text-[0.75rem] font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Buy license
          </button>
        )}
      </div>
      <h2 className="mt-0.5 text-[0.875rem] font-bold tracking-tight text-ink">
        Activate Skip Wait · {PRICE_LABEL}
      </h2>
      {statusLine !== null ? (
        <p className="mt-1 text-[0.6875rem] font-medium text-ink-soft">{statusLine}</p>
      ) : null}
      {status === 'active' && activeKey ? (
        <div className="mt-2 space-y-2">
          <p className="text-[0.8125rem] font-medium leading-snug text-ink-soft">
            <span className="font-semibold text-success-700">Active</span>
            {plan ? ` · ${planLabel(plan)}` : ''}
            {exp ? ` · expires ${formatWhen(exp)}` : ''}
          </p>
          <p className="truncate font-mono text-[0.75rem] text-ink-soft">{activeKey}</p>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-9 items-center rounded-full bg-surface-canvas px-3.5 text-[0.75rem] font-semibold text-ink ring-1 ring-neutral-300 transition-colors hover:bg-neutral-50"
          >
            Remove license
          </button>
        </div>
      ) : (
        <div className="mt-2 space-y-2">
          <input
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value.toUpperCase())}
            placeholder="SW-XXXX-XXXX-XXXX-XXXX"
            className="box-border w-full rounded-card border border-neutral-300 bg-surface-canvas px-3 py-2 font-mono text-[0.8125rem] text-ink outline-none ring-primary-500 focus:border-primary-500 focus:ring-2"
          />
          <button
            type="button"
            disabled={busy || keyInput.trim().length < 8}
            onClick={onActivate}
            className="inline-flex h-9 w-full items-center justify-center rounded-full bg-primary-600 px-3.5 text-[0.8125rem] font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
          >
            {busy ? 'Checking with server…' : 'Activate license'}
          </button>
          <p className="text-[0.8125rem] font-medium leading-snug text-ink-soft">
            {PRICE_LABEL} · {PRICE_CRYPTO} via direct crypto.{' '}
            <button
              type="button"
              onClick={() => setPricingOpen(true)}
              className="font-semibold text-primary-700 underline decoration-primary-200 underline-offset-2 hover:decoration-primary-500"
            >
              See pricing & buy
            </button>
            . One device per key.
          </p>
          <p className="text-[0.8125rem] font-medium leading-snug text-ink-soft">
            Trial available — ask for a trial key by{' '}
            <a
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Skip Wait trial key')}`}
              className="font-semibold text-primary-700 underline decoration-primary-200 underline-offset-2 hover:decoration-primary-500"
            >
              email
            </a>{' '}
            or{' '}
            <a
              href={CONTACT.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-700 underline decoration-primary-200 underline-offset-2 hover:decoration-primary-500"
            >
              Telegram
            </a>
            .
          </p>
        </div>
      )}
    </section>
  );
}