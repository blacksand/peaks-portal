import type { CollectionConfig, Field, TextField } from 'payload'
import { describe, expect, it, vi } from 'vitest'

import { extendCollection } from './extend-collection'

vi.mock('@payloadcms/translations', () => ({
  getTranslation: vi.fn((label, i18n) => `Mocked Translation: ${label}`),
}))

vi.mock('@payloadcms/ui', () => ({
  useField: vi.fn(() => ({ value: 'mockedValue' })),
  useTranslation: vi.fn(() => ({ i18n: 'mockedI18n' })),
}))

vi.mock('payload/shared', () => ({
  isImage: vi.fn((mimeType: string) => mimeType.startsWith('image/')),
}))

describe('extendCollection', () => {
  it('在启用上传时使用 blurhash 字段和钩子扩展集合', () => {
    const collection: CollectionConfig = {
      slug: 'test',
      fields: [],
      hooks: {},
      upload: true,
    }
    const options = {
      generateDataUrl: false,
      generateSizes: false,
      showBlurhash: true,
    }
    const result = extendCollection(collection, options)
    expect(
      result.fields.some((field) => (field as TextField).name === 'blurhash'),
    ).toBe(true)

    expect(result.hooks?.beforeChange).toBeDefined()
  })

  it('在未启用上传时返回原始集合', () => {
    const collection = { slug: 'test', fields: [], hooks: {}, upload: false }
    const result = extendCollection(collection)
    expect(result).toEqual(collection)
  })

  it('在自定义 blurhash 设置为 false 时返回原始集合', () => {
    const collection: CollectionConfig = {
      slug: 'test',
      custom: { blurhash: false },
      fields: [],
      upload: true,
    }
    const result = extendCollection(collection)
    expect(result).toEqual(collection)
  })

  it('在集合中不存在 blurhash 字段时添加 blurhash 字段', () => {
    const collection: CollectionConfig = {
      slug: 'test',
      fields: [{ name: 'someField' } as Field],
      hooks: {},
      upload: true,
    }
    const result = extendCollection(collection)
    expect(
      result.fields.some((field) => (field as TextField).name === 'blurhash'),
    ).toBe(true)
  })

  it('在集合中已存在 blurhash 字段时不添加 blurhash 字段', () => {
    const collection: CollectionConfig = {
      slug: 'test',
      fields: [{ name: 'blurhash' } as Field],
      hooks: {},
      upload: true,
    }
    const result = extendCollection(collection)
    const blurhashFields = result.fields.filter(
      (field) => (field as TextField).name === 'blurhash',
    )
    expect(blurhashFields.length).toBe(1)
  })

  it('在 generateDataUrl 为 true 时添加 blurhash 和 blurDataUrl 字段', () => {
    const collection: CollectionConfig = {
      slug: 'test',
      fields: [],
      hooks: {},
      upload: true,
    }
    const options = { generateDataUrl: true }
    const result = extendCollection(collection, options)
    expect(
      result.fields.some((field) => (field as TextField).name === 'blurhash'),
    ).toBe(true)
    expect(
      result.fields.some(
        (field) => (field as TextField).name === 'blurDataUrl',
      ),
    ).toBe(true)
  })

  it('在 generateSizes 为 true 且定义了 imageSizes 时添加 blurhashSizes 字段', () => {
    const collection: CollectionConfig = {
      slug: 'test',
      fields: [],
      hooks: {},
      upload: { imageSizes: [{ name: 'size1' }] },
    }
    const options = { generateSizes: true }
    const result = extendCollection(collection, options)
    expect(
      result.fields.some(
        (field) => (field as TextField).name === 'blurhashSizes',
      ),
    ).toBe(true)
  })

  it('在未定义 imageSizes 时不添加 blurhashSizes 字段', () => {
    const collection: CollectionConfig = {
      slug: 'test',
      fields: [],
      hooks: {},
      upload: { imageSizes: [] },
    }
    const options = { generateSizes: true }
    const result = extendCollection(collection, options)
    expect(
      result.fields.some(
        (field) => (field as TextField).name === 'blurhashSizes',
      ),
    ).toBe(false)
  })

  it('正确添加 beforeChange 钩子', () => {
    const collection: CollectionConfig = {
      slug: 'test',
      fields: [],
      hooks: {},
      upload: true,
    }
    const result = extendCollection(collection)
    expect(result.hooks?.beforeChange).toBeDefined()
    expect(result.hooks?.beforeChange?.length).toBeGreaterThan(0)
  })
})
