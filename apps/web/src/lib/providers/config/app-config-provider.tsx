import type { PropsWithChildren } from 'react'

import type { AppConfig } from '@peaks/data-models'

import { Context } from './context'

export function AppConfigProvider({ children, config }: PropsWithChildren<{ config: AppConfig }>) {
  return <Context value={config}>{children}</Context>
}
