import { GLOB_TSX } from '@antfu/eslint-config'
import readableTailwindPlugin from 'eslint-plugin-readable-tailwind'
import tailwindcssPlugin from 'eslint-plugin-tailwindcss'

/**
 * 配置 tailwind 规则
 * @param {{config?: string}} options input options
 * @returns {[import('eslint').Linter.Config]} Array of eslint flat config
 */
export function tailwind({ config = '@peaks/config-tailwind' }) {
  return [
    {
      name: 'peaks/tailwind/rules',
      files: [GLOB_TSX],
      plugins: {
        'readable-tailwind': readableTailwindPlugin,
        'tailwindcss': tailwindcssPlugin,
      },
      rules: {
        'readable-tailwind/multiline': [
          'warn',
          {
            group: 'newLine',
            preferSingleLine: true,
            printWidth: 100,
          },
        ],
        'readable-tailwind/no-duplicate-classes': 'error',
        'readable-tailwind/no-unnecessary-whitespace': 'error',
        'readable-tailwind/sort-classes': ['warn', { tailwindConfig: config }],

        'tailwindcss/classnames-order': 'off',
        'tailwindcss/enforces-negative-arbitrary-values': [
          'warn',
          {
            callees: ['classnames', 'clsx', 'ctl', 'cva', 'tv', 'cn'],
            config,
          },
        ],
        'tailwindcss/enforces-shorthand': [
          'warn',
          {
            callees: ['classnames', 'clsx', 'ctl', 'cva', 'tv', 'cn'],
            config,
          },
        ],
        'tailwindcss/migration-from-tailwind-2': [
          'warn',
          {
            callees: ['classnames', 'clsx', 'ctl', 'cva', 'tv', 'cn'],
            config,
          },
        ],
        'tailwindcss/no-arbitrary-value': 'off',
        'tailwindcss/no-contradicting-classname': [
          'warn',
          {
            callees: ['classnames', 'clsx', 'ctl', 'cva', 'tv', 'cn'],
            config,
          },
        ],
        'tailwindcss/no-custom-classname': [
          'warn',
          {
            callees: ['classnames', 'clsx', 'ctl', 'cva', 'tv', 'cn'],
            config,
            cssFiles: [
              '**/*.css',
              '!**/node_modules',
              '!**/.*',
              '!**/dist',
              '!**/build',
              '!**/.next',
            ],
          },
        ],
        'tailwindcss/no-unnecessary-arbitrary-value': [
          'warn',
          {
            callees: ['classnames', 'clsx', 'ctl', 'cva', 'tv', 'cn'],
            config,
          },
        ],
      },
    },
  ]
}
