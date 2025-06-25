// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "prefer-const": "error",
      "no-unused-vars": "warn",
      "react/react-in-jsx-scope": "off", // React 17+ doesn't need React import
      "react/jsx-uses-react": "off"      // React 17+ doesn't need React import
    },
  },
];

export default eslintConfig;