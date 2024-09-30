import type { CollectionConfig, RelationshipField, TextField } from 'payload'
import { describe, expect, it, vi } from 'vitest'

import { extendAuditFields } from './extend-audit-fields'

vi.mock('@payloadcms/ui', () => ({}))

describe('extendAuditFields 函数', () => {
  it('应该正确扩展配置，并在底部添加审计字段', () => {
    const config: CollectionConfig = {
      slug: 'users',
      fields: [{ name: 'text1', type: 'text' }],
    }

    const result = extendAuditFields(config)
    expect(result.fields.length).toBeGreaterThan(1)
    expect(result.fields[0]).toEqual(config.fields[0])
    expect((result.fields.at(-1) as RelationshipField).name).toBe(
      'updatedByUser',
    )
  })

  it('应该正确扩展配置，并在顶部添加审计字段', () => {
    const config: CollectionConfig = {
      slug: 'users',
      custom: { auditFields: { position: 'top' } },
      fields: [{ name: 'text1', type: 'text' }],
    }
    const result = extendAuditFields(config)
    expect(result.fields.length).toBeGreaterThan(1)
    expect((result.fields[0] as TextField).name).toBe('audit')
    expect(result.fields[5]).toEqual(config.fields[0])
  })

  it('应该返回原始配置，当 auditFields 为 false 时', () => {
    const config: CollectionConfig = {
      slug: 'users',
      custom: { auditFields: false },
      fields: [{ name: 'text1', type: 'text' }],
    }

    const result = extendAuditFields(config)
    expect(result).toEqual(config)
  })

  it('应该正确处理用户自定义选项', () => {
    const config: CollectionConfig = {
      slug: 'users',
      custom: { auditFields: { addCreatedBy: false, addUpdatedBy: false } },
      fields: [{ name: 'text1', type: 'text' }],
    }

    const result = extendAuditFields(config)
    expect(
      result.fields.some(
        (field) => 'name' in field && field.name === 'createdBy',
      ),
    ).toBe(false)
    expect(
      result.fields.some(
        (field) => 'name' in field && field.name === 'updatedBy',
      ),
    ).toBe(false)
  })

  it('应该处理 undefined 选项并使用默认值', () => {
    const config: CollectionConfig = {
      slug: 'users',
      fields: [{ name: 'text1', type: 'text' }],
    }
    const result = extendAuditFields(config, undefined)
    expect(result.fields.length).toBeGreaterThan(1)
    expect((result.fields.at(-1) as RelationshipField).name).toBe(
      'updatedByUser',
    )
  })

  it('应该在未设置时间戳时添加时间戳', () => {
    const config: CollectionConfig = {
      slug: 'users',
      fields: [{ name: 'text1', type: 'text' }],
    }
    const result = extendAuditFields(config)
    expect(result.timestamps).toBe(true)
  })

  it('应该在已设置时间戳时不添加时间戳', () => {
    const config: CollectionConfig = {
      slug: 'users',
      fields: [{ name: 'text1', type: 'text' }],
      timestamps: false,
    }
    const result = extendAuditFields(config)
    expect(result.timestamps).toBe(false)
  })
})
