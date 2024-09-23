import type { NumberField } from 'payload'

import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function number(params: CP<'number'>) {
  return createField({
    ...params,
    type: 'number',
  } as NumberField)
}
