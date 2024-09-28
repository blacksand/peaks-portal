import type { FluidPluginOptions } from '../types.js'
import { numberWithUnitRegexp } from './constants.js'
import type { ClampValue } from './types.js'

export function parserValueWithUnit(input: string | number | undefined, config: FluidPluginOptions): ClampValue | undefined[] {
  if (input == null) {
    config.logger?.warn(`Invalid value: ${input}.`)
    return []
  }

  if (typeof input === 'number') {
    return [input, '']
  }

  const result = numberWithUnitRegexp.exec(input)
  if (!result?.[1]) {
    config.logger?.warn(`Invalid value: "${input}" It should be a number with a unit.`)
    return []
  }

  const [, valueString, unit = ''] = result
  const value = Number.parseFloat(valueString)

  if (Number.isNaN(value)) {
    config.logger?.warn(`value: "${valueString}" can not be parsed to a number.`)
    return []
  }

  return [value, unit] as ClampValue
}
