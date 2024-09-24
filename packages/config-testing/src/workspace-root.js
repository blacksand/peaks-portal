import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
