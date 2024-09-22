import { antfu, GLOB_TS, GLOB_TSX } from '@antfu/eslint-config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { imports } from './rules/imports.js'
import { next } from './rules/next.js'
import { node } from './rules/node.js'
import { nx } from './rules/nx.js'
import { promise } from './rules/promise.js'
import { reactQuery } from './rules/react-query.js'
import { react } from './rules/react.js'
import { sort } from './rules/sort.js'
import { stylistic } from './rules/stylistic.js'
import { tailwind } from './rules/tailwind.js'
import { typescript } from './rules/typescript.js'
import { unicorn } from './rules/unicorn.js'
import { getTsconfigPath } from './utils.js'

/**
 * @typedef {import('@antfu/eslint-config').OptionsConfig} OptionsConfig
 * @typedef {import('eslint-flat-config-utils').FlatConfigComposer} FlatConfigComposer
 */

/**
 * @typedef {object} ExtraOptions
 * @property {boolean} [a11y] - 是否允许 a11y 检测
 * @property {string[]} [allowDefaultProject] - 允许的默认项目
 * @property {boolean} [next] - 是否允许 next
 * @property {string} [projectRoot] - 项目根目录
 * @property {string | boolean} [tailwindcss] - 是否允许 tailwind
 */

const globInternal = '@peaks/**'
const workspacePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')

const defaultOptions = {
  type: 'lib',
  formatters: {
    css: false,
  },
  javascript: {
    overrides: {
      'no-shadow': 'error',
    },
  },
  jsx: false,
  react: false,
  stylistic: {
    indent: 2,
    jsx: false,
    quotes: 'single',
    semi: false,
  },
}

/**
 *  生成 eslint flat config
 *  @param {OptionsConfig & ExtraOptions} inputOptions
 *  @returns {FlatConfigComposer} - returns eslint flat config
 */
export function eslintConfig(inputOptions = {}) {
  const {
    a11y: hasA11y = true,
    allowDefaultProject = ['./*.js'],
    next: hasNext = false,
    projectRoot,
    tailwindcss,
    ...incomingOptions
  } = inputOptions

  const hasReact = hasNext || !!incomingOptions.react
  const tailwindConfig =
    typeof tailwindcss === 'string'
      ? tailwindcss
      : hasReact || tailwindcss
        ? `${workspacePath}/packages/config-tailwind/src/index.js`
        : undefined

  const options = {
    ...defaultOptions,
    ...incomingOptions,
    jsx: hasReact,
    react: hasReact && (incomingOptions.react ?? {}),
    stylistic: {
      ...defaultOptions.stylistic,
      ...(typeof incomingOptions.stylistic === 'object' ? incomingOptions.stylistic : undefined),
      jsx: hasReact,
    },
    typescript: {
      tsconfigPath: getTsconfigPath(projectRoot),
      ...(typeof incomingOptions.typescript === 'object' ? incomingOptions.typescript : undefined),
    },
    unocss: incomingOptions.unocss ?? (hasReact && !tailwindConfig ? { strict: true } : false),
  }

  const tsconfigPath = options.typescript?.tsconfigPath

  const isTypeAware = !!tsconfigPath

  const config = antfu(options)
    .prepend(nx())
    .insertAfter('antfu/node/rules', node())
    .insertAfter('peaks/node/rules', promise())
    .insertAfter('antfu/imports/rules', imports({ projectRoot, workspacePath }))
    .insertAfter('antfu/unicorn/rules', unicorn())
    .insertAfter('antfu/perfectionist/setup', sort({ globInternal }))
    .insertAfter('antfu/stylistic/rules', stylistic())
    .insertAfter('antfu/typescript/rules', typescript({ allowDefaultProject, tsconfigPath }))

  if (hasReact) {
    config
      .override('antfu/react/rules', ({ languageOptions, ...existsOptions }) => {
        // 默认设置中使用了 parserOptions.project, 但是我们使用 projectService 代替
        const { project, ...parserOptions } = languageOptions?.parserOptions ?? {}

        return {
          ...existsOptions,
          files: [GLOB_TS, GLOB_TSX],
          languageOptions: { ...languageOptions, parserOptions },
        }
      })
      .insertAfter(
        'antfu/react/rules',
        react({ a11y: hasA11y, typeAware: isTypeAware }),
        reactQuery(),
      )
  }

  if (hasNext) {
    config.insertAfter(
      'peaks/react/rules',
      next({ nextRoot: path.resolve(workspacePath, 'apps/web') }),
    )
  }

  if (tailwindConfig) {
    config.insertBefore('antfu/jsonc/setup', tailwind({ config: tailwindConfig }))
  }

  if (options.unocss) {
    config.override('antfu/unocss', {
      files: [GLOB_TS, GLOB_TSX],
      settings: {
        unocss: {
          configPath: path.resolve(workspacePath, 'apps/web/uno.config.mjs'),
        },
      },
    })
  }

  return config
}
