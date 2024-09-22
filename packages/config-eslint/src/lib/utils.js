import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * 生成 tsconfig path
 * @param {string} [projectRoot] - project root
 * @returns {undefined|string} - tsconfig path
 */
export function getTsconfigPath(projectRoot) {
  if (!projectRoot) {
    return undefined
  }

  for (const file in ['tsconfig.lib.json', 'tsconfig.app.json', 'tsconfig.json']) {
    const tsconfigPath = path.join(projectRoot, file)
    if (fs.existsSync(tsconfigPath)) {
      return tsconfigPath
    }
  }

  return undefined
}

/**
 *  generate tsconfig path
 *  @param {string} [fileURL] - file url
 *  @returns {string} - tsconfig path
 */
export function getProjectRoot(fileURL) {
  return fileURL ? path.dirname(fileURLToPath(fileURL)) : ''
}
