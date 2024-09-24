import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  projectRoot: getProjectRoot(import.meta.url),
  react: true,
}).append({
  name: 'peaks/cms-config/rules',
})

export default config
