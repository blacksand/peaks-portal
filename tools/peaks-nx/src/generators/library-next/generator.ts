import { formatFiles, updateJson } from '@nx/devkit'
import type { Tree } from '@nx/devkit'
import { determineProjectNameAndRootOptions } from '@nx/devkit/src/generators/project-name-and-root-utils'
import { libraryGenerator } from '@nx/next'

import type { LibNextGeneratorSchema } from './schema'

interface NormalizedSchema extends LibNextGeneratorSchema {
  compiler?: 'swc' | 'tsc'
  projectName: string
  projectRoot: string
}

export async function libNextGenerator(tree: Tree, schema: LibNextGeneratorSchema) {
  const options = await normalizeOptions(tree, schema)
  await libraryGenerator(tree, { ...options, skipFormat: true })

  updatePackageJson(tree, options)
  updateTsConfig(tree, options)

  updateESLintConfig(tree, options)
  updateVitestConfig(tree, options)

  if (!options.skipFormat) {
    await formatFiles(tree)
  }
}

export default libNextGenerator

async function normalizeOptions(
  tree: Tree,
  options: LibNextGeneratorSchema,
): Promise<NormalizedSchema> {
  const { importPath, projectName, projectRoot } = await determineProjectNameAndRootOptions(tree, {
    name: options.name,
    callingGenerator: '@nx/next:library',
    directory: options.directory,
    importPath: options.importPath ?? `@peaks/${options.name.split('/').pop()}`,
    projectNameAndRootFormat: options.projectNameAndRootFormat,
    projectType: 'library',
  })

  return { ...options, importPath, projectName, projectRoot }
}

function updatePackageJson(tree: Tree, options: NormalizedSchema) {
  const packageJson = `${options.projectRoot}/package.json`
  if (!tree.exists(packageJson)) {
    tree.write(packageJson, '{}')
  }

  updateJson(tree, packageJson, (incomingJson: Record<string, unknown>) => {
    Object.assign(incomingJson, {
      name: options.importPath,
      type: 'module',
      private: true,
      sideEffects: ['./src/**/*.css'],
      version: '0.0.1',

      exports: {
        '.': './src/index.ts',
      },

      scripts: {
        // 'build': 'tsc -p tsconfig.lib.json',
        'check-types': 'tsc -p tsconfig.lib.json --noEmit',
      },

      dependencies: {},
      peerDependencies: {},
    })
    return incomingJson
  })
}

interface TsConfigJson {
  compilerOptions: {
    module?: string
  }
}

function updateTsConfig(tree: Tree, options: NormalizedSchema) {
  updateJson(tree, `${options.projectRoot}/tsconfig.json`, (json: TsConfigJson) => {
    const {
      compilerOptions: { module, ...compilerOptions },
    } = json

    return {
      ...json,
      compilerOptions: {
        ...compilerOptions,
        esModuleInterop: true,
        incremental: true,
        tsBuildInfoFile: `../../dist/packages/${options.projectName}/.tsbuildinfo`,
      },
    }
  })

  // updateJson(tree, `${options.projectRoot}/tsconfig.lib.json`, (json: TsConfigJson) => {
  //   const {
  //     compilerOptions: { module, ...compilerOptions },
  //   } = json
  //
  //   return {
  //     ...json,
  //     compilerOptions: {
  //       ...compilerOptions,
  //       noEmit: false,
  //       outDir: 'dist',
  //       rootDir: 'src',
  //     },
  //   }
  // })
}

function updateESLintConfig(tree: Tree, options: NormalizedSchema) {
  const eslintConfig = `${options.projectRoot}/eslint.config.js`

  tree.write(
    eslintConfig,
    `
import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  next: true,
  projectRoot: getProjectRoot(import.meta.url),
}).append({
  name: 'peaks/${options.projectName}/rules',
})

export default config
`,
  )
}

const vitestConfigContent = `
import { testingConfig } from '@peaks/config-testing/browser'

const config = testingConfig(import.meta.url)

export default config
`

function updateVitestConfig(tree: Tree, options: NormalizedSchema) {
  const viteConfig = `${options.projectRoot}/vite.config.ts`
  const vitestConfig = `${options.projectRoot}/vitest.config.ts`

  if (tree.exists(viteConfig)) {
    tree.rename(viteConfig, vitestConfig)
    tree.write(vitestConfig, vitestConfigContent)
  }
}
