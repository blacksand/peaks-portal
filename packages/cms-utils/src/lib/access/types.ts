import type { FieldAccess, TypeWithID } from 'payload'

export type FieldAccessArgs<TData extends TypeWithID = TypeWithID, TSiblingData = unknown> = Parameters<
  FieldAccess<TData, TSiblingData>
>[0]
