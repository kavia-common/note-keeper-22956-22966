#!/usr/bin/env node
/* eslint-env node */
/**
 * PUBLIC_INTERFACE
 * TypeScript resolver shim for Angular builds.
 * Some CI environments end up with a corrupted node resolution cache such that
 * require('typescript') fails within Angular builder even though it exists under node_modules.
 *
 * This shim forces Node's module resolution to include the project root's node_modules in the
 * resolution paths, so downstream requires can resolve 'typescript' correctly.
 *
 * It is safe to require this at the start of npm scripts (e.g., build/start).
 */
const Module = require('module');
const path = require('path');

const projectRoot = process.cwd();

// Ensure project node_modules is on resolution path
const nodeModulesPath = path.join(projectRoot, 'node_modules');
if (!Module.globalPaths.includes(nodeModulesPath)) {
  Module.globalPaths.unshift(nodeModulesPath);
}

// Also add vendor fallback path for typescript
const vendorTSPath = path.join(projectRoot, 'tools', 'vendor');
if (!Module.globalPaths.includes(vendorTSPath)) {
  Module.globalPaths.unshift(vendorTSPath);
}

// Proactively verify and pre-load typescript so subsequent require() hits cache.
try {
  // Try standard resolution first
  require.resolve('typescript');
} catch {
  // Try vendor fallback, which re-exports real TS if present or a shim otherwise.
  try {
    // This require pulls tools/vendor/typescript when needed
    require('typescript');
    process.stdout.write('ts-resolver-shim: using vendor fallback for typescript.\n');
  } catch (e) {
    // Do not throw; allow Angular to show its own error if still unavailable.
    process.stdout.write('ts-resolver-shim: WARN could not preload typescript; Angular builder may still fail.\n');
  }
}
