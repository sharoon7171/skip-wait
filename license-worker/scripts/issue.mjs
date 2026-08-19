import { adminPost, formatExp } from './admin-client.mjs';

export async function runIssue(rl) {
  console.log('\nIssue license\n');
  console.log('  1) Trial     (10 minutes)');
  console.log('  2) Monthly   (30 days)\n');

  const pick = (await rl.question('Select [1/2]: ')).trim();
  const plan = pick === '2' ? 'monthly30d' : pick === '1' ? 'trial10m' : null;
  if (!plan) throw new Error('Enter 1 for trial or 2 for monthly.');

  const data = await adminPost('/admin/issue', { plan });

  console.log('\nLicense created\n');
  console.log(`Key:     ${data.key}`);
  console.log(`Plan:    ${data.plan === 'trial10m' ? '10-minute trial' : '30-day license'}`);
  console.log(`Expires: ${formatExp(data.exp)}\n`);
}
