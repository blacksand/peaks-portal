import { describe, expect, it } from 'vitest'

import type { CP } from '../types'
import { select } from './select'

describe('select', () => {
  it('创建带有 required 和 admin 选项的 select 字段', () => {
    const params = {
      name: 'testField',
      label: 'Test Field',
      admin: { isClearable: false },
      required: true,
    } as CP<'select'>

    const result = select(params)
    expect(result.type).toBe('select')
    expect(result.required).toBe(true)
    expect(result.admin?.isClearable).toBe(false)
  })

  it('在非必需时创建 isClearable 为 true 的 select 字段', () => {
    const params = {
      name: 'testField',
      label: 'Test Field',
      admin: {},
      required: false,
    } as CP<'select'>

    const result = select(params)
    expect(result.admin?.isClearable).toBe(true)
  })

  it('如果提供则覆盖 admin.isClearable', () => {
    const params = {
      name: 'testField',
      label: 'Test Field',
      admin: { isClearable: true },
      required: true,
    } as CP<'select'>

    const result = select(params)
    expect(result.admin?.isClearable).toBe(true)
  })

  it('处理缺少 admin 字段的情况', () => {
    const params = {
      name: 'testField',
      label: 'Test Field',
      required: true,
    } as CP<'select'>

    const result = select(params)
    expect(result.admin?.isClearable).toBe(false)
  })

  it('正确传播附加选项', () => {
    const params = {
      name: 'testField',
      label: 'Test Field',
      admin: { isClearable: false },
      custom: {
        someOption: 'someValue',
      },
      required: true,
    } as unknown as CP<'select'>

    const result = select(params)
    expect(result.custom?.someOption).toBe('someValue')
  })
})
