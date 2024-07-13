module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: "./packages/*/tsconfig.json",
    sourceType: "module"
  },
  env: {
    node: true
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "no-throw-literal": "error",
    curly: "error"
  },
  globals: {
    NodeJS: true
  },
  overrides: [
    {
      files: ["*.mts"],
      rules: {}
    }
  ]
};
