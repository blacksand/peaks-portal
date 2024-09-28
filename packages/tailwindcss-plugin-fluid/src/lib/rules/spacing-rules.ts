import type { RuleDefinitions } from '../utils/types.js'

const key = 'spacing'

export const spacingRules: RuleDefinitions = {
  'gap': { key, properties: ['gap'] },
  'gap-x': { key, properties: ['column-gap'] },
  'gap-y': { key, properties: ['row-gap'] },

  'm': { key, properties: ['margin'] },
  'mb': { key, properties: ['margin-bottom'] },
  'ml': { key, properties: ['margin-left'] },
  'mr': { key, properties: ['margin-right'] },
  'mt': { key, properties: ['margin-top'] },
  'mx': { key, properties: ['margin-left', 'margin-right'] },
  'my': { key, properties: ['margin-top', 'margin-bottom'] },

  'p': { key, properties: ['padding'] },
  'pb': { key, properties: ['padding-bottom'] },
  'pl': { key, properties: ['padding-left'] },
  'pr': { key, properties: ['padding-right'] },
  'pt': { key, properties: ['padding-top'] },
  'px': { key, properties: ['padding-left', 'padding-right'] },
  'py': { key, properties: ['padding-top', 'padding-bottom'] },
}
