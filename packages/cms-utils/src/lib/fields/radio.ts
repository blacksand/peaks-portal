import type { COP, CP } from '../types'
import { createField } from '../utils/create-field'

export function radio(params: CP<'radio'>, overrides?: COP<'radio'>) {
  return createField({ ...params, type: 'radio' }, overrides)
}
