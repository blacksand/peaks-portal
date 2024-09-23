import { mergeDeep } from 'remeda'

import type { FK, FT } from '../types'

export function createField<K extends FK>(
  options: FT<K> & { type: K },
  overrides?: Partial<FT<K>>,
): FT<K> {
  return (overrides ? mergeDeep(options, overrides) : options) as FT<K>
}
