import type { Field, RowField } from 'payload'

import { deepMerge } from '@peaks/utils-common'

export function withRow(
  incomingFields: Field[],
  overrides: Partial<RowField> = {},
): RowField {
  const width = Math.round(100 / incomingFields.length * 100) / 100

  const fields = incomingFields.map((field) =>
    deepMerge({ admin: { style: { flex: `${width} ${width} 0` } } }, field),
  )

  return deepMerge({ type: 'row', fields }, overrides)
}
