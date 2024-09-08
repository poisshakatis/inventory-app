// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
  ],
  plugins: {
    '@stylistic': stylistic
  },
  rules: {
    '@typescript-eslint/no-misused-promises': [2, {
      checksVoidReturn: {
        attributes: false
      }
    }],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@stylistic/indent': ['error', 2],
    '@stylistic/quotes': ['error', 'single']
  },
});