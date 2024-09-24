import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  projectRoot: getProjectRoot(import.meta.url),
  react: true,
}).append({
  name: 'peaks/common-ui/rules',
  files: ['**/components/*.ts?(x)'],
  rules: {
    'a11y/heading-has-content': 'off',
    'a11y/prefer-tag-over-role': 'off',
    'react-refresh/only-export-components': 'off',
    'ts/no-unsafe-argument': 'off',
    'ts/no-unsafe-assignment': 'off',
    'ts/no-unsafe-member-access': 'off',
    'ts/restrict-template-expressions': 'off',
  },
})

export default config
