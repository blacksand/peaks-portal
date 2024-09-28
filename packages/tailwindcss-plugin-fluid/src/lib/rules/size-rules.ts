import type { RuleDefinitions } from '../utils/types.js'

const key = 'spacing'

export const sizeRules: RuleDefinitions = {
  // - size: height
  'h': { key, properties: ['height'] },
  'max-h': { key, properties: ['max-height'] },
  'min-h': { key, properties: ['min-height'] },

  // - size: width
  'max-w': { key, properties: ['max-width'] },
  'min-w': { key, properties: ['min-width'] },
  'w': { key, properties: ['width'] },

  'size': { key, properties: ['height', 'width'] },
}
