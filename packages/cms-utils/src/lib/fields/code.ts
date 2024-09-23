import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function code(params: CP<'code'>) {
  return createField({ ...params, type: 'code' })
}
