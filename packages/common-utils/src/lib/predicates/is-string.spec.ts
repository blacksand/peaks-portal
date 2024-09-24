import { describe, expect, it } from 'vitest'

import { isString } from './is-string'

describe('isString', () => {
  it('应当返回 true 当值为字符串', () => {
    expect(isString('test')).toBe(true)
  })

  it('应当返回 false 当值不为字符串', () => {
    expect(isString(123)).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
  })
})
