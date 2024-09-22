import playwrightPlugin from 'eslint-plugin-playwright'

import { eslintConfig } from '@peaks/config-eslint'

const config = eslintConfig().append({
  name: 'peaks/web-e2e/rules',
  ...playwrightPlugin.configs['flat/recommended'],
})

export default config
