import type { RelationshipField } from 'payload'

import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function relationship({
  admin,
  maxDepth,
  ...options
}: CP<'relationship'>) {
  return createField({
    ...options,
    type: 'relationship',
    admin: {
      ...admin,
      allowCreate: admin?.allowCreate ?? false,
    },
    maxDepth: maxDepth ?? 0,
  } as RelationshipField)
}
