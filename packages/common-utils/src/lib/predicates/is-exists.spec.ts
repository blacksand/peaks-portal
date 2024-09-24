import { describe, expect, it } from 'vitest'

import { isExists } from './is-exists'

describe('isExists', () => {
  it('应当返回 true 当值不为 null 或 undefined', () => {
    expect(isExists('test')).toBe(true)
    expect(isExists(123)).toBe(true)
    expect(isExists({})).toBe(true)
    expect(isExists([])).toBe(true)
  })

  it('应当返回 false 当值为 null 或 undefined', () => {
    expect(isExists(null)).toBe(false)
    expect(isExists(undefined)).toBe(false)
  })
})
