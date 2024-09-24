import { GLOB_SRC } from '@antfu/eslint-config'
import { configs } from 'eslint-plugin-unicorn'

/**
 * Unicorn config
 * @returns {[import('eslint').Linter.Config]} eslint config
 */
export function unicorn() {
  return [
    {
      name: 'peaks/unicorn/rules',
      files: [GLOB_SRC],
      rules: {
        ...configs['flat/recommended'].rules,
        'no-nested-ternary': 'off',
        'unicorn/catch-error-name': [
          'error',
          {
            name: 'reason',
            ignore: ['error'],
          },
        ],
        'unicorn/expiring-todo-comments': 'off',
        'unicorn/filename-case': [
          'error',
          {
            case: 'kebabCase',
            ignore: ['README.md', 'CHANGELOG.md', 'LICENSE.md'],
          },
        ],
        // 使用 eslint-comments 代替
        'unicorn/no-abusive-eslint-disable': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-nested-ternary': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-useless-undefined': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/prevent-abbreviations': [
          'error',
          {
            replacements: {
              args: false,
              doc: false,
              docs: false,
              env: false,
              lib: false,
              params: false,
              prop: false,
              props: false,
              ref: false,
            },
          },
        ],
      },
    },
  ]
}
