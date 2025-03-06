import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  type: 'app',
  projectRoot: getProjectRoot(import.meta.url),
  react: true,
}).append({
  name: 'peaks/mobile/rules',
  rules: {
    'ts/no-magic-numbers': 'off',
  },
})

export default config
