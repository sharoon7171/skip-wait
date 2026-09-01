import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { activateLicense, deactivateLicense } from '../../license/gate';
import { getLicenseSession, sessionIsLive } from '../../license/storage';
import type { LicensePlan, LicenseSession } from '../../license/types';
import { EAS_STORE_URL, LICENSE_COPY, PANEL_CARD } from '../constants';

type Status = 'busy' | 'active' | 'missing' | 'err';

const copy = LICENSE_COPY;

const formatWhen = (ms: number): string =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(ms));

const planLabel = (plan: LicensePlan): string => (plan === 'trial' ? copy.planTrial : copy.planMonthly);

const easStoreButton = (label: string): React.ReactElement => (
  <a
    href={EAS_STORE_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full bg-primary-600 px-3.5 text-[0.75rem] font-semibold text-white no-underline transition-colors hover:bg-primary-700"
  >
    {label}
  </a>
);

const planOption = (title: string, detail: string): React.ReactElement => (
  <div className="flex flex-col rounded-card bg-surface-canvas px-3 py-2.5 ring-1 ring-neutral-300">
    <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-ink-soft">{title}</span>
    <span className="mt-0.5 text-[0.8125rem] font-bold tracking-tight text-ink">{detail}</span>
  </div>
);

const statusBadge = (label: string, tone: 'success' | 'warning'): React.ReactElement => (
  <span
    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ring-1 ${
      tone === 'success'
        ? 'bg-success-600/10 text-success-700 ring-success-600/25'
        : 'bg-warning-500/10 text-warning-700 ring-warning-500/25'
    }`}
  >
    <span
      className={`size-1.5 shrink-0 rounded-full ${tone === 'success' ? 'bg-success-600' : 'bg-warning-500'}`}
      aria-hidden
    />
    {label}
  </span>
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
      return 'Offline lease expired. Activate again when online.';
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
  const [status, setStatus] = useState<Status>('missing');
  const [keyInput, setKeyInput] = useState('');
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [activationId, setActivationId] = useState<string | null>(null);
  const [entExp, setEntExp] = useState<number | null>(null);
  const [plan, setPlan] = useState<LicensePlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const busy = status === 'busy';

  const applySession = useCallback((session: LicenseSession | null): void => {
    if (!session) {
      setActiveKey(null);
      setActivationId(null);
      setEntExp(null);
      setPlan(null);
      setStatus('missing');
      return;
    }
    setActiveKey(session.key);
    setActivationId(session.activationId);
    setEntExp(session.entExp);
    setPlan(session.plan);
    setStatus(sessionIsLive(session) ? 'active' : 'err');
  }, []);

  const loadFromStorage = useCallback(async (): Promise<void> => {
    applySession(await getLicenseSession());
    setError(null);
  }, [applySession]);

  useEffect(() => {
    void loadFromStorage().then(() => setHydrated(true));
  }, [loadFromStorage]);

  const onActivate = (): void => {
    setStatus('busy');
    setError(null);
    void activateLicense(keyInput)
      .then(async (state) => {
        if (!state.ok) {
          setError(errorMessage(state.error));
          setStatus('err');
          return;
        }
        applySession(await getLicenseSession());
      })
      .catch(() => {
        setError(errorMessage('NETWORK'));
        setStatus('err');
      });
  };

  const onClear = (): void => {
    void deactivateLicense().then(() => {
      setActiveKey(null);
      setActivationId(null);
      setEntExp(null);
      setPlan(null);
      setKeyInput('');
      setError(null);
      setStatus('missing');
    });
  };

  const licensed = status === 'active' || (status === 'err' && activeKey);
  const expired = status === 'err' && activeKey;

  const statusLine: ReactNode = (() => {
    if (busy) return copy.activating;
    if (error) {
      return <span className="text-[0.6875rem] font-semibold text-warning-700">{error}</span>;
    }
    if (status === 'missing') return copy.missing;
    if (expired) return statusBadge(copy.expiredStatus, 'warning');
    if (status === 'active') return statusBadge(copy.statusActive, 'success');
    return null;
  })();

  const heading = licensed ? copy.activeHeading : copy.buyHeading;

  return (
    <section className={PANEL_CARD}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">License</p>
        {!activeKey ? easStoreButton(copy.buyButton) : expired ? easStoreButton(copy.renewButton) : null}
      </div>

      <div className="mt-1 flex items-center justify-between gap-3">
        <h2 className="min-w-0 text-[0.875rem] font-bold tracking-tight text-ink">{heading}</h2>
        {statusLine !== null ? (
          <div className="shrink-0 text-[0.6875rem] font-medium text-ink-soft">{statusLine}</div>
        ) : null}
      </div>

      {hydrated && licensed && activeKey ? (
        <div className="mt-2 space-y-2">
          <p className="text-[0.8125rem] font-medium leading-snug text-ink-soft">
            {expired ? copy.expiredLead : copy.activeLead}
          </p>
          <p className="text-[0.8125rem] font-medium leading-snug text-ink-soft">
            {plan ? `${planLabel(plan)}` : ''}
            {plan ? ' · ' : ''}
            {entExp ? copy.validUntil(formatWhen(entExp)) : copy.noEndDate}
          </p>
          <div>
            <p className="text-[0.6875rem] font-medium text-ink-soft">{copy.keyLabel}</p>
            <p className="mt-0.5 break-all font-mono text-[0.75rem] leading-snug text-ink-soft">{activeKey}</p>
          </div>
          {activationId ? (
            <div>
              <p className="text-[0.6875rem] font-medium text-ink-soft">{copy.idLabel}</p>
              <p className="mt-0.5 break-all font-mono text-[0.75rem] leading-snug text-ink-soft">{activationId}</p>
            </div>
          ) : null}
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-9 items-center rounded-full bg-surface-canvas px-3.5 text-[0.75rem] font-semibold text-ink ring-1 ring-neutral-300 transition-colors hover:bg-neutral-50"
          >
            {copy.remove}
          </button>
        </div>
      ) : hydrated ? (
        <div className="mt-2 space-y-2">
          <p className="text-[0.8125rem] font-medium leading-snug text-ink-soft">{copy.buyWhy}</p>
          <div className="grid grid-cols-2 gap-1.5">
            {planOption(copy.buyTrialTitle, copy.buyTrialDetail)}
            {planOption(copy.buyMonthlyTitle, copy.buyMonthlyDetail)}
          </div>
          <p className="text-[0.8125rem] font-medium leading-snug text-ink-soft">{copy.buyAfterPurchase}</p>
          <input
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value.toUpperCase())}
            placeholder="EAS-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
            className="box-border w-full rounded-card border border-neutral-300 bg-surface-canvas px-3 py-2 font-mono text-[0.8125rem] text-ink outline-none ring-primary-500 focus:border-primary-500 focus:ring-2"
          />
          <button
            type="button"
            disabled={busy || keyInput.trim().length < 8}
            onClick={onActivate}
            className="inline-flex h-9 w-full items-center justify-center rounded-full bg-primary-600 px-3.5 text-[0.8125rem] font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
          >
            {busy ? copy.activating : copy.activate}
          </button>
          <p className="text-[0.8125rem] font-medium leading-snug text-ink-soft">{copy.buyDevice}</p>
        </div>
      ) : null}
    </section>
  );
}
