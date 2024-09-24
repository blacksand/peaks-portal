import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  projectRoot: getProjectRoot(import.meta.url),
}).append(
  {
    name: 'peaks/data-models/rules',
    files: ['src/index.ts'],
    rules: {
      'import/no-unassigned-import': 'off',
    },
  },
  {
    name: 'peaks/data-models/disables/generated-schema',
    ignores: ['cms-schema.graphql'],
  },
)

export default config
