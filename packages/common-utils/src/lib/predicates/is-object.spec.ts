import { describe, expect, it } from 'vitest'

import { noop } from '../constants/noop'
import { isObject } from './is-object'

describe('isObject 函数', () => {
  it('如果值是一个对象，应返回 true', () => {
    const object = { name: 'John' }
    expect(isObject(object)).toBe(true)
  })

  it('如果值是 null，应返回 false', () => {
    expect(isObject(null)).toBe(false)
  })

  it('如果值是 undefined，应返回 false', () => {
    const value = undefined
    expect(isObject(value)).toBe(false)
  })

  it('如果值是一个数组，应返回 false', () => {
    const array = [1, 2, 3]
    expect(isObject(array)).toBe(false)
  })

  it('如果值是一个函数，应返回 false', () => {
    const value = noop
    expect(isObject(value)).toBe(false)
  })

  it('如果值是一个字符串，应返回 false', () => {
    const value = 'test'
    expect(isObject(value)).toBe(false)
  })

  it('如果值是一个数字，应返回 false', () => {
    const value = 123
    expect(isObject(value)).toBe(false)
  })
})
