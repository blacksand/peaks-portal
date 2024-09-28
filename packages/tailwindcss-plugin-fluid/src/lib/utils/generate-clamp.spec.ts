import { describe, expect, it } from 'vitest'

import type { FluidPluginOptions } from '../types.js'
import { generateClamp } from './generate-clamp.js'

describe('generateClamp', () => {
  it('返回正确的 clamp 字符串，给定有效的 min 和 max 值', () => {
    const config = { maxWidth: 1440, minWidth: 320, remBase: 16 } as FluidPluginOptions
    const result = generateClamp([1, 'rem'], [2, 'rem'], 'vw', config)
    expect(result).toBe('clamp(1rem, 0.7143rem + 1.4286vw, 2rem);')
  })

  it('处理 min 大于 max 的情况', () => {
    const config = { maxWidth: 1440, minWidth: 320, remBase: 16 } as FluidPluginOptions
    const result = generateClamp([2, 'rem'], [1, 'rem'], 'vw', config)
    expect(result).toBe('clamp(1rem, 2.2857rem + -1.4286vw, 2rem);')
  })

  it('处理 min 和 max 使用不同单位的情况', () => {
    const config = { maxWidth: 1440, minWidth: 320, remBase: 16 } as FluidPluginOptions
    const result = generateClamp([1, 'px'], [2, 'em'], 'vw', config)
    expect(result).toBe('clamp(1px, 0.7143rem + 1.4286vw, 2em);')
  })

  it('当未提供单位时，返回带有默认单位的 clamp 字符串', () => {
    const config = { maxWidth: 1440, minWidth: 320, remBase: 16 } as FluidPluginOptions
    const result = generateClamp([1, 'rem'], [2, 'rem'], undefined, config)
    expect(result).toBe('clamp(1rem, 0.7143rem + 1.4286vw, 2rem);')
  })

  it('处理 min 和 max 值相同时的边缘情况', () => {
    const config = { maxWidth: 1440, minWidth: 320, remBase: 16 } as FluidPluginOptions
    const result = generateClamp([2, 'rem'], [2, 'rem'], 'vw', config)
    expect(result).toBe('clamp(2rem, 2rem + 0vw, 2rem);')
  })
})
