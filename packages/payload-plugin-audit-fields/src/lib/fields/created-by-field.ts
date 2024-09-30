import type { FieldHook, RelationshipField } from 'payload'

export function createdByField(usersSlug: string) {
  return [
    {
      name: 'createdBy',
      type: 'relationship',
      label: '创建人',
      admin: {
        disabled: true,
      },
      hooks: {
        beforeChange: [
          ({ operation, req: { user } }) =>
            operation === 'create' && user
              ? { relationTo: user.collection, value: user.id }
              : undefined,
        ] as FieldHook[],
      },
      maxDepth: 0,
      relationTo: [usersSlug as never],
    } satisfies RelationshipField,
    {
      name: 'createdByUser',
      type: 'text',
      label: '创建人',
      admin: {
        disableBulkEdit: true,
        hidden: true,
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          (({ operation, req: { user } }) =>
            operation === 'create' && user
              ? user.name ?? user.username
              : undefined),
        ] satisfies FieldHook[],
      },
    },
  ]
}
