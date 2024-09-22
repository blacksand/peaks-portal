import { describe, expect, it } from 'vitest'

import { formatNumber } from './format-number'

describe('formatNumber', () => {
  const de = { locale: 'de-DE' }
  const en = { locale: 'en-US' }
  it('应当正确格式化数字', () => {
    expect(formatNumber(1_234_567)).toEqual('1,234,567')
  })

  it('应当根据地区设置格式化数字', () => {
    expect(formatNumber(1_234_567, de)).toEqual('1.234.567')
  })

  it('应当处理小数点', () => {
    expect(formatNumber(1234.5678, en)).toEqual('1,234.568')
    expect(formatNumber(1234.5678, de)).toEqual('1.234,568')
  })
})
