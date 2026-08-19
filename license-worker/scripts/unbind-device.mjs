import { adminPost, clientValidate, normalizeKey, printValidateResult } from './admin-client.mjs';

export async function runUnbind(rl) {
  console.log('\nUnbind device\n');
  const raw = await rl.question('License key: ');
  const key = normalizeKey(raw);
  if (!key) throw new Error('Invalid key format. Expected SW-XXXX-XXXX-XXXX-XXXX.');

  const data = await adminPost('/admin/unbind', { key });

  console.log('\nDevice unbound\n');
  console.log(`Key: ${data.key}`);
  printValidateResult('Server check', await clientValidate(key));
  console.log('\nOn the new device: open popup → Activate (not just Refresh).\n');
}
