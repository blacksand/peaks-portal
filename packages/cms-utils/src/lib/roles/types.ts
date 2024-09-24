import type { ElementOf } from 'ts-essentials'

import type { User } from '@peaks/data-models/payload-types'

export type RoleName = ElementOf<User['roles']>

export interface Role<T extends string = RoleName> {
  readonly name: T
  readonly label: string
  readonly isAdmin?: boolean
  readonly isDefault?: boolean
}
