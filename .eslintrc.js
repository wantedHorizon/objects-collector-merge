/* eslint-disable semi */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "standard-with-typescript",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    semi: [0],
    "comma-dangle": [0],
  },
};
