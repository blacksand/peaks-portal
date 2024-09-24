import type { CollectionSlug } from 'payload'

import { slugs } from '@peaks/data-models'
import type { User } from '@peaks/data-models/payload-types'

import { ADMIN_ROLE_NAMES } from '../roles/app-roles'

export function isAdmin(user: Pick<User, 'roles'> & { collection?: CollectionSlug }) {
  return !user || user.collection !== slugs.users || !user.roles?.length
    ? false
    : ADMIN_ROLE_NAMES.some((role) => user.roles.includes(role))
}
