import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function join(params: CP<'join'>) {
  const { admin, required, ...options } = params

  return createField({
    ...options,
    type: 'join',
    admin,
    required,
  })
}
