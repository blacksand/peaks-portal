import type { CollectionSlug, PaginatedDocs, TypedCollection } from 'payload'
import type payload from 'payload'
import type { Merge, PickKeys } from 'ts-essentials'

type FieldsOf<T extends CollectionSlug> = Exclude<keyof TypedCollection[T], symbol | number>

export type TypedFindArgs<T extends CollectionSlug> = Merge<
  Parameters<(typeof payload)['find']>[0],
  {
    collection: T
    sort?: `-${FieldsOf<T>}` | FieldsOf<T>
  }
>

export type TypedFindOneArgs<T extends CollectionSlug> = {
  field: Exclude<PickKeys<TypedCollection[T], string>, number>
  value: string
} & Omit<TypedFindArgs<T>, 'limit' | 'page' | 'pagination' | 'where'> & {
  collection: T
}

export type LocalApiClient = Pick<
  typeof payload,
  'auth' | 'count' | 'create' | 'findByID' | 'findGlobal' | 'update' | 'updateGlobal'
> & {
  find: <T extends CollectionSlug>(
    args: TypedFindArgs<T>,
  ) => Promise<PaginatedDocs<TypedCollection[T]>>

  findOne: <T extends CollectionSlug>(
    args: TypedFindOneArgs<T>,
  ) => Promise<TypedCollection[T] | null>
}
