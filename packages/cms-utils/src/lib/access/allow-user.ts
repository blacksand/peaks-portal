import type { AccessArgs, CollectionSlug } from 'payload'

import { slugs } from '@peaks/data-models'

import type { RoleName } from '../roles/app-roles'
import type { FieldAccessArgs } from './types'

export function allowUser({
  collection = slugs.users,
  requireAll,
  roles,
}: {
  collection?: CollectionSlug
  requireAll?: boolean
  roles?: readonly RoleName[]
} = {}): (args: AccessArgs | FieldAccessArgs) => boolean {
  return ({ req: { user } }) =>
    user
      ? collection && user.collection !== collection
        ? false
        : roles?.length
          ? requireAll
            ? roles.every((role) => user.roles.includes(role))
            : roles.some((role) => user.roles.includes(role))
          : true
      : false
}
