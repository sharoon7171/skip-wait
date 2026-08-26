export type LicensePlan = 'trial30m' | 'monthly30d';

export type LicenseSession = {
  key: string;
  plan: LicensePlan;
  exp: number;
};

export type LicenseState = {
  ok: boolean;
  plan?: LicensePlan;
  exp?: number;
  error?: string;
};

export type ActivateResponse = {
  ok: boolean;
  plan?: LicensePlan;
  exp?: number;
  error?: string;
};

export const LICENSE_KEY_RE = /^SW-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

export const isLicensePlan = (value: unknown): value is LicensePlan =>
  value === 'trial30m' || value === 'monthly30d';

export const isLicenseExp = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;
