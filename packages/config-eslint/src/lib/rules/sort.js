import { GLOB_JSX, GLOB_MARKDOWN_CODE, GLOB_SRC, GLOB_TSX } from '@antfu/eslint-config'

/**
 * 配置 perfectionist 规则
 * @param {{globInternal?: string}} options input options
 * @returns {import('eslint').Linter.Config[]} eslint config
 */
export function sort({ globInternal = '@/**' }) {
  return [
    {
      name: 'peaks/perfectionist/rules',
      files: [GLOB_SRC],
      ignores: [GLOB_MARKDOWN_CODE],
      rules: {
        'import/order': 'off',
        'perfectionist/sort-imports': [
          'warn',
          {
            type: 'alphabetical',
            groups: [
              'instructions',
              ['type', 'builtin', 'external'],
              ['internal-type', 'internal'],
              ['parent-type', 'parent', 'sibling-type', 'sibling', 'index'],
              'object',
              'unknown',
            ],
            internalPattern: [globInternal],
            newlinesBetween: 'always',

            customGroups: {
              value: {
                instructions: ['client-only', 'server-only'],
              },
            },
          },
        ],
        'perfectionist/sort-interfaces': [
          'warn',
          {
            type: 'alphabetical',
            groups: ['identify', 'names', 'labels', 'unknown', 'callback'],
            order: 'asc',
            partitionByNewLine: true,

            customGroups: {
              labels: ['label', 'labels'],
              callback: ['on{A..Z}*', 'handle{A..Z}*'],
              identify: ['id?(s)', 'slug', 'selector'],
              names: ['username', 'code', 'type', 'name', 'title'],
            },
          },
        ],
        'perfectionist/sort-named-exports': [
          'warn',
        ],
        'perfectionist/sort-named-imports': [
          'warn',
          {
            type: 'alphabetical',
            groupKind: 'mixed',
            ignoreAlias: false,
            order: 'asc',
          },
        ],
        'perfectionist/sort-object-types': [
          'warn',
          {
            type: 'alphabetical',
            groups: ['identify', 'names', 'labels', 'unknown', 'callback'],
            order: 'asc',
            partitionByNewLine: true,

            customGroups: {
              labels: ['label', 'labels'],
              callback: ['on{A..Z}*', 'handle{A..Z}*'],
              identify: ['id?(s)', 'slug', 'code', 'selector'],
              names: ['username', 'type', 'name', 'title'],
            },
          },
        ],
        'perfectionist/sort-objects': [
          'warn',
          {
            type: 'alphabetical',
            groups: ['identify', 'names', 'labels', 'unknown', 'callback'],
            ignorePattern: ['transform'],
            order: 'asc',
            partitionByComment: '+([0-9]|-)?(.) **',
            partitionByNewLine: true,

            customGroups: {
              labels: ['label', 'labels'],
              callback: ['on{A..Z}*', 'handle{A..Z}*'],
              identify: ['id?(s)', 'slug', 'code', 'selector', 'queryKey'],
              names: ['username', 'type', 'name', 'title', 'queryFn'],
            },
          },
        ],
        'sort-imports': 'off',
      },
    },
    {
      name: 'peaks/perfectionist/sort-jsx-props',
      files: [GLOB_JSX, GLOB_TSX],
      ignores: [GLOB_MARKDOWN_CODE],
      rules: {
        'perfectionist/sort-jsx-props': [
          'warn',
          {
            type: 'alphabetical',
            groups: ['builtin', 'identify', 'names', 'unknown', 'callback'],
            order: 'asc',

            customGroups: {
              builtin: ['key', 'ref'],
              callback: ['on{A..Z}*', 'handle{A..Z}*'],
              identify: ['id', 'src'],
              names: ['className', 'class', 'name', 'title'],
            },
          },
        ],
      },
    },
  ]
}
