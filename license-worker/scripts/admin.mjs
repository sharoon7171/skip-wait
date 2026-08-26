import { adminPost, clientValidate, normalizeKey, printValidateResult } from './admin-client.mjs';

const [command, arg1] = process.argv.slice(2);

try {
  if (command === 'issue') {
    const plan = arg1 === 'monthly30d' ? 'monthly30d' : 'trial30m';
    console.log(JSON.stringify(await adminPost('/admin/issue', { plan }), null, 2));
  } else if (command === 'revoke') {
    const key = normalizeKey(arg1 ?? '');
    if (!key) throw new Error('Usage: node scripts/admin.mjs revoke SW-XXXX-XXXX-XXXX-XXXX');
    console.log(JSON.stringify(await adminPost('/admin/revoke', { key }), null, 2));
    printValidateResult('Server check', await clientValidate(key));
  } else if (command === 'delete') {
    const key = normalizeKey(arg1 ?? '');
    if (!key) throw new Error('Usage: node scripts/admin.mjs delete SW-XXXX-XXXX-XXXX-XXXX');
    console.log(JSON.stringify(await adminPost('/admin/delete', { key }), null, 2));
    printValidateResult('Server check', await clientValidate(key));
  } else if (command === 'unbind') {
    const key = normalizeKey(arg1 ?? '');
    if (!key) throw new Error('Usage: node scripts/admin.mjs unbind SW-XXXX-XXXX-XXXX-XXXX');
    console.log(JSON.stringify(await adminPost('/admin/unbind', { key }), null, 2));
    printValidateResult('Server check', await clientValidate(key));
  } else if (command === 'check') {
    const key = normalizeKey(arg1 ?? '');
    if (!key) throw new Error('Usage: node scripts/admin.mjs check SW-XXXX-XXXX-XXXX-XXXX');
    console.log(JSON.stringify(await clientValidate(key), null, 2));
  } else {
    throw new Error('Usage: issue trial30m|monthly30d | revoke KEY | delete KEY | unbind KEY | check KEY');
  }
} catch (err) {
  console.error(err.data ?? err.message);
  process.exit(1);
}
