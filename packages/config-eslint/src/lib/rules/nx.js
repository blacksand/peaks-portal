import { GLOB_TS, GLOB_TSX } from '@antfu/eslint-config'
import nxPlugin from '@nx/eslint-plugin'

/**
 * Nx config
 * @param {{allowedGlobalImport?: string[]}} [options] - input options
 * @returns {[import('eslint').Linter.Config]} Array of eslint flat config
 */
export function nx({ allowedGlobalImport } = {}) {
  return [
    {
      name: 'peaks/nx/rules',
      files: [GLOB_TS, GLOB_TSX],
      plugins: {
        nx: nxPlugin,
      },
      rules: {
        'nx/enforce-module-boundaries': [
          'error',
          {
            allow: allowedGlobalImport ?? [],
            depConstraints: [
              {
                onlyDependOnLibsWithTags: ['scope:shared', 'scope:mobile', 'scope:web'],
                sourceTag: 'scope:app',
              },
              {
                onlyDependOnLibsWithTags: ['scope:shared', 'scope:mobile'],
                sourceTag: 'scope:mobile',
              },
              {
                onlyDependOnLibsWithTags: ['scope:shared', 'scope:web'],
                sourceTag: 'scope:web',
              },
              {
                onlyDependOnLibsWithTags: ['scope:shared'],
                sourceTag: 'scope:shared',
              },
              {
                onlyDependOnLibsWithTags: ['type:ui', 'type:cms', 'type:util'],
                sourceTag: 'type:app',
              },
              {
                onlyDependOnLibsWithTags: ['type:ui', 'type:cms', 'type:util'],
                sourceTag: 'type:cms',
              },
              {
                onlyDependOnLibsWithTags: ['type:ui', 'type:util'],
                sourceTag: 'type:ui',
              },
              {
                onlyDependOnLibsWithTags: ['type:util'],
                sourceTag: 'type:util',
              },
            ],
            enforceBuildableLibDependency: true,
          },
        ],
      },
    },
  ]
}
