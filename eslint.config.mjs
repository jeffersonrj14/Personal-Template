import next from '@next/eslint-plugin-next'
import prettier from 'eslint-plugin-prettier'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['node_modules', '.next', 'out', 'dist']
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      '@next/next': next,
      prettier
    },
    rules: {
      ...next.configs['core-web-vitals'].rules,
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': ['error', { endOfLine: 'auto' }]
    }
  }
]
