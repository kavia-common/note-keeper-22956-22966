export default [
  {
    ignores: [
      ".angular/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.config.mjs",
    ]
  },
  // Base ESLint for JS files
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Common globals
        console: "readonly",
        // Node.js globals for most build/tooling scripts
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        require: "readonly",
        module: "readonly",
        // Browser globals for public assets
        window: "readonly",
        document: "readonly",
      }
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "off",
      "no-unreachable": "error",
      "no-unexpected-multiline": "error",
      "no-unsafe-finally": "error",
      "no-invalid-regexp": "error",
      "no-obj-calls": "error",
      "no-dupe-keys": "error",
      "no-dupe-args": "error",
      "no-duplicate-case": "error",
      "no-empty-character-class": "error",
      "no-ex-assign": "error",
      "no-func-assign": "error",
      "no-inner-declarations": "error",
      "no-irregular-whitespace": "error",
      "no-sparse-arrays": "error",
      "use-isnan": "error",
      "valid-typeof": "error"
    }
  },
  // Specific overrides
  {
    files: ["bin/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        console: "readonly",
      }
    }
  },
  {
    files: ["public/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
      }
    }
  }
];
