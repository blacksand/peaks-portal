import type { ElementOf } from 'ts-essentials'

import type { User } from '@peaks/data-models/payload-types'

export type Role = ElementOf<User['roles']>

export interface RoleData {
  readonly name: Role
  readonly label: string
  readonly isAdmin?: boolean
  readonly isDefault?: boolean
}
