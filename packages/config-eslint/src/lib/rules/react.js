import { GLOB_JSX, GLOB_TS, GLOB_TSX } from '@antfu/eslint-config'
import a11yPlugin from 'eslint-plugin-jsx-a11y'

/** @type {import('eslint').Linter.Config[]} */
const typeAwareRules = [
  {
    name: 'peaks/react/rules-type-aware',
    files: [GLOB_TS, GLOB_TSX],
    rules: {
      'react/no-leaked-conditional-rendering': 'error',
      // 使用太繁琐
      // 'react/prefer-read-only-props': 'warn',
    },
  },
]

/** @type {import('eslint').Linter.Config[]} */
const a11yRules = [
  {
    name: 'peaks/jsx-a11y/rules',
    files: [GLOB_JSX, GLOB_TSX],
    plugins: {
      a11y: a11yPlugin,
    },
    rules: {
      // 'a11y/accessible-emoji': 'warn',
      'a11y/alt-text': 'warn',
      'a11y/anchor-has-content': 'warn',
      'a11y/anchor-is-valid': ['warn', { aspects: ['noHref', 'invalidHref'] }],
      'a11y/aria-activedescendant-has-tabindex': 'warn',
      'a11y/aria-props': 'warn',
      'a11y/aria-proptypes': 'warn',
      'a11y/aria-role': 'warn',
      'a11y/aria-unsupported-elements': 'warn',
      'a11y/autocomplete-valid': 'warn',
      'a11y/heading-has-content': 'warn',
      'a11y/html-has-lang': 'warn',
      'a11y/iframe-has-title': 'warn',
      'a11y/img-redundant-alt': 'warn',
      'a11y/lang': 'warn',
      'a11y/no-access-key': 'warn',
      'a11y/no-distracting-elements': 'warn',
      'a11y/no-redundant-roles': 'warn',
      'a11y/prefer-tag-over-role': 'warn',
      'a11y/role-has-required-aria-props': 'warn',
      'a11y/role-supports-aria-props': 'warn',
      'a11y/scope': 'warn',
    },
  },
]

/**
 * 配置 react eslint 规则
 * @param {{a11y?: boolean, typeAware?: boolean}} options input options
 * @returns {import('eslint').Linter.Config[]} eslint config
 */
export function react({ a11y, typeAware }) {
  return [
    {
      name: 'peaks/react/rules',
      files: [GLOB_TS, GLOB_TSX],
      rules: {
        'react/no-missing-component-display-name': 'error',

        // 添加对 react-use 包的支持
        'react-hooks/exhaustive-deps': [
          'warn',
          {
            additionalHooks:
              '^use(Async|AsyncFn|AsyncRetry|UpdateEffect|IsomorphicLayoutEffect|DeepCompareEffect|ShallowCompareEffect|.*WithDeps)$',
          },
        ],

        'react-hooks-extra/no-direct-set-state-in-use-effect': 'error',
        'react-hooks-extra/no-redundant-custom-hook': 'error',
        'react-hooks-extra/no-unnecessary-use-callback': 'error',
        'react-hooks-extra/no-unnecessary-use-memo': 'error',
        'react-hooks-extra/prefer-use-state-lazy-initialization': 'error',

        'react-naming-convention/component-name': ['warn', { excepts: [], rule: 'PascalCase' }],
        'react-naming-convention/use-state': 'error',
      },
    },
    ...(typeAware ? typeAwareRules : []),
    ...(a11y ? a11yRules : []),
  ]
}
