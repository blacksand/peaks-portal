import type { COP, CP } from '../types'
import { createField } from '../utils/create-field'

export function group(params: CP<'group'>, overrides?: COP<'group'>) {
  return createField({ ...params, type: 'group' }, overrides)
}
