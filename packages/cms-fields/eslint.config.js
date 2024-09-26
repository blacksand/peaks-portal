import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  next: true,
  projectRoot: getProjectRoot(import.meta.url),
}).append({
  name: 'peaks/cms-fields/rules',
})

export default config
