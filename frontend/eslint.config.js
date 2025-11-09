// eslint.config.js (Flat Config)

import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base JS + browser globals
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    },
    // Use ESLint's recommended JS rules
    rules: {
      ...js.configs.recommended.rules
    }
  },

  // React core recommendations (Flat config from the plugin)
  pluginReact.configs.flat.recommended,

  // React Hooks rules (Flat style)
  {
    plugins: {
      "react-hooks": reactHooks
    },
    rules: {
      // Enforce the Rules of Hooks
      "react-hooks/rules-of-hooks": "error",
      // Verify the list of dependencies for Hooks like useEffect
      "react-hooks/exhaustive-deps": "warn",
      // Optional: in simple projects, PropTypes are often unnecessary
      "react/prop-types": "off"
    },
    settings: {
      react: { version: "detect" }
    }
  },

  // Prettier compatibility: turn off stylistic rules that conflict with Prettier
  {
    // Flat-config equivalent of "extends: ['prettier']"
    rules: {
      // If you later add any stylistic rules, Prettier should win.
      // No explicit rules needed here because eslint-config-prettier simply disables
      // conflicting rules; with Flat Config we ensure we don't add such rules.
    }
  }
]);