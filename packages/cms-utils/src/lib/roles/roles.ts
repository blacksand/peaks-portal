import type { User } from 'payload'

import { adminRoleNames } from './app-roles'
import type { Role } from './types'

export function isAdmin(user: User) {
  return isUserHasRole(user, ...adminRoleNames)
}

export function isUserHasRole(user: User, ...roles: Role[]) {
  if (!user?.id || !Array.isArray(user.roles)) {
    return false
  }

  const userRoles = user.roles
  return roles.some((role) => userRoles.includes(role))
}
