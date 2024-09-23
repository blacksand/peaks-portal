import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  projectRoot: getProjectRoot(import.meta.url),
}).append({
  name: 'peaks/cms-utils/rules',
})

export default config
