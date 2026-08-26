import { adminPost, formatExp } from './admin-client.mjs';

export async function runIssue(rl) {
  console.log('\nIssue license\n');
  console.log('  1) Trial     (30 minutes)');
  console.log('  2) Monthly   (30 days)\n');

  const pick = (await rl.question('Select [1/2]: ')).trim();
  const plan = pick === '2' ? 'monthly30d' : pick === '1' ? 'trial30m' : null;
  if (!plan) throw new Error('Enter 1 for trial or 2 for monthly.');

  const data = await adminPost('/admin/issue', { plan });

  console.log('\nLicense created\n');
  console.log(`Key:     ${data.key}`);
  console.log(`Plan:    ${data.plan === 'trial30m' ? '30-minute trial' : '30-day license'}`);
  console.log(`Expires: ${data.exp == null ? 'starts on first use' : formatExp(data.exp)}\n`);
}
