import { describe, expect, it } from 'vitest'

import { isArray } from './is-array'

describe('isArray', () => {
  it('should return true for an array', () => {
    expect(isArray([1, 2, 3])).toEqual(true)
  })

  it('should return false for a non-array', () => {
    expect(isArray('not an array')).toEqual(false)
  })

  it('should return false for null', () => {
    expect(isArray(null)).toEqual(false)
  })

  it('should return false for undefined', () => {
    expect(isArray(undefined)).toEqual(false)
  })
})
