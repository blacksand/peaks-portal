import type { Field, RowField } from 'payload'

export function withRow(incomingFields: Field[]): RowField {
  const width = Math.round((100 / incomingFields.length) * 100) / 100

  const fields: Field[] = incomingFields.map(({ admin, ...field }) => ({
    ...field,
    admin: { ...admin, width },
  })) as Field[]

  return { type: 'row', fields }
}
