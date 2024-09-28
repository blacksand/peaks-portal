import type { FluidPluginOptions, Range } from '../types.js'
import { extractRemValues } from './extract-rem-values.js'
import { generateClamp } from './generate-clamp.js'
import type { ClampValue, RuleDefinition, Theme } from './types.js'

function tryToPx(value: ClampValue, remBase: number) {
  return value[1] === 'px' ? value
    : value[1] === 'rem'
      ? [value[0] * remBase, 'px']
      : value[1]
        ? value
        : [value[0] * 4, 'px']
}

function generateComments(minClamp: ClampValue, maxClamp: ClampValue, remBase: number) {
  const min = tryToPx(minClamp, remBase)
  const max = tryToPx(maxClamp, remBase)

  return `/* ${min.join('')} => ${max.join('')} */ `
}

export function generateCssProperties(
  range: Range,
  relativeUnit: string | undefined,
  descriptor: RuleDefinition,
  theme: Theme,
  config: FluidPluginOptions,
) {
  const [min, max] = extractRemValues(range, descriptor, theme, config)

  if (!min || !max || min[1] !== max[1]) {
    config.logger?.error('Unable to generate CSS properties for range:', range)
    return
  }

  config.logger?.log({ maxRem: max, minRem: min, range })

  return Object.fromEntries(descriptor.properties.map((property) => [
    property,
    [
      generateClamp(min, max, relativeUnit, config),
      config.showComments ? generateComments(min, max, config.remBase) : '',
    ].join(''),
  ]))
}
