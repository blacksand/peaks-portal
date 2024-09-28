import { describe, expect, it, vi } from 'vitest'

import type { FluidPluginOptions } from '../types.js'
import { toRem } from './to-rem.js'
import type { RuleDefinition } from './types.js'

describe('toRem', () => {
  const config = { remBase: 16 } as FluidPluginOptions
  const definition = {} as RuleDefinition

  it('应该将像素值转换为 rem', () => {
    const result = toRem('16px', definition, config)
    expect(result).toEqual([1, 'rem'])
  })

  it('应该处理 rem 单位的值', () => {
    const result = toRem('1rem', definition, config)
    expect(result).toEqual([1, 'rem'])
  })

  it('应该处理没有单位的值', () => {
    const result = toRem('4', definition, config)
    expect(result).toEqual([1, 'rem'])
  })

  it('应该返回 undefined 对于不支持的单位', () => {
    const result = toRem('10vh', definition, config)
    expect(result).toBe(undefined)
  })

  it('应该返回 [0, ""] 对于零值', () => {
    const result = toRem('0px', definition, config)
    expect(result).toEqual([0, ''])
  })

  it('如果提供了自定义的值处理器应该使用它', () => {
    const customProcessor = vi.fn().mockImplementation(([value]) => [value * 2, 'rem'])
    const result = toRem('8', { valueProcessor: customProcessor } as unknown as RuleDefinition, config)
    expect(result).toEqual([16, 'rem'])
    expect(customProcessor).toHaveBeenCalledWith([8, ''], config)
  })
})
