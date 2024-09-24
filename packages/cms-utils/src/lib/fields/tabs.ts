import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function tabs(params: CP<'tabs'>) {
  return createField({ ...params, type: 'tabs' })
}
