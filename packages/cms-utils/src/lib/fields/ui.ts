import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function ui(params: CP<'ui'>) {
  return createField({ ...params, type: 'ui' })
}
