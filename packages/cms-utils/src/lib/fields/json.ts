import type { COP, CP } from '../types'
import { createField } from '../utils/create-field'

export function json(params: CP<'json'>, overrides?: COP<'json'>) {
  return createField({ ...params, type: 'json' }, overrides)
}
