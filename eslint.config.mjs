import ts from "typescript-eslint";
import globals from "globals";

export default [
  // Base JavaScript configuration
  {
    files: [".__tests__/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true }],
      "no-console": "warn",
      "no-unused-vars": "warn",
    },
  },

  // TypeScript configuration
  ...ts.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // Ignore patterns
  {
    ignores: ["node_modules/", "dist/", "coverage/", "archives/"],
  },
];
