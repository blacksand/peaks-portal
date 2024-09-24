import type { User } from 'payload'

import { ADMIN_ROLE_NAMES } from './app-roles'
import type { RoleName } from './types'

export function isAdmin(user: User) {
  return isUserHasRole(user, ...ADMIN_ROLE_NAMES)
}

export function isUserHasRole(user: User, ...roles: RoleName[]) {
  if (!user?.id || !Array.isArray(user.roles)) {
    return false
  }

  const userRoles = user.roles
  return roles.some((role) => userRoles.includes(role))
}
