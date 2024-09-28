import type { Config } from 'tailwindcss'
import type { Paths } from 'ts-essentials'

import type { FluidPluginOptions } from '../types.js'
import { toRem } from './to-rem.js'
import type { RuleDefinition, Theme } from './types.js'

function defaultSelector(themeKey: Paths<Config['theme']>) {
  return (theme: Theme, key: string) => {
    const value = theme(themeKey)?.[key]
    if (typeof value === 'string' || typeof value === 'number') {
      return value
    }

    return undefined
  }
}

export function extractRemValues(
  range: Array<string | number | undefined>,
  descriptor: RuleDefinition,
  theme: Theme,
  config: FluidPluginOptions,
) {
  const min = range[0] == null ? '' : String(range[0])
  const max = range[1] == null ? '' : String(range[1])

  if (min === '' || max === '') {
    return []
  }

  const selectValue = descriptor.selectValue ?? defaultSelector(descriptor.key)
  const minValue = selectValue(theme, String(min)) ?? min
  const maxValue = selectValue(theme, max) ?? max

  const minRem = toRem(minValue, descriptor, config)
  const maxRem = toRem(maxValue, descriptor, config)

  config.logger?.log({ maxRem, maxValue, minRem, minValue })

  return [minRem, maxRem]
}
