import type { Permissions } from 'payload'
import type { DeepReadonly } from 'ts-essentials'

import type { User } from '../cms-types/payload-types'

export type ClientSessionUser = Readonly<Pick<User, 'id' | 'username' | 'name' | 'roles'>>

export type ClientSession = DeepReadonly<{
  exp?: number
  isLoggedIn: boolean
  permissions: Permissions
  token?: string
  user?: ClientSessionUser
}>
