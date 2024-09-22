import { GLOB_TS, GLOB_TSX } from '@antfu/eslint-config'
import reactQueryPlugin from '@tanstack/eslint-plugin-query'

/**
 * react query eslint rules
 * @returns {[import('eslint').Linter.Config]} eslint config
 */
export function reactQuery() {
  return [
    {
      name: 'peaks/react-query/rules',
      files: [GLOB_TS, GLOB_TSX],
      plugins: {
        'react-query': reactQueryPlugin,
      },
      rules: {
        'react-query/exhaustive-deps': 'error',
        'react-query/no-rest-destructuring': 'warn',
        'react-query/no-unstable-deps': 'error',
        'react-query/stable-query-client': 'error',
      },
    },
  ]
}
