import { adminPost, clientValidate, normalizeKey, printValidateResult } from './admin-client.mjs';

export async function runRevoke(rl) {
  console.log('\nRevoke license\n');
  console.log('Permanently blocks the key (refunds, chargebacks, abuse).\n');
  const raw = await rl.question('License key: ');
  const key = normalizeKey(raw);
  if (!key) throw new Error('Invalid key format. Expected SW-XXXX-XXXX-XXXX-XXXX.');

  const confirm = (await rl.question(`Revoke ${key}? [y/N]: `)).trim().toLowerCase();
  if (confirm !== 'y' && confirm !== 'yes') throw new Error('Cancelled.');

  const data = await adminPost('/admin/revoke', { key });

  console.log('\nLicense revoked\n');
  console.log(`Key:    ${data.key}`);
  console.log(`Status: ${data.status}`);
  console.log(`Rev:    ${data.rev}`);
  printValidateResult('Server check', await clientValidate(key));
  console.log('\nReload bypass pages or open the extension popup.\n');
}
