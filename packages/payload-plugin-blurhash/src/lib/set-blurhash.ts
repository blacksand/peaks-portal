import type { BlurhashField } from './fields/types'

export function setBlurhash(options?: boolean | Partial<BlurhashField>) {
  return { blurhash: options ?? {} }
}
