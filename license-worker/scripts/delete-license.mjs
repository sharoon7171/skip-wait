import { adminPost, clientValidate, normalizeKey, printValidateResult } from './admin-client.mjs';

export async function runDelete(rl) {
  console.log('\nDelete license\n');
  console.log('Removes the key from storage (cleanup). Cannot be undone.\n');
  const raw = await rl.question('License key: ');
  const key = normalizeKey(raw);
  if (!key) throw new Error('Invalid key format. Expected SW-XXXX-XXXX-XXXX-XXXX.');

  const confirm = (await rl.question(`Delete ${key}? Type the key again: `)).trim().toUpperCase();
  if (confirm !== key) throw new Error('Confirmation did not match. Cancelled.');

  const data = await adminPost('/admin/delete', { key });

  console.log('\nLicense deleted\n');
  console.log(`Key: ${data.key}`);
  printValidateResult('Server check', await clientValidate(key));
  console.log('\nReload bypass pages or open the extension popup.\n');
}
