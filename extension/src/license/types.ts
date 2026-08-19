export type LicensePlan = 'trial10m' | 'monthly30d';

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
