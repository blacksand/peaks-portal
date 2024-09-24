import type { CP, FT } from '../types'
import { createField } from '../utils/create-field'

export function select(params: CP<'select'>) {
  const { admin, required, ...options } = params

  return createField({
    ...options,
    type: 'select',
    admin: {
      ...admin,
      isClearable: admin?.isClearable ?? !required,
    },
    required,
  } as FT<'select'>)
}
