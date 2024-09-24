import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  type: 'app',
  next: true,
  projectRoot: getProjectRoot(import.meta.url),
}).append({
  name: 'peaks/web/disables/import-map',
  ignores: [`src/app/(payload)/admin/importMap.{js,d.ts}`],
})

export default config
