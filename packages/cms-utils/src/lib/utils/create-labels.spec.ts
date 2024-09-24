import { describe, expect, it } from 'vitest'

import { createLabels } from './create-labels'

describe('createLabels', () => {
  it('提供单数和复数时，生成正确的 Labels 对象', () => {
    const result = createLabels('Label', 'Labels')
    expect(result).toEqual({ plural: 'Labels', singular: 'Label' })
  })

  it('仅提供单数时，能自动生成复数形式的 Labels 对象', () => {
    const result = createLabels('Label')
    expect(result).toEqual({ plural: 'Label', singular: 'Label' })
  })
})
