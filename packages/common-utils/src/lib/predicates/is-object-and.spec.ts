import { describe, expect, it } from 'vitest'

import { isObjectAnd } from './is-object-and'

interface ObjectWithA {
  a: number
}

describe('isObjectAnd', () => {
  it('should return true if the value is an object with the predicate is true', () => {
    expect(isObjectAnd<ObjectWithA>({ a: 1, b: 2 }, (o) => o.a === 1)).toBe(
      true,
    )
  })

  it('should return false if the value is an object with the predicate is false', () => {
    expect(isObjectAnd<ObjectWithA>({ a: 1, b: 2 }, (o) => o.a === 2)).toBe(
      false,
    )
  })

  it('should return false if the value is an array', () => {
    expect(isObjectAnd<number[]>([1], (o) => o[0] === 1)).toBe(false)
  })
})
