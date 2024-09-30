import path from 'node:path'
import { fileURLToPath } from 'node:url'

import preset from '@peaks/config-tailwind'

const appRoot = path.dirname(fileURLToPath(import.meta.url))
const workspaceRoot = path.resolve(appRoot, '../..')
const filesPattern = '**/*!(*.stories|*.spec|*.test).tsx'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    path.join(appRoot, `src/(frontend)/${filesPattern}`),
    path.join(workspaceRoot, `packages/common-ui/${filesPattern}`),
    path.join(workspaceRoot, `packages/web-ui/${filesPattern}`),
  ],
  darkMode: ['class', '.dark'],
  presets: [preset],
}

export default config
