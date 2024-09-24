const rules = {
  'arrow-parens': ['always'],
  'jsx-self-closing-comp': 'warn',
  'multiline-ternary': 'off',
  'newline-per-chained-call': [{ ignoreChainWithDepth: 3 }],
  // 'no-confusing-arrow': 'warn',
  'no-extra-parens': ['functions'],
  'no-extra-semi': 'warn',
  'object-curly-newline': [{ consistent: true, multiline: true }],
  'object-property-newline': [{ allowMultiplePropertiesPerLine: true }],
  'operator-linebreak': [
    'after',
    {
      overrides: {
        ':': 'before',
        '?': 'before',
        '|>': 'before',
      },
    },
  ],
  'padding-line-between-statements': [
    {
      blankLine: 'always',
      next: ['enum', 'interface', 'function'],
      prev: '*',
    },
    {
      blankLine: 'never',
      next: 'function',
      prev: 'function-overload',
    },
  ],
  'spaced-comment': ['always', { exceptions: ['#_'] }],
  'switch-colon-spacing': 'warn',
}

/**
 * stylistic config
 * @returns {[import('eslint').Linter.Config]} eslint config
 */
export function stylistic() {
  return [
    {
      name: 'peaks/stylistic/rules',
      rules: Object.fromEntries(
        Object.entries(rules).map(([name, option]) => [
          `style/${name}`,
          Array.isArray(option) ? ['warn', ...option] : option,
        ]),
      ),
    },
  ]
}
