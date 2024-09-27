import path from 'node:path'
import { fileURLToPath } from 'node:url'

import preset from '@peaks/config-tailwind/web'

const appRoot = path.dirname(fileURLToPath(import.meta.url))
const workspaceRoot = path.resolve(appRoot, '../..')
const filesPattern = 'src/**/*!(*.stories|*.spec|*.test).tsx'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    path.join(appRoot, `/${filesPattern}`),
    path.join(workspaceRoot, `packages/common-ui/${filesPattern}`),
    path.join(workspaceRoot, `packages/cms-fields/${filesPattern}`),
    path.join(workspaceRoot, `packages/web-ui/${filesPattern}`),
  ],
  presets: [preset],
}

export default config
