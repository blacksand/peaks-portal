import type { Config } from './payload-types'

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}

export type * from './payload-types'
