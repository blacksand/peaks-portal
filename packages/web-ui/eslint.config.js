import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  next: true,
  projectRoot: getProjectRoot(import.meta.url),
}).append({
  name: 'peaks/web-ui/rules',
})

export default config
