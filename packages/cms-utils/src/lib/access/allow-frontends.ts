import type { Access, AccessArgs, TypeWithID } from 'payload'
import type { PickKeys } from 'ts-essentials'

import type { Frontend } from '@peaks/data-models/payload-types'

import type { FieldAccessArgs } from './types'

export function allowFrontends<
  T extends TypeWithID & { [key in F]?: string | string[] | Frontend | Frontend[] },
  F extends string = PickKeys<T, string | string[] | Frontend | Frontend[]>,
>(fieldName: F): Access<T> {
  return ({ data, req: { user } }: AccessArgs<T> | FieldAccessArgs<T>) => {
    if (!user || !user.frontends?.length) {
      return false
    }

    if (!data?.[fieldName]) {
      return false
    }

    const relations = data?.[fieldName]
    const frontendsOfUser = new Set(user.frontends.map((frontend) =>
      typeof frontend === 'string' ? frontend : frontend.id,
    ))

    if (Array.isArray(relations)) {
      const ids = relations.map((frontend) => typeof frontend === 'string' ? frontend : frontend.id)
      return ids.some((id) => frontendsOfUser.has(id))
    }

    const id = typeof relations === 'string' ? relations : relations.id
    return frontendsOfUser.has(id)
  }
}
