import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function date(params: CP<'date'>) {
  const { label, admin } = params
  return createField({
    ...params,
    type: 'date',
    label: label ?? '日期',
    admin: {
      ...admin,
      date: {
        ...admin?.date,
        displayFormat: admin?.date?.displayFormat ?? 'yyyy/MM/dd',
      },
    },
  })
}
