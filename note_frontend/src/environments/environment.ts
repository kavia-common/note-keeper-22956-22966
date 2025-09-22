export const environment = {
  production: false,
  // IMPORTANT: Configure this via environment at deploy time.
  // You can set a global ENV var BACKEND_BASE_URL in the deployment environment and replace here during build if needed.
  // For local dev, default to localhost Flask typical port 5000.
  apiBaseUrl: (typeof window !== 'undefined' && (window as any).__APP_API_BASE_URL__) || 'http://localhost:5000',
};
