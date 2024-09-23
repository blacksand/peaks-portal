import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function email(params: CP<'email'>) {
  return createField({
    ...params,
    type: 'email',
    label: params.label ?? '电子邮箱',
  })
}
