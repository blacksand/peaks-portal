import type { RuleDefinitions } from '../utils/types.js'

const key = 'spacing'

export const scrollRules: RuleDefinitions = {
  // - scroll
  'scroll-m': { key, properties: ['scroll-margin'] },
  'scroll-mb': { key, properties: ['scroll-margin-bottom'] },
  'scroll-me': { key, properties: ['scroll-margin-inline-end'] },
  'scroll-ml': { key, properties: ['scroll-margin-left'] },
  'scroll-mr': { key, properties: ['scroll-margin-right'] },
  'scroll-ms': { key, properties: ['scroll-margin-inline-start'] },
  'scroll-mt': { key, properties: ['scroll-margin-top'] },
  'scroll-mx': { key, properties: ['scroll-margin-left', 'scroll-margin-right'] },
  'scroll-my': { key, properties: ['scroll-margin-top', 'scroll-margin-bottom'] },
  'scroll-p': { key, properties: ['scroll-padding'] },
  'scroll-pb': { key, properties: ['scroll-padding-bottom'] },
  'scroll-pe': { key, properties: ['scroll-padding-inline-end'] },
  'scroll-pl': { key, properties: ['scroll-padding-left'] },
  'scroll-pr': { key, properties: ['scroll-padding-right'] },
  'scroll-ps': { key, properties: ['scroll-padding-inline-start'] },
  'scroll-pt': { key, properties: ['scroll-padding-top'] },
  'scroll-px': { key, properties: ['scroll-padding-left', 'scroll-padding-right'] },
  'scroll-py': { key, properties: ['scroll-padding-top', 'scroll-padding-bottom'] },
}
