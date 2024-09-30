import type { FieldHook, RelationshipField } from 'payload'

import type { Config } from '@peaks/data-models/payload-types'

import { isObject } from '../utils/is-object'

export function updatedByField(usersSlug: keyof Config['collections']) {
  return [
    {
      name: 'updatedBy',
      type: 'relationship',
      label: '最后修改人',
      admin: {
        disabled: true,
      },
      hooks: {
        beforeChange: [
          ({ operation, req: { user } }) =>
            operation === 'update' && isObject(user)
              ? { relationTo: user.collection, value: user.id }
              : undefined,
        ] as FieldHook[],
      },
      maxDepth: 0,
      relationTo: [usersSlug],
    } satisfies RelationshipField,
    {
      name: 'updatedByUser',
      type: 'text',
      label: '最后修改人',
      admin: {
        disableBulkEdit: true,
        hidden: true,
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ operation, req: { user } }) =>
            operation === 'update' && isObject(user)
              ? user.name ?? user.username
              : undefined,
        ] satisfies FieldHook[],
      },
    },
  ]
}
