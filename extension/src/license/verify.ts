import { verifyLease } from './lease';
import { dropExpiredLicense, getLicenseSession, leaseIsLive } from './storage';

export const verifyLicense = async (): Promise<boolean> => {
  const session = await getLicenseSession();
  if (!session) return false;
  if (await dropExpiredLicense(session)) return false;
  if (!leaseIsLive(session.leaseExp)) return false;
  const verified = await verifyLease(session.lease, {
    applicationId: session.applicationId,
    nonce: session.nonce,
  });
  return !!verified && verified.activationId === session.activationId;
};
