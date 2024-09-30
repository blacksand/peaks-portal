import { field } from 'packages/cms-utils/src'
import type { RelationshipField } from 'payload'

import { slugs } from '@peaks/data-models'

import { populateFrontend } from './hooks/populate-frontend'

export function frontendField(): RelationshipField {
  return field.relationship({
    name: 'frontend',
    label: '关联的前端应用',
    admin: {
      allowCreate: false,
      position: 'sidebar',
    },
    hasMany: false,
    hooks: {
      beforeValidate: [populateFrontend()],
    },
    index: true,
    maxDepth: 0,
    relationTo: slugs.frontends,
    required: true,
  })
}
