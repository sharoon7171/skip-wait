import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const listKeys = (remote) => {
  const flag = remote ? '--remote' : '';
  const out = execSync(`npx wrangler kv key list --binding LICENSES ${flag}`, {
    cwd: root,
    encoding: 'utf8',
  });
  return JSON.parse(out).map((row) => row.name);
};

const deleteKey = (name, remote) => {
  const flag = remote ? '--remote' : '';
  execSync(`npx wrangler kv key delete --binding LICENSES ${flag} "${name}"`, {
    cwd: root,
    stdio: 'pipe',
  });
};

for (const remote of [false, true]) {
  const label = remote ? 'remote' : 'local';
  let keys = [];
  try {
    keys = listKeys(remote);
  } catch {
    continue;
  }
  for (const name of keys) deleteKey(name, remote);
  console.log(`${label}: deleted ${keys.length} keys`);
}
