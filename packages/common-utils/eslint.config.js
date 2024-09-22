import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  next: false,
  projectRoot: getProjectRoot(import.meta.url),
  react: false,
})

export default config
