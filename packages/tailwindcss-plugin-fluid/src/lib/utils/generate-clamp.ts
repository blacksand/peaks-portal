import type { FluidPluginOptions } from '../types.js'
import type { ClampValue } from './types.js'

function round(value: number) {
  // eslint-disable-next-line ts/no-magic-numbers
  return Math.round(value * 10_000) / 10_000
}

export function generateClamp(
  min: ClampValue,
  max: ClampValue,
  relativeToUnit: string | undefined,
  config: FluidPluginOptions,
) {
  const minViewport = config.minWidth / config.remBase
  const maxViewport = config.maxWidth / config.remBase

  const slope = (max[0] - min[0]) / (maxViewport - minViewport)
  const slopePercentage = round(slope * 100)

  const unit = (relativeToUnit || 'vw').replace('-', '')
  const intersection = round(-minViewport * slope + min[0])
  const preferred = `${intersection}rem + ${slopePercentage}${unit}`

  const [clampMin, minUnit, clampMax, maxUnit] =
    min[0] > max[0]
      ? [...max, ...min]
      : [...min, ...max]

  return `clamp(${round(clampMin)}${minUnit}, ${preferred}, ${round(clampMax)}${maxUnit});`
}
