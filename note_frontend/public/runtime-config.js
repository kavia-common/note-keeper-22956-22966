/* eslint-env browser */
(function () {
  // PUBLIC_INTERFACE
  /** Attach a global config object for runtime overrides (e.g., API base URL). */
  if (typeof window !== 'undefined') {
    window.__APP_API_BASE_URL__ = window.__APP_API_BASE_URL__ || undefined;
  }
})();
