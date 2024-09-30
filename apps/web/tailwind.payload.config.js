import path from 'node:path'
import { fileURLToPath } from 'node:url'

import preset from '@peaks/config-tailwind/payload'

const appRoot = path.dirname(fileURLToPath(import.meta.url))
const workspaceRoot = path.resolve(appRoot, '../..')
const filesPattern = '**/*!(*.stories|*.spec|*.test).tsx'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    path.join(appRoot, `src/(payload)/${filesPattern}`),
    path.join(workspaceRoot, `packages/common-ui/src/${filesPattern}`),
    path.join(workspaceRoot, `packages/cms-fields/src/${filesPattern}`),
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  presets: [preset],
}

export default config
