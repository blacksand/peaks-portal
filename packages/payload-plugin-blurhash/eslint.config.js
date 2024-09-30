import { GLOB_TSX } from '@antfu/eslint-config'

import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  next: true,
  projectRoot: getProjectRoot(import.meta.url),
}).append({
  name: 'peaks/payload-plugin-blurhash/rules',
  files: [GLOB_TSX],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
  },
})

export default config
