import { execSync, spawnSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const wranglerPath = join(root, 'wrangler.jsonc');
const envPath = join(root, '.env');
const extConfigPath = join(root, '../extension/src/license/config.ts');

const run = (cmd) => execSync(cmd, { cwd: root, encoding: 'utf8' }).trim();

const putSecret = (name, value) => {
  const res = spawnSync('npx', ['wrangler', 'secret', 'put', name], {
    cwd: root,
    input: value,
    encoding: 'utf8',
  });
  if (res.status !== 0) {
    throw new Error(res.stderr || res.stdout || `Failed to set secret ${name}`);
  }
};

const setKvId = (id) => {
  const next = readFileSync(wranglerPath, 'utf8').replace(/"id": "[^"]+"/, `"id": "${id}"`);
  writeFileSync(wranglerPath, next);
};

const main = async () => {
  run('npm install');

  const adminSecret = randomBytes(32).toString('hex');

  let kvId = '';
  const existing = readFileSync(wranglerPath, 'utf8').match(/"id": "([a-f0-9]{32})"/);
  if (existing?.[1] && existing[1] !== '00000000000000000000000000000000') kvId = existing[1];

  if (!kvId) {
    try {
      const out = run('npx wrangler kv namespace create LICENSES');
      const match = out.match(/id = "([a-f0-9]{32})"/);
      if (match?.[1]) kvId = match[1];
    } catch {}
    if (!kvId) {
      const listed = JSON.parse(run('npx wrangler kv namespace list'));
      const found = listed.find((row) => row.title === 'LICENSES');
      if (!found?.id) throw new Error('Could not find LICENSES KV namespace');
      kvId = found.id;
    }
    setKvId(kvId);
  }

  putSecret('ADMIN_SECRET', adminSecret);

  const deployOut = run('npm run deploy');
  const urlMatch = deployOut.match(/https:\/\/[a-z0-9-]+\.[a-z0-9-]+\.workers\.dev/);
  const workerUrl = urlMatch?.[0] ?? '';

  writeFileSync(envPath, `WORKER_URL=${workerUrl}\nADMIN_SECRET=${adminSecret}\n`);
  if (workerUrl) writeFileSync(extConfigPath, `export const LICENSE_API_URL = '${workerUrl}';\n`);

  console.log(`KV namespace: ${kvId}`);
  console.log(`Worker URL: ${workerUrl}`);
  console.log(`Admin secret saved to ${envPath}`);
  if (!existsSync(envPath)) throw new Error('Setup did not write .env');
  console.log('Issue keys: npm run issue:trial | npm run issue:monthly');
};

void main();
