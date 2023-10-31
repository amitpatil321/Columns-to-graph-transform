const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"),
);

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ["airbnb", "react-app", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", prettierOptions],
    "import/no-unresolved": 0,
    "react/function-component-definition": 0,
    "react/jsx-filename-extension": 0,
    "no-lonely-if": 0,
    "no-console": 0,
    "react/require-default-props": 0,
    "consistent-return": 0,
    "react-hooks/exhaustive-deps": 0,
    "no-param-reassign": 0,
    "react/forbid-prop-types": 0,
    "import/no-extraneous-dependencies": 0,
  },
};
