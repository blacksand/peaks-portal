import type { CSSRuleObject, KeyValuePair } from 'tailwindcss/types/config.js'

import { fontRules } from '../rules/font-rules.js'
import { positionRules } from '../rules/position-rules.js'
import { scrollRules } from '../rules/scroll-rules.js'
import { sizeRules } from '../rules/size-rules.js'
import { spacingRules } from '../rules/spacing-rules.js'
import type { FluidPluginOptions } from '../types.js'
import { generateRules } from './generate-rules.js'
import { generateTextRules } from './generate-text-rules.js'
import type { Theme } from './types.js'

export function buildRules(
  options: FluidPluginOptions,
  theme: Theme,
) {
  return [
    ...generateTextRules(options, theme),
    ...generateRules({
      ...fontRules,
      ...positionRules,
      ...scrollRules,
      ...sizeRules,
      ...spacingRules,
    }, options, theme),
  ] as Array<[string, (value: unknown) => CSSRuleObject | null, { values: KeyValuePair<string> }]>
}
