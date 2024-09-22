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
                onlyDependOnLibsWithTags: ['scope:shared', 'scope:cms', 'scope:web'],
                sourceTag: 'scope:app',
              },
              {
                onlyDependOnLibsWithTags: ['scope:shared', 'scope:cms'],
                sourceTag: 'scope:cms',
              },
              {
                onlyDependOnLibsWithTags: ['scope:shared', 'scope:cms', 'scope:web'],
                sourceTag: 'scope:web',
              },
              {
                onlyDependOnLibsWithTags: ['scope:shared'],
                sourceTag: 'scope:shared',
              },
              {
                onlyDependOnLibsWithTags: ['type:plugin', 'type:cms', 'type:ui', 'type:util'],
                sourceTag: 'type:app',
              },
              {
                onlyDependOnLibsWithTags: ['type:cms', 'type:ui', 'type:util'],
                sourceTag: 'type:plugin',
              },
              {
                onlyDependOnLibsWithTags: ['type:ui', 'type:util', 'type:cms'],
                sourceTag: 'type:ui',
              },
              {
                onlyDependOnLibsWithTags: ['type:plugin', 'type:cms', 'type:util'],
                sourceTag: 'type:cms',
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
