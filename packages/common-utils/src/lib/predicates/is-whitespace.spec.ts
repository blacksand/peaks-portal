import { describe, expect, it } from 'vitest'

import { isWhitespace } from './is-whitespace'

describe('isWhitespace', () => {
  it('应当对空字符串返回 true', () => {
    expect(isWhitespace('')).toEqual(true)
  })

  it('应当对只包含空格的字符串返回 true', () => {
    expect(isWhitespace('   ')).toEqual(true)
  })

  it('应当对包含制表符的字符串返回 true', () => {
    expect(isWhitespace('\t')).toEqual(true)
  })

  it('应当对包含换行符的字符串返回 true', () => {
    expect(isWhitespace('\n')).toEqual(true)
  })

  it('应当对非空白字符串返回 false', () => {
    expect(isWhitespace('not whitespace')).toEqual(false)
  })

  it('应当对包含空格和非空格字符的字符串返回 false', () => {
    expect(isWhitespace(' not whitespace ')).toEqual(false)
  })
})
