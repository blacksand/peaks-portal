import type { FluidPluginOptions, Range } from '../types.js'
import { generateCssProperties } from './generate-css-properties.js'
import type { RuleDefinition, Theme } from './types.js'

const textRule: RuleDefinition = {
  key: 'fontSize',
  properties: ['font-size'],
  selectValue: (theme, key) => theme('fontSize')?.[key]?.[0],
}

const leadingRule: RuleDefinition = {
  key: 'lineHeight',
  properties: ['line-height'],
  selectValue: (theme, key) => ((theme('fontSize')?.[key]) as string[] | undefined)?.[1] ?? '1.5',
  valueProcessor: ([value]) => [value, ''],
}

export function generateTextRules(config: FluidPluginOptions, theme: Theme) {
  return [
    [
      `text`,
      (value: string | Range) => {
        const range = Array.isArray(value) ? value : (value.includes(',')
          ? value.split(',')
          : value.split('_')) as Range

        return {
          ...generateCssProperties(range, 'vw', textRule, theme, config),
          ...generateCssProperties(range, 'vw', leadingRule, theme, config),
        }
      },
      { values: theme('fluid.text') },
    ],
    [
      `cqi-text`,
      (value: string | Range) => {
        const range = Array.isArray(value) ? value : (value.includes(',')
          ? value.split(',')
          : value.split('_')) as Range

        return {
          ...generateCssProperties(range, 'cqi', textRule, theme, config),
          ...generateCssProperties(range, 'cqi', leadingRule, theme, config),
        }
      },
      { values: theme('fluid.text') },
    ],
  ]
}
