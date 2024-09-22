import { GLOB_SRC } from '@antfu/eslint-config'
import promisePlugin from 'eslint-plugin-promise'

/**
 * promise config
 * @returns {[import('eslint').Linter.Config]} eslint config
 */
export function promise() {
  return [
    {
      name: 'peaks/promise/rules',
      files: [GLOB_SRC],
      plugins: {
        promise: promisePlugin,
      },
      rules: {
        'promise/catch-or-return': 'error',
        'promise/no-new-statics': 'error',
        'promise/no-return-in-finally': 'error',
        'promise/no-return-wrap': [
          'error',
          {
            allowReject: true,
          },
        ],
        'promise/param-names': 'error',
        'promise/prefer-await-to-then': 'error',
        'promise/valid-params': 'error',
      },
    },
  ]
}
