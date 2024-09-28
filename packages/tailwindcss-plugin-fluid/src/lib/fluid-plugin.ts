import plugin from 'tailwindcss/plugin.js'

import { defaultOptions } from './options.js'
import type { FluidPluginOptions } from './types.js'
import { buildRules } from './utils/build-rules.js'

const fluidPlugin = plugin.withOptions<Partial<FluidPluginOptions>>(
  (incomingOptions) =>
    ({ addComponents, matchUtilities, theme }) => {
      const options = { ...defaultOptions, ...incomingOptions }
      addComponents({
        [`.${options.prefix}container`]: {
          'container-type': 'inline-size',
        },
      })

      const rules = buildRules(options, theme)

      for (const [name, utility, option] of rules) {
        matchUtilities({ [`${options.prefix}${name}`]: utility }, option)
      }
    },
  (options) => ({
    theme: {
      fluid: {
        ...defaultOptions.ranges,
        ...options?.ranges,
      },
    },
  }),
)

export default fluidPlugin
