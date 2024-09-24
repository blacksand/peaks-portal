import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  projectRoot: getProjectRoot(import.meta.url),
  react: true,
}).append({
  name: 'peaks/data-access/rules',
})

export default config
