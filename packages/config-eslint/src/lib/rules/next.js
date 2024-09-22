import { GLOB_SRC, renamePluginInConfigs, renameRules } from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const renameOptions = { '@next/next': 'next' }

/**
 * 配置 next eslint plugin
 * @param {{nextRoot?: string}} options input options
 * @returns {import('eslint').Linter.Config[]} eslint config
 */
export function next({ nextRoot }) {
  const compat = new FlatCompat()

  const { rules, ...plugin } = compat.extends('plugin:@next/next/core-web-vitals').reduce(
    (acct, item) => ({
      ...acct,
      plugins: { ...acct.plugins, ...item.plugins },
      rules: { ...acct.rules, ...item.rules },
    }),
    {},
  )

  const nextRules = renameRules(rules, renameOptions)
  const nextPlugins = renamePluginInConfigs([plugin], renameOptions)

  return [
    {
      ...nextPlugins[0],
      name: 'peaks/next/setup',
      settings: { next: { nextRoot } },
    },
    {
      name: 'peaks/next/rules',
      files: [GLOB_SRC],
      rules: {
        ...nextRules,
        'next/no-html-link-for-pages': ['error', nextRoot],
      },
    },
  ]
}
