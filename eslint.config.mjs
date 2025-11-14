import next from '@next/eslint-plugin-next'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: ['node_modules', '.next', 'out', 'dist']
  },
  {
    plugins: {
      '@next/next': next,
      prettier
    },
    rules: {
      ...next.configs['core-web-vitals'].rules,
      'prettier/prettier': ['error', { endOfLine: 'auto' }]
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  }
]
