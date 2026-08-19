import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { runDelete } from './delete-license.mjs';
import { runIssue } from './issue.mjs';
import { runRevoke } from './revoke-license.mjs';
import { runUnbind } from './unbind-device.mjs';

const SHORTCUT = {
  issue: '1',
  unbind: '2',
  revoke: '3',
  delete: '4',
};

const MENU = [
  { key: '1', label: 'Issue license', run: runIssue },
  { key: '2', label: 'Unbind device', run: runUnbind },
  { key: '3', label: 'Revoke license', run: runRevoke },
  { key: '4', label: 'Delete license', run: runDelete },
];

const showMenu = () => {
  console.log('\nSkip Wait — license admin\n');
  for (const item of MENU) console.log(`  ${item.key}) ${item.label}`);
  console.log('  5) Exit\n');
};

const runAction = async (rl, key) => {
  const item = MENU.find((entry) => entry.key === key);
  if (!item) throw new Error('Invalid selection.');
  await item.run(rl);
};

const rl = readline.createInterface({ input, output });
let pending = SHORTCUT[process.argv[2]?.toLowerCase()] ?? null;

try {
  while (true) {
    if (pending) {
      try {
        await runAction(rl, pending);
      } catch (err) {
        console.error(`\nFailed: ${err.message}\n`);
      }
      pending = null;
      continue;
    }

    showMenu();
    const pick = (await rl.question('Select [1-5]: ')).trim();
    if (pick === '5' || pick.toLowerCase() === 'q') break;
    try {
      await runAction(rl, pick);
    } catch (err) {
      console.error(`\nFailed: ${err.message}\n`);
    }
  }
  await rl.question('\nPress Enter to close…');
} finally {
  rl.close();
}
