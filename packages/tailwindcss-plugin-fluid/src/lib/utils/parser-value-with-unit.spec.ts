import { describe, expect, it } from 'vitest'

import type { FluidPluginOptions } from '../types.js'
import { parserValueWithUnit } from './parser-value-with-unit.js' // 调整导入路径以匹配您的项目结构

const config = {} as FluidPluginOptions

describe('parserValueWithUnit', () => {
  it('应处理 null 输入', () => {
    // @ts-expect-error null
    const result = parserValueWithUnit(null, config)
    expect(result).toEqual([])
  })

  it('应处理 undefined 输入', () => {
    const result = parserValueWithUnit(undefined, config)
    expect(result).toEqual([])
  })

  it('应处理数字输入', () => {
    const result = parserValueWithUnit(42, config)
    expect(result).toEqual([42, ''])
  })

  it('应处理有效的字符串输入（带有单位）', () => {
    const result = parserValueWithUnit('100px', config)
    expect(result).toEqual([100, 'px'])
  })

  it('应处理有效的字符串输入（无单位）', () => {
    const result = parserValueWithUnit('100', config)
    expect(result).toEqual([100, ''])
  })

  it('应处理无效的字符串输入', () => {
    const result = parserValueWithUnit('invalid', config)
    expect(result).toEqual([])
  })

  it('应处理含有非数字字符的字符串输入', () => {
    const result = parserValueWithUnit('100px200', config)
    expect(result).toEqual([])
  })

  it('应处理仅含单位的字符串输入', () => {
    const result = parserValueWithUnit('px', config)
    expect(result).toEqual([])
  })

  it('应处理仅含数字的字符串输入', () => {
    const result = parserValueWithUnit('123', config)
    expect(result).toEqual([123, ''])
  })

  it('应处理含有浮点数的字符串输入', () => {
    const result = parserValueWithUnit('123.45px', config)
    expect(result).toEqual([123.45, 'px'])
  })

  it('应处理含有负数的字符串输入', () => {
    const result = parserValueWithUnit('-123px', config)
    expect(result).toEqual([-123, 'px'])
  })
})
