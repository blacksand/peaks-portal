import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function checkbox(params: CP<'checkbox'>) {
  return createField({ ...params, type: 'checkbox' })
}
