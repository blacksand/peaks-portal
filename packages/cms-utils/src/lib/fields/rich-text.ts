import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function richText(params: CP<'richText'>) {
  const { name, label, ...overrides } = params
  return createField({
    name: name || 'rich',
    label: label ?? '文本内容',
    ...overrides,
    type: 'richText',
  })
}
