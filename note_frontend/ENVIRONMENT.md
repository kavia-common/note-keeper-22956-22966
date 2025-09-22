Environment configuration

- The frontend expects a backend REST API base URL.
- Default is http://localhost:5000.

During deployment you can expose a global variable before loading the app to override the backend URL:

<script>
  window.__APP_API_BASE_URL__ = 'https://your-backend.example.com';
</script>

Place this script tag before the Angular bundle scripts in index.html if you need to override at runtime.

Local dev tips:
- The Angular dev server listens on http://localhost:3000 (see angular.json).
- If your backend runs on a different port/host (for example, http://localhost:3001), set:
  <script>window.__APP_API_BASE_URL__ = 'http://localhost:3001';</script>
  in src/index.html (temporarily) or inject it via your runtime.
- Ensure backend CORS allows origin http://localhost:3000.

Do NOT hardcode secrets in code.
