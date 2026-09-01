import type { LicensePlan } from './config';

export type { LicensePlan };

export type LicenseSession = {
  key: string;
  plan: LicensePlan;
  applicationId: string;
  activationId: string;
  activationToken: string;
  instanceId: string;
  lease: string;
  nonce: string;
  leaseExp: number;
  entExp: number | null;
};

export type LicenseState =
  | { ok: true; plan: LicensePlan; leaseExp: number; entExp: number | null }
  | { ok: false; error: string };

export const LICENSE_KEY_RE = /^EAS(?:-[A-Z0-9]{5}){5}$/;

export const isLicensePlan = (value: unknown): value is LicensePlan =>
  value === 'monthly' || value === 'trial';

export const isLicenseExp = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

export type EasLicenseResult = {
  valid: boolean;
  error?: string;
  application_id?: string;
  activation_id?: string;
  activation_token?: string;
  lease?: string;
  lease_expires_at?: string;
  entitlement_expires_at?: string | null;
};
