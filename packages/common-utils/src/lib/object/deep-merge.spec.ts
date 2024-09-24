import { describe, expect, it } from 'vitest'

import { deepMerge } from './deep-merge'

describe('deepMerge', () => {
  it('should merge two objects', () => {
    const object1 = { a: 1, b: 2 }
    const object2 = { b: 3, c: 4 }
    const expected = { a: 1, b: 3, c: 4 }
    expect(deepMerge(object1, object2)).toEqual(expected)
  })

  it('should merge two nested objects', () => {
    const object1 = { a: 1, b: { c: 2, d: 3 } }
    const object2 = { b: { c: 4 } }
    const expected = { a: 1, b: { c: 4, d: 3 } }
    expect(deepMerge(object1, object2)).toEqual(expected)
  })

  it('should merge two nested objects with different keys', () => {
    const object1 = { a: 1, b: { c: 2, d: 3 } }
    const object2 = { b: { e: 4 } }
    const expected = { a: 1, b: { c: 2, d: 3, e: 4 } }
    expect(deepMerge(object1, object2)).toEqual(expected)
  })

  it('should merge two objects with different types', () => {
    const object1 = { a: 1, b: { c: 2, d: 3 } }
    const object2 = { b: false }
    const expected = { a: 1, b: false }
    expect(deepMerge(object1, object2)).toEqual(expected)
  })

  it('should merge two objects with different types deeply', () => {
    const object1 = { a: 1, b: false }
    const object2 = { b: { c: 2, d: 3 } }
    const expected = { a: 1, b: { c: 2, d: 3 } }
    expect(deepMerge(object1, object2)).toEqual(expected)
  })
})
