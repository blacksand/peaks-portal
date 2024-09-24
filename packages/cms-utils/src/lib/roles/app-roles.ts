import type { PickProperties } from 'ts-essentials'

import type { Role as RoleData } from './types'

export type RoleName = keyof typeof rolesMap
export type Role = RoleData<RoleName>

type AdminRolesMap = PickProperties<typeof rolesMap, { isAdmin: true }>
type DefaultRolesMap = PickProperties<typeof rolesMap, { isDefault: true }>

export type AdminRoleName = keyof AdminRolesMap
export type DefaultRoleName = keyof DefaultRolesMap

export type AdminRole = Readonly<(typeof rolesMap)[AdminRoleName]>
export type DefaultRole = Readonly<(typeof rolesMap)[DefaultRoleName]>

const rolesMap = {
  admin: { name: 'admin', label: '管理员', isAdmin: true },
  anonymous: { name: 'anonymous', label: '匿名用户' },
  contributor: { name: 'contributor', label: '投稿人' },
  editor: { name: 'editor', label: '内容编辑' },
  moderator: { name: 'moderator', label: '内容管理' },
  user: { name: 'user', label: '注册用户', isDefault: true },
} as const

export const ALL_ROLES: readonly Role[] = Object.values(rolesMap)

export const ADMIN_ROLES: readonly AdminRole[] = ALL_ROLES.filter(
  (role): role is AdminRole => role.isAdmin === true,
)

export const DEFAULT_ROLES: readonly DefaultRole[] = ALL_ROLES.filter(
  (role): role is DefaultRole => role.isDefault === true,
)

export const ADMIN_ROLE_NAMES: readonly AdminRoleName[] = ADMIN_ROLES.map(({ name }) => name)
export const DEFAULT_ROLE_NAMES: readonly DefaultRoleName[] = DEFAULT_ROLES.map(({ name }) => name)

export function getRoleByName(name: RoleName): Readonly<Role> {
  return rolesMap[name]
}
