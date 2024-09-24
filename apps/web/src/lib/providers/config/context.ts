import { createContext, useContext } from 'react'

import type { AppConfig } from '@peaks/data-models'

export const Context = createContext<AppConfig | undefined>(undefined)

export function useAppConfig() {
  const config = useContext(Context)

  if (!config) {
    throw new Error('useAppConfig must be used within a AppConfigProvider')
  }

  return config
}
