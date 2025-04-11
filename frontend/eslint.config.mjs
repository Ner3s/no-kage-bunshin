import importHelpers from 'eslint-plugin-import-helpers';
import reactHooks from 'eslint-plugin-react-hooks';
import { globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended'
  ),
  globalIgnores(['node_modules/', 'dist/', 'wailsjs/']),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'import-helpers': importHelpers,
      'react-hooks': reactHooks
    },

    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false
        }
      ],

      'prettier/prettier': 'error',

      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',

          groups: [
            ['/^react/', '/^next/', '/^redux/'],
            '/styled-components/',
            'module',
            '/^@/components/',
            '/^@/templates/',
            ['parent', 'sibling', 'index'],
            '/^@/contexts/',
            '/^@/hooks/',
            '/^@/',
            '/styles/'
          ],

          alphabetize: {
            order: 'asc',
            ignoreCase: true
          }
        }
      ]
    }
  }
];
