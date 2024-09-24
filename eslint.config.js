import { eslintConfig } from '@peaks/config-eslint'

const config = eslintConfig({
  type: 'app',
  ignores: ['apps/**', 'packages/**'],
})

export default config
