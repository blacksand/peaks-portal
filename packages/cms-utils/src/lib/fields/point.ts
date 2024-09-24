import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function point(params: CP<'point'>) {
  return createField({ ...params, type: 'point' })
}
