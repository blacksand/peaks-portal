import type { User } from 'payload'

import { slugs } from '@peaks/data-models'

import { ADMIN_ROLE_NAMES } from '../roles/app-roles'

export function isAdmin(user: Partial<User>) {
  return !user || user.collection !== slugs.users || !user.roles?.length
    ? false
    : ADMIN_ROLE_NAMES.some((role) => user.roles.includes(role))
}
