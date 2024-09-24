import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function textarea(params: CP<'textarea'>) {
  return createField({ ...params, type: 'textarea' })
}
