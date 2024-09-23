import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function row(params: CP<'row'>) {
  return createField({ ...params, type: 'row' })
}
