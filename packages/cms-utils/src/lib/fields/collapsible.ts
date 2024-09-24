import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function collapsible(params: CP<'collapsible'>) {
  return createField({
    ...params,
    type: 'collapsible',
    label: params.label ?? '折叠面板',
  })
}
