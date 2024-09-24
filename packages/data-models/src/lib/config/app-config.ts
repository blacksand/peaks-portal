import type { Config } from '../cms-types/payload-types'

export interface AppConfig {
  readonly admin: {
    readonly user: keyof Config['auth']
  }

  title: string

  readonly endpoints: {
    readonly admin: string
    readonly api: string
    readonly graphql: string
    readonly server: string
    readonly upload: string
  }
  readonly fetchParams: Partial<RequestInit>
}
