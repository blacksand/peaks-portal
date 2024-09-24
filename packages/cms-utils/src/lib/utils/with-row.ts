import type { Field, RowField } from 'payload'

export function withRow(fields: Field[]): RowField {
  return { type: 'row', fields }
}
