import { describe, expect, it } from 'vitest'

import { isNullOrWhitespace } from './is-null-or-whitespace'

describe('isNullOrWhitespace', () => {
  it('应当对空字符串返回 true', () => {
    expect(isNullOrWhitespace('')).toEqual(true)
  })

  it('应当对只包含空格的字符串返回 true', () => {
    expect(isNullOrWhitespace('   ')).toEqual(true)
  })

  it('应当对包含制表符的字符串返回 true', () => {
    expect(isNullOrWhitespace('\t')).toEqual(true)
  })

  it('应当对包含换行符的字符串返回 true', () => {
    expect(isNullOrWhitespace('\n')).toEqual(true)
  })

  it('应当对非空白字符串返回 false', () => {
    expect(isNullOrWhitespace('not whitespace')).toEqual(false)
  })

  it('应当对包含空格和非空格字符的字符串返回 false', () => {
    expect(isNullOrWhitespace(' not whitespace ')).toEqual(false)
  })

  it('应当对 null 返回 true', () => {
    expect(isNullOrWhitespace(null)).toEqual(true)
  })

  it('应当对 undefined 返回 true', () => {
    expect(isNullOrWhitespace(undefined)).toEqual(true)
  })
})
