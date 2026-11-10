const fs = require('fs');
const path = require('path');

// sqlite-wasm is served as plain static files and loaded at runtime by lib/todoDb.worker.ts
// (webpack must not bundle it: it rewrites the `new URL(...)` used to spawn the OPFS async proxy
// worker and drops the required ?vfs= argument). The version is part of the path so the
// immutable Cache-Control on '**/*' can never serve stale files after an upgrade.
const pkgDir = path.join(__dirname, '../node_modules/@sqlite.org/sqlite-wasm');
const { version } = require(path.join(pkgDir, 'package.json'));
const destRoot = path.join(__dirname, '../public/sqlite-wasm');
const dest = path.join(destRoot, version);

fs.rmSync(destRoot, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
for (const f of ['index.mjs', 'sqlite3.wasm', 'sqlite3-opfs-async-proxy.js']) {
  fs.copyFileSync(path.join(pkgDir, 'dist', f), path.join(dest, f));
}
console.log(`Copied sqlite-wasm ${version} to public/sqlite-wasm/${version}/`);
