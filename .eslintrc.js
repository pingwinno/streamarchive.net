module.exports = {
  root: true,
  env: { node: true },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "max-len": ["error", { code: 120 }],
    "prettier/prettier": ["warn", { printWidth: 120 }],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: { parser: "babel-eslint" }
};
