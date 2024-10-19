import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  pluginJs.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node },

      parserOptions: {
        "ecmaVersion": "latest",
        "sourceType": "module"
      },
    },
    rules: {
      "no-debugger": "off",
      "no-console": 0,
      "class-methods-use-this": "off",
      "@typescript-eslint/no-var-requires": 0,
      "no-unused-vars": 0,
      "no-useless-escape": "off",
    },
  },
  {
    ignores: [
      "node_modules/*",
      "build/*", 
    ]
  },
  ...tseslint.configs.recommended,
  //...tseslint.configs.strict,
  //...tseslint.configs.stylistic,
];
