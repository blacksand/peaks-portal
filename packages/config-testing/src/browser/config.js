import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

import { workspaceRoot } from '../workspace-root.js'

export { mergeConfig } from 'vitest/config'

/**
 * vitest config with browser support
 * @param {string} [configFileUrl] - config file url
 * @returns {import('vitest/config').UserConfig} - vitest config
 */
export function testingConfig(configFileUrl) {
  const projectRoot = path.dirname(fileURLToPath(configFileUrl))
  const relativePath = path.relative(workspaceRoot, projectRoot)

  return defineConfig({
    cacheDir: path.join(workspaceRoot, 'dist', '.vite', relativePath),
    root: projectRoot,

    plugins: [
      react(),
    ],

    test: {
      coverage: {
        provider: 'v8',
        reportsDirectory: path.join(workspaceRoot, 'coverage', relativePath),
      },
      environment: 'jsdom',
      globals: true,
      restoreMocks: true,
      root: projectRoot,
      watch: false,

      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      server: { deps: { inline: ['@peaks/**'] } },
    },
  })
}
