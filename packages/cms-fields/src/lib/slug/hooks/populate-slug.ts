import type { FieldHook, TypeWithID } from 'payload'
import type { PickKeys } from 'ts-essentials'

import { generateSlug } from '../utils/generate-slug'

export function populateSlug<T extends TypeWithID, K extends PickKeys<T, string>>(
  key: K,
): FieldHook<T, string | undefined> {
  return ({ data, value }) =>
    value
      ? generateSlug(value)
      : data && key in data
        ? generateSlug(data[key])
        : undefined
}
