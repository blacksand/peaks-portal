import { eslintConfig } from './src/index.js'

export default eslintConfig({
  type: 'lib',
  allowDefaultProject: ['./*.js', './*.ts'],
})
