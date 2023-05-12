/* eslint-disable semi */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "standard-with-typescript",
  overrides: [],
  // parserOptions: {
  //   ecmaVersion: "latest",
  //   sourceType: "module",
  //   project: "tsconfig.json",
  // },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    quotes: [1, "double", { avoidEscape: true }],
    semi: [0],
    "comma-dangle": [0],
    "@typescript-eslint/quotes": [0],
    "@typescript-eslint/semi": [0],

  },
};
