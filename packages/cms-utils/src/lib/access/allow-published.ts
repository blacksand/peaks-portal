import type { AccessArgs, TypeWithID } from 'payload'

export interface Publishable extends TypeWithID {
  _status?: 'draft' | 'published' | undefined
}

export function allowPublished<T extends Publishable = Publishable>() {
  return ({ data }: AccessArgs<T>) => data?._status === 'published'
}
