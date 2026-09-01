export const EAS_API = 'https://eas-x.com/api/v1/licenses';
export const EAS_ISS = 'https://eas-x.com';

export type LicensePlan = 'monthly' | 'trial';

export type LicenseApp = {
  id: string;
  plan: LicensePlan;
};

export const LICENSE_APPS: readonly LicenseApp[] = [
  { id: '6423cfa8-a405-416a-b3ca-014b67974dbe', plan: 'monthly' },
  { id: '6dc17f98-82fe-4de7-ae4a-9e7a57790c56', plan: 'trial' },
];

export const PINNED_PUBLIC_KEY = {
  kid: 'eas-20260828-v1',
  alg: 'EdDSA',
  format: 'spki-der-base64url',
  public_key: 'MCowBQYDK2VwAyEAqONfKojqBIyC9qDVYoFuAY-rguajRvhdTmf5aElb-fA',
} as const;

export const appById = (id: string): LicenseApp | undefined =>
  LICENSE_APPS.find((app) => app.id === id);
