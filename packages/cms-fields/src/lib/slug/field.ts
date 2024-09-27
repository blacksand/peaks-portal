import type { TextField } from 'payload'

import { createField } from '@peaks/cms-utils'

import { populateSlug } from './hooks/populate-slug'

export interface SlugField extends Partial<Omit<TextField, 'type'>> {
  autoUpdate?: boolean
  fieldToUse: string
}

export function slugField({ autoUpdate, fieldToUse, hooks, ...overrides }: SlugField) {
  return createField(
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      admin: {
        position: 'sidebar',

        components: {
          Field: {
            clientProps: {
              autoUpdate,
              fieldToUse,
            },
            path: '@peaks/cms-fields/components#SlugFieldComponent',
          },
        },
      },
      hooks: {
        ...hooks,
        beforeValidate: [...(hooks?.beforeValidate ?? []), populateSlug(fieldToUse)],
      },
    },
    overrides as Partial<TextField>,
  )
}
