import type { CSSRuleObject, KeyValuePair } from 'tailwindcss/types/config.js'

import type { FluidPluginOptions, Range } from '../types.js'
import { generateCssProperties } from './generate-css-properties.js'
import type { RuleDefinitions, Theme } from './types.js'

type Rule = [string, (value: string | Range) => CSSRuleObject | undefined, { values: KeyValuePair<string, Range> }]

export function generateRules(rules: RuleDefinitions, config: FluidPluginOptions, theme: Theme) {
  return Object.entries(rules).flatMap<Rule[]>(
    ([name, definition]) => {
      return [
        [
          name,
          (value: string | Range) => {
            const range = Array.isArray(value)
              ? value
              : (value.includes(',')
                  ? value.split(',')
                  : value.split('_')) as Range

            return generateCssProperties(range, 'vw', definition, theme, config)
          },
          { values: theme(`fluid.${definition.key}`) },
        ] as Rule,
        [
          `cqi-${name}`,
          (value: string | Range) => {
            const range = Array.isArray(value)
              ? value
              : (value.includes(',')
                  ? value.split(',')
                  : value.split('_')) as Range

            return generateCssProperties(range, 'cqi', definition, theme, config)
          },
          { values: theme(`fluid.${definition.key}`) },
        ] as Rule,
      ]
    },
  )
}
