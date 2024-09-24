import type { TextField } from 'payload'

import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function text(params: CP<'text'>, overrides?: Partial<TextField>) {
  return createField({ ...params, type: 'text' } as TextField, overrides)
}
