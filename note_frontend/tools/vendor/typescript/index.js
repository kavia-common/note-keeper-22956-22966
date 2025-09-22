'use strict';
/**
 * PUBLIC_INTERFACE
 * Vendor entry point for 'typescript' resolution.
 * Re-exports the lib/typescript.js implementation (which forwards to real TypeScript if available).
 */
module.exports = require('./lib/typescript.js');
