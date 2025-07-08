/** @type {import('prettier').Config} */
const config = {
  // Defaults
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  vueIndentScriptAndStyle: false,
  endOfLine: "lf",
  embeddedLanguageFormatting: "auto",
  singleAttributePerLine: false,

  // Overrides
  overrides: [
    {
      files: ["*.json", "*.json5", "*.jsonc"],
      options: {
        tabWidth: 2,
        singleQuote: false,
        quoteProps: "preserve",
      },
    },
    {
      files: ["*.yaml", "*.yml"],
      options: {
        singleQuote: true,
      },
    },
    {
      files: ["*.md", "*.mdx", "*.markdown"],
      options: {
        printWidth: 80,
        proseWrap: "always",
        tabWidth: 2,
        useTabs: false,
      },
    },
  ],
};

export default config;
