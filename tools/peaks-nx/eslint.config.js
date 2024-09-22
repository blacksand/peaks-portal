import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  type: 'app',
  projectRoot: getProjectRoot(import.meta.url),
})

export default config
