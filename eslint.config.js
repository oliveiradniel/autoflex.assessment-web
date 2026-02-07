import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';

import globals from 'globals';

import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

import pluginQuery from '@tanstack/eslint-plugin-query';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'src/route-tree.generated.ts']),
  {
    ...pluginQuery.configs['flat/recommended'],
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
