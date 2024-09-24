import { describe, expect, it } from 'vitest'

import type { CP } from '../types'
import { relationship } from './relationship'

describe('relationship', () => {
  it('创建带有默认 admin.allowCreate 和 maxDepth 的 relationship 字段', () => {
    const params = {
      name: 'testField',
      label: 'Test Field',
    } as CP<'relationship'>
    const result = relationship(params)
    expect(result.type).toBe('relationship')
    expect(result.admin?.allowCreate).toBe(false)
    expect(result.maxDepth).toBe(0)
  })

  it('覆盖 admin.allowCreate 和 maxDepth', () => {
    const params = {
      name: 'testField',
      label: 'Test Field',
      admin: { allowCreate: true },
      maxDepth: 5,
    } as CP<'relationship'>
    const result = relationship(params)
    expect(result.admin?.allowCreate).toBe(true)
    expect(result.maxDepth).toBe(5)
  })

  it('处理缺少 admin 字段的情况', () => {
    const params = {
      name: 'testField',
      label: 'Test Field',
      maxDepth: 3,
    } as CP<'relationship'>
    const result = relationship(params)
    expect(result.admin?.allowCreate).toBe(false)
    expect(result.maxDepth).toBe(3)
  })

  it('正确传播附加选项', () => {
    const params = {
      name: 'testField',
      label: 'Test Field',
      custom: {
        someOption: 'someValue',
      },
    } as unknown as CP<'relationship'>
    const result = relationship(params)
    expect(result.custom?.someOption).toBe('someValue')
  })
})
