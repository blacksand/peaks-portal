import { GLOB_MARKDOWN_CODE, GLOB_SRC, GLOB_SRC_EXT } from '@antfu/eslint-config'

/**
 * Rules for imports
 * @param {{projectRoot?: string, workspacePath?: string}} options
 * @returns {import('eslint').Linter.Config[]} eslint config
 */
export function imports({ projectRoot, workspacePath }) {
  return [
    {
      name: 'peaks/imports/rules',
      files: [GLOB_SRC],
      ignores: [GLOB_MARKDOWN_CODE, `**/vitest-setup.${GLOB_SRC_EXT}`],
      rules: {
        'import/consistent-type-specifier-style': ['warn', 'prefer-top-level'],
        'import/no-extraneous-dependencies': [
          'error',
          {
            includeTypes: true,
            packageDir: [projectRoot || './', workspacePath],
          },
        ],
        'import/no-unassigned-import': [
          'error',
          {
            allow: [
              'client-only',
              'server-only',
              '**/*-css',
              '**/*.css',
              '**/*.scss',
              '**/*.sass',
              '**/*.less',
              '**/css',
            ],
          },
        ],
        'import/no-useless-path-segments': 'error',
      },
    },
  ]
}
