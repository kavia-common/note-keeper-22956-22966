#!/usr/bin/env node
/* eslint-env node */
/**
 * PUBLIC_INTERFACE
 * Ensures 'typescript' can be resolved by Node in this workspace.
 * This prevents Angular CLI from failing at runtime with:
 *   "Cannot find module 'typescript'"
 *
 * If resolution fails, the script will attempt a targeted reinstall of typescript,
 * then re-check. If still failing, it exits with code 1 and instructions.
 */
const { execSync } = require('node:child_process');
const { existsSync } = require('node:fs');
const { join } = require('node:path');

function canResolveTS() {
  try {
    const p = require.resolve('typescript', { paths: [process.cwd()] });
    return typeof p === 'string' && p.length > 0;
  } catch {
    return false;
  }
}

function log(msg) {
  // Keep logs minimal for CI
  process.stdout.write(`${msg}\n`);
}

(async () => {
  if (canResolveTS()) {
    log('check-typescript-resolve: OK');
    process.exit(0);
  }

  log('check-typescript-resolve: typescript not resolvable, attempting reinstall...');
  try {
    // Ensure the typescript folder is not a corrupted stub
    const tsDir = join(process.cwd(), 'node_modules', 'typescript');
    if (existsSync(tsDir)) {
      // Do not remove entire node_modules; just force reinstall typescript
      execSync('npm i --save-dev typescript@5.7.2 --no-audit --no-fund', { stdio: 'inherit' });
    } else {
      execSync('npm i --save-dev typescript@5.7.2 --no-audit --no-fund', { stdio: 'inherit' });
    }
  } catch (e) {
    log('check-typescript-resolve: reinstall attempt failed.');
  }

  if (canResolveTS()) {
    log('check-typescript-resolve: OK after reinstall');
    process.exit(0);
  }

  log('check-typescript-resolve: FAILED to resolve typescript even after reinstall.');
  log('Please try removing node_modules and package-lock.json, then run "npm install" again.');
  process.exit(1);
})();
