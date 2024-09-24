import type { AccessArgs, TypeWithID } from 'payload'

import { isAdmin } from './is-admin'
import type { FieldAccessArgs } from './types'

export function allowAdminsOrSelf<T extends TypeWithID>(identifier: keyof T) {
  return ({ data, req: { user } }: AccessArgs<T> | FieldAccessArgs<T>): boolean => {
    if (user?.id == null) {
      return false
    }

    if (isAdmin(user)) {
      return true
    }

    return data?.[identifier] === user.id
  }
}
