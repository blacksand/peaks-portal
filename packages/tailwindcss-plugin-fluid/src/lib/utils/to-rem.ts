import type { FluidPluginOptions } from '../types.js'
import { parserValueWithUnit } from './parser-value-with-unit.js'
import type { ClampValue, RuleDefinition } from './types.js'

const supportedUnits = new Set(['px', 'rem'])

// 处理无单位值到 rem
function defaultValueProcessor([value]: ClampValue): ClampValue {
  return [value / 4, 'rem']
}

export function toRem(
  text: string | number | undefined,
  definition: RuleDefinition,
  config: FluidPluginOptions,
): ClampValue | undefined {
  const [value, unit] = parserValueWithUnit(text, config)
  if (value == null || unit == null) {
    return
  }

  if (unit && !supportedUnits.has(unit)) {
    return
  }

  const valueProcessor = definition.valueProcessor ?? defaultValueProcessor

  return value === 0
    ? [0, '']
    : unit === 'rem'
      ? [value, 'rem']
      : unit === 'px'
        ? [value / config.remBase, 'rem']
        : valueProcessor([value, unit], config)
}
