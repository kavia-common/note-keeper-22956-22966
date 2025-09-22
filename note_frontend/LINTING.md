Temporary ESLint configuration

- To ensure CI builds do not fail due to environment-level TypeScript resolution issues, ESLint is configured to use the base JS parser and not require TypeScript.
- This does NOT affect Angular compilation or TypeScript type checking performed by the Angular/TypeScript compiler.
- If you want full TypeScript linting, install and ensure 'typescript' is resolvable in CI and switch eslint.config.mjs to use @typescript-eslint/parser with parserOptions.project pointing to tsconfig.eslint.json.
