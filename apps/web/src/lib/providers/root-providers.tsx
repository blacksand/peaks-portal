'use client'

import type { PropsWithChildren } from 'react'

import type { AppConfig } from '@peaks/data-models'

import { AppConfigProvider } from './config/app-config-provider'

export function RootProviders({ children, config }: PropsWithChildren<{ config: AppConfig }>) {
  return <AppConfigProvider config={config}>{children}</AppConfigProvider>
}
