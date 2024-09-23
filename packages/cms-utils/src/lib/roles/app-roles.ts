import type { Dictionary } from 'ts-essentials'

import type { Role, RoleData } from './types'

export const rolesMap: Dictionary<RoleData, Role> = {
  admin: { name: 'admin', label: '管理员', isAdmin: true },
  // moderator: { name: 'moderator', label: '内容管理' },
  // editor: { name: 'editor', label: '内容编辑' },
  // contributor: { name: 'contributor', label: '投稿人' },
  user: { name: 'user', label: '注册用户', isDefault: true },
  // anonymous: { name: 'anonymous', label: '匿名用户', isDefault: false },
} as const

export const allRoles: readonly RoleData[] = Object.values(rolesMap)

export function getRoleData(name: Role) {
  return rolesMap[name]
}

export const adminRoles: readonly RoleData[] = allRoles.filter(
  ({ isAdmin }) => isAdmin,
)

export const defaultRoles: readonly RoleData[] = allRoles.filter(
  ({ isDefault }) => isDefault,
)

export const adminRoleNames = adminRoles.map(({ name }) => name)
export const defaultRoleNames = defaultRoles.map(({ name }) => name)
