import type { Config } from 'tailwindcss'
import type { Paths } from 'ts-essentials'

import type { FluidPluginOptions } from '../types.js'

export type Theme = <TDefaultValue = Config['theme']>(path?: string, defaultValue?: TDefaultValue) => TDefaultValue
export type ClampValue = [number, string]

export interface RuleDefinition {
  key: Paths<Config['theme']>
  // namePattern?: string
  properties: string[]

  selectValue?: (theme: Theme, key: string) => string | undefined
  valueProcessor?: (value: ClampValue, config: FluidPluginOptions) => ClampValue
}

export type RuleDefinitions = Record<string, RuleDefinition>
